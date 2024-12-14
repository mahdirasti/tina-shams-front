"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function CopyRight() {
  const { dict } = useLocale();

  return <strong>{dict.common.copyright}</strong>;
}
