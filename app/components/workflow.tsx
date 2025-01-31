"use client";
import { Button } from "c4cui";
import { useRouter } from "next/navigation";

export const Workflow = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen py-20 justify-center items-center w-full">
      <div className="flex flex-col gap-10 min-h-screen justify-center p-4 w-full max-w-7xl">
        <h3 className="text-2xl md:text-5xl font-semibold leading-tight opacity-90">How we do it.</h3>
        <div className="flex flex-col gap-4">
          <p className="text-[12rem] font-extrabold opacity-20 ml-auto">01</p>
          <p className="text-lg opacity-80 ml-auto">
            You bring the problem. We listen, we dig deeper. We understand not just the issue, but{" "}
            <strong>your vision</strong>, <strong>your future</strong>, <strong>your needs</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[12rem] font-extrabold opacity-20">02</p>
          <p className="text-lg opacity-80">
            We don’t just “build” a solution. We design one. Tailored to you. One that’s not just functional, but
            perfectly aligned with
            <strong> your unique vision</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[12rem] font-extrabold opacity-20 ml-auto">03</p>
          <p className="text-lg opacity-80 ml-auto">
            One that transforms your business, empowers your team, and drives lasting impact. And by giving you the
            tools to move forward faster and smarter, we ensure you&apos;re equipped for sustained success.
          </p>
        </div>
        <p className="text-lg opacity-80">And when it’s done, it’s more than just code.</p>
        <Button
          onClick={() => router.push("/consult")}
          className="text-sm md:text-base w-auto"
          label="Create a lasting impact with us"
        />
      </div>
    </div>
  );
};
