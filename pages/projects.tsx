// pages/projects.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface ProjectsPageProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({
  name,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Projects`}</title>
        <meta
          name="description"
          content="Allen Johnson's projects."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <Heading text="Projects" />
        <ProjectGrid projects={projects} path="projects" />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const activeProjects = projectsData
    .filter((project: Project) => project.status?.active)
    .sort((a, b) => (a.status.activeOrder ?? 0) - (b.status.activeOrder ?? 0));

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      projects: activeProjects,
    },
    revalidate: 60,
  };
};

export default ProjectsPage;
