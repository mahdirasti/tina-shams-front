import { MainContainer } from "@/components/containers";
import Image from "next/image";
import PiecesDetails from "./components/details";
import CoverDetails from "./components/cover-details";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import { getFullAssets } from "@/app/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import SinglePieceThumbnail from "./components/thumbnail";
import PieceClientActions from "./components/piece-client";
import RecentProductViews from "./components/recent-products";
import SimilarProducts from "./components/similar-products";

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

const getPiece = (slug: string) => {
  return axiosInstance.get(`/products/${slug}`);
};

export default async function PiecesSinglePage({
  params: { slug, locale },
}: Props) {
  setDefaultLocale(locale);

  const res = await getPiece(slug);
  const product: PieceType = res?.data?.data;

  return (
    <BlurFade inView className='md:mt-24'>
      <MainContainer className='px-0 min-h-[calc(100vh-260px)] md:min-h-[calc(100vh-248px)] flex flex-col gap-y-4'>
        <PieceClientActions piece={product} />
        <div className='product-cover relative h-[790px] md:h-[466px] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:from-black/80 after:to-transparent after:bg-gradient-to-t after:z-[1]'>
          <SinglePieceThumbnail piece={product} />
          <CoverDetails
            title={product?.title ?? ""}
            desc={product?.short_desc ?? ""}
          />
        </div>
        <PiecesDetails product={product} />
        <SimilarProducts similar_products={product.similarProducts ?? []} />
        <RecentProductViews />
      </MainContainer>
    </BlurFade>
  );
}
