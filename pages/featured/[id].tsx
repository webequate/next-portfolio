// pages/projects/[id].tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Image from "next/image";
import ProjectFooter from "@/components/ProjectFooter";
import Footer from "@/components/Footer";

interface ProjectProps {
  name: string;
  socialLinks: SocialLink[];
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const Project = ({
  name,
  socialLinks,
  project,
  prevProject,
  nextProject,
}: ProjectProps) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center mx-auto text-dark-1 dark:text-light-1">
          <ProjectHeader
            title={project.name}
            prevId={prevProject?.id}
            nextId={nextProject?.id}
            path="featured"
          />
          <Image
            src={`/${project.mainImage}`}
            alt={project.name}
            width={1080}
            height={600}
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-8"
          />
          <ProjectFooter
            description={project.description}
            tags={project.tags}
            path={project.screenshots?.path}
            mobile={project.screenshots?.mobile}
            tablet={project.screenshots?.tablet}
            laptop={project.screenshots?.laptop}
            desktop={project.screenshots?.desktop}
          />
        </div>
      </motion.div>

      <Footer name={name} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find({ "status.featured": true })
    .sort({ "status.featuredOrder": 1 })
    .toArray();

  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProjectProps> = async ({
  params,
}) => {
  if (!params) {
    return { notFound: true };
  }

  const client = await clientPromise;
  const db = client.db("Portfolio");

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find({ "status.featured": true })
    .sort({ "status.featuredOrder": 1 })
    .toArray();

  const projectIndex = projects.findIndex((p) => p.id === params.id);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      project: JSON.parse(JSON.stringify(project)),
      prevProject: prevProject ? JSON.parse(JSON.stringify(prevProject)) : null,
      nextProject: nextProject ? JSON.parse(JSON.stringify(nextProject)) : null,
    },
    revalidate: 60,
  };
};

export default Project;