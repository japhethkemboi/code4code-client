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
