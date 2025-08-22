import React from "react";
import ProductListPage from "./components/product-list";
import BlurFade from "@/components/ui/blur-fade";
import { getDictionary } from "../../../dictionaries";
import { LocaleType } from "@/types/locale";
import { _CACHE } from "@/app/const/_varz";
import { fetchData } from "@/app/lib/fetch";
import { PieceType } from "@/types/piece";
import {
  FetchDataType,
  FetchPaginatedDataType,
  Pagination,
} from "@/app/lib/axios";
import CategoryChips from "../pieces/components/chips";
import { CategoryType } from "@/types/category";
import { MainContainer } from "@/components/containers";
import { urlWithQueryParams } from "@/app/lib/utils";

type Props = {
  params: Promise<{
    locale: LocaleType;
  }>;
  searchParams: Promise<{
    categories: string;
  }>;
};

export default async function ShopPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { categories: categoriesSearch } = await searchParams;
  const t = await getDictionary(locale);

  //Setting two minutes for caching
  const fetchingConfig = {
    // next: { revalidate: _CACHE.commonRevalidation },
    headers: {
      lang: locale,
    },
  };

  //Fetching data
  const [productsRes, categoriesRes] = await Promise.all([
    fetchData<Pagination<PieceType>>(
      urlWithQueryParams("/products", {
        categories: categoriesSearch,
      }),
      fetchingConfig
    ),
    fetchData<FetchDataType<FetchPaginatedDataType<CategoryType>>>(
      `/category`,
      fetchingConfig
    ),
  ]);

  const products = productsRes?.data?.items ?? [];
  const categories = categoriesRes?.data?.items ?? [];

  return (
    <BlurFade inView className='mt-0 md:mt-4'>
      <div className='px-4 py-4 md:py-16 text-center sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
          {t.common.shop}
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-base text-gray-500'>
          {t.common.shop_description}
        </p>
      </div>
      <MainContainer>
        <CategoryChips items={categories} />
      </MainContainer>
      <ProductListPage items={products} />
    </BlurFade>
  );
}
