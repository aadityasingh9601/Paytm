"use client";
import { ReactNode } from "react";

interface Button2Props {
  onClick: () => void;
  children: ReactNode;
  type: string;
}

export const Button2 = ({ onClick, children, type }: Button2Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[20rem] rounded-full py-2.5 ${type == "solid" ? "bg-[#0074de] text-white" : "bg-white text-blue-500 border-[2px] border-[#0074de]"} `}
    >
      {children}
    </button>
  );
};
