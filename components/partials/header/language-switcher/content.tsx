import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LanguageSwitcherContent() {
  const pathname = usePathname();
  const { dict } = useLocale();

  return (
    <div className='flex flex-col gap-y-2 py-2 w-full md:w-[120px] max-w-full bg-background rounded-md'>
      {[
        { title: dict?.common?.en, locale: "en" },
        { title: dict?.common?.fa, locale: "fa" },
        { title: dict?.common?.ar, locale: "ar" },
      ].map((item) => {
        const changedPathname = pathname.split("/").filter((item) => !!item);

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
            className='hover:bg-neutral-25 w-full py-2 px-3 text-sm'
            href={finalPathname}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
