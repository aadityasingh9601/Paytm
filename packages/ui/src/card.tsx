import React, { CSSProperties } from "react";

type Style = Partial<CSSProperties>;

export function Card({
  title,
  children,
  styles,
}: {
  title: string;
  children?: React.ReactNode;
  styles?: Style;
}) {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed] w-full"
      style={styles}
    >
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
