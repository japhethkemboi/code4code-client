"use client";
import { Button, Cropper, Modal, ModalProvider, useModal } from "c4cui";
import Image from "next/image";
import { useRef } from "react";
import { PiPen, PiPlus, PiUser } from "react-icons/pi";

const ImagePickerComponent = ({ image, setImage }: { image: string; setImage: (image: string) => void }) => {
  const { openModal, closeModal, isOpen, modalContent } = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        openModal(
          <Cropper
            title="Edit Avatar"
            handleImageChange={handleImageChange}
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
    <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
      <div className="flex size-24 rounded-full overflow-hidden text-center bg-[var(--primary-color)] text-[var(--text-color)] relative">
        {image ? (
          <Image src={image} alt="Preview" width={96} height={96} className="rounded-full" />
        ) : (
          <PiUser size={94} className="cursor-pointer" />
        )}
      </div>
      <div className="flex flex-col w-auto gap-4 items-center justify-center p-4">
        <span>{image ? "Change" : "Select"} profile picture</span>
        {image ? (
          <Button
            onClick={() => fileInputRef.current?.click()}
            outline={true}
            icon={<PiPen size={18} />}
            className="cursor-pointer p-2 border-none"
          />
        ) : (
          <Button
            onClick={() => fileInputRef.current?.click()}
            outline={true}
            icon={<PiPlus size={18} />}
            className="cursor-pointer p-2 border-none"
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
      <Modal isOpen={isOpen}>{modalContent}</Modal>
    </div>
  );
};

export const ImagePicker = ({ image, setImage }: { image: string; setImage: (image: string) => void }) => {
  return (
    <ModalProvider>
      <ImagePickerComponent image={image} setImage={setImage} />
    </ModalProvider>
  );
};
