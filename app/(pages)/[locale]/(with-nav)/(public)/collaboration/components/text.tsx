"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CollaborationText() {
  const { dict } = useLocale();

  return (
    <div className='flex flex-col gap-y-8 items-center md:items-start p-6'>
      <div className='flex flex-col gap-y-4 text-center md:text-left'>
        <h1 className='font-medium text-4xl md:text-5xl'>
          {dict.common.collaboration_title}
        </h1>
        <div className='flex flex-col gap-y-4 text-sm font-normal'>
          <p>{dict.common.collaboration_desc_1}</p>
          <p>{dict.common.collaboration_desc_2}</p>
        </div>
      </div>
      <Link href={`#collaboration_form`} className={buttonVariants()}>
        {dict.common.collaboration_form}
      </Link>
    </div>
  );
}