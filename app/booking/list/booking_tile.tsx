import Image from "next/image";
import { Booking } from "../interface";
import Link from "next/link";
import { PiUser } from "react-icons/pi";

export const BookingTile = ({ booking }: { booking: Booking }) => {
  return (
    <div
      className={`flex flex-col gap-4 bg-[var(--tile-background-color)] text-[var(--tile-text-color)] p-4 rounded-xl`}
    >
      <div className="flex flex-col">
        <h3 className="text-sm font-extralight">{booking.organization}</h3>
        <h2 className="text-lg font-semibold">
          {booking.first_name} {booking.last_name}
        </h2>
      </div>
      <p className="line-clamp-3 text-ellipsis opacity-70">{booking.message}</p>
      {booking.service && <p>{booking.service.name}</p>}
      {booking.created_by && (
        <div className="flex gap-4 items-center">
          {booking.created_by.avatar ? (
            <Image
              src={booking.created_by.avatar}
              alt={booking.created_by.first_name + " avatar"}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="rounded-full size-6 p-2 bg-[var(--primary-color)] text-[var(--background-color)]">
              <PiUser size={20} />
            </div>
          )}
          {booking.created_by && (
            <Link href={`/profile/${booking.created_by.username}`}>
              {booking.created_by.first_name || ""} {booking.created_by.last_name || ""}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export const BookingTileSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-full w-1/4 h-4 bg-[var(--simmer-color)] animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <div className="rounded-full w-full h-2 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full w-full h-2 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full w-3/4 h-2 bg-[var(--simmer-color)] animate-pulse"></div>
      </div>
      <div className="flex gap-2">
        <div className="rounded-xl h-10 w-36 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-xl h-10 w-36 bg-[var(--simmer-color)] animate-pulse"></div>
      </div>
    </div>
  );
};
