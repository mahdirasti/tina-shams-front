// hooks/use-cart.ts
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector, store } from "@/redux/store";
import { RootState } from "@/redux/store";
import {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCartItems,
  setCartOpen,
  setShippingCost,
  setDiscountAmount,
  setCurrency,
  updateItemOptions,
  setError,
  clearError,
  logCartState,
  // Async thunks
  fetchCartFromServer,
  addItemToCart,
  updateCartItemQuantity as updateCartItemQuantityThunk,
  removeItemFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  calculateShipping,
  syncCartWithServer,
} from "@/redux/slices/cart-slice";
import { PieceType } from "@/types/piece";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);

  // Debug: Log cart state on mount to verify persistence
  useEffect(() => {
    console.log("Cart hook mounted, current state:", {
      items: cart.items.length,
      total_items: cart.total_items,
      last_updated: cart.last_updated,
    });
  }, [cart.items.length, cart.total_items, cart.last_updated]);

  // Synchronous actions
  const addItemToCartSync = useCallback(
    (item: {
      id: string;
      piece: PieceType;
      quantity: number;
      selected_options?: { [key: string]: string | number };
    }) => {
      dispatch(
        addItem({
          ...item,
          added_at: new Date().toISOString(),
        })
      );
    },
    [dispatch]
  );

  const updateItemQuantitySync = useCallback(
    (item_id: string, quantity: number) => {
      dispatch(updateItemQuantity({ item_id, quantity }));
    },
    [dispatch]
  );

  const removeItemSync = useCallback(
    (item_id: string) => {
      dispatch(removeItem(item_id));
    },
    [dispatch]
  );

  const clearCartSync = useCallback(() => {
    dispatch(clearCartItems());
  }, [dispatch]);

  const setCartOpenState = useCallback(
    (isOpen: boolean) => {
      dispatch(setCartOpen(isOpen));
    },
    [dispatch]
  );

  const setShippingCostSync = useCallback(
    (cost: number) => {
      dispatch(setShippingCost(cost));
    },
    [dispatch]
  );

  const setDiscountAmountSync = useCallback(
    (amount: number) => {
      dispatch(setDiscountAmount(amount));
    },
    [dispatch]
  );

  const setCurrencySync = useCallback(
    (currency: string) => {
      dispatch(setCurrency(currency));
    },
    [dispatch]
  );

  const updateItemOptionsSync = useCallback(
    (item_id: string, selected_options: { [key: string]: string | number }) => {
      dispatch(updateItemOptions({ item_id, selected_options }));
    },
    [dispatch]
  );

  const setErrorSync = useCallback(
    (error: string | null) => {
      dispatch(setError(error));
    },
    [dispatch]
  );

  const clearErrorSync = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const logCartStateSync = useCallback(() => {
    dispatch(logCartState());
  }, [dispatch]);

  // Async thunks
  const fetchCart = useCallback(() => {
    // Only fetch cart from server if user is authenticated
    const authState = store.getState().authReducer;
    if (authState.access_token && authState.user) {
      return dispatch(fetchCartFromServer());
    } else {
      console.log("Skipping cart fetch - user not authenticated");
      return Promise.resolve();
    }
  }, [dispatch]);

  const addItemToCartAsync = useCallback(
    (params: {
      piece: PieceType;
      quantity?: number;
      selected_options?: { [key: string]: string | number };
    }) => {
      return dispatch(addItemToCart(params));
    },
    [dispatch]
  );

  const updateCartItemQuantityAsync = useCallback(
    (item_id: string, quantity: number) => {
      return dispatch(updateCartItemQuantityThunk({ item_id, quantity }));
    },
    [dispatch]
  );

  const removeItemFromCartAsync = useCallback(
    (item_id: string) => {
      return dispatch(removeItemFromCart(item_id));
    },
    [dispatch]
  );

  const clearCartAsync = useCallback(() => {
    return dispatch(clearCart());
  }, [dispatch]);

  const applyCouponAsync = useCallback(
    (coupon_code: string) => {
      return dispatch(applyCoupon(coupon_code));
    },
    [dispatch]
  );

  const removeCouponAsync = useCallback(() => {
    return dispatch(removeCoupon());
  }, [dispatch]);

  const calculateShippingAsync = useCallback(
    (address: any, shipping_method: string) => {
      return dispatch(calculateShipping({ address, shipping_method }));
    },
    [dispatch]
  );

  const syncCartAsync = useCallback(() => {
    return dispatch(syncCartWithServer());
  }, [dispatch]);

  // Utility functions
  const getItemById = useCallback(
    (item_id: string) => {
      return cart.items.find((item) => item.id === item_id);
    },
    [cart.items]
  );

  const getItemQuantity = useCallback(
    (item_id: string) => {
      const item = getItemById(item_id);
      return item ? item.quantity : 0;
    },
    [getItemById]
  );

  const isItemInCart = useCallback(
    (item_id: string) => {
      return cart.items.some((item) => item.id === item_id);
    },
    [cart.items]
  );

  const getCartItemCount = useCallback(() => {
    return cart.total_items;
  }, [cart.total_items]);

  const getCartTotal = useCallback(() => {
    return cart.total_amount;
  }, [cart.total_amount]);

  const getCartSubtotal = useCallback(() => {
    return cart.subtotal;
  }, [cart.subtotal]);

  const getCartTax = useCallback(() => {
    return cart.tax_amount;
  }, [cart.tax_amount]);

  const getCartDiscount = useCallback(() => {
    return cart.discount_amount;
  }, [cart.discount_amount]);

  const getShippingCost = useCallback(() => {
    return cart.shipping_cost;
  }, [cart.shipping_cost]);

  const getCurrency = useCallback(() => {
    return cart.currency;
  }, [cart.currency]);

  const isCartEmpty = useCallback(() => {
    return cart.items.length === 0;
  }, [cart.items.length]);

  const isCartLoading = useCallback(() => {
    return cart.is_loading;
  }, [cart.is_loading]);

  const getCartError = useCallback(() => {
    return cart.error;
  }, [cart.error]);

  const isCartOpen = useCallback(() => {
    return cart.is_cart_open;
  }, [cart.is_cart_open]);

  const getLastUpdated = useCallback(() => {
    return cart.last_updated;
  }, [cart.last_updated]);

  return {
    // State
    cart,
    items: cart.items,
    is_loading: cart.is_loading,
    error: cart.error,
    total_items: cart.total_items,
    subtotal: cart.subtotal,
    shipping_cost: cart.shipping_cost,
    tax_amount: cart.tax_amount,
    discount_amount: cart.discount_amount,
    total_amount: cart.total_amount,
    currency: cart.currency,
    is_cart_open: cart.is_cart_open,
    last_updated: cart.last_updated,

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
    logCartStateSync,

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
  };
};
