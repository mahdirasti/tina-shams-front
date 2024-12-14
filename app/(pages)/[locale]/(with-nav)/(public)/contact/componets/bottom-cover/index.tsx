"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ContactBottomCover() {
  const { dict } = useLocale();

  return (
    <div className='w-full h-[828px] md:h-[520px] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/80 after:to-transparent md:after:hidden after:z-[1]'>
      <Image
        src={`/assets/images/contact-background-bg.jpg`}
        alt=''
        fill
        className='object-cover object-right'
      />
      <div className='absolute w-full md:w-[590px] bottom-0 left-0 max-w-full z-[2] md:bottom-[initial] md:top-[50%] md:translate-y-[-50%] md:left-16 text-neutral-on-foreground md:text-neutral-foreground flex flex-col items-center md:items-start gap-y-4 p-6 md:p-0'>
        <strong className='text-4xl md:text-5xl whitespace-pre-line md:whitespace-nowrap text-center md:text-left'>
          {dict.common.tina_shams_support_team}
        </strong>
        <p className='text-center md:text-left'>
          {dict.common.tina_shams_contact_desc}
        </p>
        <Link
          href={"tel:+989826482309"}
          className={buttonVariants({
            variant: "default",
            class:
              "w-full md:w-auto bg-neutral-on-foreground text-neutral-foreground md:bg-foreground md:text-neutral-on-foreground",
          })}
        >
          {dict.common.call_us}
        </Link>
      </div>
    </div>
  );
}
