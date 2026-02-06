// app/page.tsx
import { Metadata } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import DownloadCV from "@/components/DownloadCV";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: basics.name,
  description: "Allen Johnson's portfolio website.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com",
  },
};

export const revalidate = 60;

export default function HomePage() {
  const featuredProjects = projectsData
    .filter((project: Project) => project.status?.featured)
    .sort(
      (a, b) => (a.status.featuredOrder ?? 0) - (b.status.featuredOrder ?? 0)
    );

  const { name, titles, summaryItems, resumeLink, socialLinks } = basics;

  return (
    <HomeClient
      name={name}
      titles={titles}
      summaryItems={summaryItems}
      resumeLink={resumeLink}
      socialLinks={socialLinks}
      projects={featuredProjects}
    />
  );
}
