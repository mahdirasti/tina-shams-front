import Image from "next/image";

type Props = {
  title: string;
  desc: string[];
};
export default function SectionText({ title, desc }: Props) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-start py-8 px-16 gap-y-5'>
      <h2 className='text-4xl font-medium whitespace-pre-line'>{title}</h2>
      <div className='text-sm font-normal flex flex-col gap-y-4'>
        {desc.map((item, key) => (
          <p key={key}>{item}</p>
        ))}
      </div>
    </div>
  );
}
