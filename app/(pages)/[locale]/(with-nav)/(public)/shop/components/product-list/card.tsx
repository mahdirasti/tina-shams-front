"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale, getFullAssets } from "@/app/lib/utils";
import { PieceType } from "@/types/piece";
import Link from "next/link";
import { useCart } from "@/app/hooks";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

type Props = {
  item: PieceType;
};

export default function ProductCard({ item }: Props) {
  const { locale, dict } = useLocale();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addItemToCartSync, isItemInCart } = useCart();

  const isInCart = isItemInCart(item.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);
    addItemToCartSync({
      id: item.id,
      piece: item,
      quantity: 1,
      selected_options: {
        size: "Medium",
        color: "Gold",
      },
    });
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div className='group relative'>
      <div className='relative'>
        <img
          alt={item.title}
          src={getFullAssets(item.thumbnail.fileName)}
          className='h-96 w-full object-cover object-center group-hover:opacity-75 sm:aspect-[2/3] sm:h-auto'
        />
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className='bg-white text-gray-900 px-4 py-2 rounded-md shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isAddingToCart
              ? dict.common.adding
              : isInCart
              ? dict.common.in_cart
              : dict.common.add_to_cart}
          </button>
        </div>
        {isInCart && (
          <div className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
            <CheckIcon className='h-4 w-4' />
          </div>
        )}
      </div>
      <h3 className='mt-4 text-base font-semibold text-gray-900'>
        <Link href={getLinkWithLocale(`/shop/${item.slug}`, locale)}>
          <span className='absolute inset-0' />
          {item.title}
        </Link>
      </h3>
      <p className='mt-1 text-sm text-gray-500'>
        {parseFloat(item.weight).toLocaleString()} {dict.common.grams}
      </p>
    </div>
  );
}
