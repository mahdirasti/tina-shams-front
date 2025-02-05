import { cn } from "@/app/lib/utils";
import { Fragment } from "react";
import { ReactNode } from "react";

type Props = {
  items: ReactNode[];
  className?: string;
};
export default function HorizNodes({ items, className }: Props) {
  return (
    <div className={cn("flex flex-row items-center gap-4", className)}>
      {items.map((item, key) => (
        <Fragment key={key}>
          <div>{item}</div>
          {key < items.length - 1 && (
            <div className='flex items-center justify-center bg-black/10 w-1 h-1 rounded-full'></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
