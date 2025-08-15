"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { CartItemType } from "@/redux/slices/cart-slice";

type CartItemRowProps = {
  item: CartItemType;
  currency: string;
  locale: string | undefined;
  dict: any;
  onUpdateQuantity: (itemId: string, quantity: number) => Promise<void>;
  onRemoveItem: (itemId: string) => Promise<void>;
};

export default function CartItemRow({
  item,
  currency,
  locale,
  dict,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemRowProps) {
  const totalPrice = (
    (parseFloat(item?.piece?.weight ?? "0") || 0) * (item?.quantity ?? 0)
  ).toLocaleString();

  return (
    <li key={item.id} className='flex py-6 gap-x-4'>
      <div className='size-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img
          alt={item?.piece?.title}
          src={getFullAssets(item?.piece?.thumbnail?.fileName)}
          className='size-full object-cover'
        />
      </div>

      <div className='flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <div className='w-full'>
              <div className='flex flex-row items-center justify-between gap-x-2 w-full'>
                <h3>
                  <Link
                    href={getLinkWithLocale(
                      `/shop/${item?.piece?.slug}`,
                      locale
                    )}
                  >
                    {item?.piece?.title}
                  </Link>
                </h3>
                <span className='text-xs text-gray-500'>{`${item.variant_id?.weight} ${dict.common.grams}`}</span>
              </div>
              {item?.variant_id?.attributeValues
                .map((a) => a.value)
                .map((a) => (
                  <div key={a} className='text-sm text-gray-500 capitalize'>
                    {a}
                  </div>
                ))}
            </div>
          </div>

          {item?.selected_options &&
            Object.keys(item.selected_options).length > 0 && (
              <div className='mt-1 text-sm text-gray-500'>
                {Object.entries(item.selected_options)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </div>
            )}
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          <div className='flex items-center space-x-2'>
            <button
              type='button'
              onClick={async () =>
                await onUpdateQuantity(item.id, item.quantity - 1)
              }
              className='text-gray-500 hover:text-gray-700'
            >
              <Minus />
            </button>
            <span className='text-gray-500'>{`${dict.common.qty} ${item.quantity}`}</span>
            <button
              type='button'
              onClick={async () =>
                await onUpdateQuantity(item.id, item.quantity + 1)
              }
              className='text-gray-500 hover:text-gray-700'
            >
              <Plus />
            </button>
          </div>

          <div className='flex'>
            <button
              type='button'
              onClick={async () => await onRemoveItem(item.id)}
              className='font-medium text-primary hover:text-primary/80'
            >
              {dict.common.remove}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
