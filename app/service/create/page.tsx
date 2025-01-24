"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button, Cropper, InputComponent, Modal, RichTextEditor, toast, ToastContainer, useModal } from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import { PiImage, PiPen, PiPlus } from "react-icons/pi";
import { useAuth } from "@/app/AuthProvider";
import { useService } from "@/app/ServiceContext";

export default function CreateService() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal, closeModal, isOpen, modalContent } = useModal();
  const { authFetch } = useAuth();
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
        poster: poster || "",
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
    <div className="flex flex-col h-full w-full gap-8 p-4 bg-white text-black">
      <h2 className="text-xl">Create a Blog Post</h2>
      <InputComponent type="text" placeholder="Name" maxLength={250} value={name} onChange={setName} />
      <RichTextEditor value={description} onChange={setDescription} />
      <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
        <div className="flex size-32 rounded-xl overflow-hidden text-center text-black/40">
          {poster ? (
            <img src={poster} alt="Preview" className="w-full h-full" />
          ) : (
            <PiImage size={128} className="cursor-pointer" />
          )}
        </div>
        <div className="flex flex-col w-auto gap-4 items-center justify-center p-4">
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
      <Modal isOpen={isOpen}>{modalContent}</Modal>
      <ToastContainer />
    </div>
  );
}
