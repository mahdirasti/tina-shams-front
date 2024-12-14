import Image from "next/image";
import Link from "next/link";
import BannerCardLink from "./link";

type Props = {
  title?: string;
  desc?: string;
  link?: string;
  background: string;
};
export default function PieceBannerCard({
  title,
  desc,
  link,
  background,
}: Props) {
  return (
    <div className='w-full h-full relative min-h-[339px] md:min-h-[initial]'>
      <Image
        fill
        src={background}
        className='object-cover object-center z-[1]'
        alt={title ?? ""}
      />
      {(!!title || !!desc || link) && (
        <div className='absolute top-0 left-0 w-full h-full md:w-auto md:h-auto md:top-16 md:left-12 z-[2] flex flex-col items-start gap-y-6 after:bottom-0 after:h-full after:left-0 after:w-full after:bg-gradient-to-t after:from-black/90 after:to-transparent'>
          {(!!title || desc) && (
            <div className='flex flex-col gap-y-2 m-6 md:m-0'>
              {!!title && (
                <strong className='whitespace-pre-line font-medium text-4xl'>
                  {title}
                </strong>
              )}
              {!!desc && <p className='whitespace-pre-line'>{desc}</p>}
            </div>
          )}
          {!!link && (
            <div className='absolute bottom-0 md:relative md:bottom-[initial] p-6 md:p-0 w-full md:w-auto'>
              <BannerCardLink link={link} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
