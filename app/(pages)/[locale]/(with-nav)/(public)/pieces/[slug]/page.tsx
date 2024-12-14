import { MainContainer } from "@/components/containers";
import Image from "next/image";
import mockProducts from "../data/mock.json";
import PiecesDetails from "./components/details";

type Props = {
  params: {
    slug: string;
  };
};

export default function PiecesSinglePage({ params: { slug } }: Props) {
  const product = mockProducts.find((item) => item.slug === slug);

  return (
    <div className='md:mt-24'>
      <MainContainer className='min-h-[calc(100vh-260px)] md:min-h-[calc(100vh-248px)] flex flex-col gap-y-4'>
        <div className='product-cover relative h-[790px] md:h-[466px] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:from-black/80 after:to-transparent after:bg-gradient-to-t after:z-[1]'>
          <Image
            src={product?.source ?? ""}
            alt=''
            className='object-cover object-center'
            fill
          />
          <div className='absolute left-0 w-full bottom-24 md:bottom-12 md:left-12 flex flex-col gap-y-4 text-neutral-on-foreground z-[2]'>
            <strong className='text-5xl text-center md:text-left'>
              {product?.title ?? ""}
            </strong>
            <desc className='font-medium text-sm text-center md:text-left'>
              {product?.desc ?? ""}
            </desc>
          </div>
        </div>
        <PiecesDetails product={product} />
      </MainContainer>
    </div>
  );
}
