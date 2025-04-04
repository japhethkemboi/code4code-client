/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button, InputComponent, ModalProvider, toast, ToastContainer } from "c4cui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePicker } from "./image_picker";
import { fetchConfig } from "../fetchConfig";
import { login } from "../login/utils";

export default function Signup() {
  const [newUser, setNewUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirect(params.get("redirect"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const signupRes = await fetchConfig("/user/create/", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    if (signupRes.data) {
      toast.success("Signup successful. Logging you in...");

      const loginRes = await login({ email: newUser.email, password: newUser.password });

      if (loginRes.message) {
        toast.success(loginRes.message);
        if (redirect) {
          if (redirect.startsWith("http://") || redirect.startsWith("https://")) {
            window.location.href = redirect;
          } else router.replace(redirect);
        } else router.replace("/");
      } else toast.error(loginRes.error || "Failed to log in. Please try again.");
    } else toast.error(signupRes.error || "Error while creating your account.");

    setLoading(false);
  };

  return (
    <div className="pt-24 p-4 w-full flex flex-col gap-8 justify-center items-center">
      <form className="w-full max-w-2xl flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Sign up</h1>
        <ModalProvider>
          <ImagePicker image={newUser?.avatar} setImage={(e) => setNewUser({ ...newUser, avatar: e })} />
        </ModalProvider>
        <InputComponent
          name="first_name"
          type="name"
          value={newUser?.first_name || ""}
          onChange={(e) => setNewUser({ ...(newUser || {}), first_name: e })}
          placeholder="First Name"
        />
        <InputComponent
          name="last_name"
          type="name"
          value={newUser?.last_name || ""}
          onChange={(e) => setNewUser({ ...(newUser || {}), last_name: e })}
          placeholder="Last Name"
        />
        <InputComponent
          name="email"
          type="email"
          value={newUser?.email || ""}
          onChange={(e) => setNewUser({ ...(newUser || {}), email: e })}
          placeholder="Email Address"
        />
        <InputComponent
          name="password"
          type="password"
          minLength={8}
          value={newUser?.password || ""}
          onChange={(e) => setNewUser({ ...(newUser || {}), password: e })}
          placeholder="Password"
          generatePassword={true}
        />
        <Button type="submit" label="Sign up" className="p-4" disabled={loading} />
      </form>
      <Link
        href={`/login${redirect ? `?redirect=${redirect}` : ""}`}
        className="text-[var(--primary-color)] opacity-60 hover:underline"
      >
        Already have an account? Login.
      </Link>
      <ToastContainer />
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
