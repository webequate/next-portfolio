// pages/index.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import DownloadCV from "@/components/DownloadCV";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

type HomePageProps = {
  name: string;
  titles: string[];
  summaryItems: string[];
  resumeLink: string;
  socialLinks: SocialLink[];
  projects: Project[];
};

const HomePage: NextPage<HomePageProps> = ({
  name,
  titles,
  summaryItems,
  resumeLink,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-8 md:mr-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark-1 dark:text-light-1 mb-4 uppercase">
              {name}
            </h1>
            <div className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-gradient-dark dark:text-gradient-light">
              {titles.map((title, index) => (
                <h2 key={index}>
                  <span className="text-gradient-dark dark:text-gradient-light">
                    {title}
                  </span>
                </h2>
              ))}
            </div>
            <div className="mb-4">
              {summaryItems.map((summaryItem, index) => (
                <p
                  key={index}
                  className="text-base text-dark-2 dark:text-light-2 mb-4"
                >
                  {summaryItem}
                </p>
              ))}
            </div>
            <div className="flex justify-left mb-4">
              <Social socialLinks={socialLinks} />
            </div>
            <div>
              <DownloadCV resumelink={resumeLink} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: -180 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
              className="lg:ml-10"
            >
              <ThemedImage />
            </motion.div>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-light-1 dark:border-dark-2 mb-8">
          <Heading text="Featured Projects" />
          <ProjectGrid projects={projects} path="featured" />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find({ "status.featured": true })
    .sort({ "status.featuredOrder": 1 })
    .toArray();

  return {
    props: {
      name: basics.name,
      titles: basics.titles,
      summaryItems: basics.summaryItems,
      resumeLink: basics.resumeLink,
      socialLinks: basics.socialLinks,
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 60,
  };
};

export default HomePage;
