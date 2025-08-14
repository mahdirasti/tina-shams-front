import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";
import ProfilePageWrapper from "../components/profile-page-wrapper";
import ProfileEditWrapper from "./wrapper";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProfileEditPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <ProfilePageWrapper
      title={dict?.common?.edit_profile || "Edit Profile"}
      description={dict?.common?.edit_profile_desc || "Edit your profile here."}
    >
      <ProfileEditWrapper />
    </ProfilePageWrapper>
  );
}
