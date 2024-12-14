"use client";

import { OSpace } from "@/components/shared-ui";
import CollaborationContent from "./content";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

export default function CollaborationContents() {
  const { dict, dir } = useLocale();

  return (
    <>
      <OSpace height={64} />
      <CollaborationContent
        title={dict.common.why_collaborate_us}
        content={
          <ul
            className={cn(
              "flex flex-col list-disc gap-y-4",
              dir === "ltr" ? "ml-4" : "mr-4"
            )}
          >
            {[
              dict.common.why_us_1,
              dict.common.why_us_2,
              dict.common.why_us_3,
            ].map((item, index) => (
              <li key={index} className='whitespace-pre-line'>
                {item}
              </li>
            ))}
          </ul>
        }
      />
      <OSpace height={64} />
      <CollaborationContent
        title={dict.common.collaboration_process}
        content={
          <ul
            className={cn(
              "flex flex-col list-disc gap-y-4",
              dir === "ltr" ? "ml-4" : "mr-4"
            )}
          >
            {[
              dict.common.collaboration_process_1,
              dict.common.collaboration_process_2,
              dict.common.collaboration_process_3,
              dict.common.collaboration_process_4,
              dict.common.collaboration_process_5,
            ].map((item, index) => (
              <li key={index} className='whitespace-pre-line'>
                {item}
              </li>
            ))}
          </ul>
        }
      />
    </>
  );
}
