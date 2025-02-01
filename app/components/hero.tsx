"use client";
import { Button } from "c4cui";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 max-w-7xl justify-center bg-[var(--hero-background-color)] text-[var(--hero-text-color)] p-4">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold">Your business, but smoother.</h1>
      <p className="sm:text-lg md:text-xl font-light tracking-wide opacity-60 max-w-3xl leading-relaxed">
        At CODE4CODE, we craft software that empowers businesses to grow and succeed. Trust our expertise to streamline
        operations, unlock potential, and deliver results.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/service/list")}
          className="w-full sm:w-auto"
          label="Book Service"
          outline={true}
        />
        <Button className="w-full sm:w-auto" label="Book consultation" onClick={() => router.push("/consult")} />
      </div>
    </div>
  );
};
