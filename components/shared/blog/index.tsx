"use client";

import { BlogType } from "@/types/blog";
import Link from "next/link";
import BlogThumbnail from "./thumbnail";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  item: BlogType;
};
export default function BlogCard({ item }: Props) {
  const { locale, dict } = useLocale();

  const link = `/${locale}/blog/${item.slug}`;

  return (
    <div className='w-full rounded-xl border border-neutral-100 overflow-hidden'>
      <Link href={link} className='flex h-[397px] relative'>
        <BlogThumbnail blog={item} />
      </Link>
      <div className='p-4 flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='font-bold text-base min-h-[50px]'>{item.title}</h3>
          {!!item.excerpt && (
            <p className='text-sm text-neutral-150 min-h-[80px]'>
              {item.excerpt.length > 200
                ? item.excerpt.slice(0, 200) + "..."
                : item.excerpt}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-row justify-end w-full'>
            <Link
              href={link}
              className={buttonVariants({
                variant: "outlined",
                class: "w-full md:w-auto",
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
