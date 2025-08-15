// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "safelist"> = {
  content: ["./app/**/*.tsx"],
  safelist: [
    {
      pattern: /gap-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /pt-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /m-(1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
  ],
  presets: [sharedConfig],
};

export default config;
