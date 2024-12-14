"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Intro() {
  const { dict } = useLocale();

  return (
    <section
      className='about-us-intro min-h-[calc(100vh-64px)] md:min-h-screen relative after:absolute after:bottom-0 after:left-0 after:w-full after:top-0 after:bg-gradient-to-t after:from-black after:to-transparent'
      id='intro'
    >
      <Image
        src={`/assets/images/tina-shams.jpg`}
        alt=''
        fill
        className='object-cover object-center'
      />
      <div className='details absolute z-[1] bottom-6 md:bottom-24 left-0 w-full flex flex-col items-center gap-y-8 py-6 text-neutral-on-foreground'>
        <div className='flex flex-col gap-y-4 items-center w-[700px] max-w-[90%]'>
          <h1 className='text-center text-4xl md:text-5xl font-medium whitespace-pre-line md:whitespace-nowrap'>
            {dict.common.about_title}
          </h1>
          <p className='text-center'>{dict.common.about_desc}</p>
        </div>
        <Link
          className={buttonVariants({ variant: "outlined" })}
          href={`/pieces`}
        >
          {dict.common.our_pieces}
        </Link>
      </div>
    </section>
  );
}