"use client";
import React, { useState, useEffect } from "react";
import { Button, RichTextEditor, toast, ToastContainer } from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import { fetchConfig } from "@/app/fetchConfig";

export default function CreateService() {
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (!about) {
      toast.error("Please enter about.");
    } else {
      const res = await fetchConfig("/page/manage/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(about),
      });

      if (res.data) {
        toast.success("About info updated.");
      } else {
        toast.error(res.error || "Something went wrong while updating about info. Please try again.");
      }
    }
    setLoading(false);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full gap-8 bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col gap-4 pt-36 p-4 w-full bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h2 className="text-xl">Edit about</h2>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <RichTextEditor value={about} onChange={setAbout} />
        <Button label="Save Changes" onClick={handleSubmit} disabled={loading || !about} className="ml-auto" />
      </div>
      <ToastContainer />
    </div>
  );
}
