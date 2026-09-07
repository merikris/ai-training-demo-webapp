Order submission accepts a user identifier and a list of requested product quantities. The endpoint returns a confirmed order when the request is valid, and a short error message when validation fails.

POST /api/orders
Request: { "userId": string, "items": [{ "productId": string, "qty": number }] }
Response 200: { "orderId": string, "status": "confirmed" }
Response 400: { "error": string }
