"use client";

import ProductCard from "@/app/(pages)/[locale]/(with-nav)/(public)/shop/components/product-list/card";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import PieceCard from "@/components/shared/pieces/piece-card";
import { PieceType } from "@/types/piece";
import React from "react";

type Props = {
  title?: string;
  items: PieceType[];
  shop?: boolean;
};

export default function Pieces({ items, title, shop }: Props) {
  const { dict } = useLocale();

  return (
    <section className='pieces flex flex-col gap-y-4' id='pieces'>
      <h2 className='text-xl font-normal'>
        {title ? title : dict.common.pieces_title}
      </h2>
      <div className='grid grid-cols-12 gap-4'>
        {items.map((item, index) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            {shop ? <ProductCard item={item} /> : <PieceCard item={item} />}
          </div>
        ))}
      </div>
    </section>
  );
}
