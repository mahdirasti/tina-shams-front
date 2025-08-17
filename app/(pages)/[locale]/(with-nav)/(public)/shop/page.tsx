import React from "react";
import ProductListPage from "./components/product-list";
import BlurFade from "@/components/ui/blur-fade";
import { getDictionary } from "../../../dictionaries";
import { LocaleType } from "@/types/locale";
import { _CACHE } from "@/app/const/_varz";
import { fetchData } from "@/app/lib/fetch";
import { PieceType } from "@/types/piece";
import { Pagination } from "@/app/lib/axios";

type Props = {
  params: Promise<{
    locale: LocaleType;
  }>;
};

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  //Setting two minutes for caching
  const fetchingConfig = {
    // next: { revalidate: _CACHE.commonRevalidation },
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
      <ProductListPage items={products} />
    </BlurFade>
  );
}
