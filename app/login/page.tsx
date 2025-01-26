"use client";
import React, { useState } from "react";
import { Button, InputComponent, toast, ToastContainer } from "c4cui";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      toast.success("Logged in successfully! Welcome back.");
      router.push("/");
    } else {
      const errorData = await res.json();
      toast.error(errorData.error || "Invalid username or password.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-8 pt-24 p-4 items-center">
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
      <ToastContainer />
    </div>
  );
}
