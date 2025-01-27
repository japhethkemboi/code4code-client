export interface Profile {
  username: string;
  first_name: string;
  last_name?: string;
  phone_number?: string;
  avatar?: string;
  role?: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
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

export interface Blog {
  id?: number;
  title: string;
  slug: string;
  poster: string;
  content: string;
  author: Partial<Profile>;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  is_published?: boolean;
  is_draft?: boolean;
  views?: number;
  likes?: number;
  comments_count?: number;
}
