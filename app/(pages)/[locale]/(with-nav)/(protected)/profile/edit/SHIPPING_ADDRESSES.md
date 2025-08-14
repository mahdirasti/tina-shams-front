## Shipping Addresses API (minimal)

### Auth
- Bearer token required for all endpoints.

### Address shape
```json
{
  "_id": "661...",
  "address_line1": "Main 1",
  "address_line2": "Unit 2",
  "city": "Tehran",
  "country": "IR",
  "region": "TEH",
  "postal_code": "12345",
  "is_default": true
}
```

### GET /users/me/shipping-addresses
- List my addresses.
- Response 200:
```json
{
  "data": [ { "_id": "...", "address_line1": "...", "is_default": true } ],
  "message": "",
  "statusCode": 200
}
```

### POST /users/me/shipping-addresses
- Add new address. Optional `is_default: true` will make it the only default.
- Body:
```json
{
  "address_line1": "Main 1",
  "address_line2": "Unit 2",
  "city": "Tehran",
  "country": "IR",
  "region": "TEH",
  "postal_code": "12345",
  "is_default": true
}
```
- Response 200: returns full list of addresses.

### PATCH /users/me/shipping-addresses/:addressId
- Update an address. Setting `is_default: true` will set it as the only default.
- Body (example):
```json
{ "address_line1": "New Street 10", "is_default": true }
```
- Response 200: returns the updated address.

### DELETE /users/me/shipping-addresses/:addressId
- Remove an address. If it was default and others remain, the first will become default.
- Response 200: `{ "data": { "deleted": true } }`

### POST /users/me/shipping-addresses/:addressId/default
- Make this the default address (others become non-default).
- Response 200: returns the updated default address.

Notes
- Exactly one default is kept when possible.
- Field names match checkout `shipping_address` DTO.

