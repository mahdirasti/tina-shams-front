"use client";

import { Button } from "@/components/ui/button";
import { getFullAssets } from "@/app/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { FormikContextType, useFormikContext } from "formik";
import { ChevronDownIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function OrderSummary({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const {
    items,
    subtotal,
    shipping_cost,
    tax_amount,
    total_amount,
    currency,
    updateCartItemQuantityAsync,
    removeItemFromCartAsync,
  } = useCart();
  const formik = useFormikContext() as FormikContextType<any> | null;
  const { dict } = useLocale();

  const getImageSrc = (ci: (typeof items)[number]) => {
    const piece: any = ci.piece;
    const fileName =
      piece?.thumbnail?.fileName ||
      piece?.mobile_thumbnail?.fileName ||
      piece?.cover?.fileName ||
      piece?.mobile_cover?.fileName;
    return fileName
      ? getFullAssets(fileName)
      : "/assets/images/product-cover-2.jpg";
  };

  return (
    <div className='mt-10 lg:mt-0'>
      <h2 className='text-lg font-medium text-gray-900'>
        {dict?.checkout?.order_summary || "Order summary"}
      </h2>

      <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
        <h3 className='sr-only'>Items in your cart</h3>
        <ul role='list' className='divide-y divide-gray-200'>
          {items.map((ci) => (
            <li key={ci.id} className='flex px-4 py-6 sm:px-6'>
              <div className='shrink-0'>
                <Image
                  alt={ci.piece.title}
                  src={getImageSrc(ci)}
                  className='rounded-md object-cover object-center size-24'
                  width={96}
                  height={96}
                />
              </div>

              <div className='ml-6 flex flex-1 flex-col'>
                <div className='flex'>
                  <div className='min-w-0 flex-1'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      {ci.piece.title}
                    </h4>
                  </div>

                  <div className='ml-4 flow-root shrink-0'>
                    <button
                      type='button'
                      onClick={() => removeItemFromCartAsync(ci.id)}
                      className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                    >
                      <span className='sr-only'>
                        {dict?.common?.remove || "Remove"}
                      </span>
                      <TrashIcon aria-hidden='true' className='size-5' />
                    </button>
                  </div>
                </div>

                <div className='flex flex-1 items-end justify-between pt-2'>
                  <div />
                  <div className='ml-4'>
                    <div className='grid grid-cols-1 relative'>
                      <select
                        id={`quantity-${ci.id}`}
                        name={`quantity-${ci.id}`}
                        aria-label='Quantity'
                        value={ci.quantity}
                        onChange={(e) =>
                          updateCartItemQuantityAsync(
                            ci.id,
                            Number(e.target.value)
                          )
                        }
                        className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                      >
                        {Array.from({ length: 8 }).map((_, idx) => (
                          <option key={idx + 1} value={idx + 1}>
                            {idx + 1}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon
                        aria-hidden='true'
                        className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className='space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
          <div className='flex items-center justify-between'>
            <dt className='text-sm'>{dict?.common?.subtotal || "Subtotal"}</dt>
            <dd className='text-sm font-medium text-gray-900'>
              {subtotal.toLocaleString()} {currency}
            </dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className='text-sm'>
              {dict?.checkout?.shipping || "Shipping"}
            </dt>
            <dd className='text-sm font-medium text-gray-900'>
              {shipping_cost.toLocaleString()} {currency}
            </dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className='text-sm'>{dict?.checkout?.taxes || "Taxes"}</dt>
            <dd className='text-sm font-medium text-gray-900'>
              {tax_amount.toLocaleString()} {currency}
            </dd>
          </div>
          <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
            <dt className='text-base font-medium'>
              {dict?.checkout?.total || "Total"}
            </dt>
            <dd className='text-base font-medium text-gray-900'>
              {total_amount.toLocaleString()} {currency}
            </dd>
          </div>
        </dl>

        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full text-base'
          >
            {isSubmitting
              ? dict?.checkout?.submitting || "Submitting..."
              : dict?.checkout?.confirm_order || "Confirm order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
