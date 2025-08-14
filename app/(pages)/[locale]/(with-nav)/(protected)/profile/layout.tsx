import { MainContainer } from "@/components/containers";
import { LayoutProps } from "@/types/layout";
import { LocaleType } from "@/types/locale";
import Sidebar from "./sidebar";

type Props = LayoutProps & {
  params: Promise<{ locale: LocaleType }>;
};

export default async function ProfileLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <MainContainer className='py-16 lg:py-24'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12 md:min-h-[calc(100vh-240px)]'>
        <div className='lg:col-span-3'>
          <Sidebar locale={locale} />
        </div>
        <div className='lg:col-span-9'>{children}</div>
      </div>
    </MainContainer>
  );
}
