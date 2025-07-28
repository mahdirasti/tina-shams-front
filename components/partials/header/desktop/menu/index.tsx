"use client";

import React from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { OrgIconButton, OrgSheet } from "@/components/shared-ui";
import BurgerMenu from "@/components/icons/burger-menu";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { HeaderBannerType } from "@/types/banner";
import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";

type Props = {
  scrolled: boolean;
  color: string;
};

export type HeaderCategory = {
  title: string;
  href: string;
  children?: HeaderCategory[];
  banners?: HeaderBannerType[];
};

export default function HeaderMenu({ scrolled, color }: Props) {
  const { locale, dict } = useLocale();

  const [selectedCategory, setSelectedCategory] =
    useState<HeaderCategory | null>(null);

  const dummyCategories: HeaderCategory[] = [
    {
      title: "High Jewelry",
      href: "/high-jewelry",
      children: [
        {
          title: "NECKLACES AND PENDANTS",
          href: "/necklaces-and-pendants",
        },
        {
          title: "BRACELETS",
          href: "/bracelets",
        },
        {
          title: "RINGS",
          href: "/rings",
        },
        {
          title: "EARRINGS",
          href: "/earrings",
        },
        {
          title: "Clips & brooches",
          href: "/clips-and-brooches",
        },
        {
          title: "jewelry watches",
          href: "/jewelry-watches",
        },
        {
          title: "Cufflinks",
          href: "/cufflinks",
        },
      ],
      banners: [
        {
          id: "1",
          title: "High Jewelry",
          href: "/high-jewelry",
          image:
            "https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/high-jewelry/classic-high-jewelry/univers-corpo-2024/van-cleef-arpels-classic-high-jewelry-1-snowflake-cover-1328x747.jpg.transform.vca-w550-2x.jpg",
          description: "High Jewelry",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          id: "2",
          title: "Treasure Island by Van Cleef & Arpels",
          href: "/treasure-island-by-van-cleef-arpels",
          image:
            "https://www.vancleefarpels.com/content/dam/vancleefarpels/menu-navigation-assets/high-jewelry/thematic-collections/treasure-islance/van-cleef-arpels-menu-ambiance-haute-joaillerie-IAT-1328-747-01.jpg.transform.vca-w550-2x.jpg",
          description:
            "The Van Cleef & Arpels Treasure Island collection is a tribute to the legendary pirate Jack Sparrow, who is known for his love of treasure and his adventures on the high seas. The collection features a range of high jewelry pieces, including necklaces, rings, and bracelets, all inspired by the world of pirates and the sea.",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
          textNotWhite: true,
        },
        {
          id: "3",
          title: "Flowers",
          href: "/flowers",
          image:
            "https://www.vancleefarpels.com/content/dam/vancleefarpels/menu-navigation-assets/high-jewelry/signature-collections/flowers/van-cleef-arpels-summer-2024-menu-1328-747.jpg.transform.vca-w550-2x.jpg",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        },
        {
          id: "4",
          title: "Heritage Collection",
          href: "/heritage-collection",
          image:
            "https://www.vancleefarpels.com/content/dam/vancleefarpels/menu-navigation-assets/high-jewelry/signature-collections/van-cleef-arpels-collection-heritage-thumbnail-nav-menu-1328-747-V2.png.transform.vca-w550-2x.png",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
          textNotWhite: true,
        },
      ],
    },
  ];

  const SheetContent = (close?: () => void) => {
    let content = (
      <>
        <div className='flex flex-col gap-y-4'>
          <BlurFade delay={0.1} className='w-full'>
            <button
              onClick={close}
              className='flex flex-row items-center gap-x-2 text-black/70 text-sm font-thin uppercase'
            >
              <X size={20} />
              {dict.common.close}
            </button>
          </BlurFade>
          <div className='categories'>
            {dummyCategories.map((category, key) => {
              const hasChildren =
                (category?.children && category?.children?.length > 0) ||
                (category?.banners && category?.banners?.length > 0);

              let content = (
                <div key={key} className='flex flex-col w-full gap-y-2'>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      `font-thin opacity-70 hover:opacity-100 transition-all duration-300 text-lg flex flex-row items-center justify-between gap-x-2 uppercase`
                    )}
                  >
                    {category.title}
                    <ChevronRight size={16} />
                  </button>
                </div>
              );

              if (!hasChildren)
                content = (
                  <Link
                    key={key}
                    href={category.href}
                    className={cn(
                      `font-thin opacity-70 hover:opacity-100 transition-all duration-300 text-lg flex flex-row items-center justify-between gap-x-2 uppercase`
                    )}
                  >
                    {category.title}
                    <ChevronRight size={16} />
                  </Link>
                );

              return (
                <BlurFade inView delay={0.2 + key * 0.1} key={key}>
                  {content}
                </BlurFade>
              );
            })}
          </div>
        </div>
        <ul className='flex flex-col gap-y-4 items-start justify-center gap-x-12'>
          {headerMenuItems.map((menuItem, key) => {
            const waitForTopAnimationDelay =
              (headerMenuItems.length - key - 1) * 0.1;

            return (
              <li
                key={key}
                onClick={() => {
                  close?.();
                }}
              >
                <BlurFade
                  delay={0.2 + key * 0.2 + waitForTopAnimationDelay}
                  key={key}
                >
                  <Link
                    href={
                      menuItem?.forceLink
                        ? menuItem.forceLink
                        : getLinkWithLocale(menuItem.href, locale)
                    }
                    title={menuItem.title}
                    className={cn(
                      `font-thin text-lg flex flex-row items-center gap-x-2 uppercase`
                    )}
                  >
                    {dict?.common?.[menuItem.title] ?? menuItem.title}
                    <ChevronRight size={16} />
                  </Link>
                </BlurFade>
              </li>
            );
          })}
        </ul>
      </>
    );

    if (selectedCategory) {
      let childrenNodes = (
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            {selectedCategory?.children?.map((child, key) => (
              <BlurFade inView delay={0.1 + key * 0.1} key={key}>
                <Link
                  href={getLinkWithLocale(child.href, locale)}
                  onClick={() => {
                    close?.();
                  }}
                  className='font-thin hover:text-black transition-all duration-300 text-sm flex flex-row items-center gap-x-2 uppercase opacity-70 hover:opacity-100'
                >
                  {child.title}
                  <ChevronRight size={16} />
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      );

      const bannerNodesDelay =
        selectedCategory?.banners && selectedCategory?.banners?.length > 0
          ? 0.3 + selectedCategory?.banners?.length * 0.1
          : 0;

      let bannerNodes = (
        <>
          {selectedCategory?.banners &&
            selectedCategory?.banners?.length > 0 && (
              <div className='flex flex-col gap-y-4'>
                {selectedCategory.banners?.map((banner, key) => (
                  <BlurFade
                    inView
                    delay={0.2 + key * 0.1 + bannerNodesDelay}
                    key={key}
                  >
                    <Link
                      href={getLinkWithLocale(banner.href, locale)}
                      className='flex w-full h-[200px] relative'
                    >
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className='object-cover absolute top-0 left-0 w-full h-full object-center'
                      />
                      <strong className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start py-6'>
                        <span
                          className={cn(
                            "text-base text-center font-thin uppercase whitespace-pre-wrap max-w-[70%]",
                            banner.textNotWhite ? "text-black" : "text-white"
                          )}
                        >
                          {banner.title}
                        </span>
                      </strong>
                    </Link>
                  </BlurFade>
                ))}
              </div>
            )}
        </>
      );

      content = (
        <div className='flex flex-col gap-y-4'>
          <BlurFade delay={0.1} className='w-full'>
            <button
              onClick={() => setSelectedCategory(null)}
              className='flex flex-row items-center gap-x-2 text-black/70 text-sm font-thin uppercase'
            >
              <ChevronLeft size={20} />
              {dict.common.back}
            </button>
          </BlurFade>
          <div className='flex flex-col gap-y-8'>
            {childrenNodes}
            {bannerNodes}
          </div>
        </div>
      );
    }

    return content;
  };

  return (
    <>
      <OrgSheet
        trigger={(open) => (
          <OrgIconButton className='bg-transparent' onClick={open}>
            <BurgerMenu color={color} />
          </OrgIconButton>
        )}
        config={{
          side: "left",
        }}
        hasClose={false}
      >
        {(open, close) => (
          <nav className='h-full flex flex-col justify-between'>
            {SheetContent(close)}
          </nav>
        )}
      </OrgSheet>
    </>
  );
}
