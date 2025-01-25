"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "c4cui";
import { Blog } from "./interface";
import { fetchConfig } from "./fetchConfig";

type BlogContextType = {
  blogs: Blog[] | null;
  fetchBlogs: () => void;
};

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const fetchBlogs = async () => {
    const res = await getBlogs({});

    if (res.blogs) {
      setBlogs(res.blogs);
    } else {
      toast.error(res.error || "Couldn't fetch blogs");
    }
  };

  const getBlogs = async ({
    search = "",
    page = 1,
    page_size = 10,
  }: {
    search?: string;
    page?: number;
    page_size?: number;
  }): Promise<{
    blogs?: Blog[];
    next?: string;
    previous?: string;
    error?: string;
  }> => {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      page_size: page_size.toString(),
    }).toString();

    const res = await fetchConfig(`/blog/list/?${queryParams}`);

    if (res.data) {
      return {
        blogs: res.data.results,
        next: res.data.next,
        previous: res.data.previous,
      };
    } else {
      return { error: res.error };
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        fetchBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within an BlogProvider");
  }
  return context;
};
