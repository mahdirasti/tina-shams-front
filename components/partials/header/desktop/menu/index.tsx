"use client";

import React from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { usePage } from "@/app/hooks/use-page";

type Props = {
  scrolled: boolean;
};

export default function DesktopHeaderMenu({ scrolled }: Props) {
  const { isHome } = usePage();
  const { locale, dict } = useLocale();

  return (
    <nav className='absolute left-[50%] translate-x-[-50%]'>
      <ul className='flex flex-row items-center justify-center gap-x-12'>
        {headerMenuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={
                menuItem?.forceLink
                  ? menuItem.forceLink
                  : getLinkWithLocale(menuItem.href, locale)
              }
              title={menuItem.title}
              className={cn(
                `font-medium text-sm`,
                isHome && !scrolled ? "md:text-white" : ""
              )}
            >
              {dict?.common?.[menuItem.title] ?? menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
