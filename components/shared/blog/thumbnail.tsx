import { cn, getFullAssets } from "@/app/lib/utils";
import { BlogType } from "@/types/blog";
import Image from "next/image";

type Props = {
  blog: BlogType;
};

export default function BlogThumbnail({ blog }: Props) {
  return (
    <>
      {!!blog.thumbnail && (
        <Image
          fill
          src={getFullAssets(blog.thumbnail.fileName)}
          alt=''
          className={cn("object-cover object-center")}
        />
      )}
    </>
  );
}
