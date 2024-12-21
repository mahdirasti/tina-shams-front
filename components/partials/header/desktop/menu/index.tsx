"use client";

import React from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { usePage } from "@/app/hooks/use-page";

export default function DesktopHeaderMenu() {
  const { isHome } = usePage();
  const { locale, dict } = useLocale();

  return (
    <nav>
      <ul className='flex flex-row items-center justify-center gap-x-12'>
        {headerMenuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={getLinkWithLocale(menuItem.href, locale)}
              title={menuItem.title}
              className={cn(
                `font-medium text-sm`,
                isHome ? "md:text-white" : ""
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
