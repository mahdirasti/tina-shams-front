import Image from "next/image";
import Desc from "./desc";

type Props = {
  title: string;
  desc: string;
  background: string;
};
export default function HomeBannerCard({ title, desc, background }: Props) {
  return (
    <div className='w-full h-[390px] md:h-[466px] relative after:absolute after:z-[1] after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/80 after:to-transparent'>
      <Image
        fill
        src={background}
        alt={title}
        className='object-cover object-center'
      />
      <div className='details absolute bottom-0 left-0 w-full z-[2] text-neutral-on-foreground flex flex-col gap-y-2 items-center md:items-start p-6'>
        <h3 className='font-bold text-4xl'>{title}</h3>
        <Desc text={desc} />
      </div>
    </div>
  );
}
