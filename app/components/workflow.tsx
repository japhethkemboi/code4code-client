import { Button } from "@/app/components/button";
import { CgArrowTopRight } from "react-icons/cg";

export const Workflow = () => {
  return (
    <div className="bg-black text-white flex flex-col relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-800 to-black opacity-60"></div>

      <div className="min-h-screen relative z-10 p-4 text-center flex flex-col justify-center items-center max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight opacity-90">
          Challenge Us. We Dare You.
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mt-8 opacity-80">
          Frustrated with inefficiencies? Burdened by outdated systems that drag you down? Digital solutions that just
          don&apos;t <strong>evolve</strong> with you?
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mt-8 opacity-80">
          Cast thy burdens upon us; we shall make your path straight.
        </p>
        <a
          href="mailto:contact@code4code.dev"
          className="flex items-center text-xl md:text-2xl text-gray-300 mt-8 opacity-80 hover:text-blue-500"
        >
          contact@code4code.dev
          <CgArrowTopRight />
        </a>
      </div>

      <div className="min-h-screen relative z-10 flex flex-col gap-14 items-center justify-center text-center p-4">
        <h3 className="text-2xl md:text-5xl font-semibold leading-tight opacity-90">
          Here&apos;s how we make it happen.
        </h3>

        <div className="flex flex-col md:flex-row justify-between gap-12 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex justify-center items-center font-semibold text-xl">
              1
            </div>
            <p className="text-lg text-gray-300 mt-6 opacity-80">
              You bring the problem. We listen, we dig deeper. We understand not just the issue, but{" "}
              <strong>your vision</strong>, <strong>your future</strong>, <strong>your needs</strong>.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex justify-center items-center font-semibold text-xl">
              2
            </div>
            <p className="text-lg text-gray-300 mt-6 opacity-80">
              We don’t just “build” a solution. We design one. Tailored to you. One that’s not just functional, but
              perfectly aligned with
              <strong> your unique vision</strong>.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white text-black rounded-full flex justify-center items-center font-semibold text-xl">
              3
            </div>
            <p className="text-lg text-gray-300 mt-6 opacity-80">
              One that transforms your business, empowers your team, and drives lasting impact.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl text-black p-4 flex flex-col gap-4">
          <p className="opacity-80">
            By giving you the tools to move forward faster and smarter, we ensure you&apos;re equipped for sustained
            success.
          </p>
          <Button className="text-sm md:text-base w-auto" label="Create a lasting impact" />
        </div>
      </div>

      <div className="snap-start min-h-screen relative z-10 px-6 py-24 flex flex-col gap-14 text-center justify-center max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-extrabold opacity-90 leading-tight">
          And when it’s done, it’s more than just code.
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mt-6 opacity-80 max-w-3xl mx-auto">
          It&apos;s an evolution. A solution built for the future. Powerful, seamless, and ahead of its time. CODE4CODE
          doesn&apos;t just deliver. We transform the way you think about business.
        </p>
        <a href="/consult" className="hover:text-teal-400 text-teal-50">
          Let&apos;s Build Something Great, Together
        </a>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-gradient-to-tr from-blue-400 via-purple-500 to-indigo-600 opacity-20 rounded-full blur-3xl top-20 left-20"></div>
        <div className="w-72 h-72 bg-gradient-to-bl from-pink-400 via-yellow-500 to-orange-600 opacity-20 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>
    </div>
  );
};
