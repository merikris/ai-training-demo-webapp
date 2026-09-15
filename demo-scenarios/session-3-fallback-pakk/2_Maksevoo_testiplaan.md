# Maksevoo mooduli testiplaan

*Fiktiivne näidisdokument — Sessioon 3 fallback-pakk. Viitab dokumendile
"1_Maksevoo_mooduli_spetsifikatsioon.md".*

## Ulatus

Testitakse maksevoo moodulit kolmes keskkonnas: dev (PSP sandbox), staging (PSP
sandbox, päris andmemaht), prod-smoke (piiratud, ainult kinnitatud testkaartidega).

## Testikategooriad

### A. Funktsionaalne

1. Õnnestunud makse pangakaardiga (alla 250 €, ilma 3D Secure'ita)
2. Õnnestunud makse pangakaardiga (üle 250 €, 3D Secure kinnitusega)
3. Õnnestunud makse pangalingiga (kõik 3 toetatud panka)
4. Õnnestunud makse järelmaksuga

### B. Edge case'id ja äriloogika

5. Makse summaga täpselt 1,00 € ja täpselt 3000 €
6. Neljas järjestikune ebaõnnestunud katse sama makseviisiga (peaks blokeerima, vt BR-2)
7. Topeltklõps "Maksa" nupul kiiresti järjest — kontrolli, et makse ei dubleeru (BR-4)
8. Aegunud kaart — kontrolli veateate täpsust ja vormingut
9. Võrguühenduse katkemine vahetult pärast makse käivitamist — kontrolli tellimuse
   lõpp-olekut (ei tohi jääda kliendile ebaselgeks)
10. Valuutakonverteerimine, kui kurss muutub testi ajal (üle 15 min testiseansi)

### C. Turvalisus

11. Makseandmete edastamine ainult HTTPS üle, andmed ei logita selgeteksti kujul
12. 3D Secure kinnituse võltsimiskatse (vale token)

### D. Jõudlus

13. PSP vastuse ajaline piir (timeout) ja kliendipoolne käitumine selle ületamisel

## Väljundid

Iga testijuhtumi kohta: samm-sammuline käik, oodatav tulemus, tegelik tulemus, olek
(PASS/FAIL/BLOCKED), seotud veaaruande viide (kui FAIL).
