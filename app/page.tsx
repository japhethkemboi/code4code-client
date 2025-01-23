"use client";
import Link from "next/link";
import { ServicesTile } from "./components/services";
import { Workflow } from "./components/workflow";
import { ConsultForm } from "./consult/consult_form";
import { Button } from "c4cui";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex items-center justify-center bg-[var(--hero-bg-color)] text-[var(--hero-text-color)] p-6">
        <div className="absolute size-3/4 border border-teal-400/20 animate-pulse"></div>
        <div className="absolute size-1/2 border border-teal-400/20 animate-pulse"></div>
        <div className="absolute size-1/3 border border-teal-400/20 animate-pulse"></div>
        <div className="absolute size-1/4 border border-teal-400/20 animate-pulse"></div>
        <div className="absolute size-1/6 border border-teal-400/20 animate-pulse"></div>
        <div className="absolute size-1/8 border border-teal-400/20 animate-pulse"></div>
        <div className="text-center max-w-6xl absolute flex flex-col items-center gap-8 sm:gap-10">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold">Your Vision, Our Code</h1>
          <p className="sm:text-lg md:text-xl font-light tracking-wide text-gray-300 max-w-3xl leading-relaxed">
            At CODE4CODE, we transform ambitious ideas into world-class digital solutions. Through cutting-edge
            technology and unmatched expertise, we empower businesses to succeed in a competitive world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services">
              <Button className="w-full sm:w-auto" label="Book Service" outline={true} />
            </Link>
            <Link href="/consult">
              <Button className="w-full sm:w-auto" label="Book consultation" />
            </Link>
          </div>
        </div>
      </div>
      <ServicesTile />
      <div className="py-24 flex flex-col min-h-screen p-4 gap-6 bg-white items-center justify-center text-center relative">
        <div className="absolute size-3/4 border animate-pulse"></div>
        <div className="absolute size-1/2 border animate-pulse"></div>
        <div className="absolute size-1/3 border animate-pulse"></div>
        <div className="absolute size-1/4 border animate-pulse"></div>
        <div className="absolute size-1/6 border animate-pulse"></div>
        <div className="absolute size-1/8 border animate-pulse"></div>
        <div className="absolute flex flex-col gap-6 items-center p-4">
          <h1 className="text-4xl font-bold text-black">We Don’t Code. We Transform.</h1>
          <p className="text-xl max-w-4xl mx-auto mt-4 font-light text-gray-700">
            At CODE4CODE, we don’t just build software—we craft personalized solutions that evolve with your business.
            Your challenges are unique, and we believe your solutions should be too. Let’s work together to create
            something extraordinary.
          </p>

          <Button label="Get in Touch" />
        </div>
      </div>
      <Workflow />
      <div id="consultation-form" className="flex flex-col gap-8 p-4 items-center justify-center bg-white text-black">
        <h2 className="text-3xl sm:text-5xl font-bold mt-72 text-center">Ready to Transform Your Business?</h2>
        <p className="text-lg sm:text-xl text-center text-gray-600 max-w-3xl">
          Let’s discuss how we can create a powerful solution tailored specifically to your business. The future starts
          with a conversation.
        </p>
        <ConsultForm />
      </div>
    </div>
  );
}
