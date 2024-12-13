import { cn } from "@/app/lib/utils";
import Link from "next/link";

type MenuItemType = { title: string; href: string };

type Props = {
  item: MenuItemType;
  isActive?: boolean;
};
export default function MenuItem({ item, isActive }: Props) {
  return (
    <Link
      className={cn(
        `flex flex-col gap-y-2 relative text-sm uppercase top-1`,
        isActive
          ? "font-bold text-foreground after:absolute after:bottom-[-4px] after:left-[50%] after:translate-x-[-50%] after:w-1 after:h-1 after:rounded-full after:bg-black"
          : "text-foreground opacity-50 hover:opacity-100"
      )}
      href={item.href}
      title={item.title}
    >
      {item.title}
    </Link>
  );
}
