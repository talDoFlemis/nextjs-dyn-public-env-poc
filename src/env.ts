import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

declare const window: {
  __ENV?: any;
};

// This is a helper function to get the environment variable from the window object
// That is defined from next-runtime-env
export const getEnv = (key: string, defaultValue?: string) => {
  if (typeof window !== "undefined")
    return window.__ENV ? (window.__ENV[key] ?? defaultValue) : undefined;
  if (typeof process === "undefined") return undefined;
  return process.env[key] ?? defaultValue;
};

const baseEnv = {
  client: {
    NEXT_PUBLIC_NAME: z.string().min(8),
    NEXT_PUBLIC_BOOLEAN: z
      .string()
      .transform((s) => s !== "false" && s !== "0"),
  },
  server: {
    SERVER_VARIABLE: z.string().default("server"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NAME: getEnv("NEXT_PUBLIC_NAME"),
    NEXT_PUBLIC_BOOLEAN: getEnv("NEXT_PUBLIC_BOOLEAN"),
  },
};

export const env = createEnv({
  client: {
    ...baseEnv.client,
  },
  server: {
    ...baseEnv.server,
  },
  experimental__runtimeEnv: {
    ...baseEnv.runtimeEnv,
  },
  skipValidation:
    process.env.SKIP_ENV_CHECK === "true" ||
    (typeof window !== "undefined" && window.__ENV === undefined),
  onValidationError(error) {
    console.error("❌ Invalid environment variables:");

    for (const issue of error) {
      console.error("❌ Invalid environment variable:", issue);
    }
    throw new Error(`Invalid environment variables: ${JSON.stringify(error)}`);
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(
      `❌ Attempted to access a server-side environment variable on the client: ${variable}`,
    );
  },
});

export default env;
