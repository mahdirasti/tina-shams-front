import { cn } from "@/app/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

export default function OrgDivider({ className }: Props) {
  return <div className={cn("h-1 bg-inverted-stroke w-full", className)}></div>;
}
