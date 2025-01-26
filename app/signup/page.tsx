"use client";
import { useAuth } from "../AuthProvider";
import { useRef, useState } from "react";
import { Button, Cropper, InputComponent, Modal, toast, ToastContainer, useModal } from "c4cui";
import { PiPen, PiPlus, PiUser } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const { signup, login } = useAuth();
  const [newUser, setNewUser] = useState({ first_name: "", last_name: "", username: "", password: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal, closeModal, isOpen, modalContent } = useModal();
  const router = useRouter();

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

    const res = await signup(newUser);
    if (res.profile) {
      toast.success("Signup successful. Logging you in...");
      const loginres = await login({ username: newUser.username, password: newUser.password });
      if (loginres.ok) {
        toast.success("Logged in successfully. Welcome.");
      } else {
        toast.success("Failed to log you in, Please log in.");
        router.push("/login");
      }
      router.push("/");
    } else {
      toast.error(res.error || "Error while creating your account.");
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 p-4 w-full flex flex-col gap-8 justify-center items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <form className="w-full max-w-2xl flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Sign up</h1>
        <div onClick={() => fileInputRef.current?.click()} className="flex w-auto mr-auto gap-4 shrink-0">
          <div className="flex size-24 rounded-full overflow-hidden text-center bg-[var(--primary-color)] text-[var(--text-color)] relative">
            {newUser.avatar ? (
              <Image src={newUser.avatar} alt="Preview" width={18} height={18} />
            ) : (
              <PiUser size={94} className="cursor-pointer" />
            )}
          </div>
          <div className="flex flex-col w-auto gap-4 items-center justify-center p-4">
            <span>{newUser.avatar ? "Change" : "Select"} profile picture</span>
            {newUser.avatar ? (
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
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e })}
          placeholder="First Name"
        />
        <InputComponent
          name="last_name"
          type="name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e })}
          placeholder="Last Name"
        />
        <InputComponent
          name="username"
          type="email"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e })}
          placeholder="Email Address"
        />
        <InputComponent
          name="password"
          type="password"
          minLength={8}
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e })}
          placeholder="Password"
          generatePassword={true}
        />
        <Button type="submit" label="Sign up" className="p-4" disabled={loading} />
      </form>
      <Link href="/login" className="text-blue-500 hover:underline">
        Already have an account? Login.
      </Link>
      <ToastContainer />
      <Modal isOpen={isOpen}>{modalContent}</Modal>
    </div>
  );
}
