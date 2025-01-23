"use client";
import { Button, toast } from "c4cui";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

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
    <form className="w-full max-w-2xl space-y-8 bg-transparent" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <input
          name="name"
          value={formValues.name}
          onChange={handleChange}
          minLength={4}
          placeholder="Full Name"
          className="w-full p-4 border rounded border-black/40"
          required
        />
        <input
          name="organization"
          minLength={2}
          value={formValues.organization}
          onChange={handleChange}
          placeholder="Company/Organization"
          className="w-full p-4 border border-black/40 rounded"
        />
        <input
          name="phone"
          minLength={9}
          value={formValues.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          type="number"
          className="w-full p-4 border border-black/40 rounded"
        />
        <input
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-4 border border-black/40 rounded"
          required
        />
        <textarea
          required
          minLength={10}
          name="message"
          value={formValues.message}
          onChange={handleChange}
          placeholder="How can we assist you?"
          className="w-full p-4 border border-black/40 rounded"
          rows={5}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <Button disabled={sending} label={sending ? "Sending..." : "Book Consultation"} />
      </div>
    </form>
  );
};
