"use client";
import { Button } from "c4cui";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Booking } from "../interface";

export const BookingContent = ({ booking }: { booking: Booking }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
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
          <Button
            label="View all services"
            onClick={() => router.push("/service/list")}
            outline={true}
            className="w-full border-none"
          />
        </div>
        <h1 className="text-xl md:text-2xl">
          {booking.first_name} {booking.last_name}
        </h1>
      </div>
      <div className="flex flex-col max-w-7xl gap-8 p-4 w-full">
        <p>{booking.message}</p>
      </div>
    </>
  );
};
