"use client";

import React from "react";
import ContactCard from "./card";
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function ContactInfo() {
  const { dict } = useLocale();

  return (
    <div className='grid grid-cols-12 gap-4'>
      {[
        {
          title: dict.common.email_to_support,
          icon: <Mail />,
          desc: dict.common.we_are_here_to_help,
          link: "info@tinashams.com",
          link_text: dict.common.send_email,
        },
        {
          title: dict.common.call_us,
          icon: <Phone />,
          desc: "+989826482309",
          link: "tel:+989826482309",
          link_text: dict.common.call_us,
        },
        {
          title: dict.common.visit_us,
          icon: <MapPin />,
          desc: dict.common.gallery_address_here,
          link: "https://maps.google.com",
          link_text: dict.common.google_map,
        },
        {
          title: dict.common.chat_to_sale,
          icon: <MessageSquareText />,
          desc: dict.common.speak_to_our_friendly_team,
          link: "https://wa.me/+989826482309",
          link_text: dict.common.whats_app,
        },
      ].map((item, key) => (
        <div className='col-span-12 md:col-span-3' key={key}>
          <ContactCard {...item} />
        </div>
      ))}
    </div>
  );
}
