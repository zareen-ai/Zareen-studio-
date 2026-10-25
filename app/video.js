/* =========================================================
   60-SECOND VERTICAL FILM — v2 (naya script)
   Structure: DARD → ILZAM → SAUDA → QAID → HISAB → NAQSHA → SAWAL → CTA
   Har scene frame-accurate timed hai.
   ========================================================= */

const DUR = 60;
const FPS = 24;
const layersRoot = document.getElementById("layers");
const tcEl = document.getElementById("tc");
const sceneTag = document.getElementById("sceneTag");
const beatsEl = document.getElementById("beats");
const scrub = document.getElementById("scrub");
const scrubFill = document.getElementById("scrubFill");
const scrubHead = document.getElementById("scrubHead");
const readout = document.getElementById("readout");
const transport = document.querySelector(".transport");
const btnPlay = document.getElementById("btnPlay");

const E = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const L = (t, s, anim, html, cls = "") => ({ t, s, anim, html, cls });

/* =========================================================
   SCENES
   ========================================================= */
const SCENES = [
  {
    at: 0.0,
    to: 7.0,
    vo: "v2-01",
    line: "Tumne 100 videos dekhi hongi. Aur aaj bhi wahi ho jahan ek saal pehle the.",
    tag: "SC 01 · DARD",
    head: "0.0 – 7.0s",
    screen: "« 100 videos » → « aur aaj bhi WAHI ho »",
    shot: "Counter 0→100 race karta hai, phir 'WAHI' pe slam + flash. Background dhundhla, ek akela spotlight.",
    build: () => [
      L(0.1, 1.0, "rise", `<div class="k">Sach suno</div>`, "top"),
      L(0.4, 3.0, "count", `<div class="mono">Tum ne kitni motivation videos dekhi hain?</div><div class="counter" data-count="100" data-dec="0">0</div><div class="mono gold">shayad is se zyada</div>`, "center"),
      L(3.2, 0.45, "flash", ``, ""),
      L(3.4, 3.4, "slam", `<div class="huge">Aur aaj bhi<br><span class="gold">WAHI</span> ho.</div>`, "center")
    ]
  },
  {
    at: 7.0,
    to: 14.0,
    vo: "v2-02",
    line: "Ilzaam tumhari mehnat ka nahi. Ilzaam tumhare tareeqe ka hai. Tum motivation dhoondte ho — system nahi banate.",
    tag: "SC 02 · ILZAAM",
    head: "7.0 – 14.0s",
    screen: "« ilzaam mehnat ka? » (cross) → « ilzaam TAREEQE ka »",
    shot: "Pehla lafz aata hai, uspe laal line khinchti hai. Phir gold mein naya lafz slam hota hai. Glitch frame transition.",
    build: () => [
      L(0.1, 3.2, "slam", `<div class="big cross" data-hit="2.0">Ilzaam tumhari<br>mehnat ka hai?</div>`, "center"),
      L(3.0, 0.4, "flash", ``, ""),
      L(3.3, 3.6, "slam", `<div class="huge">Nahi.<br><span class="gold">Tareeqe</span> ka hai.</div>`, "center"),
      L(5.3, 1.7, "rise", `<div class="body">Tum <b class="clay">motivation</b> dhoondte ho.<br><b class="gold">System</b> nahi banate.</div>`, "bot")
    ]
  },
  {
    at: 14.0,
    to: 21.0,
    vo: "v2-03",
    line: "Ek sauda karte hain. Mujhe apne 6 mahine do. Main tumhe wo insaan bana ke doonga jise tum aaine mein dekhna chahte ho.",
    tag: "SC 03 · SAUDA",
    head: "14.0 – 21.0s",
    screen: "« ek SAUDA » → « mujhe apne 6 MAHINE do » → « 180 din »",
    shot: "Blackout 0.4s. Gold ring expand hoti hai. 'SAUDA' slam. Phir 180 ka counter chhota, neeche.",
    build: () => [
      L(0.0, 0.5, "black", ``, ""),
      L(0.4, 6.2, "ring", ``, ""),
      L(0.7, 1.6, "slam", `<div class="huge gold">Ek SAUDA</div>`, "center"),
      L(2.3, 2.6, "rise", `<div class="mid">Mujhe apne<br><span class="gold">6 mahine</span> do.</div>`, "center"),
      L(4.6, 2.4, "count", `<div class="mono">180 din · sirf 180 din</div><div class="mid gold" data-count="180" data-dec="0">0</div><div class="body">badle mein wo insaan — jise tum aaine mein<br>dekhna chahte ho.</div>`, "bot")
    ]
  },
  {
    at: 21.0,
    to: 28.0,
    vo: "v2-04",
    line: "Shart sirf ek hai. Chhe mahine kisi ko nahi batana. Na story, na wada, na tareef. Khamoshi se kaam karo. Nateeja shor macha dega.",
    tag: "SC 04 · QAID",
    head: "21.0 – 28.0s",
    screen: "« SHART: kisi ko NA batana » → story/announcement/tareef (cross) → « KHAMOSHI se kaam »",
    shot: "Teen words ek ke baad ek aate hain aur har ek pe laal line. Phir andhera, aur gold mein 'KHAMOSHI'.",
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
    at: 28.0,
    to: 35.0,
    vo: "v2-05",
    line: "Ab hisaab suno. Ek skill chuno. Roz do ghante. Chhe mahine mein teen sau saath ghante. Itne ghante ek degree mein bhi nahi milte.",
    tag: "SC 05 · HISAB",
    head: "28.0 – 35.0s",
    screen: "« 1 skill » « 2 ghante roz » → 2 × 180 = 360 (counter race) → « degree mein bhi nahi »",
    shot: "Do lines slam hoke side mein chali jati hain, phir beech mein bara counter race karta hai 0 se 360 tak.",
    build: () => [
      L(0.1, 1.4, "slam", `<div class="slams"><div><span>01</span>Ek skill</div><div><span>02</span>Roz 2 ghante</div></div>`, "top"),
      L(1.5, 1.6, "slam", `<div class="slams"><div><span>03</span>Ek waqt</div><div><span>04</span>Ek jagah</div></div>`, "top"),
      L(2.6, 2.4, "count", `<div class="big">2 <span class="gold">×</span> 180 <span class="gold">=</span></div><div class="counter" data-count="360" data-dec="0">0</div><div class="mono gold">ghante · sirf ek skill ke</div>`, "center"),
      L(5.0, 2.0, "rise", `<div class="mid">Itne ghante ek <span class="gold">degree</span> mein<br>bhi nahi milte.</div>`, "bot")
    ]
  },
  {
    at: 35.0,
    to: 42.0,
    vo: "v2-06",
    line: "Saat cheezein badalni hain. Pehchan. Dopamine. Gehra kaam. Jism. Dimagh. Paisa. Aur mahaul. Saat sutoon, ek chhat.",
    tag: "SC 06 · NAQSHA",
    head: "35.0 – 42.0s",
    screen: "7 khane ek-ek karke jalte hain → « 7 sutoon · 1 chhat »",
    shot: "Grid sequence: har 0.42s ek khana gold hota hai, tick sound. Phir neeche line slam.",
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
    at: 42.0,
    to: 51.0,
    vo: "v2-07",
    line: "Aur phir ek din, koi poochega — tum badal kaise gaye? Tum muskuraoge. Jawab nahi doge. Kyunke tumhara kaam tumhara jawab ban chuka hoga.",
    tag: "SC 07 · SAWAL",
    head: "42.0 – 51.0s",
    screen: "andhera → « Tum badal kaise gaye? » (type) → « Khamoshi se. » (gold wipe)",
    shot: "Screen 86% andheri. Sawal type-writer se likha jata hai. 3s pause. Phir jawab gold wipe se aata hai — video ka sabse bara moment.",
    build: () => [
      L(0.0, 9.0, "dark", ``, ""),
      L(0.5, 3.0, "type", `<div class="mid" style="opacity:.9">« Tum badal kaise gaye? »</div>`, "top"),
      L(4.0, 0.5, "flash", ``, ""),
      L(4.2, 4.6, "wipe", `<div class="huge gold">Khamoshi se.</div>`, "center"),
      L(6.0, 3.0, "rise", `<div class="mono">kyunke ab tumhara kaam tumhara jawab hai</div>`, "bot")
    ]
  },
  {
    at: 51.0,
    to: 60.0,
    vo: "v2-08",
    line: "Yeh video yahin khatam hoti hai. Lekin tumhare 6 mahine ab shuru hote hain. Phone rakho. Ek safha likho. Aur kal subah — uth jana.",
    tag: "SC 08 · CTA",
    head: "51.0 – 60.0s",
    screen: "« video yahan khatam » → « tumhare 6 mahine AB shuru » → CTA card → brand freeze",
    shot: "Do lines ka contrast. CTA pill bounce ke saath aata hai. Aakhri 1.5s brand frame par freeze — loop ke liye clean cut.",
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
   SIDE PANEL — second-by-second script
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
   AUDIO — narration + synth score
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

  // heartbeat pulse — tempo scene ke hisaab se
  setInterval(() => {
    if (!musicOn || !playing) return;
    const tense = t > 42 && t < 51; // reveal ke waqt dhadkan dheemi
    const t2 = AC.currentTime + 0.02;
    const o = AC.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(tense ? 78 : 104, t2);
    o.frequency.exponentialRampToValueAtTime(44, t2 + 0.14);
    const g = AC.createGain();
    g.gain.setValueAtTime(tense ? 0.1 : 0.17, t2);
    g.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.26);
    o.connect(g);
    g.connect(master);
    o.start(t2);
    o.stop(t2 + 0.3);
  }, 500);

  master.gain.linearRampToValueAtTime(musicOn ? 0.13 : 0.0001, AC.currentTime + 1.4);
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
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

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
  const local = t - SCENES[i].at;
  layerEls.forEach((l) => {
    const p = (local - l.cfg.t) / l.cfg.s;
    if (p < 0 || p > 1) {
      l.el.style.opacity = 0;
      return;
    }
    apply(l, p);
  });

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
document.getElementById("btnRestart").addEventListener("click", () => {
  seek(0);
  setPlaying(true);
});
const btnMute = document.getElementById("btnMute");
btnMute.addEventListener("click", () => {
  musicOn = !musicOn;
  btnMute.classList.toggle("on", musicOn);
  if (AC && master) master.gain.linearRampToValueAtTime(musicOn ? 0.13 : 0.0001, AC.currentTime + 0.5);
});
const btnVoice = document.getElementById("btnVoice");
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
