# Harjutus 0 — Ehitage oma Postman (curl-töölauarakendus)

**Idee:** kõigepealt spetsifikatsioon, alles siis ehitamine. Te kirjeldate AI-le tööriista, mida iga päev kasutate (Postman), AI aitab
nõuded korralikult sõnastada ning agent (Codex, Claude Code, Copilot agent mode vms)
ehitab selle taustal valmis. Päeva jooksul käite vahepeal vaatamas, Plokk C-s testite
seda sama rakendusega Restful-bookeri API-t — ehk testite ka oma AI ehitatud tööriista.

## Enne alustamist

Looge oma arvutisse **eraldi tühi kaust** (nt `minu-postman`) ja avage agent selles kaustas.
Ärge ehitage materjalide kausta sisse.

## Samm 1 — teie enda must-have nimekiri (3 min, ilma AI-ta)

Mõelge, milleks te Postmani päriselt kasutate. Alguspunktiks:

- Töölauarakendus, mis käivitab `curl`-päringuid
- Päringute salvestamine nimega ja kogudesse (collections)
- Keskkonnamuutujad, nt `{{baseUrl}}`, `{{token}}` (TEST / PROD vahetamine)
- `curl`-käsu kleepimine → rakendus täidab vormi ise (meetod, URL, päised, keha)
- Vastuse vaade: staatuskood, päised, keha (JSON ilusti vormindatud), aeg
- Päringute ajalugu
- (Lisaks) Lihtsad kontrollid: "staatus = 200", "keha sisaldab X"

## Samm 2 — laske AI-l teid intervjueerida ja SPEC.md kirjutada (8 min)

Näidisprompt (kopeerige ja täiendage):

```
Ma tahan ehitada töölauarakenduse, mis on nagu Postman, aga lihtsam:
see käivitab curl-päringuid ja sellel on kasutajaliides päringute sisestamiseks
ja salvestamiseks. Minu esialgsed nõuded: <kleepige oma nimekiri>.

Enne kui midagi kirjutad, esita mulle kuni 7 täpsustavat küsimust
(platvorm, andmete salvestamine, mis EI kuulu esimesse versiooni jne).
Seejärel kirjuta SPEC.md, milles on:
1. Eesmärk ühe lausega
2. Funktsionaalsed nõuded nummerdatult
3. Iga nõude kohta aktsepteerimiskriteeriumid (Given/When/Then)
4. Mis ei kuulu skoopi (non-goals)
5. Tehnilised piirangud
```

**Lugege SPEC.md üle ja parandage enne järgmist sammu.** See on harjutuse kõige
olulisem osa: agent ehitab täpselt seda, mis spetsifikatsioonis kirjas on.

## Samm 3 — andke spetsifikatsioon agendile (2 min)

**Reegel:** agent saab töö alles siis, kui SPEC.md on valmis ja üle loetud.

**Oluline:** lubage agendil selles kaustas faile muuta ilma iga kord küsimata
(agendi seadetes / käivitamisel valitav õiguste režiim). Muidu jääb agent esimese
loa küsimise juures seisma ja pausiks pole midagi valmis.

Lisage spetsifikatsioonile kindlasti need nõuded:

- **curl käivitatakse argumentide listina, mitte shelli stringina** (muidu võivad
  jutumärgid või `&` päises rakenduse katki teha või käivitada soovimatu käsu)
- Soovitus: **Python + Tkinter, ilma lisapakettideta** (töötab Windowsis ja Macis, ei vaja
  npm-i ega suuri allalaadimisi) — kui teil on oma eelistus, kasutage seda
- Andmed salvestatakse lokaalselt JSON-faili
- README koos käivitamisjuhisega
- Rakendus peab töötama teie masinas (Windows/Mac) — öelge see agendile

Ärge pange rakendusse päris tokeneid ega töökeskkondade aadresse — testime ainult
avaliku Restful-bookeri vastu.

## Checkpointid päeva jooksul

- **Esimene paus:** mis valmis? Kas see käivitub? Andke agendile üks parandusprompt.
- **Plokk C:** kasutage rakendust Restful-bookeri API testimiseks (Harjutus 2) ja
  kontrollige SPEC.md aktsepteerimiskriteeriumid ükshaaval läbi.
- **Päeva lõpp:** 2-minutiline demo — mis töötas, mis mitte, mis üllatas.

## Kui arvutisse ei saa midagi installida

Ehitage oma isiklikus arvutis või kasutage pilveagenti (nt Codex veebis) — ja
kirjeldage vähemalt SPEC.md valmis. Spetsifikatsioon ise on selle harjutuse
tähtsaim väljund.
