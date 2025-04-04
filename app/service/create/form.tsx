"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button, Cropper, InputComponent, Modal, RichTextEditor, useModal } from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import { PiPen, PiPlus } from "react-icons/pi";

export default function ServiceForm({
  data,
  setData,
  handleSubmit,
}: {
  data: { name: string; description: string; story: string; poster?: string };
  setData: (data: { name: string; description: string; story: string; poster?: string }) => void;
  handleSubmit: () => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal, closeModal } = useModal();

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
            onImageEdit={() => fileInputRef.current?.click()}
            image={reader.result as string}
            setImage={(e) => setData({ ...data, poster: e })}
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

  if (!isClient) return null;

  return (
    <form className="flex flex-col h-full gap-4 p-4 w-full max-w-7xl">
      <InputComponent
        type="text"
        placeholder="Name"
        maxLength={250}
        value={data.name}
        onChange={(e) => setData({ ...data, name: e })}
      />
      <InputComponent
        type="textarea"
        placeholder="Description"
        rows={4}
        value={data.description}
        onChange={(e) => setData({ ...data, description: e })}
      />
      <InputComponent
        type="textarea"
        placeholder="Story"
        rows={10}
        value={data.story}
        onChange={(e) => setData({ ...data, story: e })}
      />
      <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
        {data.poster && <img src={data.poster} alt="Preview" width={130} height={130} className="rounded-xl" />}
        <div className="flex flex-col items-start justify-center w-auto gap-4">
          <span className="font-light opacity-70">{data.poster ? "Change" : "Select"} poster</span>
          {data.poster ? (
            <Button
              outline
              onClick={() => fileInputRef.current?.click()}
              icon={<PiPen size={24} />}
              className="cursor-pointer border-none"
            />
          ) : (
            <Button
              outline
              onClick={() => fileInputRef.current?.click()}
              icon={<PiPlus size={24} />}
              className="cursor-pointer border-none"
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
      <Button label="Add Service" onClick={handleSubmit} className="ml-auto" />
    </form>
  );
}
