"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function Heading() {
  const { dict } = useLocale();

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='text-2xl md:text-3xl font-normal'>
        {dict.common.contact_title}
      </h1>
      <p className='whitespace-pre-line font-medium'>
        {dict.common.contact_desc}
      </p>
    </div>
  );
}
