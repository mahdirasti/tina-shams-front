import { ChevronDown } from "@/components/icons";
import { OrgButton } from "@/components/shared-ui";
import React from "react";

export default function LanguageSwitcher() {
  return (
    <OrgButton
      variant={"outlined"}
      endIcon={<ChevronDown />}
      className='w-[80px] pl-4 min-w-[auto] justify-between'
    >
      EN
    </OrgButton>
  );
}
