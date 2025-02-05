import { MainContainer } from "@/components/containers";
import BlurFade from "@/components/ui/blur-fade";
import React from "react";
import BlogFetcher from "./components/blog-fetcher";

export default function BlogPage() {
  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer>
        <div className='flex flex-col gap-y-2 mb-8'>
          <h1 className='text-2xl md:text-4xl font-bold'>Blog</h1>
          <p className='text-base text-black/60'>
            Daily Manuscripts of Tina Shams Jewelry
          </p>
        </div>
        <BlogFetcher />
      </MainContainer>
    </BlurFade>
  );
}
