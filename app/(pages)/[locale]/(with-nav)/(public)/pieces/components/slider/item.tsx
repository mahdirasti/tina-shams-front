import Image from "next/image";
import Link from "next/link";

type Props = {
  background: string;
  title: string;
  desc: string;
  link: string;
};
export default function PieceSliderItem({
  background,
  title,
  desc,
  link,
}: Props) {
  return (
    <Link
      href={link ?? ""}
      className='flex h-[466px] relative after:absolute after:bottom-0 after:left-0 after:w-full after:top-0 after:bg-gradient-to-t after:from-black/50 after:to-transparent'
    >
      <Image
        fill
        src={background}
        alt=''
        className='object-cover object-center'
      />
      <div className='absolute bottom-0 left-0 w-full py-16 px-24 flex flex-col gap-y-4 text-neutral-on-foreground z-[2]'>
        <strong className='font-medium text-4xl md:text-5xl'>{title}</strong>
        <p className='text-sm font-medium whitespace-pre-line'>{desc}</p>
      </div>
    </Link>
  );
}
