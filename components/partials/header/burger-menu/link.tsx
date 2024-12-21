"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  title: string;
};
export default function BurgerMenuLink({ link, title }: Props) {
  const { dict } = useLocale();

  const pathname = usePathname();

  return (
    <Link
      href={link}
      title={title}
      className={cn("relative px-4", link === pathname ? "font-bold" : "")}
    >
      {dict?.common?.[title] ?? title}
    </Link>
  );
}
