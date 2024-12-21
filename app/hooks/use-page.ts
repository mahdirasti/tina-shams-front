import { usePathname } from "next/navigation";

export const usePage = () => {
  const pathname = usePathname();

  const splitted = pathname.split("/").filter((a) => !!a);

  return {
    isHome: splitted.slice(1).join("/") === "",
    isAbout: splitted.slice(1).join("/") === "about",
  };
};
