"use client";
import React, { useState } from "react";
import { Button, InputComponent, toast, ToastContainer } from "c4cui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "./utils";

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(credentials);
    if (res.message) {
      toast.success(res.message);
      if (redirect) {
        router.push(redirect);
      } else router.push("/");
    } else {
      toast.error(res.error || "Invalid username or password.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-8 pt-24 p-4 items-center">
      <form className="w-full max-w-2xl flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Login</h1>
        <InputComponent
          name="email"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e })}
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
      <Link
        href={`/signup${redirect ? `?redirect=${redirect}` : ""}`}
        className="text-[var(--primary-color)] opacity-60 hover:underline"
      >
        Don&apos;t have an account? Signup.
      </Link>
      <ToastContainer />
    </div>
  );
}
