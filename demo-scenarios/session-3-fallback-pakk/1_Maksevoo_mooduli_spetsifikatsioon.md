# Maksevoo mooduli spetsifikatsioon v1.2

*Fiktiivne näidisdokument — Sessioon 3 fallback-pakk. Kasutamiseks Gemini Notebooki
ja Claude Projecti harjutustes, kui osalejal pole hetkel enda projekti materjali käepärast.*

## 1. Ülevaade

Maksevoo moodul haldab kliendi makse sooritamist tellimuse vormistamise viimases etapis.
Moodul suhtleb kolmanda osapoole makseteenuse pakkujaga (PSP) ja tagastab tellimuse
süsteemile makse oleku.

## 2. Kasutuslugu

Klient valib ostukorvis "Vormista tellimus", sisestab makseandmed ja kinnitab makse.
Süsteem näitab kliendile reaalajas makse olekut (töötleb / õnnestus / ebaõnnestus) ja
suunab õnnestumise korral kinnituslehele.

## 3. Toetatud makseviisid

- Pangakaart (Visa, Mastercard)
- Pangalink (kolm suuremat panka)
- Järelmaksu teenus (kolmanda osapoole partner)

## 4. Äriloogika reeglid

- **BR-1**: Minimaalne tellimuse summa makse jaoks on 1,00 €. Maksimaalne summa ilma
  täiendava kinnituseta on 3000 €.
- **BR-2**: Iga makseviisi jaoks on lubatud maksimaalselt 3 ebaõnnestunud katset 10
  minuti jooksul, seejärel makseviis blokeeritakse tellimuse jaoks 30 minutiks.
- **BR-3**: Kaardimakse puhul on nõutav 3D Secure kinnitus summade puhul üle 250 €.
- **BR-4**: Sama tellimuse eest ei tohi kunagi läbi minna kaks õnnestunud makset
  (idempotentsuse nõue) — isegi kui kasutaja klõpsab "Maksa" nuppu mitu korda kiiresti
  järjest.
- **BR-5**: Valuutakonverteerimine (kui tellimuse valuuta erineb kaardi valuutast)
  kasutab PSP poolt tellimuse loomise hetkel tagastatud kurssi, mis kehtib 15 minutit.

## 5. Veaolukorrad, millega moodul peab toime tulema

- Aegunud pangakaart
- PSP ajutine kättesaamatus (timeout)
- 3D Secure ebaõnnestumine või kasutaja katkestus
- Ebapiisav saldo
- Võrguühenduse katkemine kliendi poolel pärast makse käivitamist, kuid enne
  kinnituse saabumist (ebaselge olek — vajab käsitlust)
- Sama tellimuse topeltesitus (vt BR-4)

## 6. Väljaspool käesolevat versiooni (teadaolev piirang)

Krüptovaluutamaksed ja mitme makseviisi kombineerimine ühe tellimuse peale ei ole
v1.2 toega — plaanitud järgmisesse versiooni.
