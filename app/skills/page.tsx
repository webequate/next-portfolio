// app/skills/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import featuredSkillsData from "@/data/featuredSkills.json";
import ratedSkillsData from "@/data/ratedSkills.json";
import Header from "@/components/Header";
import SkillsFeatured from "@/components/SkillsFeatured";
import SkillsRated from "@/components/SkillsRated";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Skills",
  description: "Allen Johnson's technical skills.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com/skills",
  },
};

export const revalidate = 60;

export default function SkillsPage() {
  const { name, socialLinks } = basics;

  return (
    <>
      <Header socialLink={socialLinks[0]} />

      <div className="text-base text-dark-2 dark:text-light-2">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-10 lg:mb-0">
            <SkillsFeatured featuredSkills={featuredSkillsData} />
          </div>

          <div className="w-full md:w-2/3 mb-10 lg:mb-0">
            <SkillsRated ratedSkills={ratedSkillsData} />
          </div>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
}
