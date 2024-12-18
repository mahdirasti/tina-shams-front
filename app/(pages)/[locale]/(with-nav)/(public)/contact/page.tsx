import { MainContainer } from "@/components/containers";
import Heading from "./componets/heading";
import ContactInfo from "./componets/info";
import { OSpace } from "@/components/shared-ui";
import ContactBottomCover from "./componets/bottom-cover";
import axiosInstance from "@/app/lib/axios";

const getSettings = () => axiosInstance.get(`/setting`);

export default async function ContactPage() {
  const res = await getSettings();
  const settings = res?.data?.data;

  return (
    <div className='md:mt-32'>
      <MainContainer>
        <Heading />
        <OSpace height={32} />
        <ContactInfo settings={settings} />
        <OSpace height={64} />
        <ContactBottomCover />
      </MainContainer>
    </div>
  );
}
