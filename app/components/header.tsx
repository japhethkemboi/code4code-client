"use client";
import { useState } from "react";
import { BiChevronDown, BiMenuAltRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import services from "../services/services.json";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

export const Header = () => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full flex justify-between items-center p-4 bg-black text-white backdrop-blur">
      <Link
        href="/"
        className="text-xl md:text-2xl uppercase tracking-wider text-gradient cursor-pointer hover:scale-105 hover:text-teal-400"
      >
        CODE4CODE
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        <Link
          href="/services"
          onMouseEnter={() => setIsServicesHovered(true)}
          className={`font-semibold hover:text-teal-400 transition-colors duration-300 hover:border-b ${
            isServicesHovered && "text-teal-400 border-b"
          }`}
        >
          Services
        </Link>
        <Link
          href="/consult"
          onMouseEnter={() => setIsServicesHovered(false)}
          className="font-semibold hover:text-teal-400 transition-colors duration-300 hover:border-b"
        >
          Book consultation
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
          onMouseEnter={() => setIsServicesHovered(false)}
          className="font-semibold hover:text-teal-400 transition-colors duration-300 hover:border-b"
        >
          Blog
        </Link>
        <Link
          href="mailto:contact@code4code.dev"
          className="flex items-center font-semibold hover:text-teal-400 transition-colors duration-300 hover:border-b"
        >
          Contact us
          <GoArrowUpRight />
        </Link>
      </div>

      {isServicesHovered && (
        <div
          onMouseEnter={() => setIsServicesHovered(true)}
          onMouseLeave={() => setIsServicesHovered(false)}
          className="absolute top-16 left-0 right-0 flex justify-center gap-4 p-4 bg-black/95 backdrop-blur text-white transition-all"
        >
          <div className="flex gap-8 max-w-4xl">
            <div className="flex flex-col p-4 gap-4 items-start grow">
              <p className="font-semibold text-2xl">Our Services</p>
              <p>
                At CODE4CODE, we specialize in cutting-edge IT solutions designed to elevate your business. Our team of
                expert developers is committed to delivering innovative software, tailored to your specific needs. With
                Link focus on precision and excellence, we ensure that each project pushes the boundaries of what’s
                possible, making us the ideal partner to bring your vision to life.
              </p>

              <Link href="/services" onClick={() => setIsServicesHovered(false)} className="hover:text-teal-400">
                All Services
              </Link>
            </div>
            <div className="flex flex-col p-4 gap-3 whitespace-nowrap items-start">
              {services.slice(0, 5).map((service, index) => (
                <Link key={index} href="" className="hover:text-teal-400 transition-colors duration-300">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-white hover:text-teal-400">
          {isMenuOpen ? <CgClose size={24} /> : <BiMenuAltRight size={24} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-full bg-black text-white p-4 flex flex-col gap-4 h-screen overflow-y-auto">
            <div className="flex flex-col gap-4 items-start w-full">
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between gap-4 font-semibold hover:text-teal-400 transition-colors duration-300 w-full"
              >
                Services
                <BiChevronDown size={18} />
              </Link>
              <div className="flex flex-col gap-4 pl-4 items-start w-full">
                {services.slice(0, 6).map((service, index) => (
                  <Link
                    key={index}
                    href="/services"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-teal-400 transition-colors duration-300 w-full text-start"
                  >
                    {service.name}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-teal-400 transition-colors duration-300 w-full text-start"
                >
                  All services
                </Link>
              </div>
              <Link
                href="/consult"
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold hover:text-teal-400 transition-colors duration-300 w-full text-start"
              >
                Book consultation
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold hover:text-teal-400 transition-colors duration-300 w-full text-start"
              >
                Blog
              </Link>

              <Link
                href="mailto:contact@code4code.dev"
                className="flex items-center font-semibold hover:text-teal-400 transition-colors duration-300 w-full"
              >
                Contact Us
                <GoArrowUpRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
