"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/types/testimonial";
import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type TestimonialsClientProps = {
  name: string;
  socialLinks: SocialLink[];
  testimonials: Testimonial[];
};

export default function TestimonialsClient({
  name,
  socialLinks,
  testimonials,
}: TestimonialsClientProps) {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <h1 className="text-xl font-bold uppercase text-dark-1 dark:text-light-1 sm:text-3xl mb-6">
          Testimonials
        </h1>

        <ul>
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <p className="mt-4 mb-4">{testimonial.description}</p>
              <p className="mt-4 mb-4">{testimonial.name}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
