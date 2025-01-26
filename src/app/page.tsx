"use client";

import { env } from "next-runtime-env";

export default function Home() {
  const name = env("NEXT_PUBLIC_NAME");
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">{name}</h1>
      </main>
    </div>
  );
}
