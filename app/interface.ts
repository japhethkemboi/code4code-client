import { Profile } from "./profile/interface";

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
