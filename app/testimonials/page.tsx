// app/testimonials/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import testimonialsData from "@/data/testimonials.json";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials about Allen Johnson.",
  robots: "index, follow",
};

export const revalidate = 60;

export default function TestimonialsPage() {
  const { name, socialLinks } = basics;

  return (
    <TestimonialsClient
      name={name}
      socialLinks={socialLinks}
      testimonials={testimonialsData}
    />
  );
}
