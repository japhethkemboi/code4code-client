"use client";
import { Service } from "@/app/interface";
import { Button } from "c4cui";
import { BsArrowLeft } from "react-icons/bs";
import DOMPurify from "dompurify";

export const ServiceContent = ({ service }: { service: Service }) => {
  return (
    <div className="h-full flex bg-white flex-col md:items-center gap-8 md:text-center">
      <div className="flex flex-col gap-4 pt-24 p-4 bg-black text-teal-400 w-full">
        <h1 className="text-xl md:text-2xl font-semibold">{service.name}</h1>
      </div>
      <div
        className="md:text-lg text-black"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }}
      />
      <div className="p-4 flex flex-col gap-4 justify-center md:flex-row">
        <Button label="Get Quote" className="w-full md:w-auto whitespace-nowrap" />
        <Button label="Consult how this can help you" outline={true} className="w-full" />
      </div>
      <div className="flex gap-4 p-4">
        <Button icon={<BsArrowLeft size={24} />} outline={true} label="Back" />
        <Button label="View all services" outline={true} className="w-full border-none" />
      </div>
    </div>
  );
};
