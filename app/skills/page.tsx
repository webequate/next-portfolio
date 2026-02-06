// app/skills/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import featuredSkillsData from "@/data/featuredSkills.json";
import ratedSkillsData from "@/data/ratedSkills.json";
import SkillsClient from "./SkillsClient";

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
    <SkillsClient
      name={name}
      socialLinks={socialLinks}
      featuredSkills={featuredSkillsData}
      ratedSkills={ratedSkillsData}
    />
  );
}
