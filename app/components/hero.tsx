"use client";
import { Button } from "c4cui";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[var(--hero-background-color)] text-[var(--hero-text-color)]">
      <div className="min-h-screen w-full flex flex-col gap-8 max-w-7xl justify-center items-center text-center p-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight">Let code do the work.</h1>
        <p className="sm:text-lg md:text-xl font-light tracking-wide opacity-60 max-w-3xl leading-relaxed">
          Software should make things smoother, smarter, and effortless. The right solutions work quietly in the
          background, keeping everything running seamlessly.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/service/list")}
            className="w-full sm:w-auto border-none"
            label="Book Service"
            outline
          />
          <Button className="w-full sm:w-auto" label="Book consultation" onClick={() => router.push("/consult")} />
        </div>
      </div>
    </div>
  );
};
