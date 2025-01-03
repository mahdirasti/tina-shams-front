"use client";

const cormorant = Cormorant({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import SimpleVideo from "@/components/shared/simple-video";
import BlurFade from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { Cormorant } from "next/font/google";
import Link from "next/link";
import React from "react";

export default function Intro() {
  const { dict, locale } = useLocale();

  return (
    <section className='min-h-screen bg-black/10 flex items-center justify-center relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/40 before:z-10'>
      {/* <Image
        fill
        alt='Intro slide'
        src={`/assets/images/intro-slide.jpg`}
        className='object-cover md:object-center'
      /> */}
      <SimpleVideo
        src='/assets/videos/cover.mp4'
        loop
        autoPlay
        muted
        className='absolute top-0 left-0 w-full h-full object-cover'
      />
      <div className='flex flex-col gap-y-16 w-full relative z-20'>
        <div className='flex flex-col gap-y-4 items-center'>
          <BlurFade inView yOffset={0}>
            <h2
              className={`text-4xl md:text-7xl font-medium whitespace-pre-line md:whitespace-nowrap text-center text-white ${cormorant.className}`}
            >
              {"Illuminate \n your elegance"}
            </h2>
          </BlurFade>
          <span
            className={`text-xl md:text-2xl font-cormorant text-white ${cormorant.className}`}
          >
            {"bling & shine"}
          </span>
        </div>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-center w-full px-6 md:px-0'>
          <Link
            href={getLinkWithLocale(`/pieces`, locale)}
            className={buttonVariants({
              variant: "outlined",
              class:
                "w-full md:w-[194px] max-w-full hover:bg-neutral-foreground text-white focus:text-black active:text-black hover:bg-white hover:!text-black",
            })}
          >
            {dict.common.explore}
          </Link>
          <Link
            href={getLinkWithLocale(`/about`, locale)}
            className={buttonVariants({
              variant: "default",
              class:
                "w-full md:w-[194px] max-w-full bg-black hover:bg-white hover:!text-black",
            })}
          >
            {dict.common.about_us}
          </Link>
        </div>
      </div>
    </section>
  );
}
