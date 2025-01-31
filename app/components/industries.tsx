export const Industries = () => {
  return (
    <div className="flex flex-col w-full py-20 gap-8 min-h-screen items-center justify-center bg-[var(--services-tile-background-color)] text-[var(--services-tile-text-color)]">
      <div className="flex flex-col w-full gap-4 max-w-7xl p-4">
        <h2 className="text-2xl md:text-4xl tracking-tight text-darkGray leading-tight">Industries We Serve</h2>
        <p className="opacity-60">
          At CODE4CODE, we don’t just adapt to industries—we redefine them through tailored software solutions. With a
          proven track record across key sectors, we know what drives success and how to tackle the challenges head-on.
          Here’s how we’re helping businesses dominate their space:
        </p>
      </div>

      <div className="relative flex flex-col w-full max-w-7xl gap-8 rounded-xl min-h-96 justify-center">
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Automotive</h3>
          <p className="opacity-60 text-lg">
            Transform your vehicle management with custom solutions that enhance performance and customer satisfaction.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Finance</h3>
          <p className="opacity-60 text-lg">
            Streamline operations with scalable, secure solutions that keep your financial services ahead of the curve.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Real Estate</h3>
          <p className="opacity-60 text-lg">
            Simplify property management and sales with digital solutions that accelerate growth and efficiency.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Finance</h3>
          <p className="opacity-60 text-lg">
            Streamline operations with scalable, secure solutions that keep your financial services ahead of the curve.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Hospitality</h3>
          <p className="opacity-60 text-lg">
            Elevate guest experiences and boost operational efficiency with seamless, user-friendly technology.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Education</h3>
          <p className="opacity-60 text-lg">
            Reinvent the learning experience with solutions that increase student engagement and simplify administrative
            processes.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-[var(--secondary-color)] p-4">
          <h3 className="text-2xl">Healthcare</h3>
          <p className="opacity-60 text-lg">
            Revolutionize patient care and streamline healthcare systems with technology that puts people first.
          </p>
        </div>
      </div>
    </div>
  );
};
