"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale, urlWithQueryParams } from "@/app/lib/utils";
import { useQueryParams } from "@/app/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ExpandAll() {
  const { query } = useQueryParams();
  const { locale, dict } = useLocale();

  const selected = !!query?.["per_page"];

  return (
    <div className='w-full'>
      <Link
        href={getLinkWithLocale(
          urlWithQueryParams(`/pieces`, { ...query, per_page: 100 }),
          locale
        )}
        className={buttonVariants({
          variant: "default",
          class: "w-full md:w-auto",
        })}
      >
        {selected ? dict.common.explore_all : dict.common.show_less}
      </Link>
    </div>
  );
}
