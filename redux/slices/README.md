
## Frontend integration (Redux / React)

Below is a recommended minimal contract and guidance for frontend engineers to integrate cart endpoints with Redux.

- **Unified cart response shape** (all cart-changing endpoints now return this shape):

```json
{
  "items": [
    {
      "id": "cart_item_123",
      "piece": { "id": "piece_456", "title": "Gold Necklace", "weight": "1500000", "thumbnail": {}, "cover": {}, "categories": [] },
      "variant_id": null,
      "quantity": 2,
      "added_at": "2024-01-15T10:30:00Z"
    }
  ],
  "discount": 0,
  "shipping": 0,
  "subtotal": 0,
  "tax": 0,
  "total": 0
}
```

- **Endpoints that return the unified cart**:
  - `GET /cart` — fetch full cart
  - `POST /cart/add` — after adding, returns updated cart
  - `PATCH /cart/items/:itemId` — after update, returns updated cart
  - `DELETE /cart/items/:itemId` — after removal, returns updated cart
  - `DELETE /cart/clear` — after clearing, returns updated (empty) cart

- **Redux suggestions**:
  - State slice shape:

```js
const initialState = {
  items: [],
  discount: 0,
  shipping: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  loading: false,
  error: null,
};
```

  - Recommended actions:
    - `fetchCart()` — GET `/cart`
    - `addToCart(payload)` — POST `/cart/add` (optimistic update OK; reconcile with response)
    - `updateCartItem(itemId, qty)` — PATCH `/cart/items/:itemId`
    - `removeCartItem(itemId)` — DELETE `/cart/items/:itemId`
    - `clearCart()` — DELETE `/cart/clear`
    - `applyCoupon(code)` — POST `/cart/apply-coupon` then refetch `GET /cart` or use returned coupon data

  - Example thunk (simplified):

```js
export const addToCart = (payload) => async (dispatch) => {
  dispatch({ type: 'cart/add/pending' });
  try {
    const res = await api.post('/cart/add', payload);
    dispatch({ type: 'cart/set', payload: res.data.data });
  } catch (e) {
    dispatch({ type: 'cart/add/rejected', error: e.message });
  }
};
```

- **Optimistic UI**: Frontend can optimistically update the cart UI but must reconcile with the server response (the server returns the full cart). Use the returned cart to resolve conflicts and recalculate totals.

- **Error handling**: All endpoints use `{ success: boolean, data: any, message?: string, error?: { code, message } }` on failure. Use `error.code` to map to user-facing messages.

- **Notes on currency / formatting**: All numeric totals are raw integers in IRR. Frontend should format using locale-aware utilities.
