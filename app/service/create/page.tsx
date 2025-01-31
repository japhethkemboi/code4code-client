"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Cropper,
  InputComponent,
  Modal,
  ModalProvider,
  RichTextEditor,
  toast,
  ToastContainer,
  useModal,
} from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import { createService } from "@/app/utils";
import ServiceForm from "./form";

export default function CreateService() {
  const [data, setData] = useState<{ name: string; description: string; story: string; poster?: string }>({
    name: "",
    description: "",
    story: "",
  });

  const handleSubmit = async () => {
    if (!data.name) {
      toast.error("Please enter service name.");
    } else if (!data.description && data.description.length < 100) {
      toast.error("Please enter description. Make sure its long enough.");
    } else if (!data.story && data.story.length < 500) {
      toast.error("Please enter story. Make sure its long enough.");
    } else {
      const res = await createService(data);

      if (res.service) {
        toast.success("Service added.");
        setData({ name: "", description: "", story: "", poster: undefined });
      } else {
        toast.error(res.error || "Something went wrong while adding service. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 justify-center items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col gap-4 pt-36 p-4 w-full max-w-7xl bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h2 className="text-xl">Add a service</h2>
      </div>
      <ModalProvider>
        <ServiceForm data={data} setData={setData} handleSubmit={handleSubmit} />
      </ModalProvider>
      <ToastContainer />
    </div>
  );
}
