import { fetchConfig } from "../fetchConfig";
import { Booking, BookingFilter } from "./interface";

export const createBooking = async (
  booking: any
): Promise<{
  booking?: Booking;
  error?: string;
}> => {
  const res = await fetchConfig("/booking/create/", {
    method: "POST",
    body: JSON.stringify(booking),
  });

  if (res.data) {
    return { booking: res.data };
  } else return { error: res.error };
};

export const getBooking = async (
  id: number
): Promise<{
  booking?: Booking;
  error?: string;
}> => {
  const res = await fetchConfig(`/booking/manage/${id}/`);

  if (res.data) {
    return { booking: res.data };
  } else return { error: res.error };
};

export const getBookingIds = async (): Promise<{
  ids?: number[];
  error?: string;
}> => {
  const res = await fetchConfig(`/booking/ids/`);

  if (res.data) {
    return { ids: res.data };
  } else return { error: res.error };
};

export const getBookings = async (
  filters?: BookingFilter
): Promise<{
  bookings?: { items: Booking[]; next: string | null; previous: string | null; count: number };
  error?: string;
}> => {
  const queryParams = new URLSearchParams();

  if (filters?.search) queryParams.append("search", filters.search);
  if (filters?.offset) queryParams.append("offset", filters.offset?.toString());
  if (filters?.limit) queryParams.append("limit", filters.limit.toString());
  if (filters?.created_by) queryParams.append("created_by", filters.created_by);
  if (filters?.email) queryParams.append("email", filters.email);
  if (filters?.service) queryParams.append("service", filters.service);

  const res = await fetchConfig(
    filters?.next ? filters.next : filters?.prev ? filters.prev : `/booking/list/?${queryParams}`
  );

  if (res.data) {
    return {
      bookings: { items: res.data.results, next: res.data.next, previous: res.data.previous, count: res.data.count },
    };
  } else return { error: res.error };
};
