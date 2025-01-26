"use client";

import { env } from "next-runtime-env";
import TypeSafeEnv from "./../env";

export default function Home() {
  const name = env("NEXT_PUBLIC_NAME");
  const nameTypeSafe = TypeSafeEnv.NEXT_PUBLIC_NAME;
  const boolean = TypeSafeEnv.NEXT_PUBLIC_BOOLEAN;
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">From runtime: {name}</h1>
        <h1 className="text-2xl font-bold text-center">
          From runtime and type-safe: {nameTypeSafe} and boolean: {boolean}
        </h1>
      </main>
    </div>
  );
}
