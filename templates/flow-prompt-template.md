# Flow Prompt Template — har clip isi formula se likho

## Flow (Veo 3.1) ka prompt formula

```
SUBJECT + ACTION + ENVIRONMENT + CAMERA + LIGHTING + AUDIO + CONSTRAINT
```

Har clip me ye 7 cheezein honi chahiye. Ek bhi gayab → result generic.

---

## Rules (in ko todna = credit barbaad)

1. **Ek clip = ek shot = ek action.** "Wo uthti hai, chalti hai, baithti hai" mat likho.
2. **Ek camera move.** `slow push-in` ✅ / `push-in then pan then crane` ❌
3. **Dialogue quotes me, speaker ka naam ke saath.** Line **12 words se chhoti**.
4. **8 second clip me ~20 words max.** 45 second video = 6 clips.
5. **Lighting describe karo, mood nahi.** `warm tungsten lamp from the left` ✅ / `cinematic` ❌
6. **Hamesha likho:** `vertical 9:16`, `no text, no captions, no logos, no watermark`
7. **Character consistency ke liye Ingredients to Video** use karo —
   text-only prompt se chehra har clip me badal jayega.
8. **Model tier:** pehle **Fast** se test karo, best clip ko **Quality** se dobara banao.
9. **Har important shot ke 3–4 variations** banao. Hit rate kam hai — ye normal hai.

---

## Blank clip prompt (copy karo)

```
[SHOT TYPE], vertical 9:16. [SUBJECT — full character description from bible].
[ACTION — one clear action, present tense]. [ENVIRONMENT — the storytelling corner].
[LIGHTING — source + direction + quality]. [CAMERA — one move].
Audio: [ambience], [SFX], [dialogue in quotes OR "no dialogue"].
Style: realistic UGC smartphone video, natural skin texture, visible pores,
subtle handheld micro-shake, warm colour grade, shallow depth of field.
No text, no captions, no subtitles, no logos, no watermark, no on-screen UI.
One continuous shot, preserve her face and outfit exactly as the reference.
```

---

## Clip duration plan

| Video length | Clips | Total credits (Fast ≈ 20/clip) |
|---|---|---|
| 40s | 5 × 8s | ~100 |
| **45s (default)** | **6 × 8s** | **~120** |
| 60s | 8 × 8s | ~160 |

> Note: Flow ke credit rates plan ke hisaab se badalte rehte hain
> (Lite / Fast / Quality). Apne panel me current rate check kar lo.

---

## Ingredient tagging

Flow me jab aap Ingredients to Video me images daalte ho,
prompt me unhe clearly map karo:

```
The woman from image 1 (Noor), sitting in the room from image 2, ...
```

Ya Flow ke `@ingredient` tag UI se attach karo. **Order matter karta hai** —
pehli image sabse zyada identity-defining honi chahiye (Noor ka front face).

---

## Dialogue ke 2 tarike (ek choose karo)

### Option A — Native dialogue (Veo 3.1)
Prompt me dialogue likho, Flow khud lip-sync karega.
- ✅ Ek pass me sab, lip-sync automatic
- ⚠️ Roman Urdu/Hinglish me accent aur pronunciation inconsistent ho sakta hai
- ⚠️ Har clip me awaaz thodi alag ho sakti hai

```
She looks into the lens and says: "Maa ne kabhi nahi kaha ke use bhook lagi hai."
Audio: warm young South Asian female voice, soft room tone, no music.
```

### Option B — Silent video + alag voiceover (RECOMMENDED)
Video bina dialogue ke banao, phir edit me TTS/recording overlay karo.
- ✅ 100 episodes tak ek hi awaaz — perfect consistency
- ✅ Roman Urdu/Hinglish ka pura control
- ✅ Retakes free — sirf audio dobara
- ⚠️ Lip-sync exact nahi hota (lekin UGC style me chalta hai,
   aur 60% time cutaway B-roll hota hai)

```
She looks into the lens and speaks softly, lips moving naturally,
as if telling a story to a friend. No audible dialogue — silent mouth movement only.
Audio: quiet room tone, distant street sounds, no music, no voice.
```

> **Mera sujhav:** Option B se shuru karo. Jab Flow ki native Urdu/Hinglish
> voice test karke achhi lage, tab important hooks ke liye Option A use karo.
> Details: `production/02-audio-voice-strategy.md`
