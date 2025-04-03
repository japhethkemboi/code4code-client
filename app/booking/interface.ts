import { Profile } from "../interface";
import { Service } from "../service/interface";

export interface Booking {
  id: number;
  first_name: string;
  last_name: string;
  organization: string;
  phone_number: string;
  email: string;
  message: string;
  schedule: string;
  booking_type?: { name: string; description: string | null };
  service?: Partial<Service>;
  created_by?: Partial<Profile>;
}

export interface BookingFilter {
  search?: string;
  limit?: number;
  offset?: number;
  next?: string;
  prev?: string;
  email?: string;
  phone_number?: string;
  booking_type?: string;
  service?: string;
  created_by?: string;
}
