"use client";
import { useEffect, useState } from "react";
import { BiChevronDown, BiMenuAltRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { Button, toast } from "c4cui";
import { PiPlus } from "react-icons/pi";
//import { getServices } from "../service/utils";
import { Service } from "../services/interface";
import servicesData from "../services/services.json";

export const Header = () => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(true);
  const [services, setServices] = useState<Service[] | null>(servicesData as Service[]);

 // useEffect(() => {
 //   const fetchServices = async () => {
 //     const res = await getServices({ offset: 0, limit: 6 });

//      if (res.services) {
//        setServices(res.services.items);
//      } else {
//        toast.error(res.error || "Couldn't fetch services.");
//      }
//    };
//    fetchServices();
//  }, []);

  return (
    <header className="fixed z-30 w-full flex justify-center items-center bg-[var(--header-background-color)] text-[var(--header-text-color)] backdrop-blur">
      <div className="flex justify-between items-center max-w-7xl w-full p-4">
        <Link
          href="/"
          className="text-xl md:text-2xl uppercase tracking-wider text-gradient cursor-pointer hover:scale-105 hover:text-[var(--header-hover-color)]"
        >
          CODE4CODE
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/services"
            onMouseEnter={() => setIsServicesHovered(true)}
            onClick={() => setIsServicesHovered(false)}
            className={`hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300`}
          >
            Services
          </Link>
          <Link
            href="/booking/create"
            onMouseEnter={() => setIsServicesHovered(false)}
            className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
          >
            Book consultation
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
            onMouseEnter={() => setIsServicesHovered(false)}
            className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
          >
            Blog
          </Link>
          <Link
            href="mailto:contact@code4code.dev"
            className="flex items-center hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
          >
            Contact us
            <GoArrowUpRight />
          </Link>
        </div>

        {isServicesHovered && (
          <div
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
            className="absolute top-16 left-0 right-0 flex justify-center gap-4 bg-[var(--header-background-color)] backdrop-blur text-[var(--header-text-color)] transition-all"
          >
            <div className="flex gap-8 max-w-7xl">
              <div className="flex flex-col p-4 gap-4 items-start grow">
                <p className="text-2xl">Our Services</p>
                <p>
                  At CODE4CODE, we specialize in cutting-edge IT solutions designed to elevate your business. Our team
                  of expert developers is committed to delivering innovative software, tailored to your specific needs.
                  With Link focus on precision and excellence, we ensure that each project pushes the boundaries of
                  what’s possible, making us the ideal partner to bring your vision to life.
                </p>
                <Link
                  href="/services"
                  onClick={() => setIsServicesHovered(false)}
                  className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
                >
                  All Services
                </Link>
              </div>
              <div className="flex flex-col p-4 gap-3 whitespace-nowrap items-start">
                {services ? (
                  services.slice(0, 6).map((service, index) => (
                    <Link
                      key={index}
                      href={`/services/${service.slug}`}
                      onClick={() => setIsServicesHovered(false)}
                      className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
                    >
                      {service.name}
                    </Link>
                  ))
                ) : (
                  <>
                    <div className="h-2 p-1 w-24 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                    <div className="h-2 p-1 w-32 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                    <div className="h-2 p-1 w-20 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                    <div className="h-2 p-1 w-28 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                    <div className="h-2 p-1 w-20 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                    <div className="h-2 p-1 w-16 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl hover:text-[var(--header-hover-color)]"
          >
            {isMenuOpen ? <CgClose size={24} /> : <BiMenuAltRight size={24} />}
          </button>

          {isMenuOpen && (
            <div className="absolute top-14 right-0 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)] p-4 flex flex-col gap-4 h-screen overflow-y-auto overflow-hidden">
              <div className="flex flex-col gap-4 items-start w-full">
                <p className="flex justify-between gap-4 w-full items-center">
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/services"
                    className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 text-start"
                  >
                    Services
                  </Link>
                  <Button
                    onClick={() => setIsServiceMenuOpen(!isServiceMenuOpen)}
                    icon={isServiceMenuOpen ? <BiChevronDown size={18} /> : <PiPlus size={18} />}
                    outline={true}
                    className="border-none p-1"
                  />
                </p>
                {isServiceMenuOpen && (
                  <div className="flex flex-col gap-4 pl-4 items-start w-full">
                    {services ? (
                      services?.slice(0, 6).map((service, index) => (
                        <Link
                          key={index}
                          href={`/services/${service.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 w-full text-start"
                        >
                          {service.name}
                        </Link>
                      ))
                    ) : (
                      <>
                        <div className="h-2 p-1 w-24 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                        <div className="h-2 p-1 w-32 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                        <div className="h-2 p-1 w-20 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                        <div className="h-2 p-1 w-28 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                        <div className="h-2 p-1 w-20 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                        <div className="h-2 p-1 w-16 rounded-full animate-pulse bg-[var(--simmer-color)]"></div>
                      </>
                    )}
                    <Link
                      href="/services"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 text-start"
                    >
                      All services
                    </Link>
                  </div>
                )}
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/consult"
                  className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 w-full text-start"
                >
                  Book consultation
                </Link>
                <a
                  href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
                  className="hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 w-full text-start"
                >
                  Blog
                </a>

                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="mailto:contact@code4code.dev"
                  className="flex items-center hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300 w-full"
                >
                  Contact Us
                  <GoArrowUpRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
