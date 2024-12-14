import { MainContainer } from "@/components/containers";
import React from "react";
import Heading from "./componets/heading";
import ContactInfo from "./componets/info";
import { OSpace } from "@/components/shared-ui";

export default function ContactPage() {
  return (
    <div className='md:mt-32'>
      <MainContainer>
        <Heading />
        <OSpace height={32} />
        <ContactInfo />
        <OSpace height={64} />
        <div className='w-full h-[520px]'>xx</div>
      </MainContainer>
    </div>
  );
}
