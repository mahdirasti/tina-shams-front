"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import { ProductType } from "@/types/product";
import Link from "next/link";

type Props = {
  item: ProductType;
};

export default function ProductCard({ item }: Props) {
  const { locale } = useLocale();

  return (
    <div className='group relative'>
      <img
        alt={item.imageAlt}
        src={item.imageSrc}
        className='h-96 w-full object-cover object-center group-hover:opacity-75 sm:aspect-[2/3] sm:h-auto'
      />
      <h3 className='mt-4 text-base font-semibold text-gray-900'>
        <Link href={item.href}>
          <span className='absolute inset-0' />
          {item.name}
        </Link>
      </h3>
      <p className='mt-1 text-sm text-gray-500'>{item.price}</p>
    </div>
  );
}
