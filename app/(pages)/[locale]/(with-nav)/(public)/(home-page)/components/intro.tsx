"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Intro() {
  const { dict } = useLocale();

  return (
    <section className='min-h-screen bg-black/10 relative flex items-center justify-center'>
      <Image
        fill
        alt='Intro slide'
        src={`/assets/images/intro-slide.jpg`}
        className='object-cover md:object-center'
      />
      <div className='flex flex-col gap-y-16 relative z-10'>
        <div className='flex flex-col gap-y-4 items-center'>
          {/* <div>
            <img
              src='/assets/images/illum-desktop.svg'
              alt='Illum Desktop'
              className='desktop hidden md:flex'
            />
            <img
              src='/assets/images/illum-mobile.svg'
              alt='Illum Desktop'
              className='mobile flex md:hidden'
            />
          </div>
          <div>
            <img
              src='/assets/images/bling-and-shine-desktop.svg'
              alt='Billing And Shine desktop'
              className='desktop hidden md:flex'
            />
            <img
              src='/assets/images/bling-and-shine-desktop.svg'
              alt='Billing And Shine Mobile'
              className='mobile flex md:hidden'
            />
          </div> */}
          <h2 className='text-4xl md:text-7xl font-medium whitespace-pre-line md:whitespace-nowrap text-center'>
            {dict.common.intro_title}
          </h2>
          <span className='text-xl md:text-2xl'>
            {dict.common.intro_subtitle}
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <Link
            href={`#`}
            className={buttonVariants({
              variant: "outlined",
              class:
                "rounded-[100px] w-[194px] max-w-full hover:bg-neutral-foreground hover:text-neutral-on-foreground",
            })}
          >
            {dict.common.explore}
          </Link>
        </div>
      </div>
    </section>
  );
}
