import { _VARZ } from "@/app/const/_varz";
import HeaderPart from "@/components/partials/header";
import { LayoutProps } from "@/types/layout";
import LocaleContext from "../locale-context";
import { LocaleType } from "@/types/locale";
import { getDictionary } from "../dictionaries";

type Props = LayoutProps & { params: { locale: LocaleType } };

export default async function Layout({ children, params }: Props) {
  const dict = await getDictionary(params.locale);

  return (
    <main className='main min-w-screen min-h-screen'>
      <HeaderPart />
      <LocaleContext langJson={dict} locale={params.locale}>
        {children}
      </LocaleContext>
    </main>
  );
}
