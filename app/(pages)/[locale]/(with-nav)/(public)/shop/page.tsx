import React from "react";
import ProductListPage from "./components/product-list";
import BlurFade from "@/components/ui/blur-fade";
import { getDictionary } from "../../../dictionaries";
import { LocaleType } from "@/types/locale";
import { ProductType } from "@/types/product";
import { _CACHE } from "@/app/const/_varz";
import { fetchData } from "@/app/lib/fetch";
import { PieceType } from "@/types/piece";
import { getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { Pagination } from "@/app/lib/axios";

type Props = {
  params: Promise<{
    locale: LocaleType;
  }>;
};

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  // More products...
];

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  //Setting two minutes for caching
  const fetchingConfig = {
    next: { revalidate: _CACHE.commonRevalidation },
    headers: {
      lang: locale,
    },
  };

  //Fetching data
  const [productsRes] = await Promise.all([
    fetchData<Pagination<PieceType>>(`/products`, fetchingConfig),
  ]);

  const products = productsRes?.data?.items ?? [];

  return (
    <BlurFade inView className='mt-16'>
      <div className='px-4 py-16 text-center sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
          {t.common.shop}
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-base text-gray-500'>
          {t.common.shop_description}
        </p>
      </div>
      <ProductListPage
        items={products?.map((item) => ({
          id: item.id,
          imageSrc: getFullAssets(item.thumbnail?.fileName),
          imageAlt: item.title,
          name: item.title,
          price: 2400,
          href: getLinkWithLocale(`/shop/${item.slug}`, locale),
        }))}
      />
    </BlurFade>
  );
}
