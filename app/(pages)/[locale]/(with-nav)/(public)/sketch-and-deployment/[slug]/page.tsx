import { MainContainer } from "@/components/containers";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import BlurFade from "@/components/ui/blur-fade";
import { Metadata } from "next";
import { LocaleType } from "@/types/locale";
import { getCanonicalURL } from "@/app/actions/canonical";
import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";
import { SketchType } from "@/types/sketch";
import Image from "next/image";
import { getFullAssets } from "@/app/lib/utils";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

const getSketch = (slug: string) => {
  return axiosInstance.get(`/sketch/${slug}`);
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: LocaleType }>;
}): Promise<Metadata> => {
  const { slug, locale } = await params;

  const dict = await getDictionary(locale);

  const res = await getSketch(slug);
  const sketch: SketchType = res?.data?.data;

  const canonical = await getCanonicalURL({ depth: 2 });

  return {
    title: sketch.title,
    description: sketch.excerpt,
    openGraph: {
      title: sketch.title,
      description: sketch.excerpt,
    },
    alternates: {
      canonical: canonical,
    },
    other: {
      "sketch:brand": dict.common.company_name,
      "sketch:retailer_item_id": sketch.id,
    },
  };
};

export default async function PiecesSinglePage({ params }: Props) {
  const { slug, locale } = await params;
  setDefaultLocale(locale);

  const res = await getSketch(slug);
  const sketch: SketchType = res?.data?.data;

  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer className='px-4 min-h-[calc(100vh-260px)] md:min-h-[calc(100vh-248px)] flex flex-col gap-y-4'>
        <div className='cover relative w-full'>
          <img
            src={getFullAssets(sketch.cover?.fileName ?? "")}
            alt={sketch.title}
            className='w-full h-auto object-cover object-center'
          />
        </div>
        <div className='px-4 md:px-0'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl md:text-4xl font-bold'>{sketch.title}</h1>
            <p className='text-base text-black/60'>{sketch.excerpt}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div
              className='prose prose-sm prose-invert'
              dangerouslySetInnerHTML={{ __html: sketch.content }}
            />
          </div>
        </div>
      </MainContainer>
    </BlurFade>
  );
}
