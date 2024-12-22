import { MainContainer } from "@/components/containers";
import Image from "next/image";
import PiecesDetails from "./components/details";
import CoverDetails from "./components/cover-details";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import { getFullAssets } from "@/app/lib/utils";
import BlurFade from "@/components/ui/blur-fade";

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
        <div className='product-cover relative h-[790px] md:h-[466px] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:from-black/80 after:to-transparent after:bg-gradient-to-t after:z-[1]'>
          {product?.thumbnail && (
            <Image
              src={getFullAssets(product.thumbnail.fileName)}
              alt=''
              className='object-cover object-center'
              fill
            />
          )}
          <CoverDetails
            title={product?.title ?? ""}
            desc={product?.short_desc ?? ""}
          />
        </div>
        <PiecesDetails product={product} />
      </MainContainer>
    </BlurFade>
  );
}
