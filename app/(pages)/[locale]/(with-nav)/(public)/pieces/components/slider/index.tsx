"use client";

import CustomSwiper from "@/components/shared/custom-swiper";
import React from "react";
import PieceSliderItem from "./item";
import { SliderType } from "@/types/slider";
import { getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

type Props = {
  items: SliderType[];
};

export default function Slider({ items = [] }: Props) {
  const { locale } = useLocale();

  return (
    <CustomSwiper
      settings={{
        slidesPerView: 1,
        loop: true,
        effect: "fade",
        pagination: false,
        keyboard: {
          enabled: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      }}
    >
      {items
        .map((item) => ({
          background: item.cover ? getFullAssets(item.cover.fileName) : "",
          desc: item.desc,
          title: item.title,
          link: getLinkWithLocale(item.link, locale),
        }))
        .map((content, index) => (
          <PieceSliderItem key={index} {...content} />
        ))}
    </CustomSwiper>
  );
}
