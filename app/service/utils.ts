import { fetchConfig } from "../fetchConfig";
import { Service, ServiceFilter } from "./interface";

export const createService = async (service: {
  name: string;
  poster?: string;
  description: string;
  story: string;
}): Promise<{
  service?: Service;
  error?: string;
}> => {
  const res = await fetchConfig("/service/create/", {
    method: "POST",
    body: JSON.stringify(service),
  });

  if (res.data) {
    return { service: res.data };
  } else return { error: res.error };
};

export const getService = async (
  slug: string
): Promise<{
  service?: Service;
  error?: string;
}> => {
  const res = await fetchConfig(`/service/manage/${slug}/`);

  if (res.data) {
    return { service: res.data };
  } else return { error: res.error };
};

export const getServiceSlugs = async (): Promise<{
  slugs?: string[];
  error?: string;
}> => {
  const res = await fetchConfig(`/service/slugs/`);

  if (res.data) {
    return { slugs: res.data };
  } else return { error: res.error };
};

export const getServices = async (
  filters?: ServiceFilter
): Promise<{
  services?: { items: Service[]; next: string | null; previous: string | null; count: number };
  error?: string;
}> => {
  const queryParams = new URLSearchParams();

  if (filters?.search) queryParams.append("search", filters.search);
  if (filters?.offset) queryParams.append("offset", filters.offset?.toString());
  if (filters?.limit) queryParams.append("limit", filters.limit.toString());
  if (filters?.posted_by) queryParams.append("posted_by", filters.posted_by);
  if (filters?.status) queryParams.append("status", filters.status.toString());
  if (filters?.tags) queryParams.append("tags", filters.tags.toString());

  const res = await fetchConfig(
    filters?.next ? filters.next : filters?.prev ? filters.prev : `/service/list/?${queryParams}`
  );

  if (res.data) {
    return {
      services: { items: res.data.results, next: res.data.next, previous: res.data.previous, count: res.data.count },
    };
  } else return { error: res.error };
};
