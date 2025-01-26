"use client";
import Link from "next/link";
import { ServicesTile } from "./components/services";
import { Workflow } from "./components/workflow";
import { ConsultForm } from "./consult/consult_form";
import { Button } from "c4cui";
import { Industries } from "./components/industries";
import { Blogs } from "./components/blogs";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="min-h-screen w-full flex flex-col gap-8 max-w-7xl justify-center bg-[var(--hero-background-color)] text-[var(--hero-text-color)] p-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold">
          We Speak <b className="text-[var(--primary-color)]">CODE</b>
        </h1>
        <p className="sm:text-lg md:text-xl font-light tracking-wide opacity-60 max-w-3xl leading-relaxed">
          At CODE4CODE, we use technology to make your businesses thrive. We don’t just build software; we build the
          tools that help you win. Whether you&apos;re looking to scale, innovate, or lead—our code brings your vision
          to life and drives success.
        </p>
        <div className="flex gap-4">
          <Link href="/service/list">
            <Button className="w-full sm:w-auto" label="Book Service" outline={true} />
          </Link>
          <Link href="/consult">
            <Button className="w-full sm:w-auto" label="Book consultation" />
          </Link>
        </div>
      </div>
      <ServicesTile />
      <Workflow />
      <Industries />
      <Blogs />
      <div className="py-24 flex flex-col w-full min-h-screen items-center justify-center">
        <div className="flex flex-col gap-8 p-4 max-w-7xl">
          <h1 className="text-4xl font-bold text-black">We Don’t Code. We Transform.</h1>
          <p className="text-xl max-w-4xl mx-auto mt-4 font-light text-gray-700">
            At CODE4CODE, we don’t just build software—we craft personalized solutions that evolve with your business.
            Your challenges are unique, and we believe your solutions should be too. Let’s work together to create
            something extraordinary.
          </p>
          <Link href="/consult">
            <Button label="Get in Touch" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col md:flex-row h-full gap-4 w-full pt-36 max-w-7xl">
          <div className="flex flex-col gap-4 p-4 w-full">
            <h2 className="text-4xl sm:text-5xl">Let’s Bring Your Vision to Life</h2>
            <p className="text-lg sm:text-xl max-w-2xl opacity-60">
              A great book isn’t written alone—it’s crafted with purpose and expertise. Share your vision, and we’ll
              help you turn it into a story the world will remember.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-4 w-full">
            <ConsultForm />
          </div>
        </div>
      </div>
    </div>
  );
}
