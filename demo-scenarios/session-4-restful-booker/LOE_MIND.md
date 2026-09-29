# Sessioon 4 — Manual testing AI-ga: harjutuste materjalid

Kogu päev kasutab **ühte avalikku harjutussüsteemi**: Restful-booker — väljamõeldud
B&B (külalistemaja) broneerimissüsteem, mis on loodud just testimise õppimiseks.
Päris projekte ega konfidentsiaalseid andmeid ei ole vaja: AI tohib kõiki siinseid
materjale ja süsteemi vabalt näha.

## Alustuseks: laadige materjalid alla

1. Avage https://github.com/merikris/ai-training-demo-webapp
2. Vajutage **Code → Download ZIP** ja pakkige fail lahti
   (git'i kasutajad: `git clone https://github.com/merikris/ai-training-demo-webapp.git`)
3. Avage kaust `demo-scenarios/session-4-restful-booker` — siin on kõik tänased failid
4. Harjutus 0 jaoks looge **eraldi tühi kaust** (nt `minu-postman`) — agent ehitab sinna,
   mitte materjalide kausta

Testsüsteemi ennast ei pea alla laadima: API ja UI töötavad veebis.

## Testprojekt

| Mis | Link | Märkus |
|---|---|---|
| API | https://restful-booker.herokuapp.com | CRUD + autentimine, sees on meelega jäetud vigu |
| API dokumentatsioon | https://restful-booker.herokuapp.com/apidoc/index.html | Päringute ja vastuste näited (ka curl) |
| UI (B&B demo) | https://automationintesting.online | Toad, broneerimisvorm, kontaktivorm, admin-paneel |
| Lähtekood (API) | https://github.com/mwinteringham/restful-booker | Autor Mark Winteringham |
| Lähtekood (platvorm + UI) | https://github.com/mwinteringham/restful-booker-platform | Saab ka lokaalselt käivitada |

**Oluline:** avalikku API-t kasutavad korraga kõik (ka teised inimesed maailmas).
Kodulehe järgi taastub API perioodiliselt algseisu, aga tegelikult võib kirjeid olla
sadu või tuhandeid (26.09.2026 oli ~1950). Kui teie loodud broneering "kaob" või kirjete
arv on ootamatu, ei pruugi see olla viga — see on osa harjutusest (vt Harjutus 4).

API testkasutaja on avalikult dokumenteeritud: `admin` / `password123` (`POST /auth`).

## Failid harjutuste kaupa

| Fail | Harjutus | Plokk |
|---|---|---|
| `PROMPTID.md` | Stardipromptid kõigile harjutustele | Kogu päev |
| `0_Postmani_nouded_alguspunkt.md` | Harjutus 0 — Ehitage oma Postman | Algus (töötab taustal) |
| `1_Broneeringu_nouded_mustand.md` | Harjutus 1 — Nõuetest testideeni | A |
| `2_Testjuhtumite_CSV_mall.csv` | Praktika 1 — Testdokumentatsioon | B |
| `3_API_testi_kontrollnimekiri.md` | Harjutus 2 — API-test oma curl-rakendusega | C |
| (fail puudub — kasutage UI-d) | Praktika 2 — AI-toega brauseritest | C |
| `4_Paevaraport_vana.csv`, `4_Paevaraport_uus.csv`, `4_Muudatuse_kirjeldus.md` | Harjutus 3 — Raportite võrdlus | D |
| `5_Regressioonikomplekt.md`, `5_Ebaonnestunud_testid.md` | Harjutus 4 — Regressioonivalik + triaaž | D |
| `6_PR_booking_api_testid.diff` | Praktika 3 — PR review | E |

**Päeva järjekord:** Harjutus 0 → Harjutus 1 → Praktika 1 → Harjutus 2 → Praktika 2 →
Harjutus 3 → Harjutus 4 → Praktika 3.

## Tööriistad

Tööriist on vaba: ChatGPT, Claude, Copilot, Codex, Gemini, brauseri-AI, oma skriptid —
mis teil käepärast on. Harjutused on kirjeldatud nii, et need töötavad iga tööriistaga.
