import { redirect } from "next/navigation";
import { getLinkWithLocale } from "@/app/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  return redirect(getLinkWithLocale(`/profile/orders`, locale));
}
