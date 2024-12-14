import { OrgButton } from "@/components/shared-ui";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  desc: string;
  link: string;
  link_text: string;
};
export default function ContactCard({
  title,
  icon,
  desc,
  link,
  link_text,
}: Props) {
  return (
    <div className='w-full bg-secondary border border-neutral-100 p-4 rounded-xl'>
      <div className='flex flex-row items-center gap-x-4 mb-6'>
        <div className='w-10 h-10 bg-foreground flex flex-col items-center justify-center rounded-full [&_svg]:fill-neutral-on-foreground'>
          {icon}
        </div>
        <span className='font-medium text-base'>{title}</span>
      </div>
      <div className='flex flex-col gap-y-6'>
        <p>{desc}</p>
        <div className='w-full flex flex-col items-end'>
          <Link
            href={link}
            className={buttonVariants({
              variant: "outlined",
            })}
          >
            {link_text}
          </Link>
        </div>
      </div>
    </div>
  );
}
