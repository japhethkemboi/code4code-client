"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "c4cui";
import { Service } from "./interface";
import { useAuth } from "./AuthProvider";
import { fetchConfig } from "./fetchConfig";

type ServiceContextType = {
  services: Service[] | null;
  fetchServices: () => void;
  getService: (slug: string) => Promise<{ service?: Service; error?: string }>;
  getSlugs: () => Promise<{ slugs?: string[]; error?: string }>;
  getServices: (filters: { search?: string; page?: number; page_size?: number }) => Promise<{
    services?: Service[];
    next?: string;
    previous?: string;
    error?: string;
  }>;
  createService: (service: { name: string; poster: string; description: string }) => Promise<{
    service?: Service;
    error?: string;
  }>;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[] | null>(null);
  const { authFetch } = useAuth();

  const fetchServices = async () => {
    const res = await getServices({});

    if (res.services) {
      setServices(res.services);
    } else {
      toast.error(res.error || "Couldn't fetch services.");
    }
  };

  const createService = async (service: {
    name: string;
    poster: string;
    description: string;
  }): Promise<{
    service?: Service;
    error?: string;
  }> => {
    const res = await authFetch("/service/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    if (res.data) {
      return { service: res.data };
    } else {
      return { error: res.error || "Something went wrong." };
    }
  };

  const getService = async (
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

  const getSlugs = async (): Promise<{
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

  const getServices = async ({
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

  return (
    <ServiceContext.Provider
      value={{
        services,
        fetchServices,
        getService,
        getSlugs,
        getServices,
        createService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within an ServiceProvider");
  }
  return context;
};
