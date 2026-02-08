"use client";

import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

type ContactClientProps = {
  name: string;
  contactIntro: string;
  location: string;
  phone: string;
  website: string;
  resumeLink: string;
  socialLinks: SocialLink[];
};

export default function ContactClient({
  name,
  contactIntro,
  location,
  phone,
  website,
  resumeLink,
  socialLinks,
}: ContactClientProps) {
  return (
    <>
      <Header socialLink={socialLinks[0]} />

      <div>
        <div className="flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0\">
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pl-8">
            <ContactDetails
              name={name}
              contactIntro={contactIntro}
              location={location}
              phone={phone}
              website={website}
              resumeLink={resumeLink}
            />
          </div>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
}
