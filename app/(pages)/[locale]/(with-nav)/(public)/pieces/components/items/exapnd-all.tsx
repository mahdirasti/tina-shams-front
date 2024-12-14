"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ExpandAll() {
  return (
    <div>
      <Link
        href={`#`}
        className={buttonVariants({
          variant: "default",
        })}
      >
        Expand All
      </Link>
    </div>
  );
}
