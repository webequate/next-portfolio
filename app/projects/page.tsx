// app/projects/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Allen Johnson's projects.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com/projects",
  },
};

export const revalidate = 60;

export default function ProjectsPage() {
  const activeProjects = projectsData
    .filter((project: Project) => project.status?.active)
    .sort((a, b) => (a.status.activeOrder ?? 0) - (b.status.activeOrder ?? 0));

  const { name, socialLinks } = basics;

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="text-base text-dark-2 dark:text-light-2">
        <Heading text="Projects" />
        <ProjectGrid projects={activeProjects} path="projects" />
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
