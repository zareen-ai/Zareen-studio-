# 01 — Episode Workflow (script se upload tak)

> Har episode ke liye ye hi 7 step. Ek episode ka total kaam: **~2.5 ghante.**
> Batch me karoge to 4 episode = 6 ghante.

---

## Step 0 — Idea choose karo (5 min)

- `strategy/03-content-pillars.md` se EP number uthao
- Calendar dekho: `strategy/04-30-day-calendar.md`
- Naya idea chahiye? → pillars file ke section 3 ka **3-sawal formula**

---

## Step 1 — Script likho (30 min)

`templates/script-template.md` copy karo → `scripts/EP##-slug.md`

Bharne ka order:
1. **Moral pehle likho** (ek line). Story moral ke liye hai, ulta nahi.
2. **Twist likho** — wo moment jab asli baat samajh aati hai.
3. **Hook likho** — twist ka ek tukda, bina jawab ke.
4. Beech ka bharo.
5. **Word count check:** 45s ke liye ~95–110 words, 55s ke liye ~118 words.
6. Padh ke suno — agar bolne me atak rahi ho, line chhoti karo.

**Rule:** kahani me sirf **ek** twist. Do twist = do kahaniyan.

---

## Step 2 — Voiceover banao (20 min)

Options: `production/02-audio-voice-strategy.md`

1. Script ka Roman text TTS/recording me daalo
2. Delivery notes follow karo (pause kahan, dheema kahan)
3. Ek hi file me poori VO export karo: `assets/audio/EP##-vo.wav`
4. Sun ke check: kya twist se pehle 1 second ka pause hai?

---

## Step 3 — Flow clips generate karo (60 min)

1. `prompts/02-shot-library-flow-formula.md` se 6–7 shots chuno
   (mapping table beat → shot wahan hai)
2. Har shot ka ACTION line script ke visual plan se badlo
3. **Settings:** Ingredients to Video · slot 1 = `noor-front` · slot 2 = `corner-background`
   · 9:16 · 8 seconds · Veo 3.1 **Fast**
4. Har clip ke **3 variations** banao → best chuno
5. Sirf 7 best clips ko **Quality** tier pe final karo (credits bachane ke liye)
6. Downloads: `assets/clips/EP##/clip1.mp4` ... `clip7.mp4`

**Yaad rakho:**
- Ek clip = ek action
- `no text, no captions, no logos, no watermark` har prompt me
- B-roll clips me chehra hamesha turned away / shadow me

---

## Step 4 — Edit karo (40 min)

CapCut / Premiere / DaVinci — jo bhi ho, timeline aise:

```
V1: clip1 → clip2 → clip3 → clip4 → clip5 → clip6 → clip7  (trim per beat)
V2: on-screen captions (script se)
V3: highlight words (maroon bold)
A1: voiceover
A2: music −18 dB  (twist pe 0.5s MUTE)
A3: SFX
```

**Edit rules:**
- Har clip ko poora 8s use mat karo — beat ke hisaab se trim
- Pehla frame: chehra + haath dono dikhne chahiye
- Har 3–4 second me caption badle
- Caption ka font: bold sans-serif, cream/white, maroon highlight
- Twist se theek pehle 0.5s ka silence (music + SFX mute)
- Export: **1080×1920, 30fps, H.264, high bitrate**

---

## Step 5 — QC (10 min)

`production/03-qc-checklist.md` poori check karo. Sabse common fail:
- Chehra clip 4/5 me badla hua
- Caption spelling
- Brand safety line
- Pehle 3 second boring

---

## Step 6 — Platform copy (10 min)

`templates/caption-hashtag-template.md` se teeno platform ka copy banao.

---

## Step 7 — Upload (15 min)

| Time | Platform | Kya |
|---|---|---|
| 8:30 PM PKT | YouTube Shorts | Title + description + pinned comment |
| 9:00 PM | Instagram Reels | Caption + cover text + 9–10 hashtags |
| 9:30 PM | TikTok | Chhota caption + 4–6 hashtags |

**Upload ke baad:**
- [ ] Pehle 30 minute me har comment ka jawab do (algorithm boost)
- [ ] Video ko apne WhatsApp status pe lagao
- [ ] 2 relevant Facebook groups me share karo (spam mat karo)

---

## Batch production (recommended)

| Din | Kaam | Output |
|---|---|---|
| **Sunday** | 4 scripts ek saath | `EP##` × 4 |
| **Monday** | 4 videos ke Flow clips (batch) | 28 clips |
| **Tuesday** | 4 VO + 2 edits | 2 final videos |
| **Wednesday** | 2 edits + captions | 4 final videos |
| **Thursday** | QC + platform copy × 4 | Upload-ready |
| **Fri–Sat** | Buffer + comment replies + research | — |

Ye system se aap **4 din ke kaam me poora hafta** nikal deti ho.

---

## File naming convention

```
scripts/EP01-maa-kehti-hai-kha-liya.md
prompts/03-EP01-flow-prompt-pack.md
assets/character-sheets/noor-front.png
assets/clips/EP01/clip1-hook.mp4
assets/clips/EP01/clip5-twist.mp4
assets/audio/EP01-vo.wav
assets/final/EP01-maa-kehti-hai-kha-liya-1080x1920.mp4
```

Har EP ke liye folder — baad me dhoondna aasan.

---

## Credits budget (mahine ka)

| Item | Clips | Tier | Approx |
|---|---|---|---|
| 30 episodes × 7 clips | 210 | Fast (test) | 210 × ~20 = 4,200 |
| 30 best-of re-generate | 30 | Quality | 30 × ~100 = 3,000 |
| Character sheets | ~10 | Imagen | minimal |
| **Total** | | | **~7,200 credits/month** |

> Rates Flow ke plan pe depend karte hain — apne panel me current rate dekh lo.
> Agar budget tight ho: **Fast se hi final banao**, sirf hook + twist clip Quality pe.
