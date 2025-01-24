"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "c4cui";
import DOMPurify from "dompurify";
import { useService } from "@/app/ServiceContext";

export default function Services() {
  const { services, fetchServices } = useService();

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col gap-8 pt-36 bg-black">
      <div className="flex flex-col sm:items-center sm:text-center gap-4 p-4 items-start">
        <h1 className="text-6xl font-extralight">Our Services</h1>
        <p className="font-extralight opacity-80 text-lg max-w-3xl mx-auto">
          At CODE4CODE, we offer tailor-made software solutions designed to empower your business. Our expert team
          crafts custom experiences that help your company thrive. Explore our services below and let&apos;s create
          something extraordinary together.
        </p>
      </div>

      <div className="bg-white text-black flex flex-col gap-8">
        {!services ? (
          <p>Loading...</p>
        ) : (
          services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col sm:items-center items-start gap-4 p-4 border-b ${1 % 2 === 0 && "bg-gray-100"}`}
            >
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
