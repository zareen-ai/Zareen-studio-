/* =========================================================
   SLIDES — "6 Mahine Ki Khamosh Tabdeeli"
   Content + layout definitions. Har slide ka apna duration
   aur voiceover (vo) text hai.
   ========================================================= */

const K = (t) => `<div class="kicker" data-anim>${t}</div>`;
const T = (t, cls = "title") => `<h2 class="${cls}" data-anim>${t}</h2>`;
const S = (t, cls = "sub") => `<h3 class="${cls}" data-anim>${t}</h3>`;
const L = (t) => `<p class="lead" data-anim>${t}</p>`;
const P = (t) => `<p class="small" data-anim>${t}</p>`;
const RULE = () => `<div class="rule" data-anim></div>`;
const FOOT = (left, right) =>
  `<div class="slide-foot"><span data-anim>${left}</span><span class="dots"></span><span data-anim>${right}</span></div>`;

const card = ({ n, h, p, cls = "" }) =>
  `<div class="card ${cls}" data-anim>
     ${n ? `<div class="n">${n}</div>` : ""}
     <h4>${h}</h4>
     ${p ? `<p>${p}</p>` : ""}
   </div>`;

const cards = (list, cols = "g3") =>
  `<div class="grid ${cols}">${list.map(card).join("")}</div>`;

const row = (cells) =>
  `<div class="row c${cells.length}" data-anim>${cells
    .map((c, i) => `<div class="cell ${i === 0 ? "h" : ""}">${c}</div>`)
    .join("")}</div>`;

const rows = (list, header = true) =>
  `<div class="rows ${header ? "header" : ""}">${list.map(row).join("")}</div>`;

const stat = (v, l, gold = false) =>
  `<div class="stat" data-anim><div class="v ${gold ? "gold" : ""}">${v}</div><div class="l">${l}</div></div>`;

const tl = (t, d) => `<div class="tl-item" data-anim><div class="t">${t}</div><div class="d">${d}</div></div>`;
const timeline = (items) => `<div class="timeline">${items.map((i) => tl(i[0], i[1])).join("")}</div>`;

const check = (items, box = true) =>
  `<ul class="check ${box ? "" : "no-box"}">${items
    .map((i) => `<li ${typeof i === "string" ? "" : i.done ? 'class="done"' : ""}>${typeof i === "string" ? i : i.t}</li>`)
    .join("")}</ul>`;

const sched = (items) =>
  `<div class="sched">${items
    .map(
      ([tm, wh, wy]) =>
        `<div class="sched-item" data-anim><div class="tm">${tm}</div><div><div class="wh">${wh}</div><div class="wy">${wy}</div></div></div>`
    )
    .join("")}</div>`;

const meter = (name, val, w) =>
  `<div class="meter" data-anim style="--w:${w}%"><div class="top"><span class="name">${name}</span><span class="val">${val}</span></div><div class="track"><i class="fill"></i></div></div>`;

const month = (mn, h, d) =>
  `<div class="month" data-anim><div class="mn">${mn}</div><div class="mh">${h}</div><div class="md">${d}</div></div>`;

const callout = (t, s) =>
  `<div class="callout" data-anim><div class="ct">${t}</div>${s ? `<div class="cs">${s}</div>` : ""}</div>`;

/* ---------- deck ---------- */
export const SLIDES = [
  {
    // 01 — TITLE
    chapter: "00",
    dur: 11,
    vo: "Log tumhe chhe mahine baad pehchan nahi payenge. Yeh kahani motivation ki nahi hai. Yeh kahani hai ek system ki.",
    html: `
      <div class="stack">
        ${K("Ek cinematic guide &nbsp;·&nbsp; 6 mahine &nbsp;·&nbsp; 7 systems")}
        <h1 class="display" data-anim>6 Mahine Ki<br><span class="gold">Khamosh</span> Tabdeeli</h1>
        ${S("Log tumhe chhe mahine baad <em>pehchan</em> nahi payenge.")}
        ${RULE()}
        <div class="pills" data-anim>
          <span class="pill gold">Announce nahi karna</span>
          <span class="pill">Sirf execute karna</span>
          <span class="pill">System &gt; Motivation</span>
          <span class="pill">180 din</span>
        </div>
      </div>
      ${FOOT("Silent Transformation Program", "Chapter 00 — Shuruaat")}`
  },
  {
    // 02 — HOOK
    chapter: "01",
    dur: 12,
    vo: "Socho. Ek saal pehle tum ne jo faisla kiya tha, wo aaj kahan hai? Wahi subah, wahi phone, wahi raat. Farq sirf itna hai ke ab tum thak chuke ho.",
    html: `
      <div class="stack">
        ${K("Pehla sawal")}
        <h2 class="title" data-anim>Ek saal pehle jo <span class="gold">faisla</span> kiya tha…<br>wo aaj kahan hai?</h2>
        <div class="split wide-left" data-anim>
          ${L("Wahi subah. Wahi phone. Wahi raat. Wahi waade jo tum khud se karte ho aur tod dete ho.<br><br>Farq sirf itna hai ke ab tum <mark>thak</mark> chuke ho — aur yeh thakan sabse behtareen cheez hai jo tumhare paas aaj hai.")}
          <div class="card accent">${`<div class="n">۱۸۰</div><h4>Din kaafi hain</h4><p>6 mahine ek lambi mudat nahi. Ek school ka session. Ek internship. Ek pregnancy se kam. Aur ismein poori zindagi ka rukh badal sakta hai.</p>`}</div>
        </div>
      </div>
      ${FOOT("Khamosh Tabdeeli", "02")}`
  },
  {
    // 03 — PROMISE
    chapter: "01",
    dur: 12,
    vo: "Agle chhe mahine, tum gayab ho jaoge. Koi announcement nahi, koi story nahi. Sirf kaam. Aur jis din tum wapas aoge, tumhara kaam tumhara shor ban chuka hoga.",
    html: `
      <div class="stack">
        ${K("Promise")}
        <div class="split">
          <div class="stack">
            <h2 class="title" data-anim>Tum <span class="gold">gayab</span> ho jaoge.<br>Kaam <em>bolta</em> rahega.</h2>
            ${L("Yeh koi «chalange» nahi hai jo 3 din mein toot jaye. Yeh ek <mark>chup-chaap chalne wala system</mark> hai — jise koi dekh nahi sakta, lekin jis ka nateeja sab dekhte hain.")}
            ${callout("Khamoshi ka faida", "Jab log tumhare plan se waqif nahi hote, to unki raaye tumhare raaste ko modti nahi. Tumhari tawajjo banti hai, bant-ti nahi.")}
          </div>
          <div class="stack">
            ${cards(
              [
                { n: "01", h: "Naya chehra", p: "Fitness, posture, skin, energy — sab badalta hai." },
                { n: "02", h: "Naya dimagh", p: "Focus, kitab ka ilmi zakhira, soch ka mayaar." },
                { n: "03", h: "Nayi jeb", p: "Ek aisi skill jo market mein bikti hai." }
              ],
              "g2"
            )}
          </div>
        </div>
      </div>
      ${FOOT("Promise", "03")}`
  },
  {
    // 04 — WHY 6 MONTHS
    chapter: "02",
    dur: 13,
    vo: "Chhe mahine kyun? Kyunke pehla mahina tum purane aadmi ko marte dekhte ho. Doosre se chautha mahina, naya aadmi banta hai. Aur panchwa aur chhata mahina, duniya ko nazar aana shuru hota hai.",
    html: `
      <div class="stack">
        <div class="head">${K("Logic")}${T("6 mahine hi kyun?")}</div>
        ${timeline([
          ["Month 1 — Detox", "Purana system tootta hai. Sab se mushkil. Yahan 90% log quit karte hain."],
          ["Month 2–3 — Rewire", "Dimagh nayi aadaton ko normal maan ne lagta hai. Ab mehnat kam, aadat zyada."],
          ["Month 4 — Evidence", "Pehla visible result: body, kaam, ya pehla paisa. Yahan yaqeen paida hota hai."],
          ["Month 5 — Momentum", "Log poochna shuru karte hain: «kya kar rahe ho?» Tum jawab nahi dete."],
          ["Month 6 — Reveal", "Nateeja itna bara hota hai ke batane ki zaroorat nahi parti."]
        ])}
        ${callout("Rule of compound", "Roz 1% behtar = 180 din mein ~5.9x. Roz 1% sust = 180 din mein 0.16x. Faisla roz hota hai, saal mein ek baar nahi.")}
      </div>
      ${FOOT("Logic", "04")}`
  },
  {
    // 05 — WHY CHANGE FAILS
    chapter: "03",
    dur: 13,
    vo: "Log fail kyun hote hain? Teen wajohaat. Maqsad dhundhla hota hai. Woh motivation pe chalte hain, system pe nahi. Aur sab se bara qatil: woh apna plan sab ko bata dete hain.",
    html: `
      <div class="stack">
        <div class="head">${K("Diagnosis")}${T("Tabdeeli fail kyun hoti hai?")}${S("Ilzaam tumhari mehnat par nahi — tumhare <em>tareeqe</em> par hai.")}</div>
        ${cards(
          [
            { n: "01", h: "Maqsad dhundhla hai", p: "«Mehnat karunga» ek ehsaas hai, target nahi. Jo naapa nahi ja sakta, wo poora nahi hota.", cls: "clayc" },
            { n: "02", h: "Motivation pe bharosa", p: "Motivation mausam hai, system building hai. Mausam roz badalta hai, building khari rehti hai.", cls: "clayc" },
            { n: "03", h: "Plan announce kar dena", p: "Tareef milte hi dimagh ko lagta hai kaam ho gaya. Phir asli kaam ki talab khatam.", cls: "clayc" }
          ],
          "g3"
        )}
        ${rows([
          ["Galat tareeqa", "Sahi tareeqa"],
          ["«Kal se shuru karunga»", "«Aaj raat 10 minute»"],
          ["«Roz 4 ghante padhunga»", "«Roz 45 minute, bina naga»"],
          ["«Sab kuch badalna hai»", "«Ek cheez, poore 6 mahine»"]
        ])}
      </div>
      ${FOOT("Diagnosis", "05")}`
  },
  {
    // 06 — LOUD VS SILENT
    chapter: "03",
    dur: 12,
    vo: "Do raaste hain. Shor wala raasta: roz post, roz story, roz wada. Aur khamosh raasta: roz kaam, koi gawahi nahi. Pehla raasta tareef deta hai, doosra nateeja.",
    html: `
      <div class="stack">
        <div class="head">${K("Farq")}${T("Shor vs Khamoshi")}</div>
        <div class="vs">
          <div class="vs-col bad" data-anim>
            <h4 class="clay">LOUD CHANGE</h4>
            <ul>
              <li>Har din story, har hafte announcement</li>
              <li>Tareef se dopamine — kaam se nahi</li>
              <li>Log raaye dete hain, tum ruk jate ho</li>
              <li>Toota to izat ka darr, chhupaate ho</li>
              <li>6 hafte baad: sab khatam</li>
            </ul>
          </div>
          <div class="vs-mid" data-anim>VS</div>
          <div class="vs-col good" data-anim>
            <h4 class="sage">SILENT CHANGE</h4>
            <ul>
              <li>Koi announcement nahi — sirf routine</li>
              <li>Nateeja se dopamine</li>
              <li>Koi rokne wala nahi, koi modne wala nahi</li>
              <li>Toota to chup-chaap wapas line pe</li>
              <li>6 mahine baad: sab hairan</li>
            </ul>
          </div>
        </div>
        ${callout("Asli baat", "Khamoshi kamzori nahi — strategy hai. Tum apni tawajjo ko bacha rahe ho, jahan uski sab se zyada zaroorat hai: kaam par.")}
      </div>
      ${FOOT("Farq", "06")}`
  },
  {
    // 07 — MAP / 7 PILLARS
    chapter: "04",
    dur: 15,
    vo: "Poora naqsha yeh hai. Saat sutoon: pehchan, dopamine reset, gehra kaam, jism, dimagh, paisa, aur mahaul. Phir un pe do cheezein: tracking aur relapse plan. Saat plus do. Bas.",
    html: `
      <div class="stack">
        <div class="head">${K("Poora system — ek nazar mein")}${T("7 Sutoon + 2 Hifazati Deewarein")}</div>
        ${cards(
          [
            { n: "I", h: "Pehchan", p: "Main kaun ban raha hoon — sab se pehle yeh.", cls: "accent" },
            { n: "II", h: "Dopamine Reset", p: "Focus wapas lana — 7 din ka protocol." },
            { n: "III", h: "Gehra Kaam", p: "Roz 2 ghante, ek skill, zero multitasking.", cls: "accent" },
            { n: "IV", h: "Jism", p: "Neend, paani, chalna, taqat." },
            { n: "V", h: "Dimagh", p: "12 kitabein, roz 10 safhe, journaling." },
            { n: "VI", h: "Paisa", p: "Ek income skill + bachat ki aadat.", cls: "accent" },
            { n: "VII", h: "Mahaul", p: "Log, phone, kamra — teeno saaf karo." },
            { n: "+", h: "Tracking", p: "Hafte ka 20-minute review. Jo naapa, wo sudhra.", cls: "sagec" },
            { n: "+", h: "Relapse Plan", p: "Girne ke baad wapsi ka rasta pehle se tay.", cls: "sagec" }
          ],
          "g3"
        )}
      </div>
      ${FOOT("System Map", "07")}`
  },
  {
    // 08 — CHAPTER 1
    chapter: "05",
    dur: 8,
    vo: "Sutun number ek. Pehchan. Kyunke tum wahi karte ho, jo tum khud ko maante ho.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — I</div>
        <h1 class="display" data-anim>Pehchan</h1>
        ${S("Tum wahi karte ho jo tum <em>khud ko</em> maante ho.")}
        ${RULE()}
        ${P("Behavior change tab tak nahi tikta jab tak identity change na ho.")}
      </div>
      ${FOOT("Chapter I", "08")}`
  },
  {
    // 09 — IDENTITY
    chapter: "05",
    dur: 13,
    vo: "Yeh ek safhe ka amal hai. Likhna: main kaun hoon, main kya karta hoon, main kya nahi karta, aur main kahan ja raha hoon. Phir roz ek chhota sa faisla uss naye insaan ki tarah lena.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Exercise 01")}
          ${T("Ek safha likho")}
          ${L("Kaghaz ya notes app — farq nahi parta. Lekin <mark>likhna zaroori hai</mark>, sochna kaafi nahi.")}
          ${check([
            { t: "<b>Main kaun hoon:</b> 3 lines, bina shikayat" },
            { t: "<b>Main kya karta hoon:</b> roz ke 3 kaam jo meri pehchan hain" },
            { t: "<b>Main kya NAHI karta:</b> 3 cheezein jo maine hamesha ke liye chhori" },
            { t: "<b>Main kahan ja raha hoon:</b> 6 mahine baad ki tasveer" }
          ])}
          ${callout("Roz ka test", "Har faisla lene se pehle ek sawal: <b>«Kya yeh us insaan wala kaam hai jo main ban raha hoon?»</b> Agar jawab «na» hai — mat karo.")}
        </div>
        <div class="stack">
          <div class="card dark accent" data-anim>
            <div class="n">Aadat vs Pehchan</div>
            <h4>"Mujhe daurne ki koshish karni hai"</h4>
            <p>Yeh aadat ki zubaan hai — toot jati hai.</p>
            <h4 style="margin-top:18px">«Main ek runner hoon»</h4>
            <p>Yeh pehchan ki zubaan hai — barish ho ya na ho, runner daurta hai.</p>
          </div>
          <div class="note" data-anim>
            <div class="tiny" style="margin-bottom:8px">Aaj raat ka kaam</div>
            ${P("10 minute. Ek safha. Phone door. Yehi tumhare 6 mahine ki neev hai.")}
          </div>
        </div>
      </div>
      ${FOOT("Pehchan", "09")}`
  },
  {
    // 10 — CHAPTER 2
    chapter: "06",
    dur: 8,
    vo: "Sutun number do. Dopamine reset. Tumhara dimagh toota hua nahi hai — trained hai. Aur jise train kiya gaya, use dobara train bhi kiya ja sakta hai.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — II</div>
        <h1 class="display" data-anim>Dopamine<br>Reset</h1>
        ${S("Tumhara dimagh toota nahi — <em>trained</em> hai.")}
        ${RULE()}
        ${P("Aur jo cheez train hui hai, wo dobara train ho sakti hai.")}
      </div>
      ${FOOT("Chapter II", "10")}`
  },
  {
    // 11 — DOPAMINE
    chapter: "06",
    dur: 12,
    vo: "Screen time dekho. Phir socho ke tum us waqt kya ban rahe the. Dopamine reset ka matlab duniya chhorna nahi, dimagh ko wapas aam cheezon mein maza aane ke qabil banana hai.",
    html: `
      <div class="stack">
        <div class="head">${K("Aaina")}${T("Tumhara roz ka screen time?")}${S("Phone kholo → Settings → Screen Time. Wahi number tumhari <em>asal</em> zindagi ka hisaab hai.")}</div>
        <div class="stats">
          ${stat("4.8<span style='font-size:.35em'> ghante</span>", "Ek aam naujawan ka roz ka screen time", true)}
          ${stat("~730", "Saal bhar mein sirf scroll ke din — yani 2 poore saal", false)}
          ${stat("150<span style='font-size:.35em'> baar</span>", "Roz phone uthane ki tadaad", false)}
        </div>
        ${rows([
          ["Sasti dopamine", "Mehngi dopamine"],
          ["Reels / shorts", "Ek skill ka ek chapter mukammal karna"],
          ["Junk food + cold drink", "Pasina bahana, workout khatam karna"],
          ["Doosron ki zindagi dekhna", "Apni zindagi ka ek din behtar banana"],
          ["Raat 2 baje tak scrolling", "Subah 5:30 ki khamoshi"]
        ])}
      </div>
      ${FOOT("Dopamine Reset", "11")}`
  },
  {
    // 12 — 7 DAY PROTOCOL
    chapter: "06",
    dur: 14,
    vo: "Saat din ka protocol. Pehle do din sar dard hoga, chidchirapan hoga. Teesre din neend behtar. Panchwe din khayalat saaf. Aur saatwen din tum hairan ho ge ke ek din kitna bara hota hai.",
    html: `
      <div class="stack">
        <div class="head">${K("Protocol")}${T("7 Din Ka Reset")}</div>
        ${rows([
          ["Din", "Kya hoga", "Kya karna hai"],
          ["1–2", "Withdrawal", "Sab notifications off. App home screen se hatao. Sirf 2 waqt phone check."],
          ["3–4", "Ubaas + bechaini", "20 minute bahar walk, bina phone. Paani zyada. Jaldi so jao."],
          ["5", "Focus lautna shuru", "Pehla 45-minute deep work session — timer ke saath."],
          ["6", "Mood behtar", "Ek kitab ke 10 safhe. Ek insaan se asli mulaqat."],
          ["7", "Naya normal", "Poora din bina short-video. Shaam ko khud ko note karo: kya badla?"]
        ])}
        <div class="split" data-anim>
          ${callout("Chhorne wali cheezein", "Shorts/reels apps · Notifications · Raat 11 ke baad screen · Junk food daily · Ek se zyada kaam saath karna")}
          ${callout("Rakhne wali cheezein", "Family calls · Kaam ki chats · Ek music playlist · Notes app · Camera")}
        </div>
      </div>
      ${FOOT("Dopamine Reset", "12")}`
  },
  {
    // 13 — CHAPTER 3
    chapter: "07",
    dur: 8,
    vo: "Sutun teen. Gehra kaam. Yeh woh hissa hai jo tumhe baaki logon se alag karega — kyunke yahi sab se boring aur sab se powerful hai.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — III</div>
        <h1 class="display" data-anim>Gehra Kaam</h1>
        ${S("Roz <em>2 ghante</em>. Ek skill. Zero multitasking.")}
        ${RULE()}
        ${P("Boring hai — aur isiliye kaam karta hai.")}
      </div>
      ${FOOT("Chapter III", "13")}`
  },
  {
    // 14 — DEEP WORK
    chapter: "07",
    dur: 12,
    vo: "Do ghante roz. Phone doosre kamre mein. Timer on. Ek kaam. Nau din mein atharah ghante. Ek mahine mein saath ghante. Ek saal mein aath sau atharah ghante. Yahi farq hai aam aur khaas mein.",
    html: `
      <div class="stack">
        <div class="head">${K("Maths")}${T("2 Ghante Roz = Kya banta hai?")}</div>
        <div class="stats">
          ${stat("14<span style='font-size:.35em'> ghante</span>", "Ek hafte mein", false)}
          ${stat("60<span style='font-size:.35em'> ghante</span>", "Ek mahine mein", false)}
          ${stat("360<span style='font-size:.35em'> ghante</span>", "6 mahine mein", true)}
          ${stat("~2<span style='font-size:.35em'> saal</span>", "Itne ghante ek university degree ke barabar", false)}
        </div>
        ${cards(
          [
            { n: "1", h: "Ek skill chuno", p: "Do nahi. Ek. «Main sab seekh lunga» ka matlab hai kuch nahi seekhoge.", cls: "accent" },
            { n: "2", h: "Ek waqt fix karo", p: "Roz same time. Subah behtar — dimagh fresh, duniya chup.", cls: "accent" },
            { n: "3", h: "Ek jagah fix karo", p: "Wahi kursi, wahi meiz. Dimagh ko ishara mil jata hai ke ab kaam ka waqt hai.", cls: "accent" },
            { n: "4", h: "Timer lagao", p: "50 minute kaam + 10 minute break. Do round. Bas. Is se zyada nahi.", cls: "accent" }
          ],
          "g4"
        )}
      </div>
      ${FOOT("Gehra Kaam", "14")}`
  },
  {
    // 15 — 90 DAY SKILL
    chapter: "07",
    dur: 12,
    vo: "Nau din ka roadmap. Pehle tees din bunyadi cheezein aur consistency. Agle tees din ek asli project. Aur aakhri tees din us project ko portfolio mein badalna — taake log dekh saken.",
    html: `
      <div class="stack">
        <div class="head">${K("Roadmap")}${T("90 Din Mein Ek Skill")}</div>
        ${cards(
          [
            { n: "Din 1–30", h: "Buniyad", p: "Ek course ya playlist mukammal. Roz chhoti practice. Koi project nahi — sirf haath set karna. Target: roz aana, chahe 20 minute ho.", cls: "" },
            { n: "Din 31–60", h: "Asli Project", p: "Ek cheez banao jo asli lage: ek video, ek website, ek design, ek article. Ghalat banega — banega zaroor.", cls: "accent" },
            { n: "Din 61–90", h: "Portfolio + Pehla Paisa", p: "3 sample tayar karo. Ek jagah rakho (Drive/Behance/GitHub). 10 logon ko bhejo. Pehla client yahin se aata hai.", cls: "sagec" }
          ],
          "g3"
        )}
        ${callout("Sab se bara jhoot", "«Pehle mujhe poora seekhna hai, phir kaam karunga.» — Nahi. Seekhna kaam karne ke <b>dauran</b> hota hai. Pehla project hamesha bura hota hai, aur yahi zaroori hai.")}
      </div>
      ${FOOT("Gehra Kaam", "15")}`
  },
  {
    // 16 — CHAPTER 4
    chapter: "08",
    dur: 8,
    vo: "Sutun char. Jism. Kyunke jism thaka hua ho to dimagh koi system nahi chala sakta.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — IV</div>
        <h1 class="display" data-anim>Jism</h1>
        ${S("Neend sab se sasti <em>performance</em> hai — aur sab se kam khareedi jati hai.")}
        ${RULE()}
      </div>
      ${FOOT("Chapter IV", "16")}`
  },
  {
    // 17 — BODY
    chapter: "08",
    dur: 13,
    vo: "Yeh tumhara roz ka template hai. Uthna, paani aur roshni, bees minute ki harkat, phir do ghante ka gehra kaam. Shaam ko kitab, aur raat das buje sone jana. Bas itna.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Daily template")}
          ${T("Ek Din Ka Naqsha")}
          ${L("Isay copy karne ki zaroorat nahi — apni zaroorat ke hisaab se <mark>dhail</mark> lo. Lekin tarteeb wahi rakho: pehle jism, phir kaam, phir dimagh, phir neend.")}
          ${cards([{ n: "3", h: "Non-negotiables", p: "7–8 ghante neend · 20 minute harkat · 8 glass paani. Yeh teen kabhi miss nahi hone chahiye — baaki sab optional hai." }], "g2")}
        </div>
        <div class="stack">
          ${sched([
            ["5:30", "Uthna", "Alarm phone se door. Pehla ghunt tumhare naam."],
            ["5:40", "Paani + roshni", "Do glass paani, khirki ya chat par 10 minute."],
            ["6:00", "Harkat (20–40 min)", "Walk, push-ups, stretching — gym zaroori nahi."],
            ["7:00", "Gehra kaam (2 ghante)", "Skill. Timer. Phone doosre kamre mein."],
            ["Din", "Kaam / parhai", "Normal zindagi, lekin ab focus ke saath."],
            ["20:00", "Kitab (20 min)", "10 safhe. Sone se pehle screen nahi."],
            ["22:30", "Sona", "Ye sabse ahem appointment hai — khud se."]
          ])}
        </div>
      </div>
      ${FOOT("Jism", "17")}`
  },
  {
    // 18 — CHAPTER 5
    chapter: "09",
    dur: 8,
    vo: "Sutun paanch. Dimagh. Jo tum roz parhte ho, wahi tum ban jate ho — chahe tum yaad rakho ya na rakho.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — V</div>
        <h1 class="display" data-anim>Dimagh</h1>
        ${S("Roz 10 safhe. <em>12 kitabein.</em> Ek naya tareeqa-e-soch.")}
        ${RULE()}
      </div>
      ${FOOT("Chapter V", "18")}`
  },
  {
    // 19 — BOOKS
    chapter: "09",
    dur: 13,
    vo: "Barah kitabein. Har mahine do. Aadhe ghante ki parhai, aur roz sirf das safhe. Is mein se aik kitab bhi tumhari soch badal de, to poora saal wasool ho gaya.",
    html: `
      <div class="stack">
        <div class="head">${K("Reading list")}${T("12 Kitabein — 6 Mahine")}${S("Har mahine 2. Roz 10 safhe = 30 minute. Bas.")}</div>
        ${rows([
          ["Mahine", "Kitab", "Kyun"],
          ["1", "Atomic Habits", "Aadat ka system — poore plan ki neev."],
          ["1", "The Compound Effect", "Chhoti cheezon ki taqat samajh aayegi."],
          ["2", "Deep Work", "Focus kaise banta hai — practically."],
          ["2", "Ek Hi Baat (Dr. Israr)", "Niyat aur discipline ka roohani pehlu."],
          ["3", "Can't Hurt Me", "Jab himmat toote, yeh kitab uthati hai."],
          ["3", "Man's Search for Meaning", "Maqsad mil jaye to takleef bardasht ho jati hai."],
          ["4", "Psychology of Money", "Paisa kamana nahi, paisa samajhna."],
          ["4", "Think and Grow Rich", "Soch ka mayaar badalta hai."],
          ["5", "Meditations", "Apne aap se baat karne ka tareeqa."],
          ["5", "Ikigai", "Lambi aur bameani zindagi ka formula."],
          ["6", "The 7 Habits", "Character — skill se aage ki cheez."],
          ["6", "The Alchemist", "Safar ka yaqeen wapas dilati hai."]
        ])}
      </div>
      ${FOOT("Dimagh", "19")}`
  },
  {
    // 20 — JOURNALING
    chapter: "09",
    dur: 11,
    vo: "Roz raat teen lines. Aaj kya acha kiya. Aaj kya seekha. Kal kya theek karna hai. Teen minute ka amal, aur tumhara dimagh saaf ho jata hai.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Exercise 02")}
          ${T("Roz 3 Lines")}
          ${L("Journaling ka matlab roz 2 safhe likhna nahi. Matlab: <mark>apne din ka hisaab</mark> khud lena — kisi aur ke saamne nahi.")}
          ${check([
            { t: "<b>Aaj kya acha kiya?</b> ek cheez zaroor likho — chahe chhoti ho" },
            { t: "<b>Aaj kya seekha?</b> ek line ka sabak" },
            { t: "<b>Kal kya theek karna hai?</b> sirf ek, ek se zyada nahi" }
          ])}
          ${callout("Har Sunday", "Poore hafte ke 7 entries dobara parho. Tumhe apna pattern nazar aayega — aur pattern hi dushman hai.")}
        </div>
        <div class="stack">
          <div class="card dark" data-anim>
            <div class="n">Namuna</div>
            <p style="font-family:Fraunces,serif;font-size:clamp(14px,1.2vw,19px);line-height:1.7;color:var(--paper)">
              <span class="gold">Acha:</span> 2 ghante deep work poora kiya, bina phone.<br>
              <span class="gold">Seekha:</span> Subah ka pehla ghanta sab se keemti hai.<br>
              <span class="gold">Kal:</span> Raat 11 ke baad screen band.
            </p>
          </div>
          ${cards([{ n: "3 min", h: "Roz ka waqt", p: "Is se zyada nahi. Zyada = aadat tootegi." }], "g2")}
        </div>
      </div>
      ${FOOT("Dimagh", "20")}`
  },
  {
    // 21 — CHAPTER 6
    chapter: "10",
    dur: 8,
    vo: "Sutun che. Paisa. Pehle chhe mahine naya paisa kamane pe dhyan do — naya kharcha karne pe nahi.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — VI</div>
        <h1 class="display" data-anim>Paisa</h1>
        ${S("Pehle 6 mahine: <em>naya paisa kamao</em>, naya kharcha nahi.")}
        ${RULE()}
      </div>
      ${FOOT("Chapter VI", "21")}`
  },
  {
    // 22 — MONEY SKILLS
    chapter: "10",
    dur: 12,
    vo: "Yeh woh skills hain jin ki market mein maang hai aur jin ke liye degree ki zaroorat nahi. Ek chuno. Sirf ek. Aur chhe mahine usi pe lagao.",
    html: `
      <div class="stack">
        <div class="head">${K("Skill menu")}${T("Ek Income Skill Chuno")}${S("Degree zaroori nahi. Laptop ya sirf phone bhi kaafi hai — shuru karne ke liye.")}</div>
        ${cards(
          [
            { n: "01", h: "Video Editing", p: "Har creator aur business ko chahiye. CapCut se shuru, Premiere tak." },
            { n: "02", h: "Graphic Design", p: "Canva → Figma → Illustrator. Thumbnails, branding, ads." },
            { n: "03", h: "Content Writing", p: "Urdu + English likhna aata hai to aadha kaam ho gaya." },
            { n: "04", h: "Web Development", p: "HTML, CSS, JS. Sab se zyada paid, sab se zyada mehnat." },
            { n: "05", h: "Digital Marketing", p: "Ads, SEO, social media — har business ki zaroorat." },
            { n: "06", h: "AI Tools + Automation", p: "Aaj ki sab se tezi se barhti demand." },
            { n: "07", h: "Teaching / Tutoring", p: "Jo tumhe aata hai, kisi aur ko sikha do. Turant paisa." },
            { n: "08", h: "E-commerce / Reselling", p: "Kam sarmaya, zyada seekh." },
            { n: "09", h: "Voiceover / Narration", p: "Urdu market mein jagah khali hai." }
          ],
          "g3"
        )}
      </div>
      ${FOOT("Paisa", "22")}`
  },
  {
    // 23 — MONEY PIPELINE
    chapter: "10",
    dur: 13,
    vo: "Skill se paisa tak ka safar chaar qadmon mein. Seekhna. Teen namune banana. Pehla client. Phir rate barhana aur bachana. Aur bachat ka qaida yeh hai: pehle bees fees alag karo, phir baqi kharch karo.",
    html: `
      <div class="stack">
        <div class="head">${K("Pipeline")}${T("Skill → Paisa")}</div>
        ${timeline([
          ["Step 1 — Seekhna (Mahine 1–2)", "Ek structured course. Roz practice. Koi shortcut nahi."],
          ["Step 2 — 3 Namune (Mahine 3)", "Asli projects jaisi cheezein banao — bina client ke bhi. Yeh tumhara chehra hain."],
          ["Step 3 — Pehla Client (Mahine 4)", "Freelancing platform + 20 direct messages. Pehla client sab se mushkil, uske baad aasan."],
          ["Step 4 — Rate + Bachat (Mahine 5–6)", "Har 2 projects ke baad rate barhao. Aur jo aaye, uska 20% pehle alag karo."]
        ])}
        <div class="split" data-anim>
          ${callout("Bachat ka qaida", "Income ka <b>20% pehle</b> alag karo, phir baqi kharch karo. Ulta karoge to kabhi kuch nahi bachega.")}
          ${callout("Kharche ka qaida", "6 mahine tak koi naya «shauq» nahi: naya phone, nayi bike, naye kapre. Pehle system, phir aaram.")}
        </div>
      </div>
      ${FOOT("Paisa", "23")}`
  },
  {
    // 24 — CHAPTER 7
    chapter: "11",
    dur: 8,
    vo: "Sutun saat. Mahaul. Tumhari taqat tumhare irade se zyada tumhare mahaul par munhasar hai.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Sutun — VII</div>
        <h1 class="display" data-anim>Mahaul</h1>
        ${S("Tumhare 5 sab se qareebi logon ka <em>ausat</em> — tum ho.")}
        ${RULE()}
      </div>
      ${FOOT("Chapter VII", "24")}`
  },
  {
    // 25 — ENVIRONMENT
    chapter: "11",
    dur: 12,
    vo: "Teen circle ka hisab lagao. Pehla: jin se roz milte ho. Doosra: jinhe roz dekhte ho — yani tumhara feed. Teesra: jis kamre mein tum rehte ho. Teeno ko saaf karo.",
    html: `
      <div class="stack">
        <div class="head">${K("Audit")}${T("3 Circles Saaf Karo")}</div>
        ${cards(
          [
            { n: "A", h: "Log (Inner circle)", p: "Jo tumhare plan par haste hain, unke saath waqt kam karo. Dushman nahi — bas doori. Ek acha sathi dhoondo, chahe online ho.", cls: "accent" },
            { n: "B", h: "Feed (Content circle)", p: "Tumhara feed tumhara dimagh banata hai. Jo tumhe inferior feel karaye — unfollow. Jo sikhaye — follow.", cls: "accent" },
            { n: "C", h: "Jagah (Physical space)", p: "Bikhra kamra = bikhra dimagh. Meiz saaf. Kitab saamne. Phone ulta. Paani ki bottle haath mein.", cls: "accent" }
          ],
          "g3"
        )}
        ${rows([
          ["Aaj", "Kal se"],
          ["Phone bistar par", "Phone doosre kamre / drawer mein"],
          ["Sab notifications on", "Sirf calls + 2 zaroori apps"],
          ["Kamra haftay mein ek baar saaf", "Roz sone se pehle 5 minute reset"],
          ["Har waqt available", "Kaam ke waqt DND"]
        ])}
      </div>
      ${FOOT("Mahaul", "25")}`
  },
  {
    // 26 — CHAPTER TRACKING
    chapter: "12",
    dur: 8,
    vo: "Ab do hifazati deewarein. Pehli: tracking. Jo naapa nahi jata, wo sudhra nahi jata.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Hifazati Deewar — I</div>
        <h1 class="display" data-anim>Tracking</h1>
        ${S("Jo naapa nahi jata, wo <em>sudhra</em> nahi jata.")}
        ${RULE()}
      </div>
      ${FOOT("Tracking", "26")}`
  },
  {
    // 27 — WEEKLY REVIEW
    chapter: "12",
    dur: 12,
    vo: "Har اتwaar shaam, bees minute. Chaar sawal. Is hafte kya poora hua. Kya reh gaya. Kya seekha. Aur agle hafte ka ek focus. Bas ek.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Ritual")}
          ${T("Har Sunday — 20 Minute")}
          ${L("Yeh tumhare hafte ka <mark>steering wheel</mark> hai. Iske bagair tum mehnat to karte rahoge, lekin manzil se door.")}
          ${callout("Waqt fix karo", "Sunday shaam 6 baje. Calendar mein appointment daalo — jaise doctor ki ho. Miss nahi karni.")}
        </div>
        <div class="stack">
          ${check([
            { t: "<b>Kya poora hua?</b> tracker dekho, ginti likho" },
            { t: "<b>Kya reh gaya?</b> bina khud ko koste — sirf haqeeqat" },
            { t: "<b>Kya seekha?</b> ek line ka sabak" },
            { t: "<b>Agla hafte ka EK focus?</b> sirf ek — do nahi" }
          ])}
          <div class="card dark sagec" data-anim>
            <div class="n sage">Rule</div>
            <h4>Kabhi 2 din miss mat karo</h4>
            <p>Ek din chhoot jaye — insaan ho. Do din chhoot jaye — nayi aadat ban jati hai. Yehi 90% logon ka qatil hai.</p>
          </div>
        </div>
      </div>
      ${FOOT("Tracking", "27")}`
  },
  {
    // 28 — HABIT TRACKER
    chapter: "12",
    dur: 12,
    vo: "Chhe aadatein. Bees din. Sirf ek cross lagana hai. Yeh tracker tumhare kamre ki deewar pe honi chahiye — taake khali khana tumhe takleef de.",
    html: `
      <div class="stack">
        <div class="head">${K("Tool")}${T("Habit Tracker — 6 × 30")}${S("Ek kaghaz, 6 lines, 30 khane. Roz sirf <em>X</em> lagana hai. Itna aasan ke bahana na bane.")}</div>
        <div class="grid g2">
          <div class="meters" data-anim>
            ${meter("Neend 7–8 ghante", "Month 1", 62)}
            ${meter("20 minute harkat", "Month 1", 48)}
            ${meter("2 ghante deep work", "Month 1", 40)}
            ${meter("10 safhe kitab", "Month 1", 55)}
          </div>
          <div class="meters" data-anim>
            ${meter("Neend 7–8 ghante", "Month 6", 92)}
            ${meter("20 minute harkat", "Month 6", 88)}
            ${meter("2 ghante deep work", "Month 6", 84)}
            ${meter("10 safhe kitab", "Month 6", 90)}
          </div>
        </div>
        ${rows([
          ["Habit", "Kam se kam", "Achi baat"],
          ["Neend", "7 ghante", "Ek hi waqt pe sona/uthna"],
          ["Harkat", "20 minute", "4 din strength + 3 din walk"],
          ["Deep work", "45 minute", "Poore 2 ghante"],
          ["Kitab", "5 safhe", "10 safhe + note"],
          ["Journal", "3 lines", "3 lines + Sunday review"],
          ["Bachaat", "10% income", "20% income"]
        ])}
      </div>
      ${FOOT("Tracking", "28")}`
  },
  {
    // 29 — RELAPSE CHAPTER
    chapter: "13",
    dur: 9,
    vo: "Ab sab se ahem slide. Kyunke tum giroge. Sab girte hain. Farq sirf itna hai ke kuch log gir ke ruk jate hain, aur kuch uth ke chal parte hain.",
    html: `
      <div class="stack chapter">
        <div class="chno" data-anim>Hifazati Deewar — II</div>
        <h1 class="display" data-anim>Girne Ke Baad</h1>
        ${S("Girna failure nahi. <em>Gir ke ruk jana</em> failure hai.")}
        ${RULE()}
        ${P("Yeh woh slide hai jo tumhe 6 mahine poore karwaegi.")}
      </div>
      ${FOOT("Relapse Plan", "29")}`
  },
  {
    // 30 — RECOVERY PROTOCOL
    chapter: "13",
    dur: 13,
    vo: "Recovery protocol teen din ka. Pehla din: sirf das minute kaam karo, poora nahi. Doosra din: wapas normal routine, bina afsos. Teesra din: trigger pehchano aur use hatao.",
    html: `
      <div class="stack">
        <div class="head">${K("Protocol")}${T("Jab Sab Toot Jae")}</div>
        ${cards(
          [
            { n: "Din 1", h: "Sirf 10 minute", p: "Poora routine nahi. Sirf 10 minute wahi kaam. Maqsad: zanjeer na toote. Jeet ka matlab kaam karna nahi, wapas aana hai.", cls: "accent" },
            { n: "Din 2", h: "Wapas normal", p: "Bina afsos, bina khud ko saza diye. Guzishta 3 din ka zikr tak nahi karna.", cls: "accent" },
            { n: "Din 3", h: "Trigger pehchano", p: "Kya hua tha? Neend poori nahi thi? Kisi ne taana diya? Bimari? Trigger likho aur agli baar ke liye plan banao.", cls: "accent" }
          ],
          "g3"
        )}
        ${rows([
          ["Trigger", "Pehle se plan"],
          ["Raat der tak jagna", "10:30 ka alarm — sone ka, uthne ka nahi"],
          ["Doosron ka taana", "Plan kisi ko bataya hi nahi"],
          ["Bimari / thakan", "Chhutti ke 3 din pehle se budget mein"],
          ["Achanak kaam ka bojh", "Deep work ka waqt subah — kisi ke qabze mein nahi"],
          ["Boriyat", "Ek playlist ya walk ready — boriyat ka ilaaj phone nahi"]
        ])}
        ${callout("Yaad rakho", "6 mahine mein tum kam az kam 10 baar giroge. Jo 10 baar utha, wahi 6 mahine poore karta hai.")}
      </div>
      ${FOOT("Relapse Plan", "30")}`
  },
  {
    // 31 — ACCOUNTABILITY
    chapter: "13",
    dur: 11,
    vo: "Akele mat lado. Ek insaan ko apna plan batao — sirf ek. Aur us se har Itwar sirf itna kaho: ho gaya ya nahi. Yeh chhoti si sharmindagi badi taqat hai.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Hifazat")}
          ${T("Ek Saathi — Sirf Ek")}
          ${L("Poore sheher ko batane se kaam nahi hota (yaad hai na — tareef dopamine de deti hai). Lekin <mark>ek insaan</mark> ko batane se kaam hota hai.")}
          ${check([
            { t: "<b>Ek accountability partner</b> — dost, bhai, ya online koi" },
            { t: "<b>Hafte mein ek message:</b> «6 mein se 5 din ho gaye»" },
            { t: "<b>Koi tafseel nahi</b> — sirf report" },
            { t: "<b>Dono taraf se</b> — uska hisaab bhi lo" }
          ])}
        </div>
        <div class="stack">
          <div class="card dark accent" data-anim>
            <div class="n">Kyun kaam karta hai?</div>
            <p>Dimagh tareef ka bhooka hai, lekin <b>sharmindagi</b> se zyada darta hai. Jab ek insaan ko pata ho ke tumne wada kiya tha, to wo wada tootne ka darr tumhe bistar se utha deta hai — jahan motivation nahi utha sakti.</p>
          </div>
          ${callout("Agar saathi na mile", "Ek notebook ko saathi bana lo. Roz likho. Khud se jhoot bolna mushkil ho jata hai jab likhna pare.")}
        </div>
      </div>
      ${FOOT("Relapse Plan", "31")}`
  },
  {
    // 32 — ROADMAP
    chapter: "14",
    dur: 16,
    vo: "Poora safar. Pehla mahina: detox. Doosra: consistency. Teesra: pehla project. Chautha: pehla client aur body nazar aana. Panchwa: polish. Aur chhata mahina: launch.",
    html: `
      <div class="stack">
        <div class="head">${K("Poora safar")}${T("Mahine-ba-Mahine Naqsha")}</div>
        <div class="months">
          ${month("Month 01", "Detox", "7-din dopamine reset. Identity page likho. Neend fix. Sirf 30 minute deep work. Koi skill nahi — sirf routine. Jeet: 25 din bina naga.")}
          ${month("Month 02", "Consistency", "Deep work 90 minute. Skill shuru. Pehli 2 kitabein. Tracker roz. Jeet: 6 habit ka 70% score.")}
          ${month("Month 03", "Pehla Project", "Deep work poore 2 ghante. Ek asli project mukammal. Kitab 5–6. Jeet: dikhane layak ek cheez.")}
          ${month("Month 04", "Pehla Paisa", "Portfolio tayar. 20 outreach. Pehla client ya pehla result. Body nazar aana shuru. Jeet: pehla rupya ya pehli tareef kaam ki.")}
          ${month("Month 05", "Polish", "Rate barhao. 3 projects. Kitab 9–10. Network mein 5 naye log. Jeet: dobara aane wala client.")}
          ${month("Month 06", "Launch", "12 kitabein mukammal. Ek stable income stream. Poora review + agle 6 mahine ka plan. Jeet: log poochne lagen «kya kar rahe ho?»")}
        </div>
      </div>
      ${FOOT("Roadmap", "32")}`
  },
  {
    // 33 — RESULTS
    chapter: "14",
    dur: 13,
    vo: "Chhe mahine baad tumhare paas kya hoga? Ek nayi skill. Barah kitabein. Ek tabdeel shuda jism. Saaf dimagh. Aur ek jeb jo pehle khali thi. Aur sab se bari cheez: ek naya insaan.",
    html: `
      <div class="stack">
        <div class="head">${K("Nateeja")}${T("180 Din Baad Kya Hoga?")}</div>
        <div class="stats">
          ${stat("360<span style='font-size:.35em'> ghante</span>", "Deep work — ek degree ke barabar", true)}
          ${stat("12", "Kitabein mukammal", false)}
          ${stat("3+", "Portfolio projects", false)}
          ${stat("1", "Income skill jo bikti hai", true)}
        </div>
        ${cards(
          [
            { n: "Jism", h: "Nazar aane wala farq", p: "Posture, chehra, energy. Kapre wahi, insaan naya.", cls: "sagec" },
            { n: "Dimagh", h: "Focus aur sukoon", p: "Ek kaam ek waqt mein. Boriyat bardasht karne ki taqat.", cls: "sagec" },
            { n: "Jeb", h: "Pehla paisa", p: "Chhota sahi, lekin tumhara — apni mehnat ka.", cls: "accent" },
            { n: "Zaat", h: "Bharosa", p: "Sab se bara nateeja: tum khud pe yaqeen karne lagte ho.", cls: "accent" }
          ],
          "g4"
        )}
      </div>
      ${FOOT("Nateeja", "33")}`
  },
  {
    // 34 — THE REVEAL
    chapter: "15",
    dur: 10,
    vo: "Aur phir ek din, koi poochega: tum badal kaise gaye? Aur tum muskura ke kaho ge — khamoshi se.",
    html: `
      <div class="stack">
        ${K("Scene — 6 mahine baad")}
        <div class="quote" data-anim><span class="qm">«</span>Tum badal kaise gaye?<span class="qm">»</span></div>
        ${S("Aur tumhara jawab hoga:")}
        <h2 class="title gold" data-anim>Khamoshi se.</h2>
        ${RULE()}
        ${P("Tumne kisi ko bataya nahi. Tumne kisi se ijazat nahi li. Tumne sirf roz woh kiya jo tumne khud se wada kiya tha — aur dheere dheere woh wada tumhari pehchan ban gaya.")}
      </div>
      ${FOOT("Reveal", "34")}`
  },
  {
    // 35 — FINAL RULES
    chapter: "15",
    dur: 14,
    vo: "Aath qawaid jo kabhi nahi tootne. Ek skill. Ek waqt. Roz aana. Do din miss nahi. Kisi ko batana nahi. Roz likhna. Har اتwaar hisaab. Aur neend kabhi qurban nahi.",
    html: `
      <div class="stack">
        <div class="head">${K("Qawaneen")}${T("8 Qawaid — Kabhi Nahi Tootne")}</div>
        ${rows([
          ["#", "Qaida", "Kyun"],
          ["1", "Ek skill — do nahi", "Tawajjo bategi to kamyabi bategi"],
          ["2", "Ek waqt fix", "Dimagh ko ishara milta hai"],
          ["3", "Roz aana, chahe 10 minute", "Zanjeer na toote"],
          ["4", "Kabhi 2 din miss nahi", "2 din = nayi buri aadat"],
          ["5", "Kisi ko batana nahi", "Tareef ka dopamine kaam ka dushman hai"],
          ["6", "Roz 3 lines likhna", "Khud se jhoot nahi chalega"],
          ["7", "Har Sunday hisaab", "Bhatakte nahi"],
          ["8", "Neend qurban nahi", "Bina neend ke baaki 7 qawaid bekaar"]
        ])}
      </div>
      ${FOOT("Qawaneen", "35")}`
  },
  {
    // 36 — START TODAY
    chapter: "16",
    dur: 12,
    vo: "Ab. Aaj raat teen kaam. Ek safha likho. Alarm paanch buje ka lagao aur phone doosre kamre mein rakho. Aur ek skill chun lo. Bas teen kaam. Bees minute.",
    html: `
      <div class="split">
        <div class="stack">
          ${K("Aaj raat — 20 minute")}
          ${T("Abhi Kya Karna Hai")}
          ${L("Video band karne ke baad. <mark>Abhi.</mark> Kal subah nahi, «jab mood ho» nahi.")}
          ${RULE()}
          ${P("Agar tum ne aaj raat yeh teen kaam kar liye, to tum un 10% logon mein ho jo asal mein badalte hain. Baaki 90% sirf video dekhte hain.")}
        </div>
        <div class="stack">
          ${cards(
            [
              { n: "1", h: "Ek safha likho", p: "Pehchan wala exercise. 10 minute. Haath se likho to behtar.", cls: "accent" },
              { n: "2", h: "Alarm 5:30 + phone bahar", p: "Sone se pehle. Yeh ek chhota sa faisla tumhari poori subah badal dega.", cls: "accent" },
              { n: "3", h: "Skill chuno", p: "List mein se ek. Likh lo. Badalna nahi — 6 mahine tak.", cls: "accent" }
            ],
            "g2"
          )}
          ${callout("Kal subah", "Utho → paani → 20 minute walk → wapas aake 45 minute apni skill. Pehla din ho gaya.")}
        </div>
      </div>
      ${FOOT("Shuruaat", "36")}`
  },
  {
    // 37 — CLOSING
    chapter: "17",
    dur: 12,
    vo: "Yeh system kisi ka bhi ban sakta hai. Koi degree nahi, koi paisa nahi, koi sifarish nahi chahiye. Sirf chhe mahine ki khamoshi chahiye. Shuru karo.",
    html: `
      <div class="stack">
        ${K("Aakhri baat")}
        <h1 class="display" data-anim>Kisi ka bhi<br><span class="gold">ban sakta hai.</span></h1>
        ${S("Koi degree nahi. Koi sarmaya nahi. Koi sifarish nahi.<br>Sirf 6 mahine ki <em>khamoshi</em> chahiye.")}
        ${RULE()}
        <div class="pills" data-anim>
          <span class="pill gold">Kal ka din intezaar nahi karta</span>
          <span class="pill">180 din kahin nahi ja rahe</span>
          <span class="pill">Faisla aaj ka hai</span>
        </div>
      </div>
      ${FOOT("6 Mahine Ki Khamosh Tabdeeli", "Aakhir")}`
  },
  {
    // 38 — END CARD
    chapter: "17",
    dur: 10,
    vo: "Agar yeh video tumhare kaam aayi ho, to us insaan ko bhejo jise tum badalta hua dekhna chahte ho. Aur haan — chhe mahine baad wapas aana, batane ke liye ke hua kya.",
    html: `
      <div class="stack">
        ${K("Shukriya")}
        <h2 class="title" data-anim>6 mahine baad<br><span class="gold">wapas aana.</span></h2>
        ${L("Batane ke liye ke hua kya.")}
        <div class="split" data-anim style="margin-top:12px">
          <div class="card accent"><h4>Share karo</h4><p>Us insaan ko bhejo jise tum badalta hua dekhna chahte ho. Ek message kisi ka 6 mahina bacha sakta hai.</p></div>
          <div class="card sagec"><h4>Yaad rakho</h4><p>Motivation video se aati hai, lekin tabdeeli uske baad ke 20 minute se aati hai. Ab wo 20 minute.</p></div>
        </div>
        <div class="tiny" data-anim style="margin-top:8px">Khamosh Tabdeeli · Silent Transformation · 180 Din</div>
      </div>
      ${FOOT("Silent Transformation Program", "End")}`
  }
];

export default SLIDES;
