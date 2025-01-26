"use client";
import { Button } from "c4cui";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useService } from "../ServiceContext";
import Link from "next/link";
import DOMPurify from "dompurify";

export const ServicesTile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { services, fetchServices } = useService();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (services) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 min-h-screen items-center justify-center p-4 bg-[var(--services-tile-background-color)] text-[var(--services-tile-text-color)]">
      <div className="flex flex-col w-full gap-4 max-w-7xl">
        <h2 className="text-2xl md:text-4xl tracking-tight text-darkGray leading-tight">
          Empower Your Business with Tailored Solutions
        </h2>
        <p className="opacity-60">
          At CODE4CODE, our custom solutions are crafted to deliver world-class results—designed specifically for your
          business.
        </p>
      </div>

      {services ? (
        services.length > 0 ? (
          <>
            <div className="relative flex flex-col w-full max-w-7xl gap-8 rounded-xl min-h-96 justify-center">
              <div className="absolute top-0 left-10 text-[12rem] font-extrabold opacity-20">0{currentIndex + 1}</div>
              <Link
                href={`/service/${services[currentIndex]?.slug}`}
                className="cursor-pointer text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight mt-auto"
              >
                {services[currentIndex]?.name}
              </Link>
              <div
                className="md:text-lg line-clamp-5 overflow-ellipsis"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(services[currentIndex]?.description),
                }}
              />
              <div className="flex flex-col gap-4 w-full sm:flex-row z-10">
                <div className="flex flex-col gap-4 w-full sm:flex-row">
                  <Link href={`/service/${services[currentIndex]?.slug}`}>
                    <Button label="Learn More" className="w-full sm:w-auto" outline={true} invert={true} />
                  </Link>
                  <Link href={`/consult`}>
                    <Button className="w-full sm:w-auto" label="Get Service" />
                  </Link>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-auto max-w-4xl self-center">
                  <div className="flex gap-2">
                    {services.map((_, index) => (
                      <div
                        key={index}
                        className={`size-[2px] sm:size-1 md:size-2 rounded-full ${
                          index === currentIndex ? "bg-[var(--primary-color)] w-5" : "bg-[var(--secondary-color)]"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      outline={true}
                      className="border-none p-2"
                      onClick={() =>
                        setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1))
                      }
                      icon={<BiChevronLeft size={24} />}
                    />
                    <Button
                      outline={true}
                      className="border-none p-2"
                      onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)}
                      icon={<BiChevronRight size={24} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="opacity-60">No service posted. Inquire service at contact@code4code.dev</p>
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div className="flex flex-col gap-8 w-full relative max-w-7xl ">
      <div className="absolute top-0 left-10 text-[12rem] font-extrabold opacity-20 animate-pulse">00</div>
      <div className="flex flex-col gap-4 mt-auto">
        <div className="rounded-full h-2 w-1/4 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full h-1 w-full bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full h-1 w-full bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full h-1 w-full bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full h-1 w-full bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full h-1 w-full bg-[var(--simmer-color)] animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-4 w-full sm:flex-row z-10">
        <div className="flex flex-col gap-4 w-full sm:flex-row">
          <div className="sm:w-36 h-10 rounded-xl w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="sm:w-36 h-10 rounded-xl w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-auto max-w-4xl self-center">
          <div className="flex gap-2">
            <div className="size-[2px] sm:size-1 md:size-2 rounded-full bg-[var(--primary-color)]"></div>
            <div className="size-[2px] sm:size-1 md:size-2 rounded-full bg-[var(--primary-color)]"></div>
            <div className="size-[2px] sm:size-1 md:size-2 rounded-full bg-[var(--primary-color)]"></div>
          </div>
          <div className="flex gap-2">
            <div className="size-8 bg-[var(--simmer-color)] rounded-xl animate-pulse"></div>
            <div className="size-8 bg-[var(--simmer-color)] rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
