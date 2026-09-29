# Stardipromptid — Sessioon 4

Kopeerige prompt oma AI-tööriista (ChatGPT, Claude, Copilot, Gemini…), lisage juurde
nimetatud fail ja täiendage. Need on alguspunktid, mitte ainuõiged vastused — muutke
julgelt.

---

## Harjutus 0 — Ehitage oma Postman

Vt `0_Postmani_nouded_alguspunkt.md` (sammud 1–3, sealhulgas valmis prompt).

---

## Harjutus 1 — Nõuetest testideni

**Nõuete mustand on valmis** (`1_Broneeringu_nouded_mustand.md`) — keegi ei kirjuta nõudeid.
Mõlemad loevad sama faili. Paaris töötate esimesed 4 minutit samal ajal:

- **A (ilma AI-ta):** lugege failist `1_Broneeringu_nouded_mustand.md` nõudeid
  **2.2, 2.4, 3.4, 4.1, 5.1, 6.1 ja 7.1**. Kirjutage iga piiri kohta tabelirida:
  *nõue | alla piiri | piiril | üle piiri | oodatav tulemus* (nt 2.2 | 13 ööd | 14 ööd | 15 ööd |
  13 ja 14 lubatud, 15 keelatud). Kui oodatavat tulemust ei saa nõude põhjal kirja panna,
  kirjutage „?“ — see on küsimus analüütikule.
- **B (AI-ga):** kleepige AI-le kogu nõuete fail ja allolev prompt „Samm 1“.

Nii saate hiljem võrrelda, mida kumbki leidis. Väljundi näidis: slaid „Näidis: Harjutus 1 väljund“.

**Samm 1 (B — lüngad):**
```
Oled kogenud testianalüütik. Lisatud on broneerimismooduli nõuete mustand.
Leia sellest:
1. vastuolud (kaks nõuet, mis ei saa korraga kehtida),
2. poolikud või mitmeti mõistetavad nõuded,
3. puuduolevad reeglid, mida testimiseks oleks vaja teada.
Iga leiu juurde viita nõude numbrile ja kirjuta üks konkreetne küsimus analüütikule.
Ära lisa reegleid, mida dokumendis ei ole — kui midagi on teadmata, ütle seda.
```

**Samm 3 (otsustustabel):**
```
Koosta samade nõuete põhjal:
1. piirväärtuste tabel: reegel | väärtus vahetult alla piiri | piiril | üle piiri | oodatav tulemus,
2. otsustustabel reeglitele 2.2, 4.1, 4.2 ja 7.1 (ööde arv × püsiklient × sissemakse).
Märgi iga rida, mis sõltub vastamata küsimusest.
```

**Samm 4 (järjestamine):**
```
Siin on meie testiideed kahest allikast:
(1) A käsitsi koostatud piirväärtuste nimekiri: <kleepige>
(2) AI otsustustabel ja edge case'id eelmisest sammust: <kleepige>
Järjesta need äririski järgi (mis läheb kliendile või ettevõttele kõige rohkem maksma).
Märgi duplikaadid ja testid, mis ei kontrolli tegelikult ühtegi nõuet. Põhjenda ühe lausega.
```

---

## Praktika 1 — Testdokumentatsioon

```
Oled testijuht. Harjutus 1 tulemusena on meil järgmised testiideed: <kleepige>.
Koosta broneerimismoodulile:
1. lühike testplaan (ulatus, mida EI testita, riskid, keskkond: automationintesting.online),
2. 8–12 testjuhtumit täpselt lisatud CSV-malli veergudes (üks samm = üks rida),
3. sünteetiline testandmestik: 5 kehtivat ja 5 meelega vigast broneeringut
   (täpitähed, sidekriipsuga nimi, olematu kuupäev, lahkumine enne saabumist, 0-hind).
Ära kasuta päris isikute nimesid ega päris e-posti domeene (kasuta example.com).
```

**Anonüümimine (lisaülesanne):**
```
Siin on üks realistlik broneeringurida: <kirjutage ise väljamõeldud, aga päris moodi rida:
nimi, e-post, telefon, sünnipäev, kuupäevad, lisasoovid>.
Anonüümi see testimiseks nii, et andmete struktuur ja testiks olulised omadused
(kuupäevade vahe, hind, täpitähed) jäävad alles. Seejärel hinda ise: kas mõne välja
kombinatsiooni järgi saaks inimese ikkagi ära tunda?
```

**Bug report:**
```
Vormista see leid bug report'iks: pealkiri, keskkond, sammud, oodatav tulemus,
tegelik tulemus, raskusaste koos põhjendusega. Leid: <kirjeldage vabas vormis>.
```

---

## Harjutus 2 — API-test oma curl-rakendusega

```
Siin on Restful-bookeri API dokumentatsioon: https://restful-booker.herokuapp.com/apidoc/index.html
ja meie nõuded: <kleepige Harjutus 1 olulisemad nõuded>.
Kirjuta curl-käsud:
1. põhivoole: autentimine → broneeringu loomine → lugemine → muutmine → kustutamine,
2. 6 negatiivsele juhtumile nõuete põhjal (kuupäevad, hind, puuduv väli, token puudub).
Iga juhtumi juurde: oodatav staatuskood ja mida vastuse kehas kontrollida.
```

Pärast käivitamist:
```
Siin on tegelikud vastused: <kleepige>. Koosta tabel:
juhtum | nõue | oodatav | tegelik | viga? (jah/ei/vaieldav) + ühe lause põhjendus.
```

---

## Praktika 2 — AI-agent testib brauseris

Stsenaariumid: `7_Brauseri_stsenaariumid.md`. Kirjutage S5 enne käivitamist ise valmis.

**Tööriist (üks neist):**
- **Claude in Chrome** — Chrome'i/Edge'i laiendus; ka Claude Code'ist (`claude --chrome`)
- **ChatGPT Browser** — ChatGPT töölauarakenduses või veebis, viidake `@Browser` (ei tööta Codex CLI-s)
- **GitHub Copilot** — VS Code'i agendirežiimis, integreeritud brauser (organisatsioon võib selle välja lülitada)

**Prompt** (lisage stsenaariumide fail):
```
Oled testija. Ava brauseris https://automationintesting.online.
Käi läbi lisatud failis olevad stsenaariumid S1–S5 täpselt nagu päris kasutaja:
klõpsa, täida vorme, loe tulemust. Kasuta ainult failis olevaid testandmeid.
Iga stsenaariumi kohta kirjuta tabelirida:
ID | ✅ või ❌ | mida sa lehel tegelikult nägid | tõend (ekraanipilt või täpne tekst lehelt).
Ära märgi ✅, kui sa ei näinud oodatud tulemust ise lehel.
S4 jaoks tee ekraanipilt lauaarvuti (~1280 px) ja mobiili (~390 px) laiuses ja kirjelda erinevusi.
Lõpus loetle, millised stsenaariumid olid ebaselged või mida sa ei saanud kontrollida.
```

Pärast: korrake üks ❌ ise käsitsi — kas viga on päris või eksis agent?

---

## Harjutus 3 — Raportite võrdlus

```
Lisatud on kaks CSV-faili (vana ja uus päevaraport) ning muudatuse kirjeldus.
Võti on kuupaev + tuba. Leia KÕIK erinevused, sealhulgas:
- read, mis on ainult ühes failis,
- topeltread,
- erinevad väärtused.
Klassifitseeri iga erinevus: oodatud muudatus / defekt / andmete erinevus, ja põhjenda.
Kirjuta ka korduvkasutatav kontroll (SQL, Python või tabelarvutuse valem),
mis läheb punaseks, kui mõni neist olukordadest esineb.
```
SQL-i ei pea oskama: paluge Pythoni skripti või tabelarvutuse juhiseid.

---

## Harjutus 4 — Regressioonivalik + Flaky vs Real

**Voor 1:**
```
Siin on regressioonikomplekt ja järgmise versiooni muudatus (BOOK-231).
Aega on pool päeva (~4 h). Vali testid ja põhjenda iga valikut:
muudatuse mõju, äririsk, vigade ajalugu. Loetle eraldi, mida sa EI tea
ja mida peaks enne otsust arendajalt küsima.
```

**Voor 2:** klassifitseerige kõigepealt ise, alles siis küsige AI-lt:
```
Klassifitseeri iga ebaõnnestumine: päris viga / flaky / keskkond-andmed / test ise on vale.
Kasuta käivitusajalugu. Kui kindlust pole, ütle, millist lisainfot vajaksid.
```

---

## Praktika 3 — PR review

```
Oled range QA-arhitekt ja vaatad üle PR-i, mis lisab API testid ja raporti võrdluse.
Kontrolli iga testi puhul:
1. kas see saab üldse ebaõnnestuda (tingimusteta assert, try/except, print assert'i asemel)?
2. kas see sõltub jagatud andmetest (kõvakodeeritud ID, kirjete arv)?
3. kas oodatav tulemus vastab API dokumentatsioonile?
4. SQL: mis juhtub NULL-i, puuduva rea ja topeltrea korral?
5. turvalisus: saladused koodis, koristus (teardown).
Vormista leiud tabelina: probleem | fail:rida | risk | soovitus.
Ära paku probleeme, mida sa ei suuda koodi reaga siduda.
```

**Pipeline'i seadistamine:**
```
Muuda ülaltoodud kontrollpunktid lühikeseks repo püsijuhiseks faili
.github/copilot-instructions.md (Markdown, kuni ~30 rida): mida iga testide PR-i
puhul kontrollida ja millises vormis leiud esitada.
```
GitHub Copilot code review kasutab seda faili igal PR-il automaatselt
(https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review).
Claude Code'i või Codexi kasutajad: sama sisu sobib `CLAUDE.md` / `AGENTS.md` faili.
CI/CD-integratsioon tuleb Sessioon 5-s.
