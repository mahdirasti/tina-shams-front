// components/shared/cart-example.tsx
import React, { useEffect } from "react";
import { useCart } from "@/app/hooks";
import { PieceType } from "@/types/piece";

interface CartExampleProps {
  piece?: PieceType;
}

export const CartExample: React.FC<CartExampleProps> = ({ piece }) => {
  const {
    // State
    items,
    is_loading,
    error,
    total_items,
    subtotal,
    shipping_cost,
    tax_amount,
    discount_amount,
    total_amount,
    currency,
    is_cart_open,
    last_updated,

    // Synchronous actions
    addItemToCartSync,
    updateItemQuantitySync,
    removeItemSync,
    clearCartSync,
    setCartOpenState,
    setShippingCostSync,
    setDiscountAmountSync,
    setCurrencySync,
    updateItemOptionsSync,
    setErrorSync,
    clearErrorSync,

    // Async thunks
    fetchCart,
    addItemToCartAsync,
    updateCartItemQuantityAsync,
    removeItemFromCartAsync,
    clearCartAsync,
    applyCouponAsync,
    removeCouponAsync,
    calculateShippingAsync,
    syncCartAsync,

    // Utility functions
    getItemById,
    getItemQuantity,
    isItemInCart,
    getCartItemCount,
    getCartTotal,
    getCartSubtotal,
    getCartTax,
    getCartDiscount,
    getShippingCost,
    getCurrency,
    isCartEmpty,
    isCartLoading,
    getCartError,
    isCartOpen,
    getLastUpdated,
  } = useCart();

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAddItem = () => {
    if (!piece) return;

    // Synchronous add
    addItemToCartSync({
      id: piece.id,
      piece,
      quantity: 1,
      selected_options: {
        size: "medium",
        color: "gold",
      },
    });

    // Or async add with server sync
    // addItemToCartAsync({
    //   piece,
    //   quantity: 1,
    //   selected_options: {
    //     size: "medium",
    //     color: "gold",
    //   },
    // });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Synchronous update
    updateItemQuantitySync(itemId, quantity);

    // Or async update with server sync
    // updateCartItemQuantityAsync(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    // Synchronous remove
    removeItemSync(itemId);

    // Or async remove with server sync
    // removeItemFromCartAsync(itemId);
  };

  const handleClearCart = () => {
    // Synchronous clear
    clearCartSync();

    // Or async clear with server sync
    // clearCartAsync();
  };

  const handleApplyCoupon = async () => {
    try {
      await applyCouponAsync("SAVE10");
    } catch (error) {
      console.error("Failed to apply coupon:", error);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCouponAsync();
    } catch (error) {
      console.error("Failed to remove coupon:", error);
    }
  };

  const handleCalculateShipping = async () => {
    try {
      await calculateShippingAsync(
        {
          address: "123 Main St",
          city: "Tehran",
          country: "Iran",
          postal_code: "12345",
        },
        "standard"
      );
    } catch (error) {
      console.error("Failed to calculate shipping:", error);
    }
  };

  const handleSyncCart = async () => {
    try {
      await syncCartAsync();
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const handleToggleCart = () => {
    setCartOpenState(!is_cart_open);
  };

  const handleSetShippingCost = () => {
    setShippingCostSync(50000); // 50,000 IRR
  };

  const handleSetDiscount = () => {
    setDiscountAmountSync(100000); // 100,000 IRR
  };

  const handleSetCurrency = () => {
    setCurrencySync("USD");
  };

  const handleUpdateItemOptions = (itemId: string) => {
    updateItemOptionsSync(itemId, {
      size: "large",
      color: "silver",
      engraving: "Custom text",
    });
  };

  const handleSetError = () => {
    setErrorSync("This is a test error message");
  };

  const handleClearError = () => {
    clearErrorSync();
  };

  if (isCartLoading()) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Cart Example</h2>

      {/* Cart Status */}
      <div className='mb-4 p-4 bg-gray-50 rounded'>
        <h3 className='font-semibold mb-2'>Cart Status</h3>
        <p>Items: {getCartItemCount()}</p>
        <p>
          Subtotal: {getCartSubtotal().toLocaleString()} {getCurrency()}
        </p>
        <p>
          Tax: {getCartTax().toLocaleString()} {getCurrency()}
        </p>
        <p>
          Shipping: {getShippingCost().toLocaleString()} {getCurrency()}
        </p>
        <p>
          Discount: {getCartDiscount().toLocaleString()} {getCurrency()}
        </p>
        <p>
          Total: {getCartTotal().toLocaleString()} {getCurrency()}
        </p>
        <p>Is Empty: {isCartEmpty() ? "Yes" : "No"}</p>
        <p>Is Open: {isCartOpen() ? "Yes" : "No"}</p>
        <p>Last Updated: {getLastUpdated()}</p>
        {getCartError() && (
          <p className='text-red-500'>Error: {getCartError()}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className='mb-4 space-y-2'>
        <h3 className='font-semibold'>Actions</h3>

        {piece && (
          <button
            onClick={handleAddItem}
            className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Add Item to Cart
          </button>
        )}

        <button
          onClick={handleToggleCart}
          className='w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Toggle Cart Open/Close
        </button>

        <button
          onClick={handleApplyCoupon}
          className='w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'
        >
          Apply Coupon (SAVE10)
        </button>

        <button
          onClick={handleRemoveCoupon}
          className='w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
        >
          Remove Coupon
        </button>

        <button
          onClick={handleCalculateShipping}
          className='w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'
        >
          Calculate Shipping
        </button>

        <button
          onClick={handleSyncCart}
          className='w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600'
        >
          Sync Cart with Server
        </button>

        <button
          onClick={handleSetShippingCost}
          className='w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
        >
          Set Shipping Cost (50,000 IRR)
        </button>

        <button
          onClick={handleSetDiscount}
          className='w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600'
        >
          Set Discount (100,000 IRR)
        </button>

        <button
          onClick={handleSetCurrency}
          className='w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
        >
          Set Currency (USD)
        </button>

        <button
          onClick={handleSetError}
          className='w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
        >
          Set Test Error
        </button>

        <button
          onClick={handleClearError}
          className='w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
        >
          Clear Error
        </button>

        <button
          onClick={handleClearCart}
          className='w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div className='mb-4'>
        <h3 className='font-semibold mb-2'>Cart Items</h3>
        {items.length === 0 ? (
          <p className='text-gray-500'>No items in cart</p>
        ) : (
          <div className='space-y-2'>
            {items.map((item) => (
              <div
                key={item.id}
                className='p-3 border rounded flex justify-between items-center'
              >
                <div>
                  <p className='font-medium'>{item.piece.title}</p>
                  <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity} | Price:{" "}
                    {parseFloat(item.piece.weight).toLocaleString()}{" "}
                    {getCurrency()}
                  </p>
                  {item.selected_options && (
                    <p className='text-xs text-gray-500'>
                      Options: {JSON.stringify(item.selected_options)}
                    </p>
                  )}
                </div>
                <div className='flex space-x-2'>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                  >
                    -
                  </button>
                  <span className='px-2 py-1'>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdateItemOptions(item.id)}
                    className='px-2 py-1 bg-blue-200 rounded hover:bg-blue-300 text-xs'
                  >
                    Options
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='px-2 py-1 bg-red-200 rounded hover:bg-red-300 text-xs'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Utility Functions Demo */}
      <div className='mb-4 p-4 bg-blue-50 rounded'>
        <h3 className='font-semibold mb-2'>Utility Functions</h3>
        {piece && (
          <div className='space-y-1 text-sm'>
            <p>Is item in cart: {isItemInCart(piece.id) ? "Yes" : "No"}</p>
            <p>Item quantity: {getItemQuantity(piece.id)}</p>
            <p>
              Item by ID: {getItemById(piece.id)?.piece.title || "Not found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
