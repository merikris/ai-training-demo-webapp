# Öise testijooksu ebaõnnestumised — broneerimissüsteem

Klassifitseerige iga ebaõnnestumine ühte nelja kategooriasse:

- **Päris viga** — süsteem käitub valesti
- **Flaky** — ajastus, juhuslikkus; kordamisel võib mööduda
- **Keskkond/andmed** — test ja süsteem on korras, aga keskkond või andmed ei ole
- **Test ise on vale** — test kontrollib valet asja või valel viisil

Põhjendage iga valik ühe lausega **enne**, kui vastusevõtit näete.

---

### L1 — test_get_booking_by_id
```
GET https://restful-booker.herokuapp.com/booking/1
Expected status 200, got 404 Not Found
Run history: passed 17/20 last nights. Test uses hardcoded bookingid=1.
```

### L2 — test_create_booking_returns_201
```
POST /booking  {"firstname":"Õie","lastname":"Tamm", ... }
Expected status 201, got 200
Response body: {"bookingid":1402,"booking":{"firstname":"Õie", ...}}
Run history: failed 20/20 last nights.
```

### L3 — test_booking_form_confirmation (UI)
```
TimeoutError: locator.click: Timeout 5000ms exceeded.
waiting for getByRole('button', { name: 'Book' })
Screenshot: page still loading room images.
Run history: passed 14/20 last nights, failures at random times.
```

### L4 — test_checkout_before_checkin_rejected
```
POST /booking  bookingdates: {"checkin":"2026-10-12","checkout":"2026-10-10"}
Expected status 400, got 200
Response body: {"bookingid":1417, ... "checkin":"2026-10-12","checkout":"2026-10-10"}
Run history: failed 20/20 last nights.
```

### L5 — test_daily_report_revenue
```
AssertionError: expected tulu_eur for 2026-10-11 room 101 = 100.00, got 120.00
Report version v2.4. 2026-10-11 is a Sunday.
Run history: new test, first run.
```

### L6 — test_update_booking
```
PUT /booking/1398  Expected 200, got 503 Service Unavailable
Response: "Application error — heroku"
Run history: passed 19/20; all 11 tests failed at 02:14–02:16 the same night.
```

### L7 — test_booking_count_is_ten
```
GET /booking  Expected list length == 10, got 27
Run history: failed 12/20 last nights.
```

### L8 — test_invalid_date_rejected
```
POST /booking  bookingdates: {"checkin":"2026-02-30","checkout":"2026-03-02"}
Expected status 400, got 200
Response: "checkin":"2026-03-02"
Run history: failed 20/20 last nights.
```
