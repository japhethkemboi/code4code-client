/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Cropper, InputComponent, Modal, toast, ToastContainer, useModal } from "c4cui";
import { PiPen, PiPlus, PiUser } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [newUser, setNewUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal, closeModal, isOpen, modalContent } = useModal();
  const router = useRouter();

  useEffect(() => setIsClient(true));

  if (!isClient) return null;

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
            setImage={(e) => setNewUser({ ...newUser, avatar: e })}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const signupRes = await fetch("/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (signupRes.ok) {
      toast.success("Signup successful. Logging you in...");

      const loginRes = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUser.username, password: newUser.password }),
      });

      if (loginRes.ok) {
        toast.success("Logged in successfully! Welcome back.");
        router.push("/");
      } else {
        const errorData = await loginRes.json();
        toast.error(errorData.error || "Failed to log in. Please try again.");
      }
    } else {
      const errorData = await signupRes.json();
      toast.error(errorData.error || "Error while creating your account.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-24 p-4 w-full flex flex-col gap-8 justify-center items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <form className="w-full max-w-2xl flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Sign up</h1>
        <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
          <div className="flex size-24 rounded-full overflow-hidden text-center bg-[var(--primary-color)] text-[var(--text-color)] relative">
            {newUser?.avatar ? (
              <Image src={newUser.avatar} alt="Preview" width={96} height={96} className="rounded-full" />
            ) : (
              <PiUser size={94} className="cursor-pointer" />
            )}
          </div>
          <div className="flex flex-col w-auto gap-4 items-center justify-center p-4">
            <span>{newUser?.avatar ? "Change" : "Select"} profile picture</span>
            {newUser?.avatar ? (
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
        </div>
        <InputComponent
          name="first_name"
          type="name"
          value={newUser?.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e })}
          placeholder="First Name"
        />
        <InputComponent
          name="last_name"
          type="name"
          value={newUser?.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e })}
          placeholder="Last Name"
        />
        <InputComponent
          name="username"
          type="email"
          value={newUser?.username}
          onChange={(e) => setNewUser({ ...newUser, username: e })}
          placeholder="Email Address"
        />
        <InputComponent
          name="password"
          type="password"
          minLength={8}
          value={newUser?.password}
          onChange={(e) => setNewUser({ ...newUser, password: e })}
          placeholder="Password"
          generatePassword={true}
        />
        <Button type="submit" label="Sign up" className="p-4" disabled={loading} />
      </form>
      <Link href="/login" className="text-[var(--primary-color)] opacity-60 hover:underline">
        Already have an account? Login.
      </Link>
      <ToastContainer />
      <Modal isOpen={isOpen}>{modalContent}</Modal>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
