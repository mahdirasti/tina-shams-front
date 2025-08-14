"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { usePage } from "@/app/hooks/use-page";
import { cn } from "@/app/lib/utils";
import { ChevronDown } from "@/components/icons";
import { OrgButton, OrgPopover } from "@/components/shared-ui";
import React from "react";
import LanguageSwitcherContent from "./content";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  scrolled: boolean;
};

export default function LanguageSwitcher({ scrolled }: Props) {
  const { isHome } = usePage();
  const { dict, locale, dir } = useLocale();

  return (
    <div className='w-auto'>
      <OrgPopover
        align='start'
        contentClassName='p-0'
        trigger={
          <div
            className={cn(
              "w-[80px] min-w-[auto] justify-between gap-x-2",
              dir === "ltr" ? "pl-4" : "pr-4",
              isHome && !scrolled ? "text-white" : "",
              buttonVariants({ variant: "text" })
            )}
          >
            {dict?.common?.[locale as any] ?? locale}
            {dir === "ltr" ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </div>
        }
      >
        <LanguageSwitcherContent />
      </OrgPopover>
    </div>
  );
}
