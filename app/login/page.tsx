"use client";
import React, { useState } from "react";
import { Button, InputComponent, toast } from "c4cui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(credentials);
    if (res.ok) {
      toast.success("Logged in successfully! Welcome back.");
      router.push("/");
    } else {
      toast.error(res.error || "Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 pt-24 p-4 items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <form className="w-full max-w-2xl flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Login</h1>
        <InputComponent
          name="username"
          type="email"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e })}
          placeholder="Email Address"
        />
        <InputComponent
          name="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e })}
          placeholder="Password"
        />
        <Button type="submit" label="Login" disabled={loading} className="p-4" />
      </form>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Don&apos;t have an account? Signup.
      </Link>
    </div>
  );
}
