"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "c4cui";
import DOMPurify from "dompurify";
import { useService } from "@/app/ServiceContext";
import { ServiceSkeleton } from "./skeleton";

export default function Services() {
  const { services, fetchServices } = useService();
  const [servicesLen, setServicesLen] = useState(localStorage.getItem("services_length") || 5);

  useEffect(() => {
    fetchServices();
    services && localStorage.setItem("services_length", services.length.toString());
    setServicesLen(localStorage.getItem("services_length") || 5);
  }, []);

  return (
    <div className="flex flex-col h-full justify-center items-center w-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col max-w-7xl gap-4 pt-36 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h1 className="text-6xl font-extralight">Our Services</h1>
        <p className="font-extralight opacity-80">
          At CODE4CODE, we offer tailor-made software solutions designed to empower your business. Our expert team
          crafts custom experiences that help your company thrive. Explore our services below and let&apos;s create
          something extraordinary together.
        </p>
      </div>
      <div className="flex flex-col gap-12 w-full max-w-7xl h-full p-4">
        {!services ? (
          <>
            {Array.from({ length: parseInt(servicesLen.toString() || "5") }).map((_, index) => (
              <ServiceSkeleton key={index} />
            ))}
          </>
        ) : (
          services.map((service, index) => (
            <div key={index} className={`flex flex-col gap-4 border-b border-[var(--secondary-color)] pb-8`}>
              <h2 className="text-lg sm:text-xl font-semibold">{service.name}</h2>
              <div
                className="md:text-lg"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }}
              />
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
    </div>
  );
}
