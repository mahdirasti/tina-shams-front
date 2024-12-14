"use client";

import { LocaleType } from "@/types/locale";
import { createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
  locale: LocaleType;
  langJson: any;
};

const LangContext = createContext<{
  dict: any;
  dir: "ltr" | "rtl";
  locale?: LocaleType;
}>({
  dict: undefined,
  dir: "ltr",
  locale: undefined,
});

export const useLocale = () => useContext(LangContext);

export default function LocaleContext({ children, locale, langJson }: Props) {
  return (
    <LangContext.Provider
      value={{ dict: langJson, dir: locale === "en" ? "ltr" : "rtl", locale }}
    >
      {children}
    </LangContext.Provider>
  );
}
