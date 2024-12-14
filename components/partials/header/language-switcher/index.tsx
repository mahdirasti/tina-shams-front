"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { ChevronDown } from "@/components/icons";
import { OrgButton, OrgPopover } from "@/components/shared-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const { dict, dir, locale } = useLocale();

  return (
    <div className='w-auto'>
      <OrgPopover
        align='start'
        contentClassName='p-0'
        trigger={
          <OrgButton
            variant={"outlined"}
            endIcon={<ChevronDown />}
            className='w-[80px] pl-4 min-w-[auto] justify-between'
          >
            {dict?.common?.[locale as any] ?? locale}
          </OrgButton>
        }
      >
        <div className='flex flex-col gap-y-2 py-2 w-[120px] max-w-full bg-background rounded-md'>
          {[
            { title: dict?.common?.en, locale: "en" },
            { title: dict?.common?.fa, locale: "fa" },
            { title: dict?.common?.ar, locale: "ar" },
          ].map((item) => {
            const changedPathname = pathname
              .split("/")
              .filter((item) => !!item);

            console.log("changedPathname", changedPathname);

            let finalPathname = `/`;

            if (changedPathname.length > 1) {
              finalPathname = `/${item.locale}/${changedPathname
                .slice(1)
                .join("/")}`;
            } else if (changedPathname.length === 1) {
              finalPathname = `/${item.locale}`;
            }

            return (
              <Link
                className='hover:bg-neutral-25 w-full py-1 px-3 text-sm'
                href={finalPathname}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </OrgPopover>
    </div>
  );
}
