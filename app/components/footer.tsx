export const Footer = () => {
  return (
    <footer className="flex flex-col mt-auto w-full gap-4 p-4 bg-black text-white">
      <div className="w-full flex gap-4 items-center justify-center flex-wrap">
        <a href="/services" className="hover:text-teal-400 transition-colors duration-300">
          Services
        </a>
        <a href="/about" className="hover:text-teal-400 transition-colors duration-300">
          About us
        </a>
        <a href="/consult" className="hover:text-teal-400 transition-colors duration-300">
          Book consultation
        </a>
        <a href="/careers" className="hover:text-teal-400 transition-colors duration-300">
          Careers
        </a>
      </div>
      <div className="w-full flex gap-4 items-center justify-center">
        <a href="/services" className="hover:text-teal-400 transition-colors duration-300"></a>
        <a href="/tos" className="hover:text-teal-400 transition-colors duration-300">
          Terms of service
        </a>
      </div>
      <div className="w-full flex gap-4 items-center justify-center">
        <a href="mailto:contact@code4code.dev" className="hover:text-teal-400 transition-colors duration-300">
          contact@code4code.dev
        </a>
      </div>
    </footer>
  );
};
