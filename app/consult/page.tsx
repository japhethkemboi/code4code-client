import { ConsultForm } from "./consult_form";

export default function Consult() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-8 items-center justify-center relative text-black h-full overflow-y-auto">
      <div className="absolute border border-teal-400/10 rounded-full size-3/4"></div>
      <div className="absolute border border-teal-400/10 rounded-full size-1/2"></div>
      <div className="absolute border border-teal-400/10 rounded-full size-1/4"></div>
      <div className="absolute border border-teal-400/10 rounded-full size-1/6"></div>
      <div className="absolute border border-teal-400/10 rounded-full size-1/8"></div>
      <div className="flex flex-col gap-4 text-center pt-24 bg-black text-white p-4 w-full items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold">Let’s Bring Your Vision to Life</h2>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl">
          A great book isn’t written alone—it’s crafted with purpose and expertise. Share your vision, and we’ll help
          you turn it into a story the world will remember.
        </p>
      </div>

      <div className="p-4 flex flex-col items-center gap-4 z-10">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-4">Start Your Journey Today</h3>
        <p className="text-center text-gray-700 max-w-2xl">
          Whether you’re drafting your first page or fine-tuning your final chapter, we’re here to make your book
          extraordinary. Let’s talk about what you need.
        </p>
        <ConsultForm />
      </div>

      <div className="text-center">
        <p className="text-lg sm:text-xl">
          Every great story begins with the first step. Let’s make your vision a reality—starting today.
        </p>
        <p className="text-sm text-gray-500 mt-2">Act now—consultation slots are limited.</p>
      </div>
    </div>
  );
}
