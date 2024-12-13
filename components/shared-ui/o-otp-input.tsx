"use client";

import { cn } from "@/app/lib/utils";
import { convertPersianToEnglishNumbers } from "@/app/utils";
import React, { useState, useRef, useEffect } from "react";

export type OTPInputProps = {
  length: number;
  onChangeOTP: (otp: string) => void;
  onFocus?: () => void;
  className?: string;
  onBlur?: () => void;
  error?: boolean;
};

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChangeOTP,
  onFocus,
  onBlur,
  className = "",
  error,
}) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (onChangeOTP) onChangeOTP(otp.join(""));
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = convertPersianToEnglishNumbers(value);
    setOTP(newOTP);
    // Move to the next input field
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const findNextEmptyIndex = () => {
    return otp.findIndex((value) => value === "");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.stopPropagation();

    const { key } = e;

    if (key === "Backspace") {
      if (otp[index]) {
        const newOTP = [...otp];
        newOTP[index] = "";
        setOTP(newOTP);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newOTP = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      newOTP[i] = pasteData[i];
    }

    setOTP(newOTP);

    // Move to the last filled input
    const lastFilledIndex = Math.min(pasteData.length, length) - 1;
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleFocus = (index: number) => {
    let finalIndex = index;

    const nextEmptyIndex = findNextEmptyIndex();

    if (
      nextEmptyIndex !== finalIndex &&
      finalIndex > nextEmptyIndex &&
      activeIndex === null
    )
      finalIndex = nextEmptyIndex;

    setActiveIndex(finalIndex); // Set the active index
    inputRefs.current[finalIndex]?.select();
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
    setActiveIndex(null);
  };

  let clss = "flex gap-x-2";

  if (className)
    return (
      <div className={cn(clss, className)} dir='ltr'>
        {otp.map((_, index) => {
          let clss =
            "w-5 h-6 flex flex-col items-center justify-center text-input-text font-bold text-center outline-none";

          let otp_cell_clss = "otp-cell flex flex-col gap-y-1";

          if (error) {
            otp_cell_clss += " !border-error";
          } else if (activeIndex === index) otp_cell_clss += " border-error";

          return (
            <div key={index + 1} className={otp_cell_clss}>
              <input
                type='text'
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleFocus(index)}
                onBlur={() => handleBlur()}
                onPaste={handlePaste}
                //@ts-ignore
                ref={(ref) => ref && (inputRefs.current[index] = ref)}
                className={clss}
                inputMode='numeric'
              />
            </div>
          );
        })}
      </div>
    );
};

export default OTPInput;
