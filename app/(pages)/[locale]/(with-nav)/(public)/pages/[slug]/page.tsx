import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { getFullAssets, getFullName } from "@/app/lib/utils";
import { getDate } from "@/app/utils";
import { MainContainer } from "@/components/containers";
import HorizNodes from "@/components/shared/horiz-nodes";
import BlurFade from "@/components/ui/blur-fade";
import { PageType } from "@/types/page";

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

const getPage = (slug: string) => {
  return axiosInstance.get(`/page/${slug}`);
};

export default async function PageSinglePage({ params }: Props) {
  setDefaultLocale(params.locale);

  const res = await getPage(params.slug);
  const page: PageType = res?.data?.data;

  return (
    <BlurFade inView className='mt-24 md:mt-32'>
      <MainContainer className='w-[768px]'>
        <div className='flex flex-col gap-y-6 mb-8'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl md:text-4xl font-bold'>{page.title}</h1>
            <HorizNodes
              items={[
                <span className='text-xs text-black/60'>{`Author: ${getFullName(
                  page.author
                )}`}</span>,
              ]}
            />
          </div>
        </div>
        {!!page.content && (
          <div
            className='py-8 border-t'
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>
        )}
      </MainContainer>
    </BlurFade>
  );
}
