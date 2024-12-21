"use client";

const cormorant = Cormorant({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Cormorant } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Intro() {
  const { dict, locale } = useLocale();

  return (
    <section className='min-h-screen bg-black/10 relative flex items-center justify-center'>
      <Image
        fill
        alt='Intro slide'
        src={`/assets/images/intro-slide.jpg`}
        className='object-cover md:object-center'
      />
      <div className='flex flex-col gap-y-16 relative z-1 w-full'>
        <div className='flex flex-col gap-y-4 items-center'>
          <h2
            className={`text-4xl md:text-7xl font-medium whitespace-pre-line md:whitespace-nowrap text-center ${cormorant.className}`}
          >
            {"Illuminate \n your elegance"}
          </h2>
          <span
            className={`text-xl md:text-2xl font-cormorant ${cormorant.className}`}
          >
            {"bling & shine"}
          </span>
        </div>
        <div className='flex flex-col gap-y-4 items-center w-full px-6 md:px-0'>
          <Link
            href={getLinkWithLocale(`/pieces`, locale)}
            className={buttonVariants({
              variant: "outlined",
              class:
                "w-full md:w-[194px] max-w-full hover:bg-neutral-foreground hover:text-neutral-on-foreground",
            })}
          >
            {dict.common.explore}
          </Link>
          <Link
            href={getLinkWithLocale(`/about`, locale)}
            className={buttonVariants({
              variant: "default",
              class:
                "w-full md:w-[194px] md:hidden max-w-full hover:bg-neutral-foreground hover:text-neutral-on-foreground",
            })}
          >
            {dict.common.about_us}
          </Link>
        </div>
      </div>
    </section>
  );
}
