// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { ContactForm as ContactFormData } from "@/interfaces/ContactForm";
import Heading from "@/components/Heading";
import FormInput from "@/components/FormInput";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isSuccess: boolean;
  } | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({
          text: "Email sent successfully!",
          isSuccess: true,
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        setStatusMessage({
          text: result.message || "Error sending email.",
          isSuccess: false,
        });
      }
    } catch {
      setStatusMessage({
        text: "Error sending email.",
        isSuccess: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="leading-loose">
      <form
        onSubmit={handleSubmit}
        className="bg-light-1 dark:bg-dark-1 rounded-xl text-left lg:mr-4 p-6 pb-2 sm:p-8"
      >
        <Heading text="Contact Form" />
        <FormInput
          inputLabel="Full Name"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputName="name"
          placeholderText="Your Name"
          ariaLabelName="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <FormInput
          inputLabel="Email"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputName="email"
          placeholderText="Your Email"
          ariaLabelName="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <FormInput
          inputLabel="Subject"
          labelFor="subject"
          inputType="text"
          inputId="subject"
          inputName="subject"
          placeholderText="Subject"
          ariaLabelName="Subject"
          onChange={handleChange}
          value={formData.subject}
        />

        {/* Honeypot field - hidden from users */}
        <div
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="website"
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg text-dark-2 dark:text-light-2 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full px-5 py-2 border text-dark-2 dark:text-light-2 bg-white dark:bg-black border-dark-2 dark:border-light-2 rounded-md shadow-sm text-md"
            id="message"
            name="message"
            cols={14}
            rows={6}
            aria-label="Message"
            onChange={handleChange}
            value={formData.message}
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            aria-label="Send Message"
            disabled={isLoading}
            className="text-light-1 dark:text-light-1 bg-accent-dark dark:bg-accent-dark hover:bg-accent-light dark:hover:bg-accent-light font-general-medium flex justify-center items-center w-40 sm:w-40 mb-6 sm:mb-0 text-lg py-2.5 sm:py-3 rounded-lg duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="text-sm sm:text-lg">
              {isLoading ? "Sending..." : "Send Message"}
            </span>
          </button>
          {statusMessage && (
            <p
              className={`mt-3 text-sm font-medium ${
                statusMessage.isSuccess
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {statusMessage.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
