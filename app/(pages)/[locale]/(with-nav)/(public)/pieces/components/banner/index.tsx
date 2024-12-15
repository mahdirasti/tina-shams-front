"use client";

import React from "react";
import PieceBannerCard from "./card";
import { SliderType } from "@/types/slider";
import { getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

type Props = {
  items: SliderType[];
};

export default function PiecesBanners({ items = [] }: Props) {
  const { locale } = useLocale();

  if (items.length === 0) return null;

  const firstSlider = items.slice(0, 1)?.[0];

  const restSliders = items.slice(1);

  return (
    <div className='grid grid-cols-12 gap-4 h-auto md:h-[690px]'>
      <div className='col-span-12 md:col-span-6'>
        <PieceBannerCard
          background={getFullAssets(firstSlider?.cover?.fileName)}
          title={firstSlider?.title ?? ""}
          desc={firstSlider?.desc ?? ""}
          link={getLinkWithLocale(firstSlider?.link, locale)}
        />
      </div>
      {restSliders.length > 0 && (
        <div className='col-span-12 md:col-span-6 grid grid-cols-12 gap-4'>
          {restSliders.map((slide) => (
            <div className='col-span-12' key={slide.id}>
              <PieceBannerCard
                background={getFullAssets(slide.cover.fileName)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
