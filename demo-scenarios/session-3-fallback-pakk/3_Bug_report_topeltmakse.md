# Bug report: Topeltmakse tekib kiire topeltklõpsu korral

*Fiktiivne näidisdokument — Sessioon 3 fallback-pakk. Vastab testiplaani punktile 7 ja
spetsifikatsiooni reeglile BR-4.*

**ID**: BUG-2044
**Prioriteet**: Kõrge
**Keskkond**: Staging (PSP sandbox)
**Avastas**: Manuaaltestija, regressioonitsükkel

## Kirjeldus

Kui kasutaja klõpsab tellimuse kinnituslehel nuppu "Maksa" kaks korda väga kiiresti
järjest (alla 300ms vahega, nt topeltklõps trackpadil), läbib mõnikord kaks eraldi
makset sama tellimuse eest. Klient näeb pangakontol kahte debiteerimist.

## Sammud reprodutseerimiseks

1. Vormista tellimus summas 45,00 €, vali makseviis "Pangakaart"
2. Sisesta testkaardi andmed (PSP sandbox testkaart)
3. Kliki "Maksa" nupule kaks korda väga kiiresti järjest (topeltklõps)
4. Oota tellimuse kinnituslehe laadimist

## Oodatud tulemus

Ainult üks makse läheb läbi. Teine klõps ei tohi algatada uut makset (nupp peaks
deaktiveeruma esimese klõpsu järel, või backend peab tuvastama duplikaatpäringu).

## Tegelik tulemus

Ligikaudu 1 juhul 5-st läbib kaks eraldi makset. Tellimuste süsteemis tekib üks
tellimus, aga PSP poolel kaks eraldi transaktsiooni ID-d.

## Stack trace (backend log, väljavõte)

```
2026-08-14T09:12:03.114Z WARN  PaymentController - duplicate charge attempt detected
  but idempotency key missing on second request
2026-08-14T09:12:03.118Z INFO  PaymentService.charge() - order_id=ORD-88213
  amount=45.00 currency=EUR psp_ref=null
2026-08-14T09:12:03.221Z INFO  PaymentService.charge() - order_id=ORD-88213
  amount=45.00 currency=EUR psp_ref=null
2026-08-14T09:12:03.980Z INFO  PaymentGateway.response - psp_ref=TXN-9981221 status=OK
2026-08-14T09:12:04.055Z INFO  PaymentGateway.response - psp_ref=TXN-9981222 status=OK
2026-08-14T09:12:04.061Z ERROR OrderService - order ORD-88213 already marked PAID,
  received second PAID event, ignoring order-state update but payment already captured
```

## Analüüs (esialgne)

Nupp deaktiveeritakse frontendis alles pärast esimese vastuse saabumist (~850ms), mitte
kohe klõpsu hetkel. Kui teine klõps jõuab serverisse enne esimest vastust, ei ole
backend-poolset idempotentsuskontrolli (puudub idempotency key päringus), mistõttu
mõlemad päringud töödeldakse eraldi.

## Soovitus

1. Deaktiveeri nupp kohe esimese klõpsu hetkel (frontend)
2. Lisa idempotency key iga makseinitsiatsiooni päringu külge, kontrolli backend'is
   duplikaate enne PSP poole pöördumist
