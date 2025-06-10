"use client";
import { Button } from "c4cui";
import Link from "next/link";
import { Service } from "../interface";

export const ServiceTile = ({ service }: { service: Service }) => {
  return (
    <div className={`flex flex-col gap-4 border-b border-[var(--secondary-color)] pb-8`}>
      <h2 className="text-xl md:text-2xl">{service.name}</h2>
      <p className="line-clamp-6 text-ellipsis opacity-70">{service.description}</p>
      <div className="flex gap-4">
        <Link href={`/service/${service.slug}`}>
          <Button label="Learn more" outline={true} className="border-none" />
        </Link>
        <Link
          href={`/booking/create?service=${service.slug}&booking_type=Inquiry&message=Inquire about service ${service.name}`}
        >
          <Button label="Get Free Quote" outline={true} className="border-none" />
        </Link>
      </div>
    </div>
  );
};
