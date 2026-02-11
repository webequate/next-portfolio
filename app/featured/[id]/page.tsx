// app/featured/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import FeaturedClient from "./FeaturedClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const projects = projectsData.filter(
    (project: Project) => project.status?.featured
  );

  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p: Project) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: `Allen Johnson's project ${project.name}`,
    robots: "noindex, nofollow",
  };
}

export const revalidate = 60;

export default async function FeaturedPage({ params }: Props) {
  const { id } = await params;
  const projects = projectsData
    .filter((project: Project) => project.status?.featured)
    .sort(
      (a, b) => (a.status.featuredOrder ?? 0) - (b.status.featuredOrder ?? 0)
    );

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    notFound();
  }

  const { name, socialLinks } = basics;

  return (
    <FeaturedClient
      name={name}
      socialLinks={socialLinks}
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
