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
  story: string;
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
