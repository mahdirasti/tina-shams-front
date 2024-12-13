import React from "react";
import { useMapbox } from ".";
import { OrgButton } from "@/components/shared-ui";

export default function SelectLocation() {
  const { onSelect, onSelectTextButton } = useMapbox();

  if (onSelect === undefined) return;

  return <OrgButton onClick={onSelect}>{onSelectTextButton}</OrgButton>;
}
