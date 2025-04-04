"use client";
import React, { useEffect, useState } from "react";
import { Button, ModalProvider, toast, ToastContainer } from "c4cui";
import "react-quill-new/dist/quill.snow.css";
import ServiceForm from "./form";
import { createService } from "../utils";
import { useRouter } from "next/navigation";
import { Profile } from "@/app/profile/interface";
import { getMyProfile } from "@/app/profile/utils";

export default function CreateService() {
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [data, setData] = useState<{ name: string; description: string; story: string; poster?: string }>({
    name: "",
    description: "",
    story: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setFetchingProfile(true);
    const res = await getMyProfile();

    if (res.profile) {
      setProfile(res.profile);
    } else toast.error(res.error || "Couldn't fetch profile.");

    setFetchingProfile(false);
  };

  const handleSubmit = async () => {
    if (!data.name) {
      toast.error("Please enter service name.");
    } else if (!data.description && data.description.length < 100) {
      toast.error("Please enter description. Make sure its long enough.");
    } else if (!data.story && data.story.length < 500) {
      toast.error("Please enter story. Make sure its long enough.");
    } else {
      const res = await createService(data);

      if (res.service) {
        toast.success("Service added.");
        setData({ name: "", description: "", story: "", poster: undefined });
        router.replace(`/service/${res.service.slug}`);
      } else toast.error(res.error || "Something went wrong while adding service. Please try again.");
    }
  };

  return !profile ? (
    !fetchingProfile ? (
      <div className="flex flex-col w-full h-full gap-8 justify-center items-center">
        <p className="text-5xl">You must sign in to view this page.</p>
        <Button label="Login" onClick={() => router.push("/login")} />
      </div>
    ) : null
  ) : ["ADMIN"].includes(profile?.role || "") ? (
    <div className="flex flex-col w-full gap-8 justify-center items-center">
      <div className="flex flex-col gap-4 pt-36 p-4 w-full max-w-7xl bg-[var(--header-background-color)] text-[var(--header-text-color)]">
        <h2 className="text-4xl font-extralight">Add a service</h2>
      </div>
      <ModalProvider>
        <ServiceForm data={data} setData={setData} handleSubmit={handleSubmit} />
      </ModalProvider>
      <ToastContainer />
    </div>
  ) : (
    <div className="flex flex-col w-full h-full gap-8 justify-center items-center">
      <p className="text-5xl">Loading...</p>
    </div>
  );
}
