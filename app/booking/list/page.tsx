"use client";
import { getBookings } from "../utils";
import { Booking } from "../interface";
import { BookingTile } from "./booking_tile";
import { useEffect, useState } from "react";
import { toast } from "c4cui";

export default function Bookings() {
  const [bookings, setBookings] = useState<{
    items: Booking[];
    next: string | null;
    previous: string | null;
    count: number;
  }>();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await getBookings();

    if (res.bookings) {
      setBookings(res.bookings);
    } else toast.error(res.error || "Couldn't fetch bookings.");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col justify-center items-center w-full gap-8 max-w-7xl p-4">
        <div className="flex flex-col gap-4 pt-28 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
          <h1 className="text-6xl font-extralight">Bookings</h1>
        </div>
        <div className="grid grid-cols-3 grow gap-12 w-full">
          {bookings ? (
            bookings.items.map((booking) => <BookingTile key={booking.id} booking={booking} />)
          ) : (
            <p className="font-extralight opacity-80">No bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
}
