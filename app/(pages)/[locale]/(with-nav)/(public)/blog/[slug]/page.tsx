import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { getFullAssets, getFullName } from "@/app/lib/utils";
import { getDate } from "@/app/utils";
import { MainContainer } from "@/components/containers";
import HorizNodes from "@/components/shared/horiz-nodes";
import BlurFade from "@/components/ui/blur-fade";
import { BlogType } from "@/types/blog";

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

const getBlog = (slug: string) => {
  return axiosInstance.get(`/blog/${slug}`);
};

export default async function BlogSinglePage({ params }: Props) {
  setDefaultLocale(params.locale);

  const res = await getBlog(params.slug);
  const blog: BlogType = res?.data?.data;

  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer className='w-[768px]'>
        {!!blog?.thumbnail && (
          <img
            src={getFullAssets(blog.thumbnail.fileName)}
            alt={blog.title}
            className='w-full h-auto max-h-[340px] object-cover mb-4 rounded-md'
          />
        )}
        <div className='flex flex-col gap-y-6 mb-8'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl md:text-4xl font-bold'>{blog.title}</h1>
            <HorizNodes
              items={[
                <span className='text-xs text-black/60'>{`Updated At: ${getDate(
                  blog.updatedAt
                )}`}</span>,
                <span className='text-xs text-black/60'>{`Author: ${getFullName(
                  blog.author
                )}`}</span>,
              ]}
            />
          </div>
          {!!blog.excerpt && (
            <p className='text-base text-black/60'>{blog.excerpt}</p>
          )}
        </div>
        {!!blog.content && (
          <div
            className='py-8 border-t'
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        )}
      </MainContainer>
    </BlurFade>
  );
}
