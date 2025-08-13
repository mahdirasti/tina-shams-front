# Cart API Requirements

## Overview

This document outlines the API endpoints required to support the comprehensive cart functionality in the frontend application. The cart system supports item management, pricing calculations, coupon applications, shipping calculations, and server synchronization.

## Base URL

All endpoints should be prefixed with your API base URL (e.g., `https://api.yourdomain.com`)

## Authentication

All cart endpoints require authentication. Include the user's access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## API Endpoints

### 1. Fetch Cart Items

**GET** `/cart`

Retrieves all items in the user's cart.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cart_item_123",
      "piece": {
        "id": "piece_456",
        "title": "Gold Necklace",
        "weight": "1500000",
        "thumbnail": {
          "url": "https://example.com/image.jpg"
        },
        "images": [
          {
            "url": "https://example.com/image1.jpg"
          }
        ],
        "categories": [
          {
            "id": "cat_1",
            "name": "Necklaces"
          }
        ]
      },
      "quantity": 2,
      "selected_options": {
        "size": "medium",
        "color": "gold",
        "engraving": "Custom text"
      },
      "added_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Cart items retrieved successfully"
}
```

### 2. Add Item to Cart

**POST** `/cart/add`

Adds a new item to the user's cart.

**Request Body:**
```json
{
  "piece_id": "piece_456",
  "quantity": 1,
  "selected_options": {
    "size": "medium",
    "color": "gold",
    "engraving": "Custom text"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_123",
    "piece": {
      "id": "piece_456",
      "title": "Gold Necklace",
      "weight": "1500000",
      "thumbnail": {
        "url": "https://example.com/image.jpg"
      },
      "images": [
        {
          "url": "https://example.com/image1.jpg"
        }
      ],
      "categories": [
        {
          "id": "cat_1",
          "name": "Necklaces"
        }
      ]
    },
    "quantity": 1,
    "selected_options": {
      "size": "medium",
      "color": "gold",
      "engraving": "Custom text"
    },
    "added_at": "2024-01-15T10:30:00Z"
  },
  "message": "Item added to cart successfully"
}
```

### 3. Update Cart Item Quantity

**PATCH** `/cart/items/{item_id}`

Updates the quantity of a specific cart item.

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_123",
    "piece": {
      "id": "piece_456",
      "title": "Gold Necklace",
      "weight": "1500000",
      "thumbnail": {
        "url": "https://example.com/image.jpg"
      },
      "images": [
        {
          "url": "https://example.com/image1.jpg"
        }
      ],
      "categories": [
        {
          "id": "cat_1",
          "name": "Necklaces"
        }
      ]
    },
    "quantity": 3,
    "selected_options": {
      "size": "medium",
      "color": "gold",
      "engraving": "Custom text"
    },
    "added_at": "2024-01-15T10:30:00Z"
  },
  "message": "Cart item updated successfully"
}
```

### 4. Remove Item from Cart

**DELETE** `/cart/items/{item_id}`

Removes a specific item from the cart.

**Response:**
```json
{
  "success": true,
  "data": {
    "removed_item_id": "cart_item_123"
  },
  "message": "Item removed from cart successfully"
}
```

### 5. Clear Cart

**DELETE** `/cart/clear`

Removes all items from the user's cart.

**Response:**
```json
{
  "success": true,
  "data": {
    "cleared_items_count": 5
  },
  "message": "Cart cleared successfully"
}
```

### 6. Apply Coupon

**POST** `/cart/apply-coupon`

Applies a discount coupon to the cart.

**Request Body:**
```json
{
  "coupon_code": "SAVE10"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "discount_amount": 150000,
    "coupon_code": "SAVE10",
    "discount_percentage": 10,
    "minimum_purchase": 1000000,
    "valid_until": "2024-12-31T23:59:59Z"
  },
  "message": "Coupon applied successfully"
}
```

**Error Response (Invalid Coupon):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_COUPON",
    "message": "Invalid or expired coupon code"
  }
}
```

### 7. Remove Coupon

**DELETE** `/cart/remove-coupon`

Removes the currently applied coupon from the cart.

**Response:**
```json
{
  "success": true,
  "data": {
    "removed_coupon_code": "SAVE10",
    "discount_amount_removed": 150000
  },
  "message": "Coupon removed successfully"
}
```

### 8. Calculate Shipping

**POST** `/cart/calculate-shipping`

Calculates shipping cost based on address and shipping method.

**Request Body:**
```json
{
  "address": {
    "street": "123 Main Street",
    "city": "Tehran",
    "state": "Tehran Province",
    "country": "Iran",
    "postal_code": "12345"
  },
  "shipping_method": "standard"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shipping_cost": 50000,
    "estimated_delivery": "2024-01-20T10:00:00Z",
    "shipping_method": "standard",
    "delivery_time": "3-5 business days",
    "tracking_available": true
  },
  "message": "Shipping calculated successfully"
}
```

**Available Shipping Methods:**
- `standard` - Standard delivery (3-5 days)
- `express` - Express delivery (1-2 days)
- `overnight` - Overnight delivery
- `pickup` - Store pickup

### 9. Sync Cart with Server

**POST** `/cart/sync`

Synchronizes local cart items with the server. Used when the user has items in local storage that need to be merged with server-side cart.

**Request Body:**
```json
{
  "items": [
    {
      "id": "local_item_123",
      "piece_id": "piece_456",
      "quantity": 2,
      "selected_options": {
        "size": "medium",
        "color": "gold"
      },
      "added_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cart_item_123",
      "piece": {
        "id": "piece_456",
        "title": "Gold Necklace",
        "weight": "1500000",
        "thumbnail": {
          "url": "https://example.com/image.jpg"
        },
        "images": [
          {
            "url": "https://example.com/image1.jpg"
          }
        ],
        "categories": [
          {
            "id": "cat_1",
            "name": "Necklaces"
          }
        ]
      },
      "quantity": 2,
      "selected_options": {
        "size": "medium",
        "color": "gold"
      },
      "added_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Cart synchronized successfully"
}
```

## Data Models

### Cart Item Structure

```typescript
interface CartItem {
  id: string;
  piece: {
    id: string;
    title: string;
    weight: string; // Price in IRR
    thumbnail: {
      url: string;
    };
    images: Array<{
      url: string;
    }>;
    categories: Array<{
      id: string;
      name: string;
    }>;
  };
  quantity: number;
  selected_options?: {
    [key: string]: string | number;
  };
  added_at: string; // ISO 8601 format
}
```

### Piece Structure

```typescript
interface Piece {
  id: string;
  title: string;
  weight: string; // Price in IRR
  thumbnail: {
    url: string;
  };
  images: Array<{
    url: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
}
```

### Address Structure

```typescript
interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postal_code: string;
}
```

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - User not authenticated
- `FORBIDDEN` - User not authorized
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `INVALID_COUPON` - Invalid or expired coupon
- `INSUFFICIENT_STOCK` - Item out of stock
- `INVALID_SHIPPING_ADDRESS` - Invalid shipping address
- `SERVER_ERROR` - Internal server error

## Business Logic Requirements

### 1. Cart Item Management

- **Duplicate Prevention**: If a user tries to add the same piece with identical options, update the quantity instead of creating a duplicate
- **Stock Validation**: Check item availability before adding to cart
- **Quantity Limits**: Enforce minimum (1) and maximum quantity limits per item
- **Price Updates**: Use current piece prices, not cached prices

### 2. Coupon System

- **Validation**: Check coupon validity, expiration, and usage limits
- **Minimum Purchase**: Enforce minimum purchase requirements
- **One Coupon**: Only one coupon can be applied at a time
- **Percentage vs Fixed**: Support both percentage and fixed amount discounts

### 3. Shipping Calculation

- **Address Validation**: Validate shipping addresses
- **Method Availability**: Check if shipping method is available for the address
- **Weight-based**: Calculate shipping based on cart weight
- **Free Shipping**: Apply free shipping for orders above threshold

### 4. Price Calculations

- **Subtotal**: Sum of (item price × quantity) for all items
- **Tax**: Calculate tax based on subtotal (9% for Iran)
- **Shipping**: Add shipping cost to total
- **Discount**: Subtract coupon discount from total
- **Final Total**: Subtotal + Tax + Shipping - Discount

### 5. Data Persistence

- **User Association**: Associate cart items with authenticated users
- **Session Management**: Handle guest users with session-based carts
- **Merge Strategy**: When guest user logs in, merge guest cart with user cart
- **Cleanup**: Remove expired cart items (older than 30 days)

## Security Considerations

1. **Authentication**: Require valid access tokens for all cart operations
2. **Authorization**: Ensure users can only access their own cart
3. **Input Validation**: Validate all input data (quantities, addresses, etc.)
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **SQL Injection**: Use parameterized queries
6. **XSS Prevention**: Sanitize all output data

## Performance Requirements

1. **Response Time**: All endpoints should respond within 500ms
2. **Caching**: Cache piece data to reduce database queries
3. **Database Indexing**: Index cart items by user_id and piece_id
4. **Pagination**: Support pagination for large carts (if needed)
5. **Optimistic Updates**: Allow frontend to update immediately, sync with server

## Testing Requirements

### Unit Tests

- Cart item CRUD operations
- Price calculations
- Coupon validation and application
- Shipping calculation logic
- Error handling

### Integration Tests

- End-to-end cart workflows
- Authentication integration
- Database operations
- API response formats

### Load Tests

- Concurrent cart operations
- Large cart handling
- Database performance under load

## API Documentation

Please provide:

1. **OpenAPI/Swagger** specification
2. **Postman Collection** for testing
3. **Example Requests/Responses** for each endpoint
4. **Error Code Documentation** with all possible error scenarios
5. **Authentication Examples** showing proper token usage

## Implementation Notes

1. **Database Schema**: Design efficient cart and cart_items tables
2. **Indexes**: Create proper database indexes for performance
3. **Transactions**: Use database transactions for cart operations
4. **Logging**: Log all cart operations for debugging
5. **Monitoring**: Set up monitoring for cart API performance
6. **Backup**: Implement cart data backup strategy

## Frontend Integration

The frontend expects:

1. **Consistent Response Format**: All responses should follow the specified format
2. **Error Handling**: Proper error codes and messages
3. **Loading States**: Fast response times for good UX
4. **Real-time Updates**: Consider WebSocket integration for real-time cart updates
5. **Offline Support**: Handle offline scenarios gracefully

## Contact

For questions about these API requirements, please contact the frontend development team.

---

**Version**: 1.0  
**Last Updated**: January 2024  
**Status**: Ready for Implementation 