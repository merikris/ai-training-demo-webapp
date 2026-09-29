# Muudatus BOOK-214 — nädalavahetuse lisatasu päevaraportis

**Versioon:** vana raport = v2.3, uus raport = v2.4
**Periood:** 01.10.2026–14.10.2026, toad 101, 102, 103

## Mis muutus

- Nädalavahetuse ööd (**reede ja laupäev**) on nüüd 20% kallimad (nõue 3.2).
  Päevaraporti veerg `tulu_eur` peab seda arvestama.
- Raporti SQL-i refaktoreeriti: kuupäevade liitmine (join) broneeringute tabeliga
  kirjutati ümber "loetavamaks".
- Muid muudatusi ei tehtud.

## Mida teatakse keskkonna kohta

- Vana raport genereeriti 15.10 hommikul, uus raport 17.10 õhtul.
- Vahepeal võidi mõni broneering tühistada (päris süsteem, päris külalised).

## Ülesanne

Võrrelge `4_Paevaraport_vana.csv` ja `4_Paevaraport_uus.csv`. Iga erinevuse kohta
otsustage: **oodatud muudatus**, **defekt** või **andmete erinevus (mitte viga)**.

Seejärel: kas teie võrdluskontroll leiaks kõik erinevused? Tehke uues failis teadlikult
2–3 muudatust (kustutage rida, muutke summat, lisage duplikaat) ja kontrollige, kas
kontroll läheb punaseks.
