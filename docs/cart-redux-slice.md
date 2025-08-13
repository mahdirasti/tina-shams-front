# Cart Redux Slice Documentation

## Overview

The cart Redux slice provides comprehensive cart management functionality with both synchronous and asynchronous operations. It supports all possible cart actions including thunks for server communication.

## Features

- ✅ **Synchronous Actions**: Immediate state updates for UI responsiveness
- ✅ **Async Thunks**: Server communication with loading states
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Cart Calculations**: Automatic total, tax, shipping, and discount calculations
- ✅ **Item Management**: Add, update, remove, and clear cart items
- ✅ **Options Support**: Custom options for cart items (size, color, engraving, etc.)
- ✅ **Coupon System**: Apply and remove discount coupons
- ✅ **Shipping Calculation**: Dynamic shipping cost calculation
- ✅ **Cart Synchronization**: Sync local cart with server
- ✅ **Currency Support**: Multi-currency support
- ✅ **Persistence**: Redux persist integration
- ✅ **TypeScript**: Full TypeScript support with proper types

## State Structure

```typescript
export type CartState = {
  items: CartItemType[];
  is_loading: boolean;
  error: string | null;
  total_items: number;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  is_cart_open: boolean;
  last_updated: string | null;
};
```

## Cart Item Structure

```typescript
export type CartItemType = {
  id: string;
  piece: PieceType;
  quantity: number;
  selected_options?: {
    [key: string]: string | number;
  };
  added_at: string;
};
```

## Usage

### Basic Setup

1. **Import the hook**:
```typescript
import { useCart } from "@/app/hooks";
```

2. **Use in component**:
```typescript
const MyComponent = () => {
  const {
    items,
    is_loading,
    total_items,
    total_amount,
    addItemToCartSync,
    removeItemSync,
    // ... other functions
  } = useCart();

  // Your component logic
};
```

### Synchronous Actions

#### Add Item to Cart
```typescript
addItemToCartSync({
  id: piece.id,
  piece: piece,
  quantity: 1,
  selected_options: {
    size: "medium",
    color: "gold",
    engraving: "Custom text"
  }
});
```

#### Update Item Quantity
```typescript
updateItemQuantitySync(itemId, newQuantity);
```

#### Remove Item
```typescript
removeItemSync(itemId);
```

#### Clear Cart
```typescript
clearCartSync();
```

#### Toggle Cart Open/Close
```typescript
setCartOpenState(true); // or false
```

#### Set Shipping Cost
```typescript
setShippingCostSync(50000); // 50,000 IRR
```

#### Set Discount Amount
```typescript
setDiscountAmountSync(100000); // 100,000 IRR
```

#### Update Item Options
```typescript
updateItemOptionsSync(itemId, {
  size: "large",
  color: "silver",
  engraving: "New text"
});
```

### Async Thunks (Server Communication)

#### Fetch Cart from Server
```typescript
const result = await fetchCart();
if (result.meta.requestStatus === 'fulfilled') {
  // Cart loaded successfully
}
```

#### Add Item to Cart (Server Sync)
```typescript
const result = await addItemToCartAsync({
  piece: piece,
  quantity: 1,
  selected_options: {
    size: "medium",
    color: "gold"
  }
});
```

#### Update Item Quantity (Server Sync)
```typescript
const result = await updateCartItemQuantityAsync(itemId, newQuantity);
```

#### Remove Item (Server Sync)
```typescript
const result = await removeItemFromCartAsync(itemId);
```

#### Clear Cart (Server Sync)
```typescript
const result = await clearCartAsync();
```

#### Apply Coupon
```typescript
const result = await applyCouponAsync("SAVE10");
```

#### Remove Coupon
```typescript
const result = await removeCouponAsync();
```

#### Calculate Shipping
```typescript
const result = await calculateShippingAsync(
  {
    address: "123 Main St",
    city: "Tehran",
    country: "Iran",
    postal_code: "12345"
  },
  "standard"
);
```

#### Sync Cart with Server
```typescript
const result = await syncCartAsync();
```

### Utility Functions

#### Check if Item is in Cart
```typescript
const isInCart = isItemInCart(pieceId);
```

#### Get Item Quantity
```typescript
const quantity = getItemQuantity(pieceId);
```

#### Get Item by ID
```typescript
const item = getItemById(pieceId);
```

#### Get Cart Totals
```typescript
const itemCount = getCartItemCount();
const total = getCartTotal();
const subtotal = getCartSubtotal();
const tax = getCartTax();
const discount = getCartDiscount();
const shipping = getShippingCost();
```

#### Check Cart Status
```typescript
const isEmpty = isCartEmpty();
const isLoading = isCartLoading();
const isOpen = isCartOpen();
const error = getCartError();
const lastUpdated = getLastUpdated();
```

## API Endpoints

The cart slice expects the following API endpoints:

- `GET /cart` - Fetch cart items
- `POST /cart/add` - Add item to cart
- `PATCH /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove cart item
- `DELETE /cart/clear` - Clear cart
- `POST /cart/apply-coupon` - Apply coupon
- `DELETE /cart/remove-coupon` - Remove coupon
- `POST /cart/calculate-shipping` - Calculate shipping
- `POST /cart/sync` - Sync cart with server

## Error Handling

The cart slice includes comprehensive error handling:

```typescript
// Check for errors
const error = getCartError();
if (error) {
  console.error("Cart error:", error);
}

// Clear errors
clearErrorSync();

// Set custom errors
setErrorSync("Custom error message");
```

## Loading States

```typescript
// Check loading state
const isLoading = isCartLoading();

// Show loading indicator
if (isLoading) {
  return <div>Loading cart...</div>;
}
```

## Example Component

See `components/shared/cart-example.tsx` for a complete example of all cart functionality.

## Integration with Existing Components

### Header Cart Icon
```typescript
const HeaderCartIcon = () => {
  const { total_items, is_cart_open, setCartOpenState } = useCart();
  
  return (
    <button onClick={() => setCartOpenState(!is_cart_open)}>
      Cart ({total_items})
    </button>
  );
};
```

### Product Add to Cart Button
```typescript
const AddToCartButton = ({ piece }) => {
  const { addItemToCartSync, isItemInCart } = useCart();
  
  const handleAddToCart = () => {
    addItemToCartSync({
      id: piece.id,
      piece: piece,
      quantity: 1
    });
  };
  
  return (
    <button 
      onClick={handleAddToCart}
      disabled={isItemInCart(piece.id)}
    >
      {isItemInCart(piece.id) ? 'In Cart' : 'Add to Cart'}
    </button>
  );
};
```

### Cart Drawer
```typescript
const CartDrawer = () => {
  const {
    items,
    total_amount,
    currency,
    is_cart_open,
    setCartOpenState,
    removeItemSync,
    updateItemQuantitySync
  } = useCart();
  
  if (!is_cart_open) return null;
  
  return (
    <div className="cart-drawer">
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => removeItemSync(item.id)}
          onUpdateQuantity={(quantity) => 
            updateItemQuantitySync(item.id, quantity)
          }
        />
      ))}
      <div className="cart-total">
        Total: {total_amount.toLocaleString()} {currency}
      </div>
    </div>
  );
};
```

## Best Practices

1. **Use synchronous actions for immediate UI feedback**
2. **Use async thunks for server communication**
3. **Handle loading and error states**
4. **Validate data before dispatching actions**
5. **Use the utility functions for common operations**
6. **Persist cart state for better UX**
7. **Implement proper error boundaries**

## TypeScript Support

The cart slice is fully typed with TypeScript:

```typescript
// Proper typing for cart state
const cart: CartState = useSelector((state: RootState) => state.cart);

// Typed actions
const addItem = (item: CartItemType) => dispatch(addItemAction(item));

// Typed async thunks
const addItemAsync = (params: {
  piece: PieceType;
  quantity?: number;
  selected_options?: { [key: string]: string | number };
}) => dispatch(addItemToCart(params));
```

## Performance Considerations

1. **Memoize expensive calculations**
2. **Use React.memo for cart components**
3. **Implement proper loading states**
4. **Optimize re-renders with useCallback**
5. **Use Redux DevTools for debugging**

## Testing

The cart slice can be tested using Redux Toolkit's testing utilities:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart-slice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    }
  });
};

// Test cart actions
const store = createTestStore();
store.dispatch(addItem(mockCartItem));
expect(store.getState().cart.items).toHaveLength(1);
``` 