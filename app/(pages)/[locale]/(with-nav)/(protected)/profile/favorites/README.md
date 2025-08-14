## Wishlist API (minimal)

### Auth
- Bearer token required for all endpoints.

### Object shape
- Wishlist is per-user: `{ id, user, product_ids: ["prodId", ...] }`
- Listing returns product documents for pagination window.

### GET /wishlist/my?page=1&limit=20
- List wishlist products (paginated).
- Response 200:
```json
{
  "data": {
    "items": [ { "id": "prodId", "title": [], "thumbnail": {}, "cover": {}, "categories": [] } ],
    "page": 1,
    "limit": 20,
    "total": 42
  },
  "message": "",
  "statusCode": 200
}
```

### POST /wishlist/my/add/:productId
- Adds a product to wishlist.
- Response 200: `{ "data": { "added": true }, "message": "" }`

### DELETE /wishlist/my/remove/:productId
- Removes a product from wishlist.
- Response 200: `{ "data": { "removed": true }, "message": "" }`

### POST /wishlist/my/replace
- Replace entire wishlist with a list of product ids.
- Body:
```json
{ "product_ids": ["id1", "id2"] }
```
- Response 200: `{ "data": { "data": { "id": "...", "product_ids": ["id1","id2"] } } }`
