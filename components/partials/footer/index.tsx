import { MainContainer } from "@/components/containers";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterPart() {
  return (
    <footer className='border-t border-t-black py-8 mt-16'>
      <MainContainer className='flex flex-col md:flex-row items-center gap-y-4 justify-between'>
        <strong>© Copyright 2024. All Rights Reserved.</strong>
        <div className='social-medias flex flex-row items-center gap-x-4'>
          {[
            {
              icon: (
                <Image
                  width={16}
                  height={16}
                  src={`/assets/images/x-icon.svg`}
                  alt=''
                />
              ),
              link: "#",
            },
            { icon: <Facebook />, link: "#" },
            { icon: <Instagram />, link: "#" },
            { icon: <Linkedin />, link: "#" },
          ].map((item, index) => (
            <Link key={index} href={item.link}>
              {item.icon}
            </Link>
          ))}
        </div>
      </MainContainer>
    </footer>
  );
}
