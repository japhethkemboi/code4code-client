"use client";
import { useEffect, useState } from "react";
import services from "../../services.json";
import { Service } from "@/app/interface";
import { Button } from "@/app/components/button";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "next/navigation";

export default function ServiceView() {
  const { slug } = useParams();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    if (slug) {
      const foundService = services.find((item) => item.slug === slug);
      if (foundService) {
        setService(foundService);
      } else {
        console.error("Service not found");
      }
    }
  }, [slug]);

  const handleFetchService = (id: string) => {
    const foundService = services.find((item) => item.id === parseInt(id));
    if (foundService) {
      setService(foundService);
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:items-center gap-8 md:text-center">
      <div className="flex flex-col gap-4 p-4 bg-black text-teal-400 pt-24">
        <h1 className="text-3xl md:text-4xl font-extrabold">{service.name}</h1>
        <p className="text-lg md:text-xl opacity-70 text-white">{service.description}</p>
      </div>

      <p className="text-gray-700 leading-relaxed text-lg p-4">{service.story}</p>

      <div className="p-4 flex flex-col gap-4 justify-center md:flex-row">
        <Button label="Get Quote" className="w-full md:w-auto whitespace-nowrap" />
        <Button label="Consult how this can help you" outline={true} className="w-full" />
      </div>
      <div className="flex gap-4 p-4">
        <Button icon={<BsArrowLeft size={24} />} outline={true} label="Back" />
        <Button label="View all services" outline={true} className="w-full" />
      </div>
    </div>
  );
}
