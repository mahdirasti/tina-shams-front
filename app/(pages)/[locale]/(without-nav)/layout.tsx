import { _VARZ } from "@/app/const/_varz";
import { LayoutProps } from "@/types/layout";
import LocaleContext from "../locale-context";
import { LocaleType } from "@/types/locale";
import { getDictionary } from "../dictionaries";

type Props = LayoutProps & { params: { locale: LocaleType } };

export default async function Layout({ children, params }: Props) {
  const dict = await getDictionary(params.locale);

  return (
    <LocaleContext langJson={dict} locale={params.locale}>
      {children}
    </LocaleContext>
  );
}
