import React from "react";

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
  return (
    <video
      src={src}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
      className={`w-full h-auto ${className}`}
      onEnded={onEnd}
    />
  );
};

export default SimpleVideo;
