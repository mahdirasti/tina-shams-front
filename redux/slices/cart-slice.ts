// redux/slices/cart-slice.ts
import axiosInstance, { FetchDataType } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
  id: string;
  piece: PieceType;
  quantity: number;
  selected_options?: {
    [key: string]: string | number;
  };
  added_at: string;
  variant_id?: {
    product: string;
    attributeValues: {
      attribute: string;
      value: string;
    }[];
    price: number;
    sku: string;
    stock: number;
    combinationKey: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};

// Ensure the cart state is serializable for persistence
export type SerializableCartState = {
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

const initialState: CartState = {
  items: [],
  is_loading: false,
  error: null,
  total_items: 0,
  subtotal: 0,
  shipping_cost: 0,
  tax_amount: 0,
  discount_amount: 0,
  total_amount: 0,
  currency: "IRR",
  is_cart_open: false,
  last_updated: null,
};

// Async thunks for cart operations

export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchCartFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<FetchDataType<CartItemType[]>>(
        "/cart"
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (
    {
      piece,
      quantity = 1,
      selected_options = {},
      variant_id,
    }: {
      piece: PieceType;
      quantity?: number;
      selected_options?: { [key: string]: string | number };
      variant_id?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<FetchDataType<CartItemType>>(
        "/cart/add",
        {
          piece_id: piece.id,
          quantity,
          selected_options,
          ...(variant_id ? { variant_id } : {}),
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    {
      item_id,
      quantity,
    }: {
      item_id: string;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch<FetchDataType<CartItemType>>(
        `/cart/items/${item_id}`,
        {
          quantity,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update item quantity"
      );
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (item_id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cart/items/${item_id}`);
      return item_id;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to remove item from cart"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/cart/clear");
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (coupon_code: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<
        FetchDataType<{
          discount_amount: number;
          coupon_code: string;
        }>
      >("/cart/apply-coupon", {
        coupon_code,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to apply coupon"
      );
    }
  }
);

export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/cart/remove-coupon");
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to remove coupon"
      );
    }
  }
);

export const calculateShipping = createAsyncThunk(
  "cart/calculateShipping",
  async (
    {
      address,
      shipping_method,
    }: {
      address: any;
      shipping_method: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<
        FetchDataType<{
          shipping_cost: number;
          estimated_delivery: string;
        }>
      >("/cart/calculate-shipping", {
        address,
        shipping_method,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to calculate shipping"
      );
    }
  }
);

export const syncCartWithServer = createAsyncThunk(
  "cart/syncCartWithServer",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { cart: CartState };
      const localItems = state.cart.items;

      const response = await axiosInstance.post<FetchDataType<CartItemType[]>>(
        "/cart/sync",
        {
          items: localItems,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to sync cart"
      );
    }
  }
);

// Helper function to calculate cart totals
const calculateCartTotals = (
  items: CartItemType[],
  discount_amount: number = 0,
  shipping_cost: number = 0
) => {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.piece.weight) || 0; // Assuming weight represents price
    return sum + itemPrice * item.quantity;
  }, 0);

  const tax_amount = subtotal * 0; // 9% tax rate
  const total_amount = subtotal + shipping_cost + tax_amount - discount_amount;

  return {
    subtotal,
    tax_amount,
    total_amount,
    total_items: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Synchronous actions
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      const totals = calculateCartTotals(
        state.items,
        state.discount_amount,
        state.shipping_cost
      );
      Object.assign(state, totals);
      state.last_updated = new Date().toISOString();

      // Debug: Log cart state for persistence verification
      console.log("Cart state updated:", {
        items: state.items.length,
        total_items: state.total_items,
        last_updated: state.last_updated,
      });
    },

    updateItemQuantity: (
      state,
      action: PayloadAction<{ item_id: string; quantity: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item_id
      );

      if (itemIndex >= 0) {
        if (action.payload.quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = action.payload.quantity;
        }

        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateCartTotals(
        state.items,
        state.discount_amount,
        state.shipping_cost
      );
      Object.assign(state, totals);
      state.last_updated = new Date().toISOString();
    },

    clearCartItems: (state) => {
      state.items = [];
      state.total_items = 0;
      state.subtotal = 0;
      state.tax_amount = 0;
      state.total_amount = 0;
      state.discount_amount = 0;
      state.last_updated = new Date().toISOString();
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.is_cart_open = action.payload;
    },

    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shipping_cost = action.payload;
      const totals = calculateCartTotals(
        state.items,
        state.discount_amount,
        state.shipping_cost
      );
      Object.assign(state, totals);
      state.total_amount += state.shipping_cost;
    },

    setDiscountAmount: (state, action: PayloadAction<number>) => {
      state.discount_amount = action.payload;
      const totals = calculateCartTotals(
        state.items,
        state.discount_amount,
        state.shipping_cost
      );
      Object.assign(state, totals);
    },

    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },

    updateItemOptions: (
      state,
      action: PayloadAction<{
        item_id: string;
        selected_options: { [key: string]: string | number };
      }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item_id
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].selected_options =
          action.payload.selected_options;
        state.last_updated = new Date().toISOString();
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Debug action to log cart state
    logCartState: (state) => {
      console.log("Current cart state:", {
        items: state.items.length,
        total_items: state.total_items,
        last_updated: state.last_updated,
        is_cart_open: state.is_cart_open,
      });
    },
  },
  extraReducers: (builder) => {
    // Fetch cart from server
    builder
      .addCase(fetchCartFromServer.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.is_loading = false;
        state.items = action.payload;
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();

        // Debug: Log cart loaded from server
        console.log("Cart loaded from server:", {
          items: state.items.length,
          total_items: state.total_items,
        });
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Add item to cart
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.is_loading = false;
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (existingItemIndex >= 0) {
          state.items[existingItemIndex] = action.payload;
        } else {
          state.items.push(action.payload);
        }

        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Update cart item quantity
    builder
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.is_loading = false;
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (itemIndex >= 0) {
          state.items[itemIndex] = action.payload;
        }

        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();

        // Debug: Log quantity update
        console.log("Cart item quantity updated:", {
          itemId: action.payload.id,
          newQuantity: action.payload.quantity,
          totalItems: state.total_items,
        });
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Remove item from cart
    builder
      .addCase(removeItemFromCart.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.is_loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();

        // Debug: Log item removal
        console.log("Cart item removed:", {
          itemId: action.payload,
          remainingItems: state.items.length,
          totalItems: state.total_items,
        });
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Clear cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.is_loading = false;
        state.items = [];
        state.total_items = 0;
        state.subtotal = 0;
        state.tax_amount = 0;
        state.total_amount = 0;
        state.discount_amount = 0;
        state.last_updated = new Date().toISOString();

        // Debug: Log cart cleared
        console.log("Cart cleared successfully");
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Apply coupon
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.is_loading = false;
        state.discount_amount = action.payload.discount_amount;
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Remove coupon
    builder
      .addCase(removeCoupon.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state) => {
        state.is_loading = false;
        state.discount_amount = 0;
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Calculate shipping
    builder
      .addCase(calculateShipping.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(calculateShipping.fulfilled, (state, action) => {
        state.is_loading = false;
        state.shipping_cost = action.payload.shipping_cost;
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.total_amount += state.shipping_cost;
        state.last_updated = new Date().toISOString();
      })
      .addCase(calculateShipping.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });

    // Sync cart with server
    builder
      .addCase(syncCartWithServer.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.is_loading = false;
        state.items = action.payload;
        const totals = calculateCartTotals(
          state.items,
          state.discount_amount,
          state.shipping_cost
        );
        Object.assign(state, totals);
        state.last_updated = new Date().toISOString();
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
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
} = cartSlice.actions;

export default cartSlice.reducer;
