"use client";
import { Button, InputComponent, toast, ToastContainer } from "c4cui";
import { useState } from "react";

export const ConsultForm = () => {
  const [sending, setSending] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    organization: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setSending(true);
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormValues({
          name: "",
          organization: "",
          phone: "",
          email: "",
          message: "",
        });
        toast.success("Your message has been received! We will get to you as soon as possible.");
      } else {
        toast.error("Error while sending email, please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error while sending email, please try again.");
    }
    setSending(false);
  };

  return (
    <form className="flex flex-col shrink-0 grow w-full gap-4 max-w-4xl relative" onSubmit={handleSubmit}>
      <InputComponent
        name="name"
        value={formValues.name}
        onChange={(e) => setFormValues((prev) => ({ ...prev, name: e }))}
        minLength={4}
        placeholder="Full Name"
        required
      />
      <InputComponent
        name="organization"
        minLength={2}
        value={formValues.organization}
        onChange={(e) => setFormValues({ ...formValues, organization: e })}
        placeholder="Company/Organization"
      />
      <InputComponent
        name="phone"
        minLength={9}
        value={formValues.phone}
        onChange={(e) => setFormValues({ ...formValues, phone: e })}
        placeholder="Phone Number"
        type="number"
      />
      <InputComponent
        name="email"
        type="email"
        value={formValues.email}
        onChange={(e) => setFormValues({ ...formValues, email: e })}
        placeholder="Email Address"
        required
      />
      <InputComponent
        required
        minLength={10}
        type="textarea"
        name="message"
        value={formValues.message}
        onChange={(e) => setFormValues({ ...formValues, message: e })}
        placeholder="How can we assist you?"
        rows={5}
      />
      <Button
        type="submit"
        disabled={sending}
        label={sending ? "Sending..." : "Book Consultation"}
        className="ml-auto"
      />
      <ToastContainer />
    </form>
  );
};
