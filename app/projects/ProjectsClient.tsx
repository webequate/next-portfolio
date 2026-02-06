"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface ProjectsClientProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

export default function ProjectsClient({
  name,
  socialLinks,
  projects,
}: ProjectsClientProps) {
  return (
    <div className="mx-auto">
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
}
