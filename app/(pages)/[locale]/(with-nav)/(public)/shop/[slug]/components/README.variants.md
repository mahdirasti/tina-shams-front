## End‑User Integration Guide: Attributes, Variants, Cart, and Checkout

This guide explains how frontend (end-user) apps should work with product attributes, variants, cart, and checkout.

### Key Concepts
- **Attributes**: Reusable product properties like Size, Color. Attributes are attached to Categories by admins. Products inherit relevant attributes via their categories.
- **Variants**: A purchasable combination of attribute values for a product (e.g., Size S + Color Red) with its own price/stock/SKU.
- **Cart**: You can add a product with a specific variant to the cart.

### Attribute Types
Attributes have an `inputType` that informs the UI control to render.

- TEXT: free text input
- NUMBER: numeric input
- SELECT: single select from `options`
- MULTISELECT: multi-select from `options`
- COLOR: color picker/swatches (values often hex like `#FF0000`)
- SIZE: sizing chips (values like `XS`, `S`, `M`, `L`, etc.)

Each selectable attribute can have `options: [{ label?: Translation[], value: string, meta?: any }]`.

### i18n
Send header `lang: en` or `lang: fa` to receive translated labels in responses where translations exist. For attributes fetched via categories, their `name` and option `label` are translated by the server.

---

## Fetching Data

### 1) Fetch product with its variants
GET `/products/:id`

Response (shape):
```json
{
  "data": {
    "id": "<productId>",
    "title": [],
    "categories": ["<categoryId>"],
    "variants": [
      {
        "id": "<variantId>",
        "product": "<productId>",
        "attributeValues": [
          { "attribute": "<attributeIdSize>", "value": "S" },
          { "attribute": "<attributeIdColor>", "value": "#FF0000" }
        ],
        "price": 100,
        "sku": "SKU-S-RED",
        "stock": 5
      }
    ]
  }
}
```

Use `variants` to render available combinations and prices/stock.

### 2) Fetch category to get attribute definitions (names/options)
GET `/category/:id`

Response includes `attributes` via virtual populate:
```json
{
  "data": {
    "id": "<categoryId>",
    "name": "Rings",
    "attributes": [
      {
        "id": "<attributeIdSize>",
        "name": "Size",
        "inputType": "SIZE",
        "isVariant": true,
        "options": [
          { "label": "S", "value": "S" },
          { "label": "L", "value": "L" }
        ]
      },
      {
        "id": "<attributeIdColor>",
        "name": "Color",
        "inputType": "COLOR",
        "isVariant": true,
        "options": [
          { "label": "Red", "value": "#FF0000" },
          { "label": "Blue", "value": "#0000FF" }
        ]
      }
    ]
  }
}
```

Tip: A product may have multiple categories. You can merge and de-duplicate the attributes of all its categories for the variant UI.

---

## Rendering the Variant UI
1) Load product variants (from `/products/:id`).
2) Load attribute definitions (from category GET). Filter attributes where `isVariant=true`.
3) Render controls based on `inputType`:
   - TEXT/NUMBER: inputs (rarely used for variants)
   - SELECT: dropdown
   - MULTISELECT: chips/tags (note: variants usually use single select per attribute)
   - COLOR: swatches using `options.value` (hex) and display `label`
   - SIZE: size chips using `options.value` and `label`
4) When user selects values, find the matching variant:
   - Compare user selection to each variant’s `attributeValues` (all attribute/value pairs must match).
   - Use the found variant’s `id` and `price`/`stock` for add-to-cart and display.

Pseudo:
```ts
const selected = { [attributeIdSize]: "S", [attributeIdColor]: "#FF0000" };
const variant = product.variants.find(v =>
  v.attributeValues.every(av => selected[av.attribute] === av.value)
);
```

---

## Cart

### Add item to cart
POST `/cart/add`

Body:
```json
{ "piece_id": "<productId>", "variant_id": "<variantId>", "quantity": 2 }
```

Notes:
- `variant_id` is optional, but required to purchase a specific variant.
- Server enforces that `variant_id` belongs to `piece_id` and that stock is sufficient.
- Cart is unique per `(user, product, variant)`. Adding same `(product, variant)` increases quantity.

### Get cart items
GET `/cart`

Response items include `piece` and `variant_id` if present. The server uses variant price for totals. If you need to display the variant’s attributes in the cart UI, use the product detail with variants to map `variant_id` to attribute values.

### Update quantity / Remove
- PATCH `/cart/items/:itemId` → `{ "quantity": 3 }`
- DELETE `/cart/items/:itemId`

### Totals
GET `/cart/totals`

Server computes totals using current variant price and product price (if no variant). Do not trust client-side computed totals.

---

## Checkout

POST `/orders/checkout`

Items can include `variant_id`:
```json
{
  "customer": { "email": "a@b.com", "mobile": "09..." },
  "shipping_address": { "address_line1": "Main 1", "city": "Tehran", "country": "IR", "region": "TEH", "postal_code": "12345" },
  "shipping_method": { "id": "standard" },
  "payment": { "method": "credit-card" },
  "items": [
    { "cart_item_id": "<cartItemId>", "piece_id": "<productId>", "variant_id": "<variantId>", "quantity": 1 }
  ],
  "pricing": { "currency": "IRR", "subtotal": 0, "shipping_cost": 0, "tax_amount": 0, "discount_amount": 0, "total_amount": 0 }
}
```

Server re-calculates totals and validates data. A `tracking_code` is returned on success.

---

## Error Messages (common)
- `product_doesnt_exist`: Invalid product
- `variant_id_should_be_mongo_id`: Variant id is malformed
- `variant_doesnt_exist`: Variant not found
- `invalid_attribute_for_product_category`: Attribute not allowed for this product’s categories
- `invalid_attribute_value`: Invalid value for attribute

Use these to provide user-friendly toasts.

---

## Recommended UX
- Disable variant options that would not match any existing variant (e.g., Size S + Color Yellow not available).
- Show variant stock; prevent adding quantity beyond available stock.
- Always set `lang` header so names/labels are localized.


