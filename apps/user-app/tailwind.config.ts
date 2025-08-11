// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "safelist"> = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}", // Local app
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}", // UI package
    // Add any other package paths where Tailwind classes exist
  ],
  safelist: [
    // Gap utilities

    //You dont' really need to add these arbitrary values one by one, you can add a specific pattern for that certain
    //property that you want. You can use the arbitraray values only when the pattern doens't work.

    // Background patterns
    {
      pattern:
        /bg-(red|blue|green|gray|slate|zinc|neutral|stone|orange|amber|yellow|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Arbitrary background values
    {
      pattern: /gap-\[.+\]/, // This covers gap-[8px], gap-[2rem], gap-[32px], etc.
    },
    {
      pattern: /bg-\[.+\]/, // This covers bg-[#ff0000], bg-[rgba(255,0,0,0.5)], etc.
    },
    // Or use patterns
    {
      pattern: /gap-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /p-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
  ],
  presets: [sharedConfig],
};

export default config;
