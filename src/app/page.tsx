"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const greetings = ["Hello, world.", "Hello, Ken.", "Good to see you."];

export default function Home() {
  const [index, setIndex] = useState(0);
  const greeting = greetings[index];

  return (
    <main className="flex flex-1 items-center bg-[#f4efe6] text-[#1c1915]">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20 sm:px-10">
        <p className="font-mono text-xs tracking-[0.22em] text-[#8a5a2a] uppercase">
          React on Vercel
        </p>
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            {greeting}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[#5c564e]">
            A small React app, built with Next.js and published from GitHub.
            Press the button to change the greeting.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-11 px-5"
            onClick={() => setIndex((current) => (current + 1) % greetings.length)}
          >
            Say hello again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 bg-transparent px-5"
            nativeButton={false}
            render={
              <a href="https://github.com/kenmau/hello-world-react" />
            }
          >
            View the source
          </Button>
        </div>
      </div>
    </main>
  );
}
