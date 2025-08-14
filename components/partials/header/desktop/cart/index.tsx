"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { CartIcon } from "@/components/icons";
import { OrgButton, OrgIconButton, OrgSheet } from "@/components/shared-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCart } from "@/app/hooks";
import { useAuth } from "@/app/hooks";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import CartItemRow from "./cart-item-row";

type Props = {
  scrolled: boolean;
};

export default function ShopCart({ scrolled }: Props) {
  const { dict, locale, dir } = useLocale();
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
          side: dir === "ltr" ? "right" : "left",
        }}
      >
        {(open, close) => (
          <div
            dir={dir}
            className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'
          >
            <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
              {is_loading ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-gray-500'>
                    {dict.common.loading_cart}
                  </div>
                </div>
              ) : error ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-red-500'>
                    {dict.common.error_prefix} {error}
                  </div>
                </div>
              ) : !isAuthenticated ? (
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='text-gray-500 mb-4'>
                    {dict.common.please_sign_in_to_view_cart}
                  </div>
                  <Link
                    href={getLinkWithLocale("/auth/sign-in", locale)}
                    className='text-primary hover:text-primary/80 font-medium'
                  >
                    {dict.common.sign_in}
                  </Link>
                </div>
              ) : items.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='text-gray-500 mb-4'>
                    {dict.common.your_cart_is_empty}
                  </div>
                  <button
                    onClick={() => {
                      handleContinueShopping();
                      close();
                    }}
                    className='text-primary hover:text-primary/80 font-medium'
                  >
                    {dict.common.start_shopping}
                  </button>
                </div>
              ) : (
                <div className='mt-8'>
                  <div className='flow-root'>
                    <ul role='list' className='-my-6 divide-y divide-gray-200'>
                      {items.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          currency={currency}
                          locale={locale}
                          dict={dict}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemoveItem={handleRemoveItem}
                        />
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
                      {dict.common.clear_cart}
                    </button>
                    <span className='text-sm text-gray-500'>
                      {total_items}{" "}
                      {total_items === 1 ? dict.common.item : dict.common.items}
                    </span>
                  </div>
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <div className='flex items-center gap-x-2 text-black'>
                      {dir === "ltr" ? `${dict.common.or}` : ""}
                      <OrgButton
                        type='button'
                        onClick={() => {
                          handleContinueShopping();
                          close();
                        }}
                        variant={"text"}
                        className='px-0 min-w-[initial]'
                        startIcon={dir === "rtl" && <ArrowLeftIcon size={16} />}
                        endIcon={dir === "ltr" && <ArrowRightIcon size={16} />}
                      >
                        {dict.common.continue_shopping}
                      </OrgButton>
                      {dir === "ltr" ? "" : `${dict.common.or}`}
                    </div>
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
