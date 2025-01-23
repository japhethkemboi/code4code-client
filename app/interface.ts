export interface User {
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_pic?: string;
  role?: string;
}

export interface Service {
  id?: number;
  name: string;
  description: string;
  story: string;
}

export interface Blog {
  id?: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  author: Partial<User>;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface Organization {
  id?: number;
  name: string;
  domains: string[];
  organization_type: string;
}

export interface Domain {
  name: string;
  verification_token?: string;
  is_verified?: boolean;
  verified_by?: Partial<User>;
  verification_date?: string;
  mxrecord?: string;
  disclaimer?: string;
  subdomain_stripping?: boolean;
  catch_all_address?: string;
  notification_address?: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: string;
}

export const organizationTypes = [
  { id: "CORPORATE", value: "Corporate Entity (Business)" },
  { id: "NONPROFIT", value: "Nonprofits and Charities" },
  { id: "EDUCATIONAL", value: "Educational Institution" },
  { id: "GOVERNMENT", value: "Government or Public Sector" },
  { id: "HEALTHCARE", value: "Healthcare Organization" },
  { id: "TECH", value: "Technology Firm" },
  { id: "FINANCIAL", value: "Financial Institution" },
  { id: "RETAIL", value: "Retail and E-commerce" },
  { id: "MEDIA", value: "Media and Entertainment" },
  { id: "FREELANCER", value: "Freelance or Individual Professionals" },
  { id: "COOPERATIVE", value: "Cooperate or Member-based Organization" },
  { id: "RELIGIOUS", value: "Religious Organization" },
];
