import SmallContainer from "@/components/containers/small-container";
import { OrgIconButton } from "@/components/shared-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

type Props = {
  items: {
    title: string;
    link: string;
  }[];
};

export default function Banners({ items }: Props) {
  const { dir } = useLocale();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];

  if (items.length === 0) return null;

  return (
    <div className='bg-black min-h-[88px] md:min-h-[64px] flex items-center'>
      <SmallContainer className='h-full flex items-center justify-between'>
        {items.length > 1 && (
          <OrgIconButton
            className='text-white bg-transparent'
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + items.length) % items.length
              )
            }
          >
            {dir === "rtl" ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </OrgIconButton>
        )}
        <div className='flex items-center justify-center w-[calc(100%-180px)] h-full'>
          <div className='text-white flex flex-wrap text-wrap text-center items-center justify-center whitespace-pre'>
            {currentItem.link ? (
              <Link
                href={currentItem.link}
                target='_blank'
                className='underline-offset-4 hover:underline'
              >
                {currentItem.title}
              </Link>
            ) : (
              currentItem.title
            )}
          </div>
        </div>
        {items.length > 1 && (
          <OrgIconButton
            className='text-white bg-transparent'
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
            }
          >
            {dir === "rtl" ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </OrgIconButton>
        )}
      </SmallContainer>
    </div>
  );
}
