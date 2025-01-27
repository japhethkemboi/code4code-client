import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-auto w-full bg-[var(--footer-background-color)] text-[var(--footer-text-color)]">
      <div className="w-full flex flex-col md:flex-row md:justify-between max-w-7xl gap-4 p-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link
            href="/service/list"
            className="hover:text-[var(--footer-hover-color)] hover:underline transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--footer-hover-color)] hover:underline transition-colors duration-300"
          >
            About us
          </Link>
          <Link
            href="/consult"
            className="hover:text-[var(--footer-hover-color)] hover:underline transition-colors duration-300"
          >
            Book consultation
          </Link>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Link
            href="/tos"
            className="hover:text-[var(--footer-hover-color)] hover:underline transition-colors duration-300"
          >
            Terms of service
          </Link>
          <Link
            href="mailto:contact@code4code.dev"
            className="flex items-center hover:text-[var(--header-hover-color)] hover:underline"
          >
            contact@code4code.dev
            <GoArrowUpRight />
          </Link>
        </div>
      </div>
    </footer>
  );
};
