/* =========================================================
   60-SECOND VERTICAL FILM — v3 (cinematic cut)
   DARD → ILZAAM → SAUDA → QAID → HISAB → NAQSHA → SAWAL → CTA
   + Ken Burns backgrounds, handheld camera, particles,
     beat shockwaves, word-sync captions, light sweep.
   ========================================================= */

const DUR = 60;
const FPS = 24;
const $ = (id) => document.getElementById(id);
const layersRoot = $("layers");
const cam = $("cam");
const bgs = [$("bgA"), $("bgB")];
const partsRoot = $("parts");
const screen_ = $("screen");
const capLine = $("capLine");
const capBar = $("capBar");
const capsWrap = $("caps");
const tcEl = $("tc");
const sceneTag = $("sceneTag");
const beatsEl = $("beats");
const scrub = $("scrub");
const scrubFill = $("scrubFill");
const scrubHead = $("scrubHead");
const readout = $("readout");
const transport = document.querySelector(".transport");
const btnPlay = $("btnPlay");

const E = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const L = (t, s, anim, html, cls = "") => ({ t, s, anim, html, cls });
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/* ---------- captions: [localStart, localEnd, text] ---------- */
const capChunks = (arr) =>
  arr.map(([t, s, text]) => {
    const words = text.split(" ");
    const per = (s - t) / words.length;
    return { t, s, words: words.map((w, i) => ({ w, at: t + i * per, hl: w.includes("*") })) };
  });

/* =========================================================
   SCENES
   ========================================================= */
const SCENES = [
  {
    at: 0.0, to: 7.0, vo: "v2-01", bg: "bg1", camT: "push",
    tag: "SC 01 · DARD", head: "0.0 – 7.0s",
    line: "Tumne 100 videos dekhi hongi. Aur aaj bhi wahi ho jahan ek saal pehle the.",
    screen: "« 100 videos » → « aur aaj bhi WAHI ho »",
    shot: "Counter 0→100 race, phir WAHI pe slam + flash. Background: dhundhla jungle, ek sun-beam.",
    subs: capChunks([
      [0.3, 1.9, "Tumne *100 videos* dekhi hongi."],
      [2.2, 4.6, "Aur aaj bhi *wahi* ho —"],
      [4.6, 6.7, "jahan ek saal pehle the."]
    ]),
    build: () => [
      L(0.1, 1.0, "rise", `<div class="k">Sach suno</div>`, "top"),
      L(0.4, 3.0, "count", `<div class="mono">Tum ne kitni motivation videos dekhi hain?</div><div class="counter" data-count="100" data-dec="0">0</div><div class="mono gold">shayad is se zyada</div>`, "center"),
      L(3.2, 0.45, "flash", ``, ""),
      L(3.4, 3.4, "slam", `<div class="huge">Aur aaj bhi<br><span class="gold">WAHI</span> ho.</div>`, "center")
    ]
  },
  {
    at: 7.0, to: 14.0, vo: "v2-02", bg: "bg1", camT: "drift-l",
    tag: "SC 02 · ILZAAM", head: "7.0 – 14.0s",
    line: "Ilzaam tumhari mehnat ka nahi. Ilzaam tumhare tareeqe ka hai. Tum motivation dhoondte ho — system nahi banate.",
    screen: "« ilzaam mehnat ka? » (cross) → « ilzaam TAREEQE ka »",
    shot: "Pehla lafz, laal line, glitch-cut, phir gold slam. Camera dheere left drift.",
    subs: capChunks([
      [0.3, 2.3, "Ilzaam tumhari *mehnat* ka nahi."],
      [2.5, 4.5, "Ilzaam tumhare *tareeqe* ka hai."],
      [4.7, 6.8, "Tum motivation dhoondte ho — *system* nahi banate."]
    ]),
    build: () => [
      L(0.1, 3.2, "slam", `<div class="big cross" data-hit="2.0">Ilzaam tumhari<br>mehnat ka hai?</div>`, "center"),
      L(3.0, 0.4, "flash", ``, ""),
      L(3.3, 3.6, "slam", `<div class="huge">Nahi.<br><span class="gold">Tareeqe</span> ka hai.</div>`, "center"),
      L(5.3, 1.7, "rise", `<div class="body">Tum <b class="clay">motivation</b> dhoondte ho.<br><b class="gold">System</b> nahi banate.</div>`, "bot")
    ]
  },
  {
    at: 14.0, to: 21.0, vo: "v2-03", bg: "bg2", camT: "drift-r",
    tag: "SC 03 · SAUDA", head: "14.0 – 21.0s",
    line: "Ek sauda karte hain. Mujhe apne 6 mahine do. Main tumhe wo insaan bana ke doonga jise tum aaine mein dekhna chahte ho.",
    screen: "« ek SAUDA » → « mujhe apne 6 MAHINE do » → 180 counter",
    shot: "Blackout 0.4s. Gold ring. Peeche akela aadmi raat ki sadak par — silhouette.",
    subs: capChunks([
      [0.3, 1.7, "Ek *sauda* karte hain."],
      [1.9, 3.5, "Mujhe apne *6 mahine* do."],
      [3.7, 6.7, "Main tumhe wo insaan bana ke doonga jise tum aaine mein dekhna chahte ho."]
    ]),
    build: () => [
      L(0.0, 0.5, "black", ``, ""),
      L(0.4, 6.2, "ring", ``, ""),
      L(0.7, 1.6, "slam", `<div class="huge gold">Ek SAUDA</div>`, "center"),
      L(2.3, 2.6, "rise", `<div class="mid">Mujhe apne<br><span class="gold">6 mahine</span> do.</div>`, "center"),
      L(4.6, 2.4, "count", `<div class="mono">180 din · sirf 180 din</div><div class="mid gold" data-count="180" data-dec="0">0</div><div class="body">badle mein wo insaan — jise tum aaine mein<br>dekhna chahte ho.</div>`, "bot")
    ]
  },
  {
    at: 21.0, to: 28.0, vo: "v2-04", bg: "bg2", camT: "slow-push",
    tag: "SC 04 · QAID", head: "21.0 – 28.0s",
    line: "Shart sirf ek hai. Chhe mahine kisi ko nahi batana. Na story, na wada, na tareef. Khamoshi se kaam karo. Nateeja shor macha dega.",
    screen: "« SHART » → 3 cross → « KHAMOSHI se kaam »",
    shot: "Teen words, teen laal lines. Phir flash + gold slam. Camera halka push-in.",
    subs: capChunks([
      [0.3, 1.5, "*Shart* sirf ek hai."],
      [1.7, 3.1, "6 mahine *kisi ko nahi batana.*"],
      [3.3, 4.7, "Na story. Na wada. Na tareef."],
      [4.9, 6.8, "*Khamoshi* se kaam karo — nateeja shor macha dega."]
    ]),
    build: () => [
      L(0.1, 2.2, "slam", `<div class="k clay">Shart sirf ek hai</div><div class="gap"></div><div class="big">6 mahine <span class="gold">kisi ko<br>nahi batana.</span></div>`, "top"),
      L(2.4, 0.9, "slam", `<div class="mid cross" data-hit="0.5">Na story</div>`, "bot"),
      L(3.2, 0.9, "slam", `<div class="mid cross" data-hit="0.5">Na wada</div>`, "bot"),
      L(4.0, 1.0, "slam", `<div class="mid cross" data-hit="0.5">Na tareef</div>`, "bot"),
      L(5.0, 0.4, "flash", ``, ""),
      L(5.2, 1.8, "slam", `<div class="huge gold">KHAMOSHI<br>se kaam.</div>`, "center")
    ]
  },
  {
    at: 28.0, to: 35.0, vo: "v2-05", bg: "bg3", camT: "push",
    tag: "SC 05 · HISAB", head: "28.0 – 35.0s",
    line: "Ab hisaab suno. Ek skill chuno. Roz do ghante. Chhe mahine mein teen sau saath ghante. Itne ghante ek degree mein bhi nahi milte.",
    screen: "4 rules → 2 × 180 = 360 (counter race)",
    shot: "Gold-dust background. Counter 0→360 race karta hai, screen ke saath dhadkan tez.",
    subs: capChunks([
      [0.3, 1.7, "Ab hisaab suno. Ek *skill* chuno."],
      [1.9, 3.1, "Roz *do ghante.*"],
      [3.3, 5.1, "6 mahine mein *360 ghante.*"],
      [5.3, 6.8, "Itne ghante ek degree mein bhi nahi milte."]
    ]),
    build: () => [
      L(0.1, 1.4, "slam", `<div class="slams"><div><span>01</span>Ek skill</div><div><span>02</span>Roz 2 ghante</div></div>`, "top"),
      L(1.5, 1.6, "slam", `<div class="slams"><div><span>03</span>Ek waqt</div><div><span>04</span>Ek jagah</div></div>`, "top"),
      L(2.6, 2.4, "count", `<div class="big">2 <span class="gold">×</span> 180 <span class="gold">=</span></div><div class="counter" data-count="360" data-dec="0">0</div><div class="mono gold">ghante · sirf ek skill ke</div>`, "center"),
      L(5.0, 2.0, "rise", `<div class="mid">Itne ghante ek <span class="gold">degree</span> mein<br>bhi nahi milte.</div>`, "bot")
    ]
  },
  {
    at: 35.0, to: 42.0, vo: "v2-06", bg: "bg3", camT: "drift-l",
    tag: "SC 06 · NAQSHA", head: "35.0 – 42.0s",
    line: "Saat cheezein badalni hain. Pehchan. Dopamine. Gehra kaam. Jism. Dimagh. Paisa. Aur mahaul. Saat sutoon, ek chhat.",
    screen: "7 khane tick-tick jalte hain → « 7 sutoon · 1 chhat »",
    shot: "Grid sequence har 0.42s. Tick sync heartbeat se. End pe flash + slam.",
    subs: capChunks([
      [0.3, 2.3, "Saat cheezein badalni hain."],
      [2.5, 4.7, "Pehchan. Dopamine. Gehra kaam. Jism. Dimagh. Paisa. Mahaul."],
      [4.9, 6.8, "Saat sutoon — *ek chhat.*"]
    ]),
    build: () => {
      const items = ["Pehchan", "Dopamine", "Gehra Kaam", "Jism", "Dimagh", "Paisa", "Mahaul"];
      return [
        L(0.1, 1.2, "rise", `<div class="k">Poora naqsha · 7 sutoon</div>`, "top"),
        L(0.4, 4.4, "seq", `<div class="grid7">${items
          .map((t, i) => `<div data-at="${(i * 0.42).toFixed(2)}">${t}</div>`)
          .join("")}</div>`, "center"),
        L(4.4, 0.4, "flash", ``, ""),
        L(4.6, 2.4, "slam", `<div class="big">7 sutoon.<br><span class="gold">Ek chhat:</span> tum.</div>`, "center")
      ];
    }
  },
  {
    at: 42.0, to: 51.0, vo: "v2-07", bg: "bg3", camT: "still",
    tag: "SC 07 · SAWAL", head: "42.0 – 51.0s",
    line: "Aur phir ek din, koi poochega — tum badal kaise gaye? Tum muskuraoge. Jawab nahi doge. Kyunke tumhara kaam tumhara jawab ban chuka hoga.",
    screen: "andhera → type-writer sawal → gold wipe « Khamoshi se. »",
    shot: "Video ka sabse quiet moment: dhadkan dheemi, sirf type sound, phir gold wipe.",
    subs: capChunks([
      [0.5, 3.4, "Aur phir ek din koi poochega — *tum badal kaise gaye?*"],
      [3.8, 5.8, "Tum muskuraoge. Jawab nahi doge."],
      [6.0, 8.7, "Kyunke tumhara *kaam* tumhara jawab ban chuka hoga."]
    ]),
    build: () => [
      L(0.0, 9.0, "dark", ``, ""),
      L(0.5, 3.0, "type", `<div class="mid" style="opacity:.9">« Tum badal kaise gaye? »</div>`, "top"),
      L(4.0, 0.5, "flash", ``, ""),
      L(4.2, 4.6, "wipe", `<div class="huge gold">Khamoshi se.</div>`, "center"),
      L(6.0, 3.0, "rise", `<div class="mono">kyunke ab tumhara kaam tumhara jawab hai</div>`, "bot")
    ]
  },
  {
    at: 51.0, to: 60.0, vo: "v2-08", bg: "bg4", camT: "rise",
    tag: "SC 08 · CTA", head: "51.0 – 60.0s",
    line: "Yeh video yahin khatam hoti hai. Lekin tumhare 6 mahine ab shuru hote hain. Phone rakho. Ek safha likho. Aur kal subah — uth jana.",
    screen: "contrast lines → CTA pill → brand freeze",
    shot: "Sunrise cliff reveal. Camera upar uthta hai. Aakhri frame loop ke liye clean.",
    subs: capChunks([
      [0.3, 2.1, "Yeh video yahin khatam hoti hai."],
      [2.3, 4.3, "Lekin tumhare *6 mahine* ab shuru hote hain."],
      [4.5, 6.5, "Phone rakho. Ek safha likho."],
      [6.7, 8.9, "Aur kal subah — *uth jana.*"]
    ]),
    build: () => [
      L(0.1, 2.2, "slam", `<div class="big" style="opacity:.55">Yeh video yahan<br>khatam hoti hai.</div>`, "center"),
      L(2.3, 0.4, "flash", ``, ""),
      L(2.5, 3.0, "slam", `<div class="big">Lekin tumhare 6 mahine<br><span class="gold">ab shuru hote hain.</span></div>`, "center"),
      L(4.4, 2.4, "pulse", `<div class="cta">Phone rakho · Ek safha likho · Kal uth jana</div>`, "bot"),
      L(6.4, 2.6, "rise", `<div class="k">6 Mahine Ki Khamosh Tabdeeli</div><div class="gap"></div><div class="urd">چُھپ جاؤ۔ کام بولے گا۔</div>`, "top")
    ]
  }
];

/* =========================================================
   SIDE PANEL
   ========================================================= */
SCENES.forEach((s) => {
  const b = E("div", "beat");
  b.innerHTML = `
    <div class="bt">${s.head.replace(" – ", "→")}</div>
    <div>
      <div class="bw">${s.tag}</div>
      <div class="bd vo">“${s.line}”</div>
      <div class="bd sc">On-screen: ${s.screen}</div>
      <div class="bd">Shot: ${s.shot}</div>
    </div>`;
  b.addEventListener("click", () => seek(s.at + 0.05));
  beatsEl.appendChild(b);
});
const beatNodes = [...beatsEl.children];

/* =========================================================
   PARTICLES + SWEEP (ek baar)
   ========================================================= */
for (let i = 0; i < 42; i++) {
  const p = E("i");
  const sz = 1 + Math.random() * 2.6;
  p.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;width:${sz}px;height:${sz}px;
    --o:${(0.12 + Math.random() * 0.35).toFixed(2)};--dx:${((Math.random() - 0.5) * 26).toFixed(1)}px;
    animation-duration:${(7 + Math.random() * 9).toFixed(1)}s;animation-delay:-${(Math.random() * 12).toFixed(1)}s`;
  partsRoot.appendChild(p);
}
const sweepEl = E("div", "scr-sweep");
screen_.appendChild(sweepEl);
const fireSweep = () => {
  sweepEl.classList.remove("go");
  void sweepEl.offsetWidth;
  sweepEl.classList.add("go");
};

/* =========================================================
   AUDIO
   ========================================================= */
const VO = {};
let voiceOn = true;
let musicOn = true;
let AC = null, master = null, wet = null;
let curVo = null;

function ensureAudio() {
  if (AC) return;
  AC = new (window.AudioContext || window.webkitAudioContext)();
  master = AC.createGain();
  master.gain.value = 0.0001;
  master.connect(AC.destination);
  wet = AC.createConvolver();
  const len = AC.sampleRate * 2.2;
  const buf = AC.createBuffer(2, len, AC.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
  }
  wet.buffer = buf;
  const wg = AC.createGain();
  wg.gain.value = 0.5;
  wet.connect(wg);
  wg.connect(AC.destination);

  [55, 82.41, 110].forEach((f, k) => {
    const o = AC.createOscillator();
    o.type = k === 2 ? "triangle" : "sine";
    o.frequency.value = f;
    const g = AC.createGain();
    g.gain.value = k === 0 ? 0.15 : 0.05;
    o.connect(g);
    g.connect(master);
    g.connect(wet);
    o.start();
  });

  setInterval(() => {
    if (!musicOn || !playing) return;
    const quiet = t > 42 && t < 51;
    const t2 = AC.currentTime + 0.02;
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(quiet ? 78 : 104, t2);
    o.frequency.exponentialRampToValueAtTime(44, t2 + 0.14);
    const g = AC.createGain();
    g.gain.setValueAtTime(quiet ? 0.09 : 0.17, t2);
    g.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.26);
    o.connect(g);
    g.connect(master);
    o.start(t2);
    o.stop(t2 + 0.3);
    shockwave(quiet ? 0.06 : 0.12);
  }, 500);

  master.gain.linearRampToValueAtTime(musicOn ? 0.13 : 0.0001, AC.currentTime + 1.4);
}

function shockwave(op) {
  const s = E("div", "shock");
  s.style.opacity = op;
  screen_.appendChild(s);
  s.addEventListener("animationend", () => s.remove());
}

function playVo(scene) {
  if (!voiceOn) return;
  if (!VO[scene.vo]) {
    const a = new Audio(`./assets/vo/${scene.vo}.mp3`);
    a.preload = "auto";
    VO[scene.vo] = a;
  }
  curVo = VO[scene.vo];
  curVo.currentTime = 0;
  curVo.play().catch(() => {});
}
function stopVo() {
  if (curVo) {
    curVo.pause();
    curVo.currentTime = 0;
  }
  curVo = null;
}

/* =========================================================
   ENGINE
   ========================================================= */
let t = 0;
let playing = false;
let last = 0;
let sceneIdx = -1;
let layerEls = [];
let flashEl = null;
let lastVoScene = -1;
let bgFlip = 0;
let curBg = "";

function setBg(name) {
  if (!name || name === curBg) return;
  curBg = name;
  bgFlip = 1 - bgFlip;
  const on = bgs[bgFlip];
  const off = bgs[1 - bgFlip];
  on.style.backgroundImage = `url(./assets/img/${name}.jpg)`;
  on.classList.remove("active");
  void on.offsetWidth;
  on.classList.add("active");
  off.classList.remove("active");
}

function buildCaptions(scene) {
  capLine.innerHTML = "";
  (scene.subs || []).forEach((ch) =>
    ch.words.forEach((w) => {
      const b = E("b", w.hl ? "hl" : "", w.w.replace(/\*/g, ""));
      b.dataset.at = w.at.toFixed(2);
      capLine.appendChild(b);
    })
  );
}

function buildScene(i) {
  layersRoot.innerHTML = "";
  layerEls = [];
  SCENES[i].build().forEach((l) => {
    const el = E("div", "lay " + (l.cls || ""));
    el.innerHTML = l.html;
    layersRoot.appendChild(el);
    layerEls.push({ cfg: l, el });
  });
  flashEl = E("div", "flash");
  layersRoot.appendChild(flashEl);
  sceneTag.textContent = SCENES[i].tag;
  beatNodes.forEach((b, k) => b.classList.toggle("on", k === i));
  setBg(SCENES[i].bg);
  buildCaptions(SCENES[i]);
  fireSweep();
}

function camera(scene, local, p) {
  let sx = 0, sy = 0, sc = 1.05, rot = 0;
  switch (scene.camT) {
    case "push": sc = 1.04 + p * 0.1; break;
    case "slow-push": sc = 1.05 + p * 0.06; break;
    case "zoomout": sc = 1.16 - p * 0.1; break;
    case "drift-l": sx = -4 + p * 8; sc = 1.08; break;
    case "drift-r": sx = 4 - p * 8; sc = 1.08; break;
    case "rise": sy = 5 - p * 10; sc = 1.1; break;
    default: sc = 1.05;
  }
  // handheld feel
  sx += Math.sin(t * 1.6) * 0.6;
  sy += Math.cos(t * 1.25) * 0.5;
  rot += Math.sin(t * 0.8) * 0.18;
  // impact shake on slams/flashes
  let m = 0;
  layerEls.forEach((l) => {
    const lp = (local - l.cfg.t) / l.cfg.s;
    if ((l.cfg.anim === "slam" || l.cfg.anim === "flash") && lp > 0 && lp < 0.22) m += 1 - lp / 0.22;
  });
  if (m > 0) {
    sx += (Math.random() - 0.5) * 7 * m;
    sy += (Math.random() - 0.5) * 6 * m;
    rot += (Math.random() - 0.5) * 0.5 * m;
  }
  cam.style.transform = `translate3d(${sx.toFixed(2)}px,${sy.toFixed(2)}px,0) scale(${sc.toFixed(4)}) rotate(${rot.toFixed(3)}deg)`;
}

function captions(scene, local) {
  const spans = capLine.children;
  let active = false;
  for (const ch of scene.subs || []) if (local >= ch.t && local <= ch.s + 0.35) active = true;
  capsWrap.style.opacity = active ? 1 : 0;
  for (let i = 0; i < spans.length; i++) spans[i].classList.toggle("on", local >= parseFloat(spans[i].dataset.at));
  capBar.style.width = `${Math.min(100, (local / (scene.to - scene.at)) * 100).toFixed(1)}%`;
}

function apply(l, p) {
  const { el, cfg } = l;
  switch (cfg.anim) {
    case "black":
      el.style.cssText += ";opacity:1;background:#04090a;z-index:12";
      break;
    case "dark":
      el.style.opacity = (Math.min(1, p * 4) * 0.88).toFixed(3);
      el.style.background = "radial-gradient(80% 60% at 50% 45%,rgba(4,9,10,.6),rgba(4,9,10,.96))";
      el.style.zIndex = 1;
      break;
    case "flash": {
      const f = p < 0.2 ? p / 0.2 : Math.max(0, 1 - (p - 0.2) / 0.8);
      if (flashEl) flashEl.style.opacity = (f * 0.5).toFixed(3);
      el.style.opacity = 0;
      break;
    }
    case "ring": {
      el.style.opacity = Math.min(1, p * 3).toFixed(3);
      const sc = 0.55 + p * 0.85;
      el.innerHTML = `<div class="ring" style="transform:translate(-50%,-50%) scale(${sc.toFixed(3)});opacity:${(1 - p).toFixed(2)}"></div><div class="ring two" style="transform:translate(-50%,-50%) scale(${(sc * 0.78).toFixed(3)});opacity:${((1 - p) * 0.7).toFixed(2)}"></div>`;
      break;
    }
    case "rise": {
      const e = ease(p);
      el.style.opacity = Math.min(1, p * 4).toFixed(3);
      el.style.transform = `translateY(${((1 - e) * 26).toFixed(2)}px)`;
      el.style.filter = `blur(${((1 - e) * 7).toFixed(2)}px)`;
      break;
    }
    case "slam": {
      const e = ease(p);
      const sc = p < 0.22 ? 1.24 - e * 0.24 : 1 + Math.sin((p - 0.22) * 10) * 0.005 * (1 - p);
      el.style.opacity = Math.min(1, p * 7).toFixed(3);
      el.style.transform = `scale(${sc.toFixed(4)}) translateY(${((1 - e) * 12).toFixed(2)}px)`;
      el.style.filter = `blur(${((1 - Math.min(1, p * 6)) * 9).toFixed(2)}px)`;
      break;
    }
    case "pulse": {
      el.style.opacity = Math.min(1, p * 5).toFixed(3);
      el.style.transform = `scale(${(1 + Math.sin(p * 12) * 0.035).toFixed(4)}) translateY(${((1 - ease(p)) * 20).toFixed(2)}px)`;
      break;
    }
    case "type": {
      const inner = el.firstElementChild;
      const w = Math.min(1, p * 1.5);
      if (inner) {
        inner.style.clipPath = `inset(0 ${((1 - w) * 100).toFixed(1)}% 0 0)`;
        inner.style.borderRight = w < 1 ? "1px solid var(--gold)" : "none";
      }
      el.style.opacity = 1;
      break;
    }
    case "wipe": {
      const inner = el.firstElementChild || el;
      const w = ease(Math.min(1, p * 1.7));
      inner.style.clipPath = `inset(0 ${((1 - w) * 100).toFixed(1)}% 0 0)`;
      el.style.opacity = 1;
      el.style.transform = `translateY(${((1 - w) * 16).toFixed(2)}px)`;
      break;
    }
    case "count": {
      el.style.opacity = Math.min(1, p * 5).toFixed(3);
      const node = el.querySelector("[data-count]");
      if (node) {
        const to = parseFloat(node.dataset.count);
        const dec = parseInt(node.dataset.dec || "0", 10);
        node.textContent = (to * ease(Math.min(1, p * 1.3))).toFixed(dec);
      }
      break;
    }
    case "seq": {
      el.style.opacity = 1;
      el.querySelectorAll("[data-at]").forEach((n) => {
        const on = p * cfg.s >= parseFloat(n.dataset.at);
        n.classList.toggle("hot", on);
        n.style.opacity = on ? 1 : 0.26;
        n.style.transform = on ? "none" : "translateY(7px)";
        n.style.transition = "all .26s cubic-bezier(.16,1,.3,1)";
      });
      break;
    }
    default:
      el.style.opacity = Math.min(1, p * 5);
  }
  el.querySelectorAll?.(".cross[data-hit]").forEach((c) => {
    c.classList.toggle("hit", p * cfg.s >= parseFloat(c.dataset.hit));
  });
  if (p > 0.84 && !["black", "dark", "flash"].includes(cfg.anim)) {
    const base = parseFloat(el.style.opacity || 1);
    el.style.opacity = (base * (1 - (p - 0.84) / 0.16)).toFixed(3);
  }
}

function render() {
  let i = SCENES.findIndex((s, k) => t >= s.at && (t < s.to || k === SCENES.length - 1));
  if (i < 0) i = SCENES.length - 1;
  if (i !== sceneIdx) {
    sceneIdx = i;
    buildScene(i);
    if (lastVoScene !== i) {
      lastVoScene = i;
      stopVo();
      if (t > 0.02 || playing) playVo(SCENES[i]);
    }
  }
  const scene = SCENES[i];
  const local = t - scene.at;
  layerEls.forEach((l) => {
    const p = (local - l.cfg.t) / l.cfg.s;
    if (p < 0 || p > 1) {
      l.el.style.opacity = 0;
      return;
    }
    apply(l, p);
  });
  camera(scene, local, local / (scene.to - scene.at));
  captions(scene, local);

  const totalFrames = Math.floor(t * FPS);
  const ss = String(Math.floor(t) % 60).padStart(2, "0");
  const ff = String(totalFrames % FPS).padStart(2, "0");
  tcEl.textContent = `00:${ss}:${ff}`;
  readout.textContent = `${t.toFixed(2)}s / ${DUR.toFixed(2)}s`;
  const pct = (t / DUR) * 100;
  scrubFill.style.width = pct + "%";
  scrubHead.style.left = pct + "%";
}

function loop(now) {
  requestAnimationFrame(loop);
  if (!last) last = now;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (playing) {
    t += dt;
    if (t >= DUR) {
      t = DUR;
      setPlaying(false);
    }
  }
  render();
}

function seek(v) {
  t = Math.max(0, Math.min(DUR - 0.01, v));
  sceneIdx = -1;
  lastVoScene = -1;
  stopVo();
  render();
  if (playing) {
    const i = SCENES.findIndex((s) => t >= s.at && t < s.to);
    if (i >= 0) {
      lastVoScene = i;
      playVo(SCENES[i]);
    }
  }
}

function setPlaying(on) {
  playing = on;
  transport.classList.toggle("playing", on);
  ensureAudio();
  if (AC) AC.resume();
  if (master) master.gain.linearRampToValueAtTime(musicOn ? 0.13 : 0.0001, AC.currentTime + 0.6);
  if (on) {
    if (t >= DUR - 0.05) seek(0);
    const i = SCENES.findIndex((s) => t >= s.at && t < s.to);
    if (i >= 0) {
      lastVoScene = i;
      playVo(SCENES[i]);
    }
  } else stopVo();
}

/* ---------- UI ---------- */
btnPlay.addEventListener("click", () => setPlaying(!playing));
$("btnRestart").addEventListener("click", () => {
  seek(0);
  setPlaying(true);
});
const btnMute = $("btnMute");
btnMute.addEventListener("click", () => {
  musicOn = !musicOn;
  btnMute.classList.toggle("on", musicOn);
  if (AC && master) master.gain.linearRampToValueAtTime(musicOn ? 0.13 : 0.0001, AC.currentTime + 0.5);
});
const btnVoice = $("btnVoice");
btnVoice.addEventListener("click", () => {
  voiceOn = !voiceOn;
  btnVoice.classList.toggle("on", voiceOn);
  if (!voiceOn) stopVo();
});

let dragging = false;
const fromEvent = (e) => {
  const r = scrub.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
  return Math.max(0, Math.min(1, x / r.width)) * DUR;
};
scrub.addEventListener("pointerdown", (e) => {
  dragging = true;
  seek(fromEvent(e));
});
window.addEventListener("pointermove", (e) => dragging && seek(fromEvent(e)));
window.addEventListener("pointerup", () => (dragging = false));

window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === " " || k === "p" || k === "enter") {
    e.preventDefault();
    setPlaying(!playing);
  } else if (k === "r") {
    seek(0);
    setPlaying(true);
  } else if (k === "m") btnMute.click();
  else if (k === "v") btnVoice.click();
  else if (e.key === "ArrowRight") seek(Math.min(DUR, t + 1));
  else if (e.key === "ArrowLeft") seek(Math.max(0, t - 1));
});

/* ---------- boot ---------- */
buildScene(0);
render();
requestAnimationFrame(loop);
