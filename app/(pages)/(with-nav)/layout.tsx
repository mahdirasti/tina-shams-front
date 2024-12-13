import { _VARZ } from "@/app/const/_varz";
import HeaderPart from "@/components/partials/header";
import { LayoutProps } from "@/types/layout";

type Props = LayoutProps;

export default function Layout({ children }: Props) {
  return (
    <main className='main min-w-screen min-h-screen'>
      <HeaderPart />
      {children}
    </main>
  );
}
