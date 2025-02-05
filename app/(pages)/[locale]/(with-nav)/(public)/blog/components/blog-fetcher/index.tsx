"use client";

import BlogCard from "@/components/shared/blog";
import PaginationMaker from "@/components/shared/pagination-maker";
import { BlogType } from "@/types/blog";

export default function BlogFetcher() {
  return (
    <PaginationMaker<BlogType>
      endpoint='/blog'
      children={(items) => {
        if (items.length === 0)
          return (
            <div className='flex flex-col items-center justify-center py-6'>
              <p>There is no blog items here!</p>
            </div>
          );

        return (
          <div className='grid grid-cols-12 gap-4'>
            {items.map((item) => (
              <div className='col-span-12 md:col-span-4' key={item.id}>
                <BlogCard item={item} />
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
