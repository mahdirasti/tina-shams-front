import { MainContainer } from "@/components/containers";
import BlurFade from "@/components/ui/blur-fade";
import React from "react";
import BlogFetcher from "./components/blog-fetcher";
import { getDictionary } from "../../../dictionaries";
import { getCanonicalURL } from "@/app/actions/canonical";

export const generateMetadata = async () => {
  const dict = await getDictionary("fa");
  const canonical = await getCanonicalURL({ depth: 2 });
  return {
    title: dict.common.blog,
    description: dict.common.blog_description,
    openGraph: {
      title: dict.common.blog,
      description: dict.common.blog_description,
    },
    alternates: {
      canonical: canonical,
    },
  };
};

export default async function BlogPage() {
  const dict = await getDictionary("fa");
  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer>
        <div className='flex flex-col gap-y-2 mb-8'>
          <h1 className='text-2xl md:text-4xl font-bold'>{dict.common.blog}</h1>
          <p className='text-base text-black/60'>
            {dict.common.blog_description}
          </p>
        </div>
        <BlogFetcher />
      </MainContainer>
    </BlurFade>
  );
}
