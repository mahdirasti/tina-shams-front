import { _VARZ } from "@/app/const/_varz";
import { LayoutProps } from "@/types/layout";
import LocaleContext from "../locale-context";
import { LocaleType } from "@/types/locale";
import { getDictionary } from "../dictionaries";

type Props = LayoutProps & {
  params: Promise<{ locale: LocaleType }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    <LocaleContext langJson={dict} locale={locale}>
      {children}
    </LocaleContext>
  );
}
