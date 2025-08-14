import getServerSession from "@/app/lib/server-session";
import { getLinkWithLocale, urlWithQueryParams } from "@/app/lib/utils";
import AuthGuard from "@/components/shared/auth-guard";
import { LayoutProps } from "@/types/layout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = LayoutProps & {
  params: Promise<{ locale: string }>;
};

export default async function layout({ children, params }: Props) {
  const { locale } = await params;

  const { isAuthenticated } = await getServerSession();

  const pathname = (await headers()).get("x-pathname");

  if (!isAuthenticated)
    return redirect(
      urlWithQueryParams(getLinkWithLocale("/auth/sign-in", locale), {
        should_login: true,
        redirect: pathname ? encodeURI(pathname) : undefined,
      })
    );

  return <AuthGuard>{children}</AuthGuard>;
}
