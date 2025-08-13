## Checkout API (minimal)

### Auth
- Bearer token required for all endpoints below.

### Status values
- pending, paid, failed, delivered, refunded

### POST /orders/checkout
- Creates an order and returns a tracking code.
- Body:
```json
{
  "customer": { "user_id": null, "email": "a@b.com", "mobile": "09...", "first_name": "A", "last_name": "B" },
  "shipping_address": { "address_line1": "Main 1", "city": "Tehran", "country": "IR", "region": "TEH", "postal_code": "12345" },
  "shipping_method": { "id": "standard" },
  "payment": { "method": "credit-card" },
  "items": [
    { "cart_item_id": "xxx", "piece_id": "yyy", "quantity": 1 }
  ],
  "pricing": { "currency": "IRR", "subtotal": 100000, "shipping_cost": 50000, "tax_amount": 9000, "discount_amount": 0, "total_amount": 159000 }
}
```
- Response 200:
```json
{
  "data": {
    "order_id": "64f...",
    "tracking_code": "AB12CD34EF56",
    "status": "pending",
    "payment_redirect_url": "https://..."
  },
  "message": "Order created successfully.",
  "statusCode": 200
}
```
Notes:
- Backend recalculates totals; frontend values are hints.
- If payment_redirect_url exists, redirect user.

### POST /cart/calculate-shipping
- Calculates shipping for the current cart.
- Body:
```json
{
  "address": {
    "address_line1": "Main 1",
    "city": "Tehran",
    "country": "IR",
    "region": "TEH",
    "postal_code": "12345"
  },
  "shipping_method": "standard"
}
```
- Response 200:
```json
{
  "data": {
    "shipping_cost": 50000,
    "estimated_delivery": "2025-08-15T10:00:00.000Z",
    "shipping_method": "standard",
    "delivery_time": "3-5 business days",
    "tracking_available": true
  },
  "message": "Shipping calculated successfully.",
  "statusCode": 200
}
```

### My Orders (end-user)
- GET /orders/my?page=1&limit=20 → list my orders
- GET /orders/:id → my order detail

### Admin
- GET /orders → list all (perm: GET_ORDERS)
- GET /orders/admin/:id → detail (perm: VIEW_ORDER)
- PATCH /orders/:id { "status": "delivered" } → update (perm: EDIT_ORDER)
- DELETE /orders/:id → delete (perm: DELETE_ORDER)

### Typical checkout flow for FE
1) Get cart + totals
2) POST /cart/calculate-shipping
3) POST /orders/checkout
4) If payment_redirect_url, redirect; else show confirmation with tracking_code
