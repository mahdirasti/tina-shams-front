import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";
import { PieceType } from "@/types/piece";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: PieceType;
};
export default function PieceCard({ item }: Props) {
  const { dict } = useLocale();

  return (
    <div className='w-full rounded-xl border border-neutral-100 overflow-hidden'>
      <div className='h-[397px] relative'>
        <Image
          fill
          src={item.source}
          alt=''
          className='object-cover object-center'
        />
      </div>
      <div className='p-4 flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-1'>
          <h3 className='font-normal text-base'>{item.title}</h3>
          <span className='text-neutral-150 text-sm'>{item.category}</span>
        </div>
        <div className='flex flex-col gap-y-2'>
          <p className='text-sm text-neutral-150'>{item.desc}</p>
          <div className='flex flex-row justify-end'>
            <Link
              href={`#`}
              className={buttonVariants({
                variant: "outlined",
                class:
                  "hover:bg-neutral-foreground hover:text-neutral-on-foreground",
              })}
            >
              {dict.common.view_details}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
