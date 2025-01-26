"use client";
import { Service } from "@/app/interface";
import { Button } from "c4cui";
import { BsArrowLeft } from "react-icons/bs";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

export const ServiceContent = ({ service }: { service: Service }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col max-w-7xl gap-8 pt-24 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <div className="flex gap-4 mr-auto">
          <Button
            icon={<BsArrowLeft size={24} />}
            outline={true}
            label="Back"
            className="border-none w-auto"
            invert={true}
            onClick={() => router.back()}
          />
          <Button label="View all services" outline={true} className="w-full border-none" />
        </div>
        <h1 className="text-xl md:text-2xl">{service.name}</h1>
      </div>
      <div className="flex flex-col max-w-7xl gap-8 p-4 w-full">
        <div className="md:text-lg" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }} />
        <div className="flex flex-col gap-4 md:flex-row">
          <Button label="Get a Free Quote" className="w-full md:w-auto whitespace-nowrap" />
          <Button
            label="Consult how this can help your business"
            outline={true}
            className="w-full md:w-auto border-none"
          />
        </div>
      </div>
    </div>
  );
};
