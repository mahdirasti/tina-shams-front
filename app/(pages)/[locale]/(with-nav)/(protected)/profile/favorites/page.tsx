import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";
import ProfilePageWrapper from "../components/profile-page-wrapper";
import ProfileFavoritesWrapper from "./wrapper";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FavoritesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <ProfilePageWrapper
      title={dict?.common?.favorites || "Favorites"}
      description={
        dict?.common?.favorites_desc || "Your saved items will appear here."
      }
    >
      <ProfileFavoritesWrapper />
    </ProfilePageWrapper>
  );
}
