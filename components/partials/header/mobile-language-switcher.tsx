import { OrgIconButton } from "@/components/shared-ui";
import CDrawer from "@/components/shared-ui/o-drawer";
import { Languages } from "lucide-react";
import React from "react";
import LanguageSwitcherContent from "./language-switcher/content";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function MobileLanguageSwitcher() {
  const { dict, dir } = useLocale();

  return (
    <CDrawer
      trigger={(open) => (
        <OrgIconButton onClick={open} className='bg-transparent z-20'>
          <Languages />
        </OrgIconButton>
      )}
    >
      {(open, close) => (
        <div className='flex flex-col gap-y-2 items-start' dir={dir}>
          <strong className='w-full px-4'>{dict.common.select_lang}</strong>
          <LanguageSwitcherContent />
        </div>
      )}
    </CDrawer>
  );
}
