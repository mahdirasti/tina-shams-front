"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

type Props = {
  title: string;
  desc?: string;
};
export default function CoverDetails({ title, desc }: Props) {
  const { dir } = useLocale();

  return (
    <div
      className={cn(
        "absolute left-0 w-full bottom-24 p-6 md:p-0 md:bottom-12 flex flex-col gap-y-4 text-neutral-on-foreground z-[2] text-center",
        dir === "ltr"
          ? " md:left-12 md:text-left"
          : " md:right-12 md:text-right"
      )}
    >
      <strong className={cn("text-5xl")}>{title ?? ""}</strong>
      {!!desc && <p className='font-medium text-sm'>{desc ?? ""}</p>}
    </div>
  );
}
