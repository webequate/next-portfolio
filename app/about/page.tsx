// app/about/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import AboutDetails from "@/components/AboutDetails";
import Footer from "@/components/Footer";

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
    <>
      <Header socialLink={socialLinks[0]} />

      <div>
        <div className="flex flex-col lg:flex-row-reverse text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
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
      </div>
    </>
  );
}
