// app/contact/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Allen Johnson.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com/contact",
  },
};

export const revalidate = 60;

export default function ContactPage() {
  const {
    name,
    contactIntro,
    location,
    phone,
    website,
    resumeLink,
    socialLinks,
  } = basics;

  return (
    <ContactClient
      name={name}
      contactIntro={contactIntro}
      location={location}
      phone={phone}
      website={website}
      resumeLink={resumeLink}
      socialLinks={socialLinks}
    />
  );
}
