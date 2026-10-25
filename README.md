# Zareen Studio — 6 Mahine Ki Khamosh Tabdeeli

Ek self-improvement IP: **60-second vertical film** + **38-slide cinematic deck**, dono Urdu (Roman) mein,
dono female Urdu narration aur synthesized ambient score ke saath.

Theme: **Pine ink / Parchment / Brass gold** — Fraunces (display) + Space Grotesk (body) + Noto Nastaliq Urdu.

## Chalane ka tareeqa

```bash
python3 serve.py            # http://localhost:4321  (root = home.html)
```

| Page | Kya hai |
|---|---|
| `/home.html` | Studio landing — dono cheezon ke links |
| `/video.html` | 60-second 9:16 film: frame-accurate timecode HUD, scrub, side panel mein second-by-second script |
| `/index.html` | Poora 38-slide deck: cinematic auto-play (P), voiceover (V), ambient music (M), fullscreen (F) |

Koi build step nahi, koi dependency nahi — sirf vanilla HTML/CSS/JS. `serve.py` Python 3 stdlib hai.

## 60-second film ka structure (v2 script)

| Time | Scene | Beat |
|---|---|---|
| 0–7s | DARD | "100 videos dekhi hain… aur aaj bhi WAHI ho." |
| 7–14s | ILZAAM | "Ilzaam mehnat ka nahi — tareeqe ka hai." |
| 14–21s | SAUDA | "Mujhe apne 6 mahine do. 180 din." |
| 21–28s | QAID | "Shart: kisi ko na batana. Na story, na wada, na tareef." |
| 28–35s | HISAB | "1 skill × 2 ghante × 180 din = 360 ghante." |
| 35–42s | NAQSHA | "7 sutoon, ek chhat: tum." |
| 42–51s | SAWAL | "Tum badal kaise gaye?" → "Khamoshi se." |
| 51–60s | CTA | "Video yahan khatam. Tumhare 6 mahine ab shuru." |

Video banane ke liye: page ko fullscreen karo, `R` dabao (restart + play), aur screen-recorder (OBS / phone)
se 9:16 capture karo. Narration aur music andar hi hai.

## Deck (38 slides)

7 sutoon + 2 hifazati deewarein: Pehchan · Dopamine Reset · Gehra Kaam · Jism · Dimagh · Paisa · Mahaul,
phir Tracking aur Relapse Plan, phir month-by-month roadmap, 8 qawaid, aur aaj-raat-ke-3-kaam CTA.

## Files

```
serve.py            static server (/ -> home.html)
app/home.html       landing
app/video.html      60s film stage
app/video.css       film styling + scene atoms
app/video.js        SCENES (timings, VO, shots) + rAF engine + synth score
app/index.html      deck shell
app/style.css       deck theme
app/slides.js       38 slides ka content (html + duration + vo text)
app/main.js         deck engine (nav, autoplay, voice, ambient music)
app/assets/vo/      narration mp3s — vo-NN (deck), v2-NN (60s film), v1-NN (purana cut)
```

## Controls

`Space` play/pause · `R` restart · `←`/`→` ±1s (film) ya slide (deck) · `V` narration · `M` music ·
`F` fullscreen · `P` cinematic mode (deck) · `0–9` deck mein jump.

## Cinematic layer (v3)

- 4 generated 9:16 backgrounds (`assets/img/bg1–4.jpg`) Ken Burns crossfade ke saath
- Handheld camera: per-scene push/drift/rise + impact shake slams par
- Gold dust particles, beat shockwaves, light sweep har cut par
- Word-sync captions (Roman Urdu) + progress bar
- `assets/vo/v2-full.mp3` — poori 60s narration ek single track (CapCut edit ke liye)

## Baqi kaam (agli baar)

- Deck slides 11–38 ke voiceover clips (`vo-11.mp3` … `vo-38.mp3`) — abhi 1–10 tayar hain.
