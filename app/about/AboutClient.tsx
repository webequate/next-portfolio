"use client";

import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import AboutDetails from "@/components/AboutDetails";
import Footer from "@/components/Footer";

type AboutClientProps = {
  aboutIntro: string;
  aboutItems: string[];
  name: string;
  location: string;
  phone: string;
  website: string;
  socialLinks: SocialLink[];
};

export default function AboutClient({
  aboutIntro,
  aboutItems,
  name,
  location,
  phone,
  website,
  socialLinks,
}: AboutClientProps) {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row-reverse text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-2 lg:mb-0 md:ml-6">
            <AboutContent aboutIntro={aboutIntro} aboutItems={aboutItems} />
          </div>

          <div className="w-full lg:w-1/2 mb-2 lg:mb-0 md:mr-6">
            <AboutDetails
              name={name}
              location={location}
              phone={phone}
              website={website}
            />
          </div>
        </div>

        <Footer name={name} socialLinks={socialLinks} />
      </motion.div>
    </div>
  );
}
