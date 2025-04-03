import { getBooking, getBookingIds } from "../utils";
import { BookingContent } from "./booking_details";

export async function generateStaticParams() {
  const res = await getBookingIds();
  return res.ids ? res.ids.map((id: number) => ({ id })) : [];
}

export default async function Booking({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const res = await getBooking(id);

  if (res.booking) {
    return (
      <div className="flex flex-col items-center w-full">
        <BookingContent booking={res.booking} />
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p>Couldn't fetch service.</p>
      </div>
    );
}
