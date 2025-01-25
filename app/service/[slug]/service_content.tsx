"use client";
import { Service } from "@/app/interface";
import { Button } from "c4cui";
import { BsArrowLeft } from "react-icons/bs";
import DOMPurify from "dompurify";

export const ServiceContent = ({ service }: { service: Service }) => {
  return (
    <div className="flex flex-col h-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col gap-4 pt-24 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <Button
          icon={<BsArrowLeft size={24} />}
          outline={true}
          label="Back"
          className="border-none mr-auto"
          invert={true}
        />
        <h1 className="text-xl md:text-2xl">{service.name}</h1>
      </div>
      <div
        className="md:text-lg text-black p-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }}
      />
      <div className="p-4 flex flex-col gap-4 justify-center md:flex-row">
        <Button label="Get a Free Quote" className="w-full md:w-auto whitespace-nowrap" />
        <Button label="Consult how this can help your business" outline={true} className="w-full" />
      </div>
      <Button label="View all services" outline={true} className="w-full border-none" />
    </div>
  );
};
