// components/SplashScreen.tsx
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import SimpleVideo from "./simple-video";

const SplashScreen = ({ onFinished }: { onFinished?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeSplashScreen = () => {
    const body = document.getElementsByTagName("body")[0];

    body.classList.remove("overflow-hidden");

    setIsVisible(false);

    if (onFinished) onFinished();
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.classList.add("overflow-hidden");
    return () => body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-[100000] overflow-hidden transition-all",
        isVisible ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <SimpleVideo
        src='/assets/videos/tina-shams-splash-screen.mp4'
        className='w-full scale-125 md:scale-100 md:!w-[992px] max-w-full h-auto'
        onEnd={closeSplashScreen}
      />
    </div>
  );
};

export default SplashScreen;
