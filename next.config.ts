import type { NextConfig } from "next";

import { fileURLToPath } from "url";

import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
};

export default nextConfig;
