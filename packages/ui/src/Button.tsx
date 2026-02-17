"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type: "submit" | "button" | "reset";
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "text-xs py-1.5 px-3",
  md: "text-sm px-5 py-2.5",
};

export const Button = ({
  onClick,
  children,
  type,
  size = "md",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium focus:ring-gray-300 ${sizeClasses[size]} rounded-lg me-2 mb-2`}
    >
      {children}
    </button>
  );
};
