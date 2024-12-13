"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  title: string;
};
export default function BurgerMenuLink({ link, title }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      title={title}
      className={cn("relative pl-4", link === pathname ? "font-bold" : "")}
    >
      {title}
    </Link>
  );
}
