"use client";
import { Button } from "c4cui";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useService } from "../ServiceContext";

export const ServicesTile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { services } = useService();

  useEffect(() => {
    if (services) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, []);

  if (!services) {
    return <p>Loading services...</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
  };

  return (
    <div className="snap-start overflow-x-hidden overflow-y-auto py-24 p-4 bg-teal-400 text-gray-900 relative min-h-screen flex flex-col gap-12">
      <div className="text-center max-w-4xl self-center">
        <h2 className="text-2xl sm:text-4xl md:text-6xl tracking-tight text-darkGray leading-tight">
          Empower Your Business with Tailored Solutions
        </h2>
        <p className="text-lg md:text-2xl text-gray-600 mt-6 mx-auto max-w-4xl opacity-80">
          At CODE4CODE, our custom solutions are crafted to deliver world-class results—designed specifically for your
          business.
        </p>
      </div>

      <div className="relative bg-teal-300 flex flex-col gap-4 justify-between self-center grow items-start max-w-4xl rounded-xl p-4">
        <div className="absolute top-0 left-10 text-[12rem] font-extrabold text-gray-400 opacity-20">
          0{currentIndex + 1}
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={`/service/${services[currentIndex]?.slug}`}
            className="cursor-pointer text-lg sm:text-2xl md:text-4xl font-bold tracking-tight text-darkGray leading-tight"
          >
            {services[currentIndex]?.name}
          </a>
          <p className="sm:text-lg md:text-2xl text-gray-600 mx-auto max-w-4xl opacity-80 line-clamp-6 text-ellipsis sm:line-clamp-none">
            {services[currentIndex]?.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full sm:flex-row">
          <div className="flex flex-col gap-4 w-full sm:flex-row">
            <Button label="Learn More" outline={true} invert={true} />
            <Button className="w-full sm:w-auto" label="Get Service" />
          </div>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-auto max-w-4xl self-center">
            <div className="flex gap-2">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`size-[2px] sm:size-1 md:size-2 rounded-full ${
                    index === currentIndex ? "bg-black w-5" : "bg-teal-400"
                  }`}
                ></div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                outline={true}
                className="border-none p-2"
                onClick={handlePrevious}
                icon={<BiChevronLeft size={24} />}
              />
              <Button
                outline={true}
                className="border-none p-2"
                onClick={handleNext}
                icon={<BiChevronRight size={24} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
