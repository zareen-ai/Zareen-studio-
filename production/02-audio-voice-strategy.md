# 02 — Audio & Voice Strategy

> Ye channel ki **doosri sabse important cheez** hai — chehre ke baad.
> Agar awaaz har video me badli, audience ka trust toot jayega.
> **100 videos tak ek hi awaaz. Koi compromise nahi.**

---

## 3 options — meri recommendation Option 2

### Option 1 — Flow ka native dialogue (Veo 3.1)

Prompt me dialogue likho, Flow khud awaaz + lip-sync bana dega.

| ✅ | ⚠️ |
|---|---|
| Ek hi pass me video + audio | Roman Urdu/Hinglish me accent inconsistent |
| Lip-sync automatic | Har clip me awaaz thodi alag ho sakti hai |
| Extra tool nahi chahiye | Line 12 words se lambi ho to kat jati hai |
| | Dubara generate = credit dobara |

**Kab use karo:** sirf **hook line** ke liye (clip 1) — kyunki wahan lip-sync
sabse zyada dikhta hai. Baaki clips silent.

---

### ⭐ Option 2 — Silent Flow video + alag voiceover (RECOMMENDED)

Flow me video bina dialogue ke banao (`Audio: no dialogue, room tone only`),
phir edit me TTS ya apni recording overlay karo.

| ✅ | ⚠️ |
|---|---|
| Awaaz 100% consistent, 100 videos tak | Lip-sync exact nahi hota |
| Roman Urdu/Hinglish ka pura control | Ek extra step |
| Retake free — sirf audio dobara, credit nahi jata | |
| Delivery (pause, speed, emotion) tune kar sakti ho | |
| Chehra khraab ban gaya to awaaz bach jati hai | |

**Lip-sync ka masla kaise hal karein:**
1. UGC selfie style me viewer lip-sync expect hi nahi karta
2. Har video me 2–3 clips B-roll/insert hote hain (chehra hi nahi)
3. Hook aur moral pe tight CU — wahan chhoti si mismatch chalti hai
4. Silent prompt me `lips moving naturally as she speaks softly` likho —
   Flow mouth movement banata hai, jo kaafi match karta hai

**Voiceover kahan se:**
- **ElevenLabs** — best quality. Hindi/Urdu voices available. Voice clone bhi
  (apni awaaz ka ek consistent voice bana lo — ye sabse strong option hai)
- **Murf / Play.ht** — Hindi voices, sasta
- **Apni khud ki awaaz** — sabse asli, lekin consistency aur time ka masla
- **Edge TTS (free)** — Microsoft ke Hindi voices, quality theek-thaak

**Voice ka spec (jo bhi tool ho, ye settings):**
```
Gender:        Female
Age:           22–26
Accent:        North Indian / Pakistani (Hindustani)
Speed:         0.92× (normal se thoda dheema)
Pitch:         neutral, thoda neeche
Emotion:       warm, storytelling
Pauses:        manual — comma pe 0.3s, period pe 0.6s, twist se pehle 1.0s
```

---

### Option 3 — Khud record karo (phone se)

| ✅ | ⚠️ |
|---|---|
| Sabse asli — koi AI detect nahi kar sakta | Har episode me 20–30 min lagta hai |
| Bilkul free | Awaaz consistent rakhna mushkil (tabiyat, mood) |
| Emotion sabse behtar | Background noise ka masla |
| | Aap channel ka chehra ban jati ho (privacy) |

**Record karne ka tareeqa:**
- Phone ka voice recorder, blanket ke andar (echo khatam)
- Fan/AC band, raat ke time
- Har line 2-3 baar, phir best chuno
- Normalize + halka noise reduction (Audacity free hai)

---

## Mera final sujhav

```
Phase 1 (Din 1–30):   Option 2 — ElevenLabs ya Edge TTS ki ek fixed female Hindi voice
                      + clip 1 (hook) me Flow native dialogue test karo
Phase 2 (Din 31–60):  ElevenLabs voice clone — apni ya kisi dost ki awaaz ka
                      ek permanent voice bana lo (10 min ka sample chahiye)
Phase 3 (Din 61+):    Wahi cloned voice har video me. Kabhi mat badalna.
```

---

## Music strategy

| Layer | Detail |
|---|---|
| **Style** | Soft solo piano + halka bansuri/sitar/sarangi pad. Lo-fi nahi — emotional acoustic |
| **Volume** | Voice ke neeche **−18 dB**. Voice hamesha clear |
| **Silence** | Twist se theek pehle **0.5s poora mute** — ye retention ka weapon hai |
| **Where from** | YouTube Audio Library (free, monetizable) · Pixabay Music · Freesound |
| **Kabhi nahi** | Trending Bollywood gaane — copyright strike + reach kill |
| **Consistency** | Ek hi 3–4 track ka library bana lo, har video me wahi. Audience ko pehchaan ho jati hai |

**Recommended mood-wise library (khud banao):**

| Track | Kab |
|---|---|
| `soft-piano-01` | Default — har video |
| `bansuri-warm` | P1 Rishton, P5 Bachpan |
| `tension-low-drone` | P6 Karma, conflict beats |
| `hope-strings` | Moral + ending |
| `silence` | Twist se pehle |

---

## SFX library (ye 10 sound kaafi hain)

| SFX | Kab |
|---|---|
| Steel cup clink | Chai wale shots |
| Page turn | Diary, book |
| Kitchen hum / fridge | Kitchen scenes |
| Baarish + thunder | Mausam shots |
| Gali ki ambience (cycle bell, vendor) | B-roll |
| Ek gehri saans | Twist/moral |
| Halki siski (bachcha) | Bachchon wale episodes |
| Tarazu ka khanak | Dukaan/bazaar |
| Darwaza khulna | Entry/exit |
| Dil ki dhadkan (halki) | Tension |

Sab Freesound.org se free milte hain. Ek folder me save karo: `assets/sfx/`

---

## Audio mixing checklist

- [ ] Voice peak: −6 dB se upar na jaye (clip na ho)
- [ ] Voice loudness: **−14 LUFS** (Shorts/Reels ka standard)
- [ ] Music: −18 dB voice ke neeche
- [ ] Twist pe 0.5s silence hai
- [ ] Koi bhi word katra hua nahi
- [ ] Phone pe sun ke check (speaker pe, headphone pe nahi)
- [ ] Sound OFF karke bhi captions se kahani samajh aa rahi hai
