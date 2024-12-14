import { ReactNode } from "react";

type Props = {
  title: string;
  content: ReactNode;
};
export default function CollaborationContent({ title, content }: Props) {
  return (
    <div className='flex flex-col gap-y-6'>
      <h2 className='text-xl md:text-3xl font-medium'>{title}</h2>
      <div className='text-sm font-normal'>{content}</div>
    </div>
  );
}
