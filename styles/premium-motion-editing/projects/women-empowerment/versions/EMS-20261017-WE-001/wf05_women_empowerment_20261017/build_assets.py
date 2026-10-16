#!/usr/bin/env python3
"""Build independent-layer portrait clips and an original 40s audio mix for WF-05."""
from __future__ import annotations
import hashlib
import json
import math
import subprocess
import time
import wave
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from scipy.ndimage import uniform_filter1d

ROOT = Path(__file__).resolve().parent
MEDIA = ROOT / "media"
W, H, FPS = 720, 1280, 30
SR = 48_000
TOTAL_SECONDS = 40.0
TOTAL_SAMPLES = round(SR * TOTAL_SECONDS)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SCENES = [
    ("scene01-door.mp4", "hero-reference.png", 6.5, "door"),
    ("scene02-education.mp4", "education-scene.png", 6.5, "education"),
    ("scene03-voice.mp4", "voice-work-scene.png", 7.5, "voice"),
    ("scene04-opportunity.mp4", "community-scene.png", 7.0, "opportunity"),
    ("scene05-community.mp4", "community-scene.png", 7.0, "community"),
    ("scene06-final.mp4", "community-scene.png", 5.5, "final"),
]


def smooth(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return x * x * (3.0 - 2.0 * x)


def load_plate(name: str) -> np.ndarray:
    im = Image.open(MEDIA / name).convert("RGB")
    target_ratio = W / H
    ratio = im.width / im.height
    if ratio > target_ratio:
        cw = round(im.height * target_ratio)
        left = (im.width - cw) // 2
        im = im.crop((left, 0, left + cw, im.height))
    else:
        ch = round(im.width / target_ratio)
        top = (im.height - ch) // 2
        im = im.crop((0, top, im.width, top + ch))
    im = im.resize((W, H), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.035)
    im = ImageEnhance.Color(im).enhance(0.92)
    return np.asarray(im, dtype=np.uint8)


def camera_plate(plate: np.ndarray, p: float, seed: int) -> np.ndarray:
    # Restrained camera drift supports the independent scene action; it is not
    # the only motion in any shot.
    zoom = 1.004 + 0.014 * smooth(p)
    drift = math.sin(math.pi * p)
    direction = 1 if seed % 2 == 0 else -1
    mat = cv2.getRotationMatrix2D((W / 2, H / 2), direction * 0.12 * math.sin(2 * math.pi * p), zoom)
    mat[0, 2] += direction * 4.5 * drift
    mat[1, 2] += -3.0 * drift
    return cv2.warpAffine(plate, mat, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT_101)


def composite(base: np.ndarray, layer: Image.Image) -> np.ndarray:
    bg = Image.fromarray(base, "RGB").convert("RGBA")
    return np.asarray(Image.alpha_composite(bg, layer).convert("RGB"), dtype=np.uint8)


def glow_layer(box: tuple[int, int, int, int], color: tuple[int, int, int], alpha: int, blur: int) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(box, fill=(*color, alpha))
    return layer.filter(ImageFilter.GaussianBlur(blur))


def door_texture() -> Image.Image:
    dw, dh = 350, 900
    y = np.linspace(0, 1, dh, dtype=np.float32)[:, None, None]
    top = np.array([79, 59, 124], dtype=np.float32)[None, None, :]
    bottom = np.array([42, 31, 76], dtype=np.float32)[None, None, :]
    rgb = top * (1 - y) + bottom * y
    rgb = np.repeat(rgb, dw, axis=1)
    tex = Image.fromarray(np.uint8(np.clip(rgb, 0, 255)), "RGB").convert("RGBA")
    d = ImageDraw.Draw(tex)
    d.rounded_rectangle((18, 18, dw - 18, dh - 18), radius=12, outline=(211, 187, 237, 220), width=5)
    d.rounded_rectangle((42, 44, dw - 42, dh - 44), radius=9, outline=(141, 116, 188, 210), width=3)
    d.rounded_rectangle((68, 88, dw - 68, 398), radius=72, outline=(186, 160, 220, 165), width=4)
    d.rounded_rectangle((68, 440, dw - 68, dh - 88), radius=38, outline=(186, 160, 220, 150), width=4)
    # quiet architectural grooves and a small warm-metal latch
    d.line((dw - 100, 110, dw - 100, dh - 110), fill=(224, 201, 245, 80), width=2)
    d.ellipse((dw - 118, 492, dw - 60, 550), fill=(221, 180, 104, 255), outline=(255, 232, 173, 255), width=4)
    d.ellipse((dw - 101, 509, dw - 77, 533), fill=(82, 59, 99, 255))
    d.rounded_rectangle((dw - 98, 532, dw - 80, 585), radius=7, fill=(221, 180, 104, 255))
    return tex


DOOR = door_texture()
DOOR_SRC = np.float32([[0, 0], [DOOR.width - 1, 0], [DOOR.width - 1, DOOR.height - 1], [0, DOOR.height - 1]])


def warp_door(base: np.ndarray, p: float) -> np.ndarray:
    swing = smooth(min(1.0, max(0.0, (p - 0.06) / 0.82)))
    theta = math.radians(78 * swing)
    hinge = 300.0
    width = 350.0 * math.cos(theta)
    skew = 72.0 * math.sin(theta)
    top, bottom = 228.0, 1148.0
    left = hinge - max(54.0, width)
    dst = np.float32([
        [left, top + 9 + skew * 0.16],
        [hinge, top],
        [hinge - 2, bottom],
        [left + 8, bottom - skew * 0.12],
    ])
    mat = cv2.getPerspectiveTransform(DOOR_SRC, dst)
    warped = cv2.warpPerspective(np.asarray(DOOR), mat, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    return composite(base, Image.fromarray(warped, "RGBA"))


def particles(draw: ImageDraw.ImageDraw, p: float, seed: int, count: int = 18) -> None:
    for i in range(count):
        phase = (p * 0.75 + i * 0.137 + seed * 0.019) % 1.0
        x = 70 + ((i * 137 + seed * 23) % 580) + 12 * math.sin(phase * math.tau + i)
        y = H - 90 - phase * 920 + 18 * math.sin(phase * 7 + i * 1.7)
        r = 2 + (i % 3)
        a = int(35 + 80 * (0.5 + 0.5 * math.sin(phase * math.tau)))
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(230, 205, 153, a))


def scene_door(plate: np.ndarray, p: float) -> np.ndarray:
    # A warm reveal blooms behind the moving door, then the door swings away.
    glow = glow_layer((225, 350, 700, 1120), (236, 190, 119), int(22 + 86 * smooth(p)), 66)
    base = composite(plate, glow)
    ray = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ray)
    a = int(18 + 42 * smooth(p))
    for k in range(5):
        y = 520 + k * 96
        d.line((347, y, 720, y - 115 + k * 32), fill=(255, 219, 154, a), width=2)
    base = composite(base, ray)
    base = warp_door(base, p)
    top = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    particles(ImageDraw.Draw(top), p, 1, 12)
    # small travelling glint marks the opening edge
    x = 348 + 28 * smooth(p)
    ImageDraw.Draw(top).ellipse((x - 7, 715 - 6 * math.sin(p * math.pi), x + 7, 715 + 6 * math.sin(p * math.pi)), fill=(255, 229, 176, 220))
    return composite(base, top)


def scene_education(plate: np.ndarray, p: float) -> np.ndarray:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # A hairline path ties the open book to the rising steps.
    path = [(432, 1005), (360, 912), (310, 800), (265, 680), (220, 575)]
    d.line(path, fill=(151, 113, 194, 105), width=3)
    # The moving warm node travels up the path independently of the camera.
    seg = min(3, int(p * 5))
    q = p * 5 - seg
    if seg < len(path) - 1:
        x = path[seg][0] * (1 - q) + path[seg + 1][0] * q
        y = path[seg][1] * (1 - q) + path[seg + 1][1] * q
        r = 8 + 3 * math.sin(p * math.tau)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 214, 137, 230))
    # Three pages flutter up and left from the book; each is its own layer.
    for j in range(3):
        u = p * 1.28 - j * 0.24
        if 0.0 <= u <= 1.0:
            x = 430 - 208 * u
            y = 990 - 365 * u + 19 * math.sin(u * 5 + j)
            w = 73 * (1 - 0.32 * u)
            h = 41 * (1 - 0.28 * u)
            flutter = 12 * math.sin(u * 8 + j)
            poly = [(x - w / 2, y), (x + w / 2, y - flutter), (x + w / 2 - 8, y + h), (x - w / 2 + 8, y + h + flutter * .3)]
            d.polygon([(a + 5, b + 9) for a, b in poly], fill=(55, 42, 84, 45))
            d.polygon(poly, fill=(252, 250, 255, int(215 * (1 - .35 * u))), outline=(189, 166, 220, 225))
            d.line((x - w / 3, y + 8, x + w / 3, y + 8), fill=(145, 115, 185, 95), width=2)
    # A sequence of subtle step-edge glows suggests progress, not a static slide.
    for j, (x, y) in enumerate([(215, 874), (245, 810), (272, 746), (295, 685), (320, 630)]):
        a = int(25 + 120 * smooth((p * 1.45 - j * .12)))
        d.line((x - 28, y, x + 85, y), fill=(244, 198, 120, a), width=4)
    return composite(plate, layer)


def scene_voice(plate: np.ndarray, p: float) -> np.ndarray:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = 315, 760
    for j in range(4):
        radius = 68 + ((p * 300 + j * 77) % 222)
        fade = max(0.0, 1.0 - (radius - 68) / 222)
        alpha = int(112 * fade)
        col = (120, 91, 180, alpha) if j % 2 else (227, 179, 101, int(alpha * .78))
        d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=col, width=5 if j == 0 else 3)
    # Responsive-looking waveform and traveling dot, separate from the portrait.
    pts = []
    for i in range(66):
        x = 380 + i * 4.4
        phase = i * .38 - p * 11
        envelope = .18 + .82 * math.exp(-((i - (30 + 18 * math.sin(p * math.tau))) / 18) ** 2)
        y = 860 + math.sin(phase) * 34 * envelope
        pts.append((x, y))
    d.line(pts, fill=(91, 67, 139, 170), width=3)
    dotx = 380 + ((p * 66) % 66) * 4.4
    doty = 860 + 30 * math.sin(p * 28)
    d.ellipse((dotx - 8, doty - 8, dotx + 8, doty + 8), fill=(255, 214, 137, 245))
    return composite(plate, layer)


def bezier(p0, p1, p2, p3, t):
    u = 1 - t
    return (
        u**3 * p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0],
        u**3 * p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1],
    )


BRIDGE = ((166, 1032), (250, 914), (410, 1004), (595, 914))


def bridge_line(draw: ImageDraw.ImageDraw, p: float, alpha: int = 170) -> tuple[float, float]:
    points = [bezier(*BRIDGE, i / 70) for i in range(71)]
    n = max(2, int(5 + 66 * smooth(p)))
    draw.line(points[:n], fill=(246, 201, 126, alpha), width=4)
    x, y = points[min(n - 1, 70)]
    draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(255, 227, 163, 235))
    return x, y


def draw_cube(d: ImageDraw.ImageDraw, x: float, y: float, size: int, alpha: int) -> None:
    top = [(x, y), (x + size * .48, y - size * .25), (x + size, y), (x + size * .5, y + size * .25)]
    left = [(x, y), (x + size * .5, y + size * .25), (x + size * .5, y + size * .92), (x, y + size * .65)]
    right = [(x + size * .5, y + size * .25), (x + size, y), (x + size, y + size * .65), (x + size * .5, y + size * .92)]
    d.polygon([(a + 5, b + 8) for a, b in left], fill=(40, 30, 72, int(alpha * .23)))
    d.polygon(left, fill=(90, 67, 136, alpha), outline=(209, 187, 232, alpha))
    d.polygon(right, fill=(64, 47, 104, alpha), outline=(193, 168, 224, alpha))
    d.polygon(top, fill=(178, 154, 211, alpha), outline=(238, 220, 249, alpha))


def scene_opportunity(plate: np.ndarray, p: float) -> np.ndarray:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # Four small blocks rise and lock into a shared bridge, one after another.
    blocks = [(218, 1010), (296, 986), (374, 965), (452, 940)]
    for j, (x, y) in enumerate(blocks):
        u = smooth((p - j * .13) / .38)
        if u > .01:
            draw_cube(d, x, y + (1 - u) * 128, 58, int(248 * min(1, u * 1.8)))
    # The two rails illuminate in parallel and at the same height.
    rail_a = int(30 + 145 * smooth(p * 1.45))
    rail_b = int(30 + 145 * smooth(p * 1.45))
    d.line((180, 912, 318, 882), fill=(230, 185, 109, rail_a), width=5)
    d.line((365, 890, 506, 861), fill=(230, 185, 109, rail_b), width=5)
    bridge_line(d, p, 150)
    particles(d, p, 4, 10)
    return composite(plate, layer)


def city_lights(draw: ImageDraw.ImageDraw, p: float, phase: float = 0.0) -> None:
    windows = [(520, 890), (545, 868), (568, 900), (593, 850), (615, 917), (540, 932), (578, 945), (628, 890), (600, 965)]
    for i, (x, y) in enumerate(windows):
        onset = i / len(windows) * .74 + phase
        on = smooth((p - onset) / .22)
        pulse = .72 + .28 * math.sin(p * 8 + i)
        a = int(185 * on * pulse)
        if a:
            draw.rounded_rectangle((x - 5, y - 7, x + 5, y + 7), radius=2, fill=(255, 217, 142, a))
            draw.ellipse((x - 11, y - 13, x + 11, y + 13), fill=(255, 209, 126, int(a * .22)))


def scene_community(plate: np.ndarray, p: float) -> np.ndarray:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y = bridge_line(d, p, 225)
    city_lights(d, p, .06)
    # A brighter traveling pulse makes the bridge-to-city connection readable.
    q = smooth(p * 1.08)
    hx, hy = bezier(*BRIDGE, q)
    r = 17 + 4 * math.sin(p * math.tau)
    d.ellipse((hx-r, hy-r, hx+r, hy+r), fill=(255, 220, 148, 90))
    d.ellipse((hx-7, hy-7, hx+7, hy+7), fill=(255, 242, 205, 255))
    for j in range(5):
        trail_q = max(0.0, q - j * .045)
        tx, ty = bezier(*BRIDGE, trail_q)
        rr = max(2, 7 - j)
        d.ellipse((tx-rr, ty-rr, tx+rr, ty+rr), fill=(255, 227, 163, max(40, 180-j*25)))
    return composite(plate, layer)


def scene_final(plate: np.ndarray, p: float) -> np.ndarray:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    bridge_line(d, 1.0, int(150 + 70 * smooth(p)))
    city_lights(d, .82 + .18 * math.sin(p * math.pi / 2), .0)
    # A quiet opening arc and rising points frame the question without creating an end card.
    arc_alpha = int(90 + 45 * math.sin(p * math.pi))
    d.arc((174, 398, 548, 1090), 190, int(190 + 150 * smooth(p)), fill=(224, 184, 120, arc_alpha), width=4)
    particles(d, p, 6, 28)
    beam = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(beam)
    bx = 578 + 22 * math.sin(p * math.pi)
    by = 824 - 28 * math.sin(p * math.pi)
    bd.ellipse((bx - 75, by - 70, bx + 75, by + 150), fill=(255, 213, 143, 56))
    beam = beam.filter(ImageFilter.GaussianBlur(46))
    base = composite(plate, beam)
    return composite(base, layer)


def encode_scene(out: Path, frames: list[np.ndarray]) -> None:
    cmd = [
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "pipe:0",
        "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-profile:v", "high",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    try:
        assert proc.stdin is not None
        for frame in frames:
            proc.stdin.write(np.ascontiguousarray(frame, dtype=np.uint8).tobytes())
        proc.stdin.close()
        error = proc.stderr.read().decode("utf-8", "replace") if proc.stderr else ""
        rc = proc.wait()
        if rc:
            raise RuntimeError(f"ffmpeg scene encode failed ({rc}): {error}")
    finally:
        if proc.poll() is None:
            proc.kill()
            proc.wait()


def render_scene(idx: int, filename: str, image_name: str, seconds: float, kind: str) -> dict:
    plate = load_plate(image_name)
    count = round(seconds * FPS)
    frames: list[np.ndarray] = []
    started = time.monotonic()
    for i in range(count):
        p = i / max(1, count - 1)
        base = camera_plate(plate, p, idx)
        if kind == "door": frame = scene_door(base, p)
        elif kind == "education": frame = scene_education(base, p)
        elif kind == "voice": frame = scene_voice(base, p)
        elif kind == "opportunity": frame = scene_opportunity(base, p)
        elif kind == "community": frame = scene_community(base, p)
        elif kind == "final": frame = scene_final(base, p)
        else: raise ValueError(kind)
        frames.append(frame)
    out = MEDIA / filename
    encode_scene(out, frames)
    del frames
    return {
        "path": filename,
        "source_image": image_name,
        "duration": seconds,
        "frames": count,
        "size_bytes": out.stat().st_size,
        "sha256": hashlib.sha256(out.read_bytes()).hexdigest(),
        "independent_layers": kind,
        "render_seconds": round(time.monotonic() - started, 2),
    }


def write_wav(path: Path, samples: np.ndarray) -> None:
    x = np.clip(samples, -0.999, 0.999)
    pcm = np.int16(np.round(x * 32767))
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.astype("<i2").tobytes())


def make_audio_mix() -> dict:
    voice_path = MEDIA / "voiceover.mp3"
    raw = subprocess.run(
        [FFMPEG, "-hide_banner", "-loglevel", "error", "-i", str(voice_path), "-f", "f32le", "-acodec", "pcm_f32le", "-ar", str(SR), "-ac", "2", "pipe:1"],
        check=True, capture_output=True,
    ).stdout
    voice = np.frombuffer(raw, dtype="<f4").reshape(-1, 2).copy()
    voice_seconds = len(voice) / SR
    start_s = 0.20
    start = round(start_s * SR)
    if start + len(voice) > TOTAL_SAMPLES:
        raise RuntimeError(f"Narration ({voice_seconds:.2f}s) does not fit the 40s timeline.")
    voice_rms_before = float(np.sqrt(np.mean(voice * voice)))
    target_rms = 10 ** (-17.5 / 20)
    gain = target_rms / max(voice_rms_before, 1e-8)
    voice *= min(gain, 4.0)
    peak = float(np.max(np.abs(voice)))
    if peak > 0.92:
        voice *= 0.92 / peak
    # Short, natural edge fades only; no time-stretch or artificial speed-up.
    fade_in = min(round(.06 * SR), len(voice))
    fade_out = min(round(.18 * SR), len(voice))
    voice[:fade_in] *= np.linspace(0, 1, fade_in, dtype=np.float32)[:, None]
    voice[-fade_out:] *= np.linspace(1, 0, fade_out, dtype=np.float32)[:, None]
    voice_mix = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    voice_mix[start:start + len(voice)] = voice

    t = np.arange(TOTAL_SAMPLES, dtype=np.float32) / SR
    bed = np.zeros(TOTAL_SAMPLES, dtype=np.float32)
    chords = [
        (196.00, 246.94, 293.66, 369.99),
        (174.61, 220.00, 261.63, 349.23),
        (146.83, 196.00, 246.94, 293.66),
        (164.81, 207.65, 246.94, 329.63),
    ]
    for ci, chord in enumerate(chords):
        a, b = ci * 10.0, (ci + 1) * 10.0
        mask = (t >= a) & (t < b)
        local = t[mask] - a
        env = np.minimum(1.0, local / 1.1) * np.minimum(1.0, (b - a - local) / 1.35)
        for j, hz in enumerate(chord):
            wobble = 0.0018 * np.sin(2 * np.pi * .11 * t[mask] + j)
            bed[mask] += (0.0145 / (1 + j * .10)) * np.sin(2 * np.pi * hz * t[mask] + wobble) * env
    # Sparse soft plucks give the bed forward motion without competing with speech.
    scale = [392.0, 493.88, 587.33, 440.0, 523.25, 659.25]
    for i, onset in enumerate(np.arange(.65, 38.5, 1.7)):
        ix = int(onset * SR)
        n = min(round(1.25 * SR), TOTAL_SAMPLES - ix)
        local = np.arange(n, dtype=np.float32) / SR
        hz = scale[i % len(scale)]
        pluck = np.exp(-3.4 * local) * (np.sin(2*np.pi*hz*local) + .22*np.sin(2*np.pi*hz*2.01*local))
        bed[ix:ix+n] += .024 * pluck
    # Gentle, original synthetic whooshes/chimes at the edit points.
    rng = np.random.default_rng(20261017)
    sfx = np.zeros(TOTAL_SAMPLES, dtype=np.float32)
    for j, onset in enumerate([0.12, 6.5, 13.0, 20.5, 27.5, 34.5]):
        ix = round(onset * SR)
        n = min(round(.52 * SR), TOTAL_SAMPLES - ix)
        local = np.arange(n, dtype=np.float32) / SR
        env = np.sin(np.pi * np.clip(local / .52, 0, 1)) ** 1.6
        freq = 740 - 430 * (local / .52)
        phase = 2 * np.pi * np.cumsum(freq) / SR
        chirp = .030 * np.sin(phase) * env
        noise = rng.normal(0, 1, n).astype(np.float32) * .0065 * env
        sfx[ix:ix+n] += chirp + noise
    # Slightly lift the clean bed on the final question hold; end smoothly.
    end_env = np.ones(TOTAL_SAMPLES, dtype=np.float32)
    end_start = round(34.5 * SR)
    end_env[end_start:] = np.linspace(1.0, .72, TOTAL_SAMPLES - end_start, dtype=np.float32)
    bed *= end_env
    fade = round(1.0 * SR)
    bed[-fade:] *= np.linspace(1, 0, fade, dtype=np.float32)
    sfx[-round(.3 * SR):] *= np.linspace(1, 0, round(.3 * SR), dtype=np.float32)
    stereo_bed = np.column_stack([bed, bed * .97])
    stereo_sfx = np.column_stack([sfx, sfx * .93])
    mix = voice_mix + stereo_bed + stereo_sfx
    mix_peak = float(np.max(np.abs(mix)))
    if mix_peak > .92:
        mix *= .92 / mix_peak
    write_wav(MEDIA / "music-bed.wav", stereo_bed)
    write_wav(MEDIA / "mix.wav", mix)
    report = {
        "voice_source": "media/voiceover.mp3",
        "voice_duration_seconds": round(voice_seconds, 3),
        "voice_start_seconds": start_s,
        "voice_end_seconds": round(start_s + voice_seconds, 3),
        "mix_duration_seconds": TOTAL_SECONDS,
        "sample_rate": SR,
        "channels": 2,
        "voice_rms_before_dbfs": round(20 * math.log10(max(voice_rms_before, 1e-9)), 2),
        "voice_gain_db": round(20 * math.log10(max(min(gain, 4.0), 1e-9)), 2),
        "music_rms_dbfs": round(20 * math.log10(max(float(np.sqrt(np.mean(stereo_bed**2))), 1e-9)), 2),
        "mix_peak_dbfs": round(20 * math.log10(max(float(np.max(np.abs(mix))), 1e-9)), 2),
        "music_and_sfx": "original synthesized pad, soft plucks, restrained transition sweeps; no third-party music",
        "time_stretch": False,
    }
    (MEDIA / "audio-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return report


def main() -> None:
    manifest = []
    for i, (filename, image_name, seconds, kind) in enumerate(SCENES, 1):
        print(f"BUILD {i}/{len(SCENES)} {kind}", flush=True)
        manifest.append(render_scene(i, filename, image_name, seconds, kind))
    audio = make_audio_mix()
    (MEDIA / "scene-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"scenes": manifest, "audio": audio}, indent=2), flush=True)


if __name__ == "__main__":
    main()
