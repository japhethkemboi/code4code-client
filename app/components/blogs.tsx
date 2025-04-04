"use client";
import DOMPurify from "dompurify";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { Blog } from "../interface";
import { fetchConfig } from "../fetchConfig";
import { useEffect, useState } from "react";
import { toast } from "c4cui";
import Link from "next/link";

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetchConfig(`/blog/list/?limit=6`);
      if (res.data) {
        setBlogs(res.data.results);
      } else toast.error(res.error || "Could'nt fetch blogs.");
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 min-h-screen items-center justify-center py-20">
      <div className="flex flex-col w-full grow shrink-0 gap-8 max-w-7xl p-4">
        <h2 className="text-2xl md:text-4xl tracking-tight leading-tight">Our blogs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-8">
          {blogs ? (
            <>
              {blogs.length > 0 ? (
                <>
                  {blogs.map((blog) => (
                    <div key={blog.slug} className="flex sm:flex-col gap-4 shrink-0">
                      {blog.poster && (
                        <Image
                          alt={blog.slug}
                          width={500}
                          height={500}
                          className="size-36 sm:w-full sm:h-auto max-h-48 rounded-xl"
                          src={process.env.NEXT_PUBLIC_SERVER_URL + blog.poster}
                        />
                      )}
                      <div className="flex flex-col gap-4">
                        <Link href={`/service/${blog.slug}`} className="text-lg font-semibold hover:underline">
                          {blog.title}
                        </Link>
                        <div
                          className="line-clamp-3 overflow-ellipsis"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.content),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Link
                    href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
                    className="mr-auto flex items-center hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
                  >
                    Discover More Blog Posts
                    <GoArrowUpRight />
                  </Link>
                </>
              ) : (
                <p>No blogs published.</p>
              )}
            </>
          ) : (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center sm:items-start sm:flex-col sm:h-full gap-4 w-full">
                <div className="size-36 w-52 sm:w-full sm:h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
                <div className="h-20 sm:h-3 rounded-xl sm:rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
