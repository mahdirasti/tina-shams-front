import { MainContainer } from "@/components/containers";
import BlurFade from "@/components/ui/blur-fade";
import React from "react";
import { getDictionary } from "../../../dictionaries";
import { getCanonicalURL } from "@/app/actions/canonical";
import axiosInstance, { Pagination, setDefaultLocale } from "@/app/lib/axios";
import { SketchType } from "@/types/sketch";
import Image from "next/image";
import { getFullAssets } from "@/app/lib/utils";
import Link from "next/link";

export const generateMetadata = async () => {
  const dict = await getDictionary("fa");
  const canonical = await getCanonicalURL({ depth: 2 });
  return {
    title: dict.common.sketch_and_deployment,
    description: dict.common.sketch_and_deployment_description,
    openGraph: {
      title: dict.common.sketch_and_deployment,
      description: dict.common.sketch_and_deployment_description,
    },
    alternates: {
      canonical: canonical,
    },
  };
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SketchAndDeploymentPage({ params }: Props) {
  const { locale } = await params;
  setDefaultLocale(locale);

  const dict = await getDictionary(locale);

  const { data } = await axiosInstance.get<Pagination<SketchType>>(`/sketch`);

  const items = data !== undefined ? data.data.items : [];

  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer>
        <div className='flex flex-col gap-y-2 mb-8'>
          <h1 className='text-2xl md:text-4xl font-bold'>
            {dict.common.sketch_and_deployment}
          </h1>
          <p className='text-base text-black/60'>
            {dict.common.sketch_and_deployment_description}
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {items.map((item) => (
            <Link
              href={`/sketch-and-deployment/${item.slug}`}
              key={item.id}
              className='flex flex-col gap-y-2 border border-black/10 rounded-lg p-4'
            >
              {item.cover && (
                <div className='cover relative w-full h-48'>
                  <Image
                    src={getFullAssets(item.cover?.fileName ?? "")}
                    alt={item.title}
                    fill
                  />
                </div>
              )}
              <h2 className='text-lg font-bold'>{item.title}</h2>
              <p className='text-sm text-black/60'>{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </MainContainer>
    </BlurFade>
  );
}
