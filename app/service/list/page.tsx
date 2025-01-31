"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, toast, ToastContainer } from "c4cui";
import { ServiceSkeleton } from "./skeleton";
import { getServices } from "@/app/utils";
import { Service } from "@/app/interface";

export default function Services() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServices({});

      if (res.services) {
        setServices(res.services);
      } else {
        toast.error(res.error || "Couldn't fetch services.");
      }
    };
    fetchServices();
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col max-w-7xl gap-4 pt-28 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h1 className="text-6xl font-extralight">Our Services</h1>
        <p className="font-extralight opacity-80">
          At CODE4CODE, we offer tailor-made software solutions designed to empower your business. Our expert team
          crafts custom experiences that help your company thrive. Explore our services below and let&apos;s create
          something extraordinary together.
        </p>
      </div>
      <div className="flex flex-col grow gap-12 w-full max-w-7xl p-4">
        {!services ? (
          <>
            {Array.from({ length: parseInt("5") }).map((_, index) => (
              <ServiceSkeleton key={index} />
            ))}
          </>
        ) : (
          services.map((service, index) => (
            <div key={index} className={`flex flex-col gap-4 border-b border-[var(--secondary-color)] pb-8`}>
              <h2 className="text-xl md:text-2xl">{service.name}</h2>
              <p className="line-clamp-6 text-ellipsis opacity-70">{service.description}</p>
              <div className="flex gap-4">
                <Link href={`/service/${service.slug}`}>
                  <Button label="Learn more" outline={true} className="border-none" />
                </Link>
                <Link href={`/consult?${service.slug}`}>
                  <Button label="Get Free Quote" outline={true} className="border-none" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
