"use client";
import { ServicesTile } from "./components/services";
import { Workflow } from "./components/workflow";
import { ConsultForm } from "./consult/consult_form";
import { Industries } from "./components/industries";
import { Blogs } from "./components/blogs";
import { Hero } from "./components/hero";

export default async function Home() {
  return (
    <div className="flex flex-col items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <Hero />
      <ServicesTile />
      <Workflow />
      <Industries />
      <Blogs />
      <div className="py-24 flex flex-col w-full min-h-screen items-center justify-center">
        <div className="flex flex-col gap-8 p-4 max-w-7xl w-full">
          <h1 className="text-4xl font-bold">We Don’t Code. We Transform.</h1>
          <p className="text-xl max-w-4xl font-light opacity-60">
            At CODE4CODE, we don’t just build software—we craft personalized solutions that evolve with your business.
            Your challenges are unique, and we believe your solutions should be too. Let’s work together to create
            something extraordinary.
          </p>
        </div>
      </div>
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
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
