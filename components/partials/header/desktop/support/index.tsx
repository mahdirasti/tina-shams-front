import { cn } from "@/app/lib/utils";
import { CallIcon } from "@/components/icons";
import { OrgIconButton } from "@/components/shared-ui";
import React from "react";

type Props = {
  scrolled: boolean;
};

export default function Support({ scrolled }: Props) {
  return (
    <OrgIconButton
      className={cn("bg-transparent", scrolled ? "" : "text-white")}
    >
      <CallIcon size={24} color={scrolled ? "black" : "white"} />
    </OrgIconButton>
  );
}
