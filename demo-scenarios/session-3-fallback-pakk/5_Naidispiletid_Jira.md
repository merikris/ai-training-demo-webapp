# Näidispiletid — Atlassian AI harjutuseks

*Fiktiivne näidismaterjal — Sessioon 3 fallback-pakk. Kasuta seda "kaardista Jira/
Confluence töövoog" harjutuses, kui sul pole hetkel oma tiimi reaalseid pileteid
käepärast. Kopeeri need "piletid" oma AI-tööriista ja proovi: kokkuvõtte tegemist,
duplikaatide tuvastamist, loomuliku keelega otsingut.*

*Vihje: PROJ-101 ja PROJ-102 on tahtlikult peaaegu-duplikaadid — hea test, kas AI
suudab need ära tunda.*

---

**PROJ-101** · Bug · Prioriteet: Kõrge · Staatus: Avatud
**Pealkiri**: Topeltmakse tekib kiire topeltklõpsu korral

Kui klient klõpsab "Maksa" nuppu kaks korda väga kiiresti järjest, läheb mõnikord läbi
kaks eraldi makset sama tellimuse eest. Avastatud staging keskkonnas regressioonitsükli
ajal, ~1 juhtum 5-st. Vt lisatud stack trace. Backend-poolne idempotentsuskontroll
näib puuduvat.
*Kommentaarid (3): "Kas reprodutseerub ka pangalingi puhul?" / "Testisin — jah,
harvem, aga tekib" / "Frontend nupp deaktiveerub liiga hilja, vt analüüs."*

---

**PROJ-102** · Bug · Prioriteet: Keskmine · Staatus: Avatud
**Pealkiri**: Makse kahekordistub kui kasutaja klõpsab Maksa nuppu mitu korda kiiresti

Klient kirjutas kaebuse: tellimuse eest debiteeriti kaks korda. Kontrollisin — sama
tellimuse ID, kaks PSP transaktsiooni. Juhtus kliendil, kes ütles klõpsanud korduvalt
kuna leht "tundus kinni jooksvat".
*Kommentaarid (1): "Kliendile tehtud tagasimakse, aga probleem jääb tehniliselt lahtiseks."*

---

**PROJ-103** · Bug · Prioriteet: Keskmine · Staatus: Avatud
**Pealkiri**: 3D Secure kinnitus ebaõnnestub Safari brauseris

3D Secure väljakutse aken ei avane korrektselt Safari 18-s (nii macOS kui iOS). Chrome
ja Firefox töötavad probleemideta. Kasutaja jääb "kinnitamist ootab" olekusse
lõputult, peab tellimuse käsitsi katkestama.

---

**PROJ-104** · Bug · Prioriteet: Madal · Staatus: Avatud
**Pealkiri**: Aegunud kaardi puhul kuvatakse vale veateade

Kui kaart on aegunud, näitab süsteem üldist "Makse ebaõnnestus, proovi uuesti"
teadet, mitte konkreetset "Kaart on aegunud" teadet. Kasutaja ei saa aru, mida
parandada.

---

**PROJ-105** · Bug · Prioriteet: Madal · Staatus: Avatud
**Pealkiri**: Valuutakonverteerimine ei arvesta värskeid kursse pikema seansi puhul

Kui klient hoiab ostukorvi avatuna üle 15 minuti enne makset, kasutatakse siiski
vana konverteerimiskurssi. Vt spekk BR-5 — kurss peaks kehtima 15 min, aga näib
mitte uuenevat isegi pärast seda.

---

**PROJ-106** · Bug · Prioriteet: Keskmine · Staatus: Avatud
**Pealkiri**: Makseviisi valik kaob lehe värskendamisel

Kui kasutaja on valinud makseviisi (nt pangalink) ja värskendab lehte kogemata (F5),
kaob valik ja kasutaja peab makseviisi uuesti valima ning osa sisestatud andmeid
(nt kaardiandmed) kaovad samuti. Tellimuse olek jääb muutumatuks.
