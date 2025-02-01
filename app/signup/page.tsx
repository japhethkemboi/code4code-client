/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button, InputComponent, toast, ToastContainer } from "c4cui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePicker } from "./profile_picker";

export default function Signup() {
  const [newUser, setNewUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.replace("/");
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
        <ImagePicker image={newUser.avatar} setImage={(e) => setNewUser({ ...newUser, avatar: e })} />
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
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
