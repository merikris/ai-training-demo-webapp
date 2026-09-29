# Broneerimissüsteemi regressioonikomplekt (käsitsi kontrollnimekiri)

Täielik läbimine võtab ~2 päeva. Järgmise versiooni jaoks on aega **pool päeva**.

**Muudatus järgmises versioonis (BOOK-231):** tühistamistasu arvutus viiakse üle
uuele hinnamoodulile; tühistamise e-kirja mallis muudetakse tekst.

| ID | Test | Moodul | Viimati leitud viga | Kestus |
|---|---|---|---|---|
| R01 | Toa broneerimine UI kaudu (happy path) | Broneering | 6 kuud tagasi | 20 min |
| R02 | Broneering kattuvatele kuupäevadele on keelatud | Broneering | 2 kuud tagasi | 20 min |
| R03 | Lahkumise päev = järgmise saabumise päev | Broneering | kunagi | 15 min |
| R04 | Koguhinna arvutus (tavaöö) | Hind | 1 aasta tagasi | 15 min |
| R05 | Nädalavahetuse lisatasu | Hind | 2 nädalat tagasi | 20 min |
| R06 | Tasuta tühistamine > 48 h enne saabumist | Tühistamine | 3 kuud tagasi | 25 min |
| R07 | Tasuline tühistamine < 48 h (50%) | Tühistamine | 3 kuud tagasi | 25 min |
| R08 | Tühistamise e-kiri külalisele | Teavitused | kunagi | 15 min |
| R09 | Sissemakse nõue > 7 öö | Sissemakse | 5 kuud tagasi | 20 min |
| R10 | Püsikliendi soodustused | Hind | 1 aasta tagasi | 30 min |
| R11 | Admin: broneeringu muutmine | Admin | 4 kuud tagasi | 20 min |
| R12 | Admin: toa lisamine ja kustutamine | Admin | kunagi | 20 min |
| R13 | Kontaktivorm | Kontakt | kunagi | 10 min |
| R14 | Päevaraport (tulu, sissemaksed) | Raportid | 1 nädal tagasi | 40 min |
| R15 | Sisselogimine ja õigused | Admin | 8 kuud tagasi | 15 min |

**Ülesanne:** paluge AI-l valida pooleks päevaks regressioonikomplekt ja põhjendada iga
valikut (muudatuse mõju, risk, vigade ajalugu). Siis vaadake kriitiliselt: mida AI ei
teadnud? Millise valiku muudaksite?
