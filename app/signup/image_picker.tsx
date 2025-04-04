"use client";
import { Button, Cropper, useModal } from "c4cui";
import Image from "next/image";
import { useRef } from "react";
import { PiPen, PiPlus, PiUser } from "react-icons/pi";

export const ImagePicker = ({ image, setImage }: { image: string; setImage: (image: string) => void }) => {
  const { openModal, closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        openModal(
          <Cropper
            title="Edit Avatar"
            onImageEdit={() => fileInputRef.current?.click()}
            image={reader.result as string}
            setImage={setImage}
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

  return (
    <div className="flex size-24 rounded-full overflow-hidden text-center bg-[var(--primary-color)] text-[var(--text-color)] relative">
      {image ? (
        <Image src={image} alt="Preview" width={96} height={96} className="rounded-full" />
      ) : (
        <PiUser size={94} className="cursor-pointer" />
      )}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col w-full h-full gap-4 items-center justify-center p-4 absolute bg-black/40"
      >
        <Button
          outline
          onClick={() => fileInputRef.current?.click()}
          icon={!image ? <PiPlus size={18} /> : <PiPen size={18} />}
          className="cursor-pointer p-2 border-none"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
