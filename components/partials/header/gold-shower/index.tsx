import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { useApi } from "@/app/hooks";
import { cn } from "@/app/lib/utils";
import { Coins } from "lucide-react";
import React from "react";

export default function GoldShower({ className }: { className?: string }) {
  const { dict } = useLocale();

  const { data } = useApi(`/setting/keys/gold_price`);
  const price = data !== undefined ? data?.data : null;

  return (
    <div
      className={cn(
        "h-10 rounded-full text-white px-3 border border-white flex flex-row items-center text-sm gap-1",
        className
      )}
    >
      <Coins size={16} />
      {`${price?.value} ${dict.common.rial}`}
    </div>
  );
}
