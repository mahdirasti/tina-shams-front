import { MainContainer } from "@/components/containers";
import Image from "next/image";
import PiecesDetails from "./components/details";
import CoverDetails from "./components/cover-details";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import BlurFade from "@/components/ui/blur-fade";
import SinglePieceThumbnail from "./components/thumbnail";
import PieceClientActions from "./components/piece-client";
import RecentProductViews from "./components/recent-products";
import SimilarProducts from "./components/similar-products";
import { Metadata } from "next";
import { LocaleType } from "@/types/locale";
import { getCanonicalURL } from "@/app/actions/canonical";
import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

const getPiece = (slug: string) => {
  return axiosInstance.get(`/products/${slug}`);
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: LocaleType }>;
}): Promise<Metadata> => {
  const { slug, locale } = await params;

  const dict = await getDictionary(locale);

  const res = await getPiece(slug);
  const product: PieceType = res?.data?.data;

  const canonical = await getCanonicalURL({ depth: 2 });

  return {
    title: product.title,
    description: product.short_desc,
    openGraph: {
      title: product.title,
      description: product.short_desc,
    },
    alternates: {
      canonical: canonical,
    },
    other: {
      "product:price:currency": "IRR",
      "product:availability": "in stock",
      "product:condition": "new",
      "product:brand": dict.common.company_name,
      "product:category": product.categories?.map((cat) => cat.name).join(", "),
      "product:retailer_item_id": product.id,
      // "product:color": product.color,
      "product:material": `Gold - ${product.purity}`,
      // "product:size": ,
      "product:weight": `${product.weight?.toString()}g`,
      // "product:dimensions": product.dimensions,
    },
  };
};

export default async function PiecesSinglePage({ params }: Props) {
  const { slug, locale } = await params;
  setDefaultLocale(locale);

  const res = await getPiece(slug);
  const product: PieceType = res?.data?.data;

  return (
    <BlurFade inView className='md:mt-24'>
      <MainContainer className='px-0 min-h-[calc(100vh-260px)] md:min-h-[calc(100vh-248px)] flex flex-col gap-y-4'>
        <PieceClientActions piece={product} />
        <div className='product-cover relative h-[790px] md:h-[466px] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[140px] after:from-black/80 after:to-transparent after:bg-gradient-to-t after:z-[1]'>
          <SinglePieceThumbnail piece={product} />
          <CoverDetails
            title={product?.title ?? ""}
            desc={product?.short_desc ?? ""}
          />
        </div>
        <PiecesDetails product={product} />
        <div className='flex flex-col gap-y-12'>
          <SimilarProducts similar_products={product.similarProducts ?? []} />
          <RecentProductViews />
        </div>
      </MainContainer>
    </BlurFade>
  );
}
