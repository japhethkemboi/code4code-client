"use client";
import DOMPurify from "dompurify";
import { fetchConfig } from "../fetchConfig";
import { useEffect, useState } from "react";
import { toast } from "c4cui";
import Link from "next/link";

export default function AboutUs() {
  const [about, setAbout] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const res = await fetchConfig(`/about/`);

    if (res.data) {
      setAbout(about);
    } else {
      toast.error(res.error || "Could'nt fetch info.");
    }
  };

  return (
    <div className="flex flex-col h-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col gap-4 pt-36 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h1 className="text-4xl">About Us</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="md:text-lg text-black p-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about) }} />
        <p>
          Contact us at{" "}
          <Link href="mailto:contact@code4code.dev" className="text-[var(--hover-color)] underline">
            contact@code4code.dev
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
