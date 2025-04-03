import { Profile } from "../interface";

export interface Service {
  slug: string;
  name: string;
  description: string;
  story: string;
  poster: string;
  tags?: string;
  orders?: number;
  projects_completed?: number;
  views?: number;
  average_delivery_time: string;
  posted_by?: Partial<Profile>;
  created_at?: string;
  updated_at?: string;
  is_draft?: boolean;
}

export interface ServiceFilter {
  search?: string;
  limit?: number;
  offset?: number;
  next?: string;
  prev?: string;
  tags?: string | string[];
  status?: string | string[];
  posted_by?: string;
}
