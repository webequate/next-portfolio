// app/about/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "About Allen Johnson.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com/about",
  },
};

export const revalidate = 60;

export default function AboutPage() {
  const {
    aboutIntro,
    aboutItems,
    name,
    location,
    phone,
    website,
    socialLinks,
  } = basics;

  return (
    <AboutClient
      aboutIntro={aboutIntro}
      aboutItems={aboutItems}
      name={name}
      location={location}
      phone={phone}
      website={website}
      socialLinks={socialLinks}
    />
  );
}
