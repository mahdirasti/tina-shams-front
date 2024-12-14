import Image from "next/image";

type Props = {
  background: string;
};
export default function SectionImage({ background }: Props) {
  return (
    <div className='w-full h-[700px] md:h-[840px] relative'>
      <Image
        src={background}
        alt=''
        fill
        className='object-cover object-center'
      />
    </div>
  );
}
