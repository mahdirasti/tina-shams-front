"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

export default function Desc({ text }: { text: string }) {
  const { dir } = useLocale();

  return (
    <p
      className={cn(
        "text-center",
        dir === "ltr" ? "md:text-left" : "md:text-right"
      )}
    >
      {text}
    </p>
  );
}
