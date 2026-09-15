# Maksevoo API kirjeldus

*Fiktiivne näidisdokument — Sessioon 3 fallback-pakk.*

## POST /api/payments/charge

Algatab makse tellimuse eest.

### Request

```json
{
  "order_id": "ORD-88213",
  "amount": 45.00,
  "currency": "EUR",
  "payment_method": "card",
  "idempotency_key": "a1b2c3d4-...",
  "card_token": "tok_xxx"
}
```

| Väli | Tüüp | Kohustuslik | Kirjeldus |
|---|---|---|---|
| order_id | string | jah | Tellimuse unikaalne ID |
| amount | number | jah | Summa (min 1.00, max 3000.00 ilma lisakinnituseta) |
| currency | string | jah | ISO 4217 valuutakood |
| payment_method | enum | jah | `card` \| `bank_link` \| `installment` |
| idempotency_key | string | jah | Väldib topeltmakset korduspäringu korral |
| card_token | string | tingimuslik | Nõutav kui payment_method=card |

### Response 200 OK

```json
{
  "transaction_id": "TXN-9981221",
  "status": "succeeded",
  "requires_3ds": false,
  "order_id": "ORD-88213"
}
```

### Response 402 Payment Required (makse ebaõnnestus)

```json
{
  "error_code": "card_declined",
  "message": "Kaart lükati tagasi",
  "retryable": true
}
```

### Veakoodid

| Kood | Tähendus | Taastatav? |
|---|---|---|
| card_declined | Pank lükkas makse tagasi | Jah (uus katse) |
| card_expired | Kaart on aegunud | Ei (vaja uut kaarti) |
| psp_timeout | PSP ei vastanud 8s jooksul | Jah |
| duplicate_request | Sama idempotency_key juba töödeldud | — (tagastab algse vastuse) |
| amount_limit_exceeded | Summa ületab piiri, vajab lisakinnitust | Ei |

## POST /api/payments/{transaction_id}/confirm-3ds

Kinnitab 3D Secure väljakutse pärast kasutaja autentimist panga lehel.

## GET /api/payments/{transaction_id}

Tagastab makse hetkeoleku (`pending` \| `succeeded` \| `failed`).
