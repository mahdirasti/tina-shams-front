import { MainContainer } from "@/components/containers";
import React from "react";
import Heading from "./componets/heading";
import ContactInfo from "./componets/info";
import { OSpace } from "@/components/shared-ui";
import Image from "next/image";
import ContactBottomCover from "./componets/bottom-cover";

export default function ContactPage() {
  return (
    <div className='md:mt-32'>
      <MainContainer>
        <Heading />
        <OSpace height={32} />
        <ContactInfo />
        <OSpace height={64} />
        <ContactBottomCover />
      </MainContainer>
    </div>
  );
}
