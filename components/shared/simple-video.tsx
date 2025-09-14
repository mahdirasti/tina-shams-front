import React, { useEffect, useRef } from "react";

type SimpleVideoProps = {
  src: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  className?: string;
  onEnd?: () => void; // Callback for video end event
};

const SimpleVideo: React.FC<SimpleVideoProps> = ({
  src,
  loop = false,
  muted = true,
  autoPlay = true,
  className = "",
  onEnd,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the element has the inline playback attributes required by iOS
    try {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
    } catch (e) {
      // ignore if attribute can't be set in some environments
    }

    // Set some attributes that help with autoplay behavior across mobile browsers
    // Set them via setAttribute to avoid TS prop typing issues for less-common attrs
    try {
      video.setAttribute(
        "controlslist",
        "nodownload nofullscreen noremoteplayback"
      );
      video.setAttribute("disablepictureinpicture", "");
    } catch (e) {
      // ignore
    }

    // Make sure the muted state is applied (muted is required for autoplay on many mobile browsers)
    video.muted = Boolean(muted);

    // If autoplay requested, attempt to play programmatically and retry if needed
    if (autoPlay) {
      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          // common mitigation: ensure muted and retry once
          try {
            video.muted = true;
            await video.play();
          } catch (_err) {
            // If still failing, user gesture may be required — give up silently
          }
        }
      };

      attemptPlay();
    }
  }, [src, autoPlay, muted]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={muted}
        autoPlay={autoPlay}
        className={`w-full h-auto ${className}`}
        onEnded={onEnd}
        playsInline
        controls={false}
        preload='auto'
        style={{ outline: "none" }}
      />
      <style>{`
        /* Hide native play button on some mobile browsers (iOS/Android webviews) */
        video::-webkit-media-controls-start-playback-button { display:none !important; -webkit-appearance:none; }
        video::-webkit-media-controls { display:none !important; }
        /* Firefox/other engines fallback (may be ignored) */
        video::-moz-controls { display:none !important; }
      `}</style>
    </>
  );
};

export default SimpleVideo;
