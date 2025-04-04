"use client";
import { Button, InputComponent, toast, ToastContainer } from "c4cui";
import { useEffect, useState } from "react";
import { fetchConfig } from "../../fetchConfig";

export const BookingForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [sending, setSending] = useState(false);
  const [formValues, setFormValues] = useState<any>();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setFormValues({
        booking_type: params.get("booking_type") || "",
        booking_type_description: params.get("booking_type_description") || "",
        service: params.get("service") || "",
        message: params.get("message") || "",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const res = await fetchConfig("/booking/create/", {
      method: "POST",
      body: JSON.stringify(formValues),
    });

    if (res.data) {
      setFormValues(undefined);
      toast.success(
        "Your message has been received! We will get to you as soon as possible. Sign in to track your bookings."
      );
    } else toast.error(res.error || "Error while creating booking, please try again.");
    setSending(false);
  };

  if (!isClient) return null;

  return (
    <form className="flex flex-col shrink-0 grow w-full gap-4 max-w-4xl relative" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center">
        <InputComponent
          name="first_name"
          value={formValues?.first_name || ""}
          onChange={(e) => setFormValues({ ...(formValues || {}), first_name: e })}
          minLength={4}
          placeholder="First Name"
          required
        />
        <InputComponent
          name="last_name"
          value={formValues?.last_name || ""}
          onChange={(e) => setFormValues({ ...(formValues || {}), last_name: e })}
          minLength={4}
          placeholder="Last Name"
          required
        />
      </div>
      <InputComponent
        name="organization"
        minLength={2}
        value={formValues?.organization || ""}
        onChange={(e) => setFormValues({ ...(formValues || {}), organization: e })}
        placeholder="Company / Organization"
      />
      <InputComponent
        name="phone"
        minLength={9}
        value={formValues?.phone_number || ""}
        onChange={(e) => setFormValues({ ...(formValues || {}), phone_number: e })}
        placeholder="Phone Number"
        type="number"
      />
      <InputComponent
        name="email"
        type="email"
        value={formValues?.email || ""}
        onChange={(e) => setFormValues({ ...(formValues || {}), email: e })}
        placeholder="Email Address"
        required
      />
      <InputComponent
        required
        minLength={10}
        type="textarea"
        name="message"
        value={formValues?.message || ""}
        onChange={(e) => setFormValues({ ...(formValues || {}), message: e })}
        placeholder="How can we assist you?"
        rows={5}
      />
      <Button
        type="submit"
        disabled={sending}
        label={
          sending
            ? "Sending..."
            : formValues.booking_type?.toLowerCase() === "inquiry"
            ? "Inquire"
            : "Book Consultation"
        }
        className="ml-auto"
      />
      <ToastContainer />
    </form>
  );
};
