// app/testimonials/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import testimonialsData from "@/data/testimonials.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials about Allen Johnson.",
  robots: "index, follow",
};

export const revalidate = 60;

export default function TestimonialsPage() {
  const { name, socialLinks } = basics;

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="text-base text-dark-2 dark:text-light-2">
        <h1 className="text-3xl lg:text-5xl font-bold uppercase mb-4">
          <span className="text-gradient-dark dark:text-gradient-light">
            Testimonials
          </span>
        </h1>
        <ul>
          {testimonialsData.map((testimonial, index) => (
            <li key={index}>
              <p className="mt-4 mb-4">{testimonial.description}</p>
              <p className="mt-4 mb-4">{testimonial.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
