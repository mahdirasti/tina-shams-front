import { MainContainer } from "@/components/containers";
import Image from "next/image";
import React from "react";
import CollaborationText from "./components/text";
import { OSpace } from "@/components/shared-ui";
import CollaborationContents from "./components/contents";
import CollaborationForm from "./components/form";

export default function CollaborationPage() {
  return (
    <div className='md:mt-32'>
      <MainContainer className='px-0 md:px-2'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-6'>
            <div className='w-full h-[466px] relative'>
              <Image
                src={`/assets/images/tina-shams-collaboration.jpg`}
                alt=''
                fill
                className='object-cover object-center'
              />
            </div>
          </div>
          <div className='col-span-12 md:col-span-6'>
            <CollaborationText />
          </div>
        </div>
        <div className='p-6 md:p-0'>
          <CollaborationContents />
          <OSpace height={64} />
          <CollaborationForm />
        </div>
      </MainContainer>
    </div>
  );
}
