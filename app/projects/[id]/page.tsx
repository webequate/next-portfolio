// app/projects/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import ProjectClient from "./ProjectClient";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const projects = projectsData.filter(
    (project: Project) => project.status?.active
  );

  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projectsData.find((p: Project) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: `Allen Johnson's project ${project.name}`,
    robots: "index, follow",
    alternates: {
      canonical: `https://portfolio.webequate.com/projects/${project.id}`,
    },
  };
}

export const revalidate = 60;

export default function ProjectPage({ params }: Props) {
  const projects = projectsData
    .filter((project: Project) => project.status?.active)
    .sort((a, b) => (a.status.activeOrder ?? 0) - (b.status.activeOrder ?? 0));

  const projectIndex = projects.findIndex((p) => p.id === params.id);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    notFound();
  }

  const { name, socialLinks } = basics;

  return (
    <ProjectClient
      name={name}
      socialLinks={socialLinks}
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
