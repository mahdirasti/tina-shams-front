"use client";

import React, { useMemo } from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { OrgIconButton, OrgSheet } from "@/components/shared-ui";
import BurgerMenu from "@/components/icons/burger-menu";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { HeaderBannerType } from "@/types/banner";
import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";
import { useApi } from "@/app/hooks";
import { FetchDataType, FetchPaginatedDataType } from "@/app/lib/axios";
import { CategoryType } from "@/types/category";

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
  const { locale, dict, dir } = useLocale();

  const [selectedCategory, setSelectedCategory] =
    useState<HeaderCategory | null>(null);

  const { data: categoryData } =
    useApi<FetchDataType<FetchPaginatedDataType<CategoryType>>>(`/category`);
  const categories = categoryData?.data?.items ?? [];

  const { data } = useApi<
    FetchDataType<{
      id: string;
      name: string;
      type: string;
      value: string;
    }>
  >(`/setting/keys/mega-menu`);

  const megaMenu = data?.data?.value;

  const finalMegaMenu = useMemo(() => {
    if (!megaMenu) return [];

    try {
      const parsedMegaMenu = JSON.parse(megaMenu);

      return parsedMegaMenu;
    } catch (error) {
      return [];
    }
  }, [megaMenu]);

  const dummyCategories: HeaderCategory[] = React.useMemo(() => {
    if (
      !finalMegaMenu ||
      !Array.isArray(finalMegaMenu) ||
      finalMegaMenu.length === 0
    )
      return [];

    const getTitle = (titleArr: any) => {
      if (!titleArr) return "";
      if (Array.isArray(titleArr)) {
        const targetLanguage = titleArr.find((t: any) => t.language === locale);
        return targetLanguage?.value ?? titleArr[0]?.value ?? "";
      }
      return String(titleArr);
    };

    try {
      let finalOutputs = finalMegaMenu.map((node: any) => {
        const links = node.children?.filter((c: any) => c.type === "link");
        const banners = node.children?.filter((c: any) => c.type === "banner");

        let output: HeaderCategory = {
          title: getTitle(node.title),
          href: node.href ?? "",
          children:
            links?.map((c: any) => ({
              title: getTitle(c.title),
              href: c.href ?? "",
            })) ?? [],
          banners:
            banners?.map((b: any) => ({
              alt: b.alt ?? "",
              title: getTitle(b.title),
              href: b.href ?? "",
              image: getFullAssets(b.image?.fileName ?? "") ?? "",
              textNotWhite: b.textNotWhite ?? false,
            })) ?? [],
        };

        return output;
      });

      finalOutputs = [
        {
          title: dict.common.shop,
          href: "",
          children: categories.map((category) => ({
            title: category.name,
            href: getLinkWithLocale(`/shop?categories=${category.id}`, locale),
          })),
        },
        ...finalOutputs,
        {
          title: dict.common.contact,
          href: getLinkWithLocale("/contact", locale),
        },
      ];

      return finalOutputs;
    } catch (e) {
      return [];
    }
  }, [finalMegaMenu, locale, categories]);

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
                <div key={key} className='flex flex-col gap-y-2'>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      `font-thin opacity-70 hover:opacity-100 transition-all duration-300 text-lg flex flex-row items-center justify-between gap-x-2 uppercase`
                    )}
                  >
                    {dir === "rtl" && <ChevronLeft size={16} />}
                    {category.title}
                    {dir === "ltr" && <ChevronRight size={16} />}
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
                <BlurFade
                  inView
                  delay={0.2 + key * 0.1}
                  key={key}
                  className={cn(
                    "flex flex-col",
                    dir === "ltr" ? "items-start" : "items-end"
                  )}
                >
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
                className={cn(
                  "w-full flex flex-col",
                  dir === "ltr" ? "items-start" : "items-end"
                )}
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
                    {dir === "rtl" && <ChevronLeft size={16} />}
                    {dict?.common?.[menuItem.title] ?? menuItem.title}
                    {dir === "ltr" && <ChevronRight size={16} />}
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
            <BurgerMenu color={color} size={28} />
          </OrgIconButton>
        )}
        config={{
          side: dir === "ltr" ? "left" : "right",
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
