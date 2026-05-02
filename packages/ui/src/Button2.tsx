"use client";
import { ReactNode } from "react";
import { useRef, useState, useLayoutEffect } from "react";

interface Button2Props {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  type: "submit" | "reset" | "button";
  shade: string;
}

export const Button2 = ({
  onClick,
  disabled = false,
  children,
  type,
  shade,
}: Button2Props) => {
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonWidthStyle =
    disabled && buttonWidth ? { minWidth: buttonWidth } : undefined;

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);
  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-[20rem] rounded-full py-2.5 ${shade === "solid" ? "bg-[#0074de] text-white" : "bg-white text-blue-500 border-[2px] border-[#0074de]"} `}
      style={{
        ...buttonWidthStyle,
      }}
    >
      {children}
    </button>
  );
};
