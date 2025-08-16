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

    // Option 3: More flexible pattern for various units

    "h-[33rem]",
    "overflow-y-scroll",

    "text-xs",

    // Text color patterns
    {
      pattern:
        /text-(slate|gray|red|green|emerald|sky|blue|indigo|violet|purple|)-(50|100|200|300|400|500|600|700|800|900)/,
    },

    // Background color patterns
    {
      pattern:
        /bg-(slate|gray|red|green|emerald|sky|blue|indigo|violet|purple|)-(50|100|200|300|400|500|600|700|800|900)/,
    },

    {
      pattern: /gap-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /p-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /py-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
  ],
  presets: [sharedConfig],
};

export default config;
