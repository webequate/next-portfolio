// pages/projects/[id].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Image from "next/image";
import ProjectFooter from "@/components/ProjectFooter";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextProject) return;
      if (isMobile) {
        router.push(`/projects/${nextProject.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevProject) return;
      if (isMobile) {
        router.push(`/projects/${prevProject.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | ${project.name}`}</title>
        <meta
          name="description"
          content={`Allen Johnson's project ${project.name}`}
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

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
            path="projects"
          />
          <Image
            {...handlers}
            src={`/${project.mainImage}`}
            alt={project.name}
            width={1022}
            height={662}
            priority
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-4"
          />
          <ProjectFooter
            description={project.description}
            tags={project.tags}
            details={project.details}
            link={project.link}
            path={project.screenshots?.path}
            mobile={project.screenshots?.mobile}
            tablet={project.screenshots?.tablet}
            laptop={project.screenshots?.laptop}
            desktop={project.screenshots?.desktop}
          />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = projectsData.filter(
    (project: Project) => project.status?.active
  );

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

  const projects = projectsData
    .filter((project: Project) => project.status?.active)
    .sort((a, b) => (a.status.activeOrder ?? 0) - (b.status.activeOrder ?? 0));

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
      project,
      prevProject,
      nextProject,
    },
    revalidate: 60,
  };
};

export default Project;
