## Checkout with Payment Gateways (Enduser)

### Overview
- **Goal**: How to create an order, obtain a payment link from a gateway (Zarinpal today), redirect buyer, and verify payment.
- **Server endpoints**: `POST /orders/checkout`, `POST /transactions/request`, `GET /transactions/verify`
- **Env**: set `ZARINPAL_MERCHANT_ID`; use `NODE_ENV=sandbox` for sandbox.

### Supported gateway (today)
- **Zarinpal**
  - Connect guide: [Zarinpal connect](https://www.zarinpal.com/docs/paymentGateway/connectToGateway.html#%D8%A7%D8%B1%D8%B3%D8%A7%D9%84-%D8%A7%D8%B7%D9%84%D8%A7%D8%B9%D8%A7%D8%AA)
  - Sandbox: [Zarinpal sandbox](https://www.zarinpal.com/docs/paymentGateway/sandBox.html)
  - Error list: [Zarinpal errors](https://www.zarinpal.com/docs/paymentGateway/errorList.html)

---

### Flow (client-side)

#### 1) Create order
- Call `POST /orders/checkout` with the checkout payload (see `src/checkout/dto/create-checkout.dto.ts`).
- Server returns at least: `order_id`, `tracking_code`, `status`; may include `payment_redirect_url` or `payment.payment_link`.

Example minimal request body (JSON):
```json
{
  "customer": { "email": "user@example.com", "mobile": "0912..." },
  "shipping_address": { "address_line1": "...", "city": "...", "country": "IR", "region": "...", "postal_code": "..." },
  "shipping_method": { "id": "standard" },
  "payment": { "method": "credit-card" },
  "items": [{ "cart_item_id": "c1", "piece_id": "p1", "quantity": 1 }],
  "pricing": { "currency": "IRR", "subtotal": 10000, "shipping_cost": 0, "tax_amount": 0, "discount_amount": 0, "total_amount": 10000 }
}
```

#### 2) Get payment link
- If server returned `payment_redirect_url` or `payment.payment_link`, redirect user to it.
- Otherwise call `POST /transactions/request` including `metadata.order_id` so server persists the link on the order.

Example `POST /transactions/request`:
```json
{
  "amount": 10000,
  "description": "Order <order_id> payment",
  "gateway": "zarinpal",
  "metadata": {
    "order_id": "<order_id>",
    "callback_url": "https://your-frontend.com/payments/callback"
  }
}
```
- Server normalized response includes `data.payment_url` (or check `data.raw` if missing).

#### 3) Redirect buyer
- Redirect browser to `data.payment_url`.
- Zarinpal redirect URL: `https://payment.zarinpal.com/pg/StartPay/{authority}` (or sandbox host when `NODE_ENV=sandbox`).

#### 4) After payment — verification
- Gateway redirects to `callback_url` with query params (Zarinpal: `Authority` and `Status`).
- On the frontend callback route:
  - Call `GET /transactions/verify?gateway=zarinpal&Authority=...&Status=...`
  - Or let server receive callback directly and perform verification.
- Zarinpal success code: `100` => verified (`ref_id` returned). `101` means already-verified.

#### 5) Final UX
- On success: show confirmation with `tracking_code` and order details.
- On failure/cancel: show message and allow retry (`POST /transactions/request`) or other payment method.

---

### Error handling (client)
- If `POST /transactions/request` fails: show error and allow retry.
- If verification fails or `Status != OK`: treat as canceled/failed and present retry/alternate options.
- For gateway-specific codes consult the gateway error list (link above).

---

### Quick checklist for frontend implementers
- **Collect & validate** checkout info.
- **Create order** via `POST /orders/checkout`.
- **If link present** in response → redirect.
- **If not** → call `POST /transactions/request` with `metadata.order_id`.
- **Redirect** to `data.payment_url`.
- **On callback** → call `GET /transactions/verify` and display final state.
- **Show tracking code** on success.

---

If you want, I can also add a small frontend callback example (React/Next/Vue) or update the server so `POST /orders/checkout` auto-requests the payment link and returns it. Let me know which.


