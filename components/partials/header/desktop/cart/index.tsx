"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";
import { CartIcon } from "@/components/icons";
import { OrgIconButton, OrgSheet } from "@/components/shared-ui";
import React from "react";

type Props = {
  scrolled: boolean;
};

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function ShopCart({ scrolled }: Props) {
  const { dict } = useLocale();

  return (
    <>
      <OrgSheet
        trigger={(open) => (
          <OrgIconButton
            onClick={open}
            className={cn("bg-transparent", scrolled ? "" : "text-white")}
          >
            <CartIcon size={24} color={scrolled ? "black" : "white"} />
          </OrgIconButton>
        )}
        config={{
          className: "p-0",
        }}
      >
        {(open, close) => (
          <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
            <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {products.map((product, index) => (
                      <li key={index} className='flex py-6'>
                        <div className='size-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className='size-full object-cover'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className='ml-4'>{product.price}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {product.color}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm'>
                            <p className='text-gray-500'>
                              {`${dict.common.qty} ${product.quantity}`}
                            </p>

                            <div className='flex'>
                              <button
                                type='button'
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
            </div>

            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className='mt-0.5 text-sm text-gray-500'>
                Shipping and taxes calculated at checkout.
              </p>
              <div className='mt-6'>
                <a
                  href='#'
                  className='flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/80'
                >
                  {dict.common.checkout}
                </a>
              </div>
              <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                <p>
                  {`${dict.common.or}`}
                  {` `}
                  <button
                    type='button'
                    onClick={close}
                    className='font-medium text-primary hover:text-primary/80'
                  >
                    {dict.common.continue_shopping}
                    <span aria-hidden='true'> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </OrgSheet>
    </>
  );
}
