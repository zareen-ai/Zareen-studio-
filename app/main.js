/* =========================================================
   DECK ENGINE — render, navigation, cinematic autoplay,
   ambient score (WebAudio) + voiceover playback
   ========================================================= */
import { SLIDES } from "./slides.js";

const deck = document.getElementById("deck");
const rail = document.getElementById("rail");
const counter = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");
const clockEl = document.getElementById("clock");
const controls = document.getElementById("controls");
const btnPlay = document.getElementById("btnPlay");
const btnVoice = document.getElementById("btnVoice");
const btnMusic = document.getElementById("btnMusic");

const pad = (n) => String(n).padStart(2, "0");
const TOTAL = SLIDES.length;
const VO_PATH = (i) => `./assets/vo/vo-${pad(i + 1)}.mp3`;

/* ---------- build slides ---------- */
const nodes = SLIDES.map((s, i) => {
  const el = document.createElement("section");
  el.className = "slide";
  el.dataset.index = i;
  el.dataset.chapter = s.chapter || "";
  el.innerHTML = s.html;
  // animation order for staggered entrance
  el.querySelectorAll("[data-anim]").forEach((n, k) => n.style.setProperty("--i", k));
  deck.appendChild(el);
  return el;
});

/* ---------- rail ---------- */
const railBits = SLIDES.map(() => {
  const i = document.createElement("i");
  rail.appendChild(i);
  return i;
});

/* ---------- state ---------- */
let cur = -1;
let playing = false;
let timer = null;
let voiceOn = false;
let musicOn = false;
let voAudio = null;
let elapsed = 0;
let clockTimer = null;
let hideTimer = null;
let voMissing = 0;

/* ---------- navigation ---------- */
function go(i, { autoplay = false } = {}) {
  i = Math.max(0, Math.min(TOTAL - 1, i));
  if (i === cur) return;
  const prev = cur >= 0 ? nodes[cur] : null;
  if (prev) {
    prev.classList.remove("is-active");
    prev.classList.add("is-leaving");
    setTimeout(() => prev.classList.remove("is-leaving"), 700);
    prev.scrollTo?.({ top: 0 });
  }
  cur = i;
  const el = nodes[i];
  el.scrollTop = 0;
  // force reflow so animations restart
  void el.offsetWidth;
  el.classList.add("is-active");

  counter.textContent = `${pad(i + 1)} / ${pad(TOTAL)}`;
  progressFill.style.width = `${((i + 1) / TOTAL) * 100}%`;
  railBits.forEach((b, k) => {
    b.classList.toggle("on", k === i);
    b.classList.toggle("seen", k < i);
  });
  history.replaceState(null, "", `#${i + 1}`);

  if (autoplay) speak(i);
  else stopVoice();

  if (playing) scheduleNext();
}

function next() {
  if (cur >= TOTAL - 1) {
    if (playing) setPlaying(false);
    return;
  }
  go(cur + 1, { autoplay: playing || voiceOn });
}
function prev() {
  go(cur - 1, { autoplay: playing || voiceOn });
}

/* ---------- autoplay ---------- */
function scheduleNext() {
  clearTimeout(timer);
  const s = SLIDES[cur];
  let dur = (s.dur || 9) * 1000;
  if (voiceOn && voAudio && voAudio.duration && isFinite(voAudio.duration)) {
    dur = Math.max(dur, voAudio.duration * 1000 + 700);
  }
  timer = setTimeout(next, dur);
}

function setPlaying(on) {
  playing = on;
  btnPlay.classList.toggle("playing", on);
  document.body.classList.toggle("cine", on);
  if (on) {
    if (cur >= TOTAL - 1) go(0, { autoplay: true });
    else speak(cur);
    scheduleNext();
    startClock();
    enableMusic(true);
    hideChrome();
  } else {
    clearTimeout(timer);
    stopClock();
  }
}

/* ---------- clock ---------- */
function startClock() {
  stopClock();
  clockTimer = setInterval(() => {
    elapsed += 1;
    clockEl.textContent = `${pad(Math.floor(elapsed / 60))}:${pad(elapsed % 60)}`;
  }, 1000);
}
function stopClock() {
  clearInterval(clockTimer);
}

/* ---------- voiceover ---------- */
function stopVoice() {
  if (voAudio) {
    voAudio.pause();
    voAudio.currentTime = 0;
  }
}

async function speak(i) {
  stopVoice();
  if (!voiceOn) return;
  const s = SLIDES[i];
  if (!s.vo) return;
  try {
    if (!voAudio) {
      voAudio = new Audio();
      voAudio.preload = "auto";
      voAudio.addEventListener("ended", () => {
        if (playing) scheduleNext();
      });
    }
    voAudio.src = VO_PATH(i);
    await voAudio.play();
    if (playing && voAudio.duration && isFinite(voAudio.duration)) scheduleNext();
  } catch (e) {
    voMissing++;
    if (voMissing > 2 && !window.__voWarned) {
      window.__voWarned = true;
      console.info("Voice files nahi mile — deck bina narration ke chalegi.");
    }
  }
}

/* ---------- ambient score (pure WebAudio, no files) ---------- */
let AC = null, master = null, droneNodes = [], padTimer = null;
const SCALE = [55, 65.41, 82.41, 98, 110, 130.81, 164.81]; // A1 C2 E2 G2 A2 C3 E3

function enableMusic(on) {
  musicOn = on;
  btnMusic.classList.toggle("on", on);
  if (!on) {
    if (master) master.gain.linearRampToValueAtTime(0.0001, (AC?.currentTime || 0) + 0.8);
    clearInterval(padTimer);
    return;
  }
  if (!AC) {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    master = AC.createGain();
    master.gain.value = 0.0001;
    const rev = AC.createConvolver();
    const len = AC.sampleRate * 2.6;
    const buf = AC.createBuffer(2, len, AC.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    rev.buffer = buf;
    const wet = AC.createGain();
    wet.gain.value = 0.55;
    master.connect(AC.destination);
    master.connect(rev);
    rev.connect(wet);
    wet.connect(AC.destination);
    window.__wet = wet;
    // continuous drone
    [1, 1.5, 2].forEach((mult, k) => {
      const o = AC.createOscillator();
      o.type = k === 2 ? "triangle" : "sine";
      o.frequency.value = SCALE[0] * mult;
      const g = AC.createGain();
      g.gain.value = k === 0 ? 0.16 : 0.06;
      const lfo = AC.createOscillator();
      lfo.frequency.value = 0.045 + k * 0.021;
      const lg = AC.createGain();
      lg.gain.value = 0.035;
      lfo.connect(lg);
      lg.connect(g.gain);
      o.connect(g);
      g.connect(master);
      o.start();
      lfo.start();
      droneNodes.push(o, lfo);
    });
  }
  AC.resume();
  master.gain.cancelScheduledValues(AC.currentTime);
  master.gain.linearRampToValueAtTime(0.16, AC.currentTime + 2.2);
  clearInterval(padTimer);
  padTimer = setInterval(chime, 7000);
  chime();
}

function chime() {
  if (!AC || !musicOn) return;
  const t = AC.currentTime + 0.05;
  const f = SCALE[1 + Math.floor(Math.random() * (SCALE.length - 1))] * (Math.random() < 0.3 ? 2 : 1);
  const o = AC.createOscillator();
  o.type = "sine";
  o.frequency.value = f;
  const g = AC.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.05, t + 1.6);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 6.5);
  o.connect(g);
  g.connect(master);
  g.connect(window.__wet || master);
  o.start(t);
  o.stop(t + 7);
}

/* ---------- chrome hide ---------- */
function hideChrome() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => controls.classList.add("hide"), 2600);
}
window.addEventListener("pointermove", () => {
  controls.classList.remove("hide");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => controls.classList.add("hide"), 2600);
});

/* ---------- controls ---------- */
controls.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const act = b.dataset.act;
  if (act === "next") next();
  if (act === "prev") prev();
  if (act === "play") setPlaying(!playing);
  if (act === "voice") {
    voiceOn = !voiceOn;
    btnVoice.classList.toggle("on", voiceOn);
    if (voiceOn) speak(cur);
    else stopVoice();
  }
  if (act === "music") enableMusic(!musicOn);
  if (act === "full") {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
});

/* keyboard */
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (["arrowright", " ", "pageup", "enter"].includes(k) || e.key === "ArrowRight") {
    e.preventDefault();
    next();
  } else if (["arrowleft", "pagedown", "backspace"].includes(k) || e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (k === "home") go(0);
  else if (k === "end") go(TOTAL - 1);
  else if (k === "p") setPlaying(!playing);
  else if (k === "f") {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  } else if (k === "m") enableMusic(!musicOn);
  else if (k === "v") {
    voiceOn = !voiceOn;
    btnVoice.classList.toggle("on", voiceOn);
    voiceOn ? speak(cur) : stopVoice();
  } else if (/^[0-9]$/.test(k)) {
    go(Math.round(((parseInt(k, 10) || 10) / 10) * TOTAL) - 1);
  }
});

/* swipe + wheel */
let wheelLock = false;
window.addEventListener("wheel", (e) => {
  if (wheelLock || Math.abs(e.deltaY) < 24) return;
  const el = nodes[cur];
  if (el && el.scrollHeight > el.clientHeight + 30) return; // scrollable slide
  wheelLock = true;
  setTimeout(() => (wheelLock = false), 750);
  e.deltaY > 0 ? next() : prev();
}, { passive: true });

let tx = null;
window.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
window.addEventListener("touchend", (e) => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 60) (dx < 0 ? next() : prev());
  tx = null;
}, { passive: true });

/* card pointer glow */
deck.addEventListener("pointermove", (e) => {
  const c = e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${e.clientX - r.left}px`);
  c.style.setProperty("--my", `${e.clientY - r.top}px`);
});

/* ---------- init ---------- */
const hash = parseInt((location.hash || "").replace("#", ""), 10);
go(isNaN(hash) ? 0 : hash - 1);
clockEl.textContent = "00:00";
