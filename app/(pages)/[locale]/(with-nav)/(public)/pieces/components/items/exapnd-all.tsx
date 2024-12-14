"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale, urlWithQueryParams } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ExpandAll() {
  const { locale } = useLocale();

  return (
    <div>
      <Link
        href={getLinkWithLocale(
          urlWithQueryParams(`/pieces`, { per_page: 100 }),
          locale
        )}
        className={buttonVariants({
          variant: "default",
        })}
      >
        Expand All
      </Link>
    </div>
  );
}
