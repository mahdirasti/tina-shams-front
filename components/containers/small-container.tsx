import { cn } from "@/app/lib/utils";
import { LayoutProps } from "@/types/layout";

type Props = LayoutProps & { className?: string };
export default function SmallContainer({ children, className }: Props) {
  return (
    <div
      className={cn("container max-w-full w-[1080px] px-4 mx-auto", className)}
    >
      {children}
    </div>
  );
}
