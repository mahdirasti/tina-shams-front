"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function CopyRight() {
  const { dict } = useLocale();

  return <span className='text-xs md:text-md'>{dict.common.copyright}</span>;
}
