"use client";
import { Button } from "c4cui";
import { useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useBlog } from "../BlogProvider";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

export const Blogs = () => {
  const { blogs, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 min-h-screen items-center justify-center py-20">
      <div className="flex flex-col w-full gap-8 max-w-7xl p-4">
        <h2 className="text-2xl md:text-4xl tracking-tight leading-tight">Our blogs</h2>

        {blogs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8">
            {blogs.slice(0, 4).map((blog) => (
              <div key={blog.slug} className="flex sm:flex-col gap-4">
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
          </div>
        ) : (
          <Skeleton />
        )}
        <Link
          href={process.env.NEXT_PUBLIC_BLOG_URL || "/blog"}
          className="mr-auto flex items-center hover:text-[var(--header-hover-color)]  hover:underline transition-colors duration-300"
        >
          Discover More Blog Posts
          <GoArrowUpRight />
        </Link>
      </div>
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8">
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-4 w-full shrink-0">
        <div className="flex shrink-0 size-36 sm:w-full max-w-48 sm:h-full max-h-48 bg-[var(--simmer-color)] animate-pulse rounded-xl"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-2 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
          <div className="h-1 rounded-full w-full bg-[var(--simmer-color)] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
