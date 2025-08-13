"use client";

import { useState } from "react";
import { PieceType } from "@/types/piece";
import { useAuth, useCart } from "@/app/hooks";
import { OrgIconButton } from "@/components/shared-ui";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { useRouter } from "next/navigation";
import { getLinkWithLocale, urlWithQueryParams } from "@/app/lib/utils";

type Props = {
  item: PieceType;
};

export default function ProductActions({ item }: Props) {
  const { dict, locale } = useLocale();

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addItemToCartAsync, isItemInCart, getItemQuantity } = useCart();

  const isInCart = isItemInCart(item.id);
  const cartQuantity = getItemQuantity(item.id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push(
        getLinkWithLocale(
          urlWithQueryParams(`/auth/sign-in`, {
            redirect: encodeURIComponent(
              getLinkWithLocale(`/shop/${item.slug}`, locale)
            ),
          }),
          locale
        )
      );
      toast.error(dict.common.please_sign_in_first);
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItemToCartAsync({
        piece: item,
        quantity: quantity,
      });
      toast.success(dict.common.added_to_cart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <form>
      {/* Quantity selector */}
      <div>
        <h2 className='text-sm font-medium text-gray-900'>Quantity</h2>
        <div className='mt-2 flex items-center space-x-3'>
          <OrgIconButton
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className='border border-gray-300 p-2 hover:bg-gray-50'
            type='button'
          >
            <Minus />
          </OrgIconButton>
          <span className='text-lg font-medium'>{quantity}</span>
          <OrgIconButton
            onClick={() => setQuantity(quantity + 1)}
            className='border border-gray-300 p-2 hover:bg-gray-50'
            type='button'
          >
            <Plus />
          </OrgIconButton>
        </div>
      </div>

      {/* Cart status */}
      {isInCart && (
        <div className='mt-4 rounded-md bg-green-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-green-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-green-800'>
                In cart ({cartQuantity} {cartQuantity === 1 ? "item" : "items"})
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type='button'
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isAddingToCart
          ? "Adding to cart..."
          : isInCart
          ? "Update Cart"
          : "Add to cart"}
      </button>
    </form>
  );
}
