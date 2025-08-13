"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale, getFullAssets } from "@/app/lib/utils";
import { CartIcon } from "@/components/icons";
import { OrgIconButton, OrgSheet } from "@/components/shared-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCart } from "@/app/hooks";
import { useAuth } from "@/app/hooks";
import { Minus, Plus } from "lucide-react";

type Props = {
  scrolled: boolean;
};

export default function ShopCart({ scrolled }: Props) {
  const { dict, locale } = useLocale();
  const router = useRouter();

  const {
    items,
    total_items,
    total_amount,
    currency,
    is_loading,
    error,
    fetchCart,
    removeItemFromCartAsync,
    updateCartItemQuantityAsync,
    clearCartAsync,
  } = useCart();

  const { isAuthenticated } = useAuth();

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleContinueShopping = () => {
    router.push(getLinkWithLocale(`/shop`, locale));
  };

  const handleCheckout = () => {
    router.push(getLinkWithLocale(`/checkout`, locale));
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItemFromCartAsync(itemId);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItemFromCartAsync(itemId);
      } else {
        await updateCartItemQuantityAsync(itemId, quantity);
      }
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartAsync();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <>
      <OrgSheet
        trigger={(open) => (
          <OrgIconButton
            onClick={open}
            className={cn(
              "bg-transparent relative",
              scrolled ? "" : "text-white"
            )}
          >
            <CartIcon size={24} color={scrolled ? "black" : "white"} />
            {total_items > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {total_items > 99 ? "99+" : total_items}
              </span>
            )}
          </OrgIconButton>
        )}
        config={{
          className: "p-0",
        }}
      >
        {(open, close) => (
          <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
            <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
              {is_loading ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-gray-500'>Loading cart...</div>
                </div>
              ) : error ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-red-500'>Error: {error}</div>
                </div>
              ) : !isAuthenticated ? (
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='text-gray-500 mb-4'>
                    Please sign in to view your cart
                  </div>
                  <Link
                    href={getLinkWithLocale("/auth/sign-in", locale)}
                    className='text-primary hover:text-primary/80 font-medium'
                  >
                    Sign In
                  </Link>
                </div>
              ) : items.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='text-gray-500 mb-4'>Your cart is empty</div>
                  <button
                    onClick={() => {
                      handleContinueShopping();
                      close();
                    }}
                    className='text-primary hover:text-primary/80 font-medium'
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className='mt-8'>
                  <div className='flow-root'>
                    <ul role='list' className='-my-6 divide-y divide-gray-200'>
                      {items.map((item) => (
                        <li key={item.id} className='flex py-6'>
                          <div className='size-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                            <img
                              alt={item.piece.title}
                              src={getFullAssets(item.piece.thumbnail.fileName)}
                              className='size-full object-cover'
                            />
                          </div>

                          <div className='ml-4 flex flex-1 flex-col'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>
                                  <Link
                                    href={getLinkWithLocale(
                                      `/shop/${item.piece.slug}`,
                                      locale
                                    )}
                                  >
                                    {item.piece.title}
                                  </Link>
                                </h3>
                                <p className='ml-4'>
                                  {(
                                    parseFloat(item.piece.weight) *
                                    item.quantity
                                  ).toLocaleString()}{" "}
                                  {currency}
                                </p>
                              </div>
                              {item.selected_options &&
                                Object.keys(item.selected_options).length >
                                  0 && (
                                  <p className='mt-1 text-sm text-gray-500'>
                                    {Object.entries(item.selected_options)
                                      .map(([key, value]) => `${key}: ${value}`)
                                      .join(", ")}
                                  </p>
                                )}
                            </div>
                            <div className='flex flex-1 items-end justify-between text-sm'>
                              <div className='flex items-center space-x-2'>
                                <button
                                  type='button'
                                  onClick={async () =>
                                    await handleUpdateQuantity(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className='text-gray-500 hover:text-gray-700'
                                >
                                  <Minus />
                                </button>
                                <span className='text-gray-500'>
                                  {`${dict.common.qty} ${item.quantity}`}
                                </span>
                                <button
                                  type='button'
                                  onClick={async () =>
                                    await handleUpdateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className='text-gray-500 hover:text-gray-700'
                                >
                                  <Plus />
                                </button>
                              </div>

                              <div className='flex'>
                                <button
                                  type='button'
                                  onClick={async () =>
                                    await handleRemoveItem(item.id)
                                  }
                                  className='font-medium text-primary hover:text-primary/80'
                                >
                                  {dict.common.remove}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              {isAuthenticated && items.length > 0 && (
                <>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>{dict.common.subtotal}</p>
                    <p>
                      {total_amount.toLocaleString()} {currency}
                    </p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    {dict.common.shipping_and_taxes_calculated_at_checkout}
                  </p>
                  <div className='mt-6'>
                    <Link
                      href={getLinkWithLocale(`/checkout`, locale)}
                      onClick={close}
                      className='flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/80'
                    >
                      {dict.common.checkout}
                    </Link>
                  </div>
                  <div className='mt-4 flex justify-between'>
                    <button
                      type='button'
                      onClick={async () => await handleClearCart()}
                      className='text-sm text-red-600 hover:text-red-500'
                    >
                      Clear Cart
                    </button>
                    <span className='text-sm text-gray-500'>
                      {total_items} {total_items === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                      {`${dict.common.or}`}
                      {` `}
                      <button
                        type='button'
                        onClick={() => {
                          handleContinueShopping();
                          close();
                        }}
                        className='font-medium text-primary hover:text-primary/80'
                      >
                        {dict.common.continue_shopping}
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </OrgSheet>
    </>
  );
}
