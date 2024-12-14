"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import SmallContainer from "@/components/containers/small-container";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Radiance() {
  const { dict, dir, locale } = useLocale();

  return (
    <SmallContainer>
      <section
        className='radience h-[760px] md:h-[520px] w-full relative before:z-[10] before:absolute before:right-0 before:top-0 before:bottom-0 before:w-[100px] before:bg-gradient-to-l before:from-background before:to-transparent after:absolute after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-t after:top-0 after:from-white/70 after:to-transparent after:z-[9] md:after:hidden'
        id='radience'
      >
        <Image
          alt=''
          src={`/assets/images/radience-bg.jpeg`}
          fill
          className='z-[9] object-cover object-center desktop-bg hidden md:flex'
        />
        <Image
          alt=''
          src={`/assets/images/radience-bg-mobile.jpg`}
          fill
          className='z-[9] object-cover object-center mobile-bg md:hidden'
        />
        <div
          className={cn(
            "details p-6 md:p-0 z-[20] max-w-[545px] absolute left-0 md:top-[50%] md:translate-y-[-50%] bottom-0 md:bottom-[initial] flex flex-col items-center md:items-start gap-y-4",
            dir === "ltr" ? "md:left-[450px]" : "md:right-[0]"
          )}
        >
          <h2 className='font-medium text-5xl mb-4 md:mb-0'>
            <span
              className={cn(
                "w-[150px] h-[1px] bg-black inline-flex",
                dir === "ltr" ? "mr-3" : "ml-3"
              )}
            ></span>
            {dict.common.radience_title}
          </h2>
          <p
            className={cn(
              "text-center whitespace-pre-line",
              dir === "ltr" ? "md:text-left" : "md:text-right"
            )}
          >
            {dict.common.radience_desc}
          </p>
          <Link
            className={buttonVariants({
              variant: "default",
              class: "w-[235px] md:w-[117px]",
            })}
            href={getLinkWithLocale(`/about`, locale)}
          >
            {dict.common.read_more}
          </Link>
        </div>
      </section>
    </SmallContainer>
  );
}
