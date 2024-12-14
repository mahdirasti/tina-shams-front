"use client";

import React from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";

export default function DesktopHeaderMenu() {
  const { locale } = useLocale();

  return (
    <nav>
      <ul className='flex flex-row items-center justify-center gap-x-12'>
        {headerMenuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={getLinkWithLocale(menuItem.href, locale)}
              title={menuItem.title}
              className='font-medium text-sm'
            >
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
