#!/usr/bin/env python3
"""
Khamosh Tabdeeli — 60s film ko 720x1280@30fps MP4 mein render karta hai.
Pure Pillow + imageio-ffmpeg (koi browser nahi). Scene data video.js se port kiya gaya.
"""
import math, os, random, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

ROOT = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(ROOT, "..", "app")
OUT = os.path.join(ROOT, "..", "app", "exports")
os.makedirs(OUT, exist_ok=True)
FRAMES_DIR = os.path.join(OUT, "_video_only.mp4")

W, H, FPS, DUR = 720, 1280, 30, 60.0

PAPER = (242, 233, 216)
GOLD = (217, 169, 74)
CLAY = (201, 112, 90)
SAGE = (127, 174, 148)
INK = (4, 9, 10)
DIM = (242, 233, 216, 160)

FRAUNCES = os.path.join(ROOT, "fonts", "Fraunces.ttf")
GROTESK = os.path.join(ROOT, "fonts", "SpaceGrotesk.ttf")

_fcache = {}
def font(kind, sz, w=600):
    key = (kind, sz, w)
    if key not in _fcache:
        if kind == "d":
            f = ImageFont.truetype(FRAUNCES, sz)
            try: f.set_variation_by_axes([144, w, 0, 0])
            except Exception: pass
        else:
            f = ImageFont.truetype(GROTESK, sz)
            try: f.set_variation_by_axes([w])
            except Exception: pass
        _fcache[key] = f
    return _fcache[key]

def ease(x):
    x = min(1.0, max(0.0, x))
    return 1 - (1 - x) ** 3

COL = {"paper": PAPER, "gold": GOLD, "clay": CLAY, "sage": SAGE}
SIZE = {"huge": 132, "big": 84, "mid": 50, "body": 30, "k": 21, "mono": 22, "cap": 34, "cnt": 190}

# ---------- backgrounds ----------
BW, BH = int(W * 1.22), int(H * 1.22)
BGS = {}
for name in ("bg1", "bg2", "bg3", "bg4"):
    im = Image.open(os.path.join(APP, "assets", "img", name + ".jpg")).convert("RGB")
    im = im.resize((BW, BH), Image.LANCZOS)
    BGS[name] = im

# vertical dark gradient overlay
grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(grad)
stops = [(0.0, 190), (0.34, 110), (0.7, 130), (1.0, 220)]
for y in range(H):
    p = y / H
    a = 0
    for i in range(len(stops) - 1):
        p0, a0 = stops[i]; p1, a1 = stops[i + 1]
        if p0 <= p <= p1:
            a = a0 + (a1 - a0) * ((p - p0) / (p1 - p0)); break
    gd.line([(0, y), (W, y)], fill=(4, 9, 10, int(a)))
GRAD = grad

# vignette
vig = Image.new("RGBA", (W, H), (0, 0, 0, 0))
vd = ImageDraw.Draw(vig)
cx, cy = W / 2, H * 0.46
maxd = math.hypot(W / 2, H / 2)
for r in range(int(maxd), 0, -6):
    a = int(150 * max(0.0, (r / maxd - 0.42)) / 0.58)
    vd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 0, 0, min(150, a)))
VIG = vig.filter(ImageFilter.GaussianBlur(24))

# dark overlay for reveal scene
darkov = Image.new("RGBA", (W, H), (4, 9, 10, 0))
dd = ImageDraw.Draw(darkov)
for r in range(int(maxd), 0, -6):
    a = int(235 * min(1.0, max(0.0, (1.15 - r / maxd))))
    dd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(4, 9, 10, a))
DARK = darkov.filter(ImageFilter.GaussianBlur(18))

# grain
random.seed(7)
GRAINS = []
for _ in range(3):
    g = Image.effect_noise((W, H), 38).convert("L")
    g = g.point(lambda v: 255 if v > 235 else 0)
    ga = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ga.putalpha(g.point(lambda v: int(v * 0.06)))
    gp = Image.new("RGBA", (W, H), (242, 233, 216, 255))
    gp.putalpha(g.point(lambda v: int(v * 0.06)))
    GRAINS.append(gp)

# ---------- text helpers ----------
def seg_font(seg):
    st = seg[1]
    kind = "d" if st.get("f", "d") == "d" else "b"
    return font(kind, int(SIZE[st.get("size", "mid")] * st.get("scale", 1)), st.get("w", 600))

def line_width(draw, segs):
    w = 0
    for i, seg in enumerate(segs):
        w += draw.textlength(seg[0], font=seg_font(seg))
        if i: w += 10
    return w

def draw_lines(draw, lines, cx, y, alpha=1.0, scale=1.0, clip=None):
    """lines: list of list-of-segments. Returns list of (x0,y0,x1,y1) per line."""
    boxes = []
    for segs in lines:
        fmax = max(seg_font(s).size for s in segs)
        lh = int(fmax * 1.16)
        lw = 0
        widths = []
        for i, seg in enumerate(segs):
            tw = draw.textlength(seg[0], font=seg_font(seg))
            widths.append(tw); lw += tw + (10 if i else 0)
        x = cx - lw / 2
        for i, seg in enumerate(segs):
            st = seg[1]
            col = COL.get(st.get("color", "paper"), PAPER)
            a = int(255 * alpha * st.get("a", 1.0))
            f = seg_font(seg)
            if scale != 1.0:
                f = font("d" if st.get("f", "d") == "d" else "b",
                         int(f.size * scale), st.get("w", 600))
            draw.text((x, y), seg[0], font=f, fill=col + (a,))
            if clip is not None:
                # erase beyond clip fraction (left->right)
                cutx = cx - lw / 2 + lw * clip
                if x + widths[i] > cutx:
                    x0 = max(x, cutx)
                    draw.rectangle([x0, y - 6, x + widths[i] + 4, y + lh], fill=(0, 0, 0, 0))
            x += widths[i] + 10
        boxes.append((cx - lw / 2, y, cx + lw / 2, y + lh))
        y += lh + 6
    return boxes

def wrap_segs(segs, maxw=600):
    if len(segs) != 1:
        return [segs]
    txt, st = segs[0]
    f = seg_font(segs[0])
    dtmp = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    out, cur = [], ""
    for w_ in txt.split(" "):
        t2 = (cur + " " + w_).strip()
        if dtmp.textlength(t2, font=f) > maxw and cur:
            out.append([(cur, st)]); cur = w_
        else:
            cur = t2
    if cur: out.append([(cur, st)])
    return out

def wrap(draw, text, f, maxw):
    words, lines, cur = text.split(" "), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if draw.textlength(t, font=f) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = w_
    if cur: lines.append(cur)
    return lines

# ---------- scene data (port of video.js v2) ----------
def T(txt, **st): return (txt, st)

SCENES = [
    dict(at=0, to=7, bg="bg1", cam="push", layers=[
        dict(k="text", t=.1, s=1.0, anim="rise", pos="top", lines=[[T("SACH SUNO", size="k", color="gold", w=700, f="b")]]),
        dict(k="counter", t=.4, s=3.0, anim="count", to=100,
             pre=[[T("Tum ne kitni motivation videos dekhi hain?", size="mono", color="paper", a=.6, f="b")]],
             post=[[T("shayad is se zyada", size="mono", color="gold", f="b")]]),
        dict(k="flash", t=3.2, s=.45),
        dict(k="text", t=3.4, s=3.4, anim="slam", pos="center",
             lines=[[T("Aur aaj bhi")], [T("WAHI", color="gold"), T(" ho.")]]),
    ], subs=[(.3,1.9,"Tumne 100 videos dekhi hongi."), (2.2,4.6,"Aur aaj bhi wahi ho —"), (4.6,6.7,"jahan ek saal pehle the.")]),
    dict(at=7, to=14, bg="bg1", cam="drift-l", layers=[
        dict(k="text", t=.1, s=3.2, anim="slam", pos="center", strike=2.0,
             lines=[[T("Ilzaam tumhari")], [T("mehnat ka hai?")]]),
        dict(k="flash", t=3.0, s=.4),
        dict(k="text", t=3.3, s=3.6, anim="slam", pos="center",
             lines=[[T("Nahi.")], [T("Tareeqe", color="gold"), T(" ka hai.")]]),
        dict(k="text", t=5.3, s=1.7, anim="rise", pos="bot",
             lines=[[T("Tum ", size="body"), T("motivation", size="body", color="clay"), T(" dhoondte ho.")],
                    [T("System", size="body", color="gold"), T(" nahi banate.", size="body")]]),
    ], subs=[(.3,2.3,"Ilzaam tumhari mehnat ka nahi."), (2.5,4.5,"Ilzaam tumhare tareeqe ka hai."), (4.7,6.8,"Tum motivation dhoondte ho — system nahi banate.")]),
    dict(at=14, to=21, bg="bg2", cam="drift-r", layers=[
        dict(k="black", t=0, s=.5),
        dict(k="ring", t=.4, s=6.2),
        dict(k="text", t=.7, s=1.6, anim="slam", pos="center", lines=[[T("Ek SAUDA", color="gold")]]),
        dict(k="text", t=2.3, s=2.6, anim="rise", pos="center",
             lines=[[T("Mujhe apne")], [T("6 mahine", color="gold"), T(" do.")]]),
        dict(k="counter", t=4.6, s=2.4, anim="count", to=180, numsize="mid", numcolor="gold",
             pre=[[T("180 din · sirf 180 din", size="mono", color="paper", a=.6, f="b")]],
             post=[[T("badle mein wo insaan — jise tum aaine mein dekhna chahte ho.", size="body", color="paper", a=.75, f="b")]]),
    ], subs=[(.3,1.7,"Ek sauda karte hain."), (1.9,3.5,"Mujhe apne 6 mahine do."), (3.7,6.7,"Main tumhe wo insaan bana ke doonga jise tum aaine mein dekhna chahte ho.")]),
    dict(at=21, to=28, bg="bg2", cam="slow-push", layers=[
        dict(k="text", t=.1, s=2.2, anim="slam", pos="top",
             lines=[[T("SHART SIRF EK HAI", size="k", color="clay", w=700, f="b")], [T("")],
                    [T("6 mahine ", size="big"), T("kisi ko", color="gold", size="big")],
                    [T("nahi batana.", color="gold", size="big")]]),
        dict(k="text", t=2.4, s=.9, anim="slam", pos="bot", strike=.5, lines=[[T("Na story", size="mid")]]),
        dict(k="text", t=3.2, s=.9, anim="slam", pos="bot2", strike=.5, lines=[[T("Na wada", size="mid")]]),
        dict(k="text", t=4.0, s=1.0, anim="slam", pos="bot3", strike=.5, lines=[[T("Na tareef", size="mid")]]),
        dict(k="flash", t=5.0, s=.4),
        dict(k="text", t=5.2, s=1.8, anim="slam", pos="center", lines=[[T("KHAMOSHI", color="gold")], [T("se kaam.", color="gold")]]),
    ], subs=[(.3,1.5,"Shart sirf ek hai."), (1.7,3.1,"6 mahine kisi ko nahi batana."), (3.3,4.7,"Na story. Na wada. Na tareef."), (4.9,6.8,"Khamoshi se kaam karo — nateeja shor macha dega.")]),
    dict(at=28, to=35, bg="bg3", cam="push", layers=[
        dict(k="text", t=.1, s=1.4, anim="slam", pos="top",
             lines=[[T("01  ", size="mid", color="gold", f="b"), T("Ek skill", size="mid")],
                    [T("02  ", size="mid", color="gold", f="b"), T("Roz 2 ghante", size="mid")]]),
        dict(k="text", t=1.5, s=1.6, anim="slam", pos="top2",
             lines=[[T("03  ", size="mid", color="gold", f="b"), T("Ek waqt", size="mid")],
                    [T("04  ", size="mid", color="gold", f="b"), T("Ek jagah", size="mid")]]),
        dict(k="counter", t=2.6, s=2.4, anim="count", to=360,
             pre=[[T("2 ", size="big"), T("×", size="big", color="gold"), T(" 180 ", size="big"), T("=", size="big", color="gold")]],
             post=[[T("ghante · sirf ek skill ke", size="mono", color="gold", f="b")]]),
        dict(k="text", t=5.0, s=2.0, anim="rise", pos="bot",
             lines=[[T("Itne ghante ek ", size="mid"), T("degree", size="mid", color="gold")], [T("mein bhi nahi milte.", size="mid")]]),
    ], subs=[(.3,1.7,"Ab hisaab suno. Ek skill chuno."), (1.9,3.1,"Roz do ghante."), (3.3,5.1,"6 mahine mein 360 ghante."), (5.3,6.8,"Itne ghante ek degree mein bhi nahi milte.")]),
    dict(at=35, to=42, bg="bg3", cam="drift-l", layers=[
        dict(k="text", t=.1, s=1.2, anim="rise", pos="top", lines=[[T("POORA NAQSHA · 7 SUTOON", size="k", color="gold", w=700, f="b")]]),
        dict(k="grid7", t=.4, s=4.4),
        dict(k="flash", t=4.4, s=.4),
        dict(k="text", t=4.6, s=2.4, anim="slam", pos="center",
             lines=[[T("7 sutoon.")], [T("Ek chhat:", color="gold"), T(" tum.")]]),
    ], subs=[(.3,2.3,"Saat cheezein badalni hain."), (2.5,4.7,"Pehchan. Dopamine. Gehra kaam. Jism. Dimagh. Paisa. Mahaul."), (4.9,6.8,"Saat sutoon — ek chhat.")]),
    dict(at=42, to=51, bg="bg3", cam="still", layers=[
        dict(k="dark", t=0, s=9.0),
        dict(k="text", t=.5, s=3.0, anim="type", pos="top",
             lines=[[T("« Tum badal kaise gaye? »", size="mid", a=.92)]]),
        dict(k="flash", t=4.0, s=.5),
        dict(k="text", t=4.2, s=4.6, anim="wipe", pos="center", lines=[[T("Khamoshi se.", color="gold")]]),
        dict(k="text", t=6.0, s=3.0, anim="rise", pos="bot",
             lines=[[T("kyunke ab tumhara kaam tumhara jawab hai", size="mono", color="paper", a=.6, f="b")]]),
    ], subs=[(.5,3.4,"Aur phir ek din koi poochega — tum badal kaise gaye?"), (3.8,5.8,"Tum muskuraoge. Jawab nahi doge."), (6.0,8.7,"Kyunke tumhara kaam tumhara jawab ban chuka hoga.")]),
    dict(at=51, to=60, bg="bg4", cam="rise", layers=[
        dict(k="text", t=.1, s=2.2, anim="slam", pos="center",
             lines=[[T("Yeh video yahan", a=.6)], [T("khatam hoti hai.", a=.6)]]),
        dict(k="flash", t=2.3, s=.4),
        dict(k="text", t=2.5, s=3.0, anim="slam", pos="center",
             lines=[[T("Lekin tumhare 6 mahine")], [T("ab shuru hote hain.", color="gold")]]),
        dict(k="cta", t=4.4, s=2.4, text="Phone rakho · Ek safha likho · Kal uth jana"),
        dict(k="text", t=6.4, s=2.6, anim="rise", pos="top",
             lines=[[T("6 MAHINE KI KHAMOSH TABDEELI", size="k", color="gold", w=700, f="b")]]),
    ], subs=[(.3,2.1,"Yeh video yahin khatam hoti hai."), (2.3,4.3,"Lekin tumhare 6 mahine ab shuru hote hain."), (4.5,6.5,"Phone rakho. Ek safha likho."), (6.7,8.9,"Aur kal subah — uth jana.")]),
]

POS_Y = {"top": 200, "top2": 430, "center": None, "bot": 880, "bot2": 950, "bot3": 1020}
GRID_ITEMS = ["Pehchan", "Dopamine", "Gehra Kaam", "Jism", "Dimagh", "Paisa", "Mahaul"]

def camera(scene, local, p, shake):
    cam = scene["cam"]
    if cam == "push": z = 1.03 + p * 0.10; u, v = 0.5, 0.5
    elif cam == "slow-push": z = 1.04 + p * 0.06; u, v = 0.5, 0.5
    elif cam == "drift-l": z = 1.08; u = 0.32 + p * 0.36; v = 0.5
    elif cam == "drift-r": z = 1.08; u = 0.68 - p * 0.36; v = 0.5
    elif cam == "rise": z = 1.10; u = 0.5; v = 0.62 - p * 0.24
    else: z = 1.05; u, v = 0.5, 0.5
    u += math.sin(local * 1.6) * 0.006
    v += math.cos(local * 1.25) * 0.005
    return z, u, v, shake

def render_frame(frame):
    t = frame / FPS
    si = 0
    for i, s in enumerate(SCENES):
        if t >= s["at"]: si = i
    sc = SCENES[si]
    local = t - sc["at"]
    p = local / (sc["to"] - sc["at"])

    # shake from impacts
    shake = 0.0
    for l in sc["layers"]:
        lp = (local - l["t"]) / l["s"]
        if l["k"] in ("text", "flash") and l.get("anim") in ("slam", None) and 0 < lp < 0.22 and (l.get("anim") == "slam" or l["k"] == "flash"):
            shake += 1 - lp / 0.22
    z, u, v, shake = camera(sc, local, p, shake)
    rnd = random.Random(frame * 131 + 7)
    shx = rnd.uniform(-1, 1) * 7 * shake
    shy = rnd.uniform(-1, 1) * 6 * shake

    cw, ch = BW / z, BH / z
    x0 = (BW - cw) * u + shx
    y0 = (BH - ch) * v + shy
    x0 = max(0, min(BW - cw, x0)); y0 = max(0, min(BH - ch, y0))
    img = BGS[sc["bg"]].crop((int(x0), int(y0), int(x0 + cw), int(y0 + ch))).resize((W, H), Image.LANCZOS).convert("RGBA")
    img.alpha_composite(GRAD)
    img.alpha_composite(VIG)

    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)

    # particles
    for i in range(26):
        r = random.Random(i * 977)
        spd = 40 + r.random() * 70
        px = (r.random() * W + math.sin(t * 0.7 + i) * 22) % W
        py = H + 30 - ((t * spd + r.random() * H) % (H + 60))
        a = int(60 * (0.3 + 0.7 * abs(math.sin(i + t * 0.9))))
        sz = 1 + int(r.random() * 2)
        d.ellipse([px, py, px + sz, py + sz], fill=GOLD + (a,))

    # heartbeat shockwave
    beat = t % 0.5
    bp = beat / 0.5
    rr = 20 + bp * 300
    a = int((1 - bp) * 26)
    if a > 1:
        d.ellipse([W/2 - rr, H/2 - rr, W/2 + rr, H/2 + rr], outline=GOLD + (a,), width=2)

    for l in sc["layers"]:
        lp = (local - l["t"]) / l["s"]
        if lp < 0 or lp > 1: continue
        k = l["k"]
        if k == "black":
            d.rectangle([0, 0, W, H], fill=INK + (255,))
        elif k == "dark":
            tmp = DARK.copy()
            tmp.putalpha(DARK.getchannel("A").point(lambda vv, lp=lp: int(vv * min(1, lp * 4) * 0.9)))
            ov.alpha_composite(tmp)
        elif k == "flash":
            f = lp / 0.2 if lp < 0.2 else max(0.0, 1 - (lp - 0.2) / 0.8)
            d.rectangle([0, 0, W, H], fill=PAPER + (int(f * 130),))
        elif k == "ring":
            sc2 = 0.55 + lp * 0.85
            for mul, al in ((1.0, 1 - lp), (0.78, (1 - lp) * 0.7)):
                rr2 = 190 * sc2 * mul
                d.ellipse([W/2 - rr2, H/2 - rr2, W/2 + rr2, H/2 + rr2],
                          outline=GOLD + (int(al * 120),), width=2)
        elif k == "grid7":
            bw, bh, gap = 200, 96, 12
            gx = (W - (3 * bw + 2 * gap)) / 2
            gy = H / 2 - (3 * bh + 2 * gap) / 2 - 40
            for idx, name in enumerate(GRID_ITEMS + ["Tracking", "Wapsi"]):
                if idx >= 9: break
                at = idx * 0.42
                on = lp * l["s"] >= at
                cx_ = gx + (idx % 3) * (bw + gap)
                cy_ = gy + (idx // 3) * (bh + gap)
                al = 230 if on else 60
                bord = GOLD + (200,) if on else PAPER + (40,)
                fillc = GOLD + (26,) if on else PAPER + (8,)
                d.rounded_rectangle([cx_, cy_, cx_ + bw, cy_ + bh], 12, outline=bord, fill=fillc, width=2)
                f = font("b", 25, 600)
                tw = d.textlength(name, font=f)
                d.text((cx_ + (bw - tw) / 2, cy_ + bh / 2 - 15), name, font=f,
                       fill=(GOLD if on else PAPER) + (al,))
        elif k == "cta":
            f = font("b", 27, 700)
            tw = d.textlength(l["text"], font=f)
            bw2, bh2 = tw + 70, 74
            x0c, y0c = W / 2 - bw2 / 2, 1000
            pul = 1 + math.sin(lp * 12) * 0.02
            d.rounded_rectangle([x0c, y0c, x0c + bw2, y0c + bh2], 40,
                                outline=GOLD + (220,), fill=GOLD + (22,), width=2)
            d.text((W / 2 - tw / 2, y0c + bh2 / 2 - 18), l["text"], font=f, fill=GOLD + (255,))
        elif k == "counter":
            alpha = min(1, lp * 5)
            lines_pre = l.get("pre", [])
            lines_post = l.get("post", [])
            numsize = l.get("numsize", "cnt")
            numcol = l.get("numcolor", "gold")
            val = l["to"] * ease(min(1, lp * 1.3))
            numtxt = f"{val:.0f}" if l["to"] == int(l["to"]) else f"{val:.1f}"
            blocks = []
            for ln in lines_pre: blocks += wrap_segs(ln)
            blocks.append([T(numtxt, size=numsize, color=numcol, w=700)])
            for ln in lines_post: blocks += wrap_segs(ln)
            tot = sum(int(max(seg_font(s).size for s in line) * 1.18) for line in blocks) + 4 * len(blocks)
            y = H / 2 - tot / 2
            draw_lines(d, blocks, W / 2, y, alpha=alpha)
        elif k == "text":
            anim = l.get("anim", "rise")
            if anim == "rise":
                e = ease(lp); alpha = min(1, lp * 4); scale = 1.0; dy = (1 - e) * 26; clip = None
            elif anim == "slam":
                e = ease(lp)
                scale = 1.24 - e * 0.24 if lp < 0.22 else 1.0
                alpha = min(1, lp * 7); dy = (1 - e) * 12; clip = None
            elif anim == "type":
                alpha = 1.0; scale = 1.0; dy = 0; clip = min(1, lp * 1.5)
            elif anim == "wipe":
                w2 = ease(min(1, lp * 1.7)); alpha = 1.0; scale = 1.0; dy = (1 - w2) * 16; clip = w2
            else:
                alpha = min(1, lp * 5); scale = 1.0; dy = 0; clip = None
            if lp > 0.84:
                alpha *= 1 - (lp - 0.84) / 0.16
            lines = [s for s in l["lines"] if s and s[0][0] != ""]
            if not lines: continue
            fmax = max(seg_font(s).size for segs in lines for s in segs)
            tot = sum(int(max(seg_font(s).size for s in segs) * 1.22) for segs in lines)
            pos = l.get("pos", "center")
            if pos == "center": y = H / 2 - tot / 2
            else: y = POS_Y.get(pos, 300)
            y += dy
            boxes = draw_lines(d, lines, W / 2, y, alpha=alpha, scale=scale, clip=clip)
            if l.get("strike") and lp * l["s"] >= l["strike"]:
                for (bx0, by0, bx1, by1) in boxes:
                    d.line([(bx0 - 6, (by0 + by1) / 2), (bx1 + 6, (by0 + by1) / 2)],
                           fill=CLAY + (int(235 * alpha),), width=4)

    img.alpha_composite(ov)
    d = ImageDraw.Draw(img)

    # captions — sirf active sentence
    act = [c for c in sc.get("subs", []) if c[0] <= local <= c[1] + 0.35]
    words = []
    for (ct, cs, txt) in act:
        ws = txt.split(" ")
        per = (cs - ct) / len(ws)
        for i, w_ in enumerate(ws):
            words.append((ct + i * per, w_))
    if words:
        f = font("b", 33, 600)
        lines, cur = [], []
        for at, w_ in words:
            t2 = " ".join(x[1] for x in cur + [(at, w_)])
            if d.textlength(t2, font=f) > 600 and cur:
                lines.append(cur); cur = [(at, w_)]
            else:
                cur.append((at, w_))
        if cur: lines.append(cur)
        if act:
            y = 1078
            for line in lines:
                ltxt = " ".join(w_ for _, w_ in line)
                lw = d.textlength(ltxt, font=f)
                xx = W / 2 - lw / 2
                for wat, w_ in line:
                    on = local >= wat
                    a = 255 if on else 60
                    d.text((xx, y), w_, font=f, fill=PAPER + (a,))
                    xx += d.textlength(w_ + " ", font=f)
                y += 44
            d.rectangle([W * 0.12, y + 8, W * 0.12 + (W * 0.76) * p, y + 11], fill=GOLD + (160,))

    # HUD
    fh = font("b", 20, 700)
    d.ellipse([26, 30, 36, 40], fill=CLAY + (255 if int(t * 2) % 2 else 60,))
    d.text((44, 24), "REC", font=fh, fill=CLAY + (200,))
    ff = int(t * FPS)
    tc = f"00:{int(t) % 60:02d}:{ff % FPS:02d}"
    tw = d.textlength(tc, font=fh)
    d.text((W - tw - 26, 24), tc, font=fh, fill=GOLD + (210,))

    img.alpha_composite(GRAINS[frame % 3])
    return img.convert("RGB")

def main():
    out = FRAMES_DIR
    writer = imageio_ffmpeg.write_frames(
        out, (W, H), fps=FPS, codec="libx264",
        output_params=["-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p"])
    writer.send(None)
    total = int(DUR * FPS)
    for fr in range(total):
        img = render_frame(fr)
        writer.send(img.tobytes())
        if fr % 150 == 0:
            print(f"frame {fr}/{total}", flush=True)
    writer.close()
    print("video-only done:", out)

if __name__ == "__main__":
    main()
