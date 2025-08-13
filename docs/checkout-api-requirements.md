# Checkout API Requirements (Backend Brief)

Minimal contract to support the new checkout flow.

## POST `/orders/checkout`
- **Body**
```json
{
  "customer": {
    "user_id": "<uuid|null>",
    "email": "string",
    "mobile": "string",
    "first_name": "string",
    "last_name": "string",
    "company": "string?"
  },
  "shipping_address": {
    "address_line1": "string",
    "address_line2": "string?",
    "city": "string",
    "country": "string",
    "region": "string",
    "postal_code": "string"
  },
  "shipping_method": {
    "id": "standard|express|..."
  },
  "payment": {
    "method": "credit-card|cod|..."
  },
  "items": [
    {
      "cart_item_id": "string",
      "piece_id": "string",
      "quantity": 1,
      "selected_options": {"size": "M"}
    }
  ],
  "pricing": {
    "currency": "IRR",
    "subtotal": 0,
    "shipping_cost": 0,
    "tax_amount": 0,
    "discount_amount": 0,
    "total_amount": 0
  }
}
```

- **Response (200)**
```json
{
  "order_id": "string",
  "status": "pending|paid|failed",
  "payment_redirect_url": "string?"
}
```

## POST `/cart/calculate-shipping`
- Request
```json
{
  "address": {
    "address_line1": "string",
    "address_line2": "string?",
    "city": "string",
    "country": "string",
    "region": "string",
    "postal_code": "string"
  },
  "shipping_method": "standard|express"
}
```
- Response
```json
{
  "shipping_cost": 0,
  "estimated_delivery": "YYYY-MM-DD"
}
```

## Notes
- All fields marked as required in the UI must be validated server-side.
- `currency` is taken from cart state and should be echoed/validated.
- If `payment_redirect_url` is returned, frontend will redirect after successful `checkout` call.


