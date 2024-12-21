"use client";

import { CategoryType } from "@/types/category";
import ChipsItem from "./item";

type Props = {
  items: CategoryType[];
};
export default function CategoryChips({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className='grid grid-cols-12 gap-4'>
      {items.map((category) => (
        <div className='col-span-6 md:col-span-2' key={category.id}>
          <ChipsItem item={category} />
        </div>
      ))}
    </div>
  );
}
