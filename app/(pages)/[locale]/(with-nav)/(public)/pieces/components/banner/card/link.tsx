"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  link: string;
};

export default function BannerCardLink({ link }: Props) {
  const { dict } = useLocale();

  return (
    <Link
      href={link}
      className={buttonVariants({
        variant: "outlined",
        class:
          "w-full border-neutral-on-foreground md:border-neutral-foreground text-neutral-on-foreground md:text-foreground",
      })}
    >
      {dict.common.view_details}
    </Link>
  );
}
