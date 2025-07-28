"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { AccountIcon } from "@/components/icons";
import Link from "next/link";
import React from "react";

type Props = {
  scrolled: boolean;
};

export default function Account({ scrolled }: Props) {
  const { locale } = useLocale();

  return (
    <Link
      href={getLinkWithLocale(`/auth/sign-in`, locale)}
      className={cn("bg-transparent", scrolled ? "" : "text-white")}
    >
      <AccountIcon size={24} color={scrolled ? "black" : "white"} />
    </Link>
  );
}
