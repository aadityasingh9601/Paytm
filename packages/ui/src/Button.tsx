"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type: "submit" | "button" | "reset";
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "text-xs py-1.5 px-3",
  md: "text-sm px-5 py-2.5",
};

export const Button = ({
  children,
  onClick,
  disabled = false,
  type,
  size = "md",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`text-white ${disabled ? "bg-gray-700" : "bg-gray-800"} ${disabled ? "hover:bg-gray-700" : "hover:bg-gray-900"}  focus:outline-none focus:ring-4 font-medium focus:ring-gray-300 ${sizeClasses[size]} rounded-lg me-2 mb-2`}
    >
      {children}
    </button>
  );
};
