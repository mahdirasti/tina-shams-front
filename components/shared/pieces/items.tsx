"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import PieceCard from "@/components/shared/pieces/piece-card";
import { PieceType } from "@/types/piece";
import React from "react";

type Props = {
  items: PieceType[];
};

export default function Pieces({ items }: Props) {
  const { dict } = useLocale();

  return (
    <section className='pieces flex flex-col gap-y-4' id='pieces'>
      <h2 className='text-xl font-normal'>{dict.common.pieces_title}</h2>
      <div className='grid grid-cols-12 gap-4'>
        {items.map((item, index) => (
          <div className='col-span-12 md:col-span-4' key={index}>
            <PieceCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
