import { fetchConfig } from "../fetchConfig";
import { Service } from "../interface";

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
  } else {
    return { error: res.error };
  }
};

export const getService = async (
  slug: string
): Promise<{
  service?: Service;
  error?: string;
}> => {
  const res = await fetchConfig(`/service/manage/${slug}`);

  if (res.data) {
    return { service: res.data };
  } else {
    return { error: res.error };
  }
};

export const getSlugs = async (): Promise<{
  slugs?: string[];
  error?: string;
}> => {
  const res = await fetchConfig(`/service/slugs`);

  if (res.data) {
    return { slugs: res.data };
  } else {
    return { error: res.error };
  }
};

export const getServices = async ({
  search = "",
  page = 1,
  page_size = 10,
}: {
  search?: string;
  page?: number;
  page_size?: number;
}): Promise<{
  services?: Service[];
  next?: string;
  previous?: string;
  error?: string;
}> => {
  const queryParams = new URLSearchParams({
    search,
    page: page.toString(),
    page_size: page_size.toString(),
  }).toString();

  const res = await fetchConfig(`/service/list/?${queryParams}`);

  if (res.data) {
    return {
      services: res.data.results,
      next: res.data.next,
      previous: res.data.previous,
    };
  } else {
    return { error: res.error };
  }
};
