// app/projects/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import ProjectsClient from "./ProjectsClient";

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
    <ProjectsClient
      name={name}
      socialLinks={socialLinks}
      projects={activeProjects}
    />
  );
}
