"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button, Cropper, InputComponent, Modal, RichTextEditor, toast, ToastContainer, useModal } from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import { PiPen, PiPlus } from "react-icons/pi";
import { useService } from "@/app/ServiceContext";

export default function CreateService() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal, closeModal, isOpen, modalContent } = useModal();
  const { createService } = useService();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        openModal(
          <Cropper
            title="Edit Poster"
            handleImageChange={handleImageChange}
            image={reader.result as string}
            setImage={setPoster}
            handleClose={() => {
              closeModal();
            }}
          />
        );
      };
      reader.readAsDataURL(file);

      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name) {
      toast.error("Please enter service name.");
    } else if (!description) {
      toast.error("Please enter description.");
    } else {
      const res = await createService({
        name,
        poster: poster || undefined,
        description,
      });

      if (res.service) {
        toast.success("Service added.");
        setPoster(null);
        setDescription("");
        setName("");
      } else {
        toast.error(res.error || "Something went wrong while adding service. Please try again.");
      }
    }
    setLoading(false);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full gap-8 justify-center items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col gap-4 pt-36 p-4 w-full max-w-7xl bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h2 className="text-xl">Add a service</h2>
      </div>
      <div className="flex flex-col gap-4 p-4 w-full max-w-7xl">
        <InputComponent type="text" placeholder="Name" maxLength={250} value={name} onChange={setName} />
        <RichTextEditor value={description} onChange={setDescription} />
        <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
          {poster && <img src={poster} alt="Preview" width={130} height={130} className="rounded-xl" />}
          <div className="flex flex-col w-auto gap-4">
            <span>{poster ? "Change" : "Select"} poster</span>
            {poster ? (
              <Button
                onClick={() => fileInputRef.current?.click()}
                outline={true}
                icon={<PiPen size={24} />}
                className="cursor-pointer p-4 border-none"
              />
            ) : (
              <Button
                onClick={() => fileInputRef.current?.click()}
                outline={true}
                icon={<PiPlus size={24} />}
                className="cursor-pointer p-4 border-none"
              />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            style={{ display: "none" }}
          />
        </div>
        <Button label="Add Service" onClick={handleSubmit} disabled={loading} className="ml-auto" />
      </div>
      <Modal isOpen={isOpen}>{modalContent}</Modal>
      <ToastContainer />
    </div>
  );
}
