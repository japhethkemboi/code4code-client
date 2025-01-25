import { ConsultForm } from "./consult_form";

export default function Consult() {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col md:flex-row h-full gap-4 w-full pt-36 max-w-7xl">
        <div className="flex flex-col gap-4 p-4 w-full">
          <h2 className="text-4xl sm:text-5xl">Let’s Bring Your Vision to Life</h2>
          <p className="text-lg sm:text-xl max-w-2xl opacity-60">
            A great book isn’t written alone—it’s crafted with purpose and expertise. Share your vision, and we’ll help
            you turn it into a story the world will remember.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 w-full">
          <ConsultForm />
        </div>
      </div>
    </div>
  );
}
