import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";
import { getCanonicalURL } from "@/app/actions/canonical";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { getFullAssets, getFullName } from "@/app/lib/utils";
import { getDate } from "@/app/utils";
import { MainContainer } from "@/components/containers";
import HorizNodes from "@/components/shared/horiz-nodes";
import BlurFade from "@/components/ui/blur-fade";
import { PageType } from "@/types/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

const getPage = (slug: string) => {
  return axiosInstance.get(`/pages/${slug}`);
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { slug, locale } = await params;
    setDefaultLocale(locale);

    const res = await getPage(slug);
    const page: PageType = res?.data?.data;

    const dict = await getDictionary(locale);

    const canonical = await getCanonicalURL();

    return {
      title: page.title,
      description: page.seo_description,
      keywords: page.seo_keyword,
      publisher: dict.common.company_name,
      authors: {
        name: getFullName(page.author),
      },
      alternates: {
        canonical,
      },
    };
  } catch (error) {
    return notFound();
  }
};
export default async function PageSinglePage({ params }: Props) {
  try {
    const { locale, slug } = await params;
    setDefaultLocale(locale);

    const dict = await getDictionary(locale);

    const res = await getPage(slug);
    const page: PageType = res?.data?.data;

    if (!page) {
      return notFound();
    }

    return (
      <BlurFade inView className='mt-24 md:mt-32'>
        <MainContainer className='w-[768px] md:min-h-[calc(100vh-320px)]'>
          <div className='flex flex-col gap-y-6 mb-8'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl md:text-4xl font-bold'>{page.title}</h1>
              <HorizNodes
                items={[
                  <span className='text-xs text-black/60'>{`${
                    dict.common.author
                  }: ${getFullName(page.author)}`}</span>,
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
  } catch (error) {
    return notFound();
  }
}
