// pages/skills.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { FeaturedSkill, RatedSkill } from "@/types/skills";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import featuredSkillsData from "@/data/featuredSkills.json";
import ratedSkillsData from "@/data/ratedSkills.json";
import Header from "@/components/Header";
import SkillsFeatured from "@/components/SkillsFeatured";
import SkillsRated from "@/components/SkillsRated";
import Footer from "@/components/Footer";

type SkillsPageProps = {
  name: string;
  socialLinks: SocialLink[];
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
};

const SkillsPage: NextPage<SkillsPageProps> = ({
  name,
  socialLinks,
  featuredSkills,
  ratedSkills,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Skills`}</title>
        <meta
          name="description"
          content="Allen Johnson's technical skills."
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
        <div className="text-base text-dark-2 dark:text-light-2">
          <div className="flex flex-col md:flex-row mx-auto">
            <div className="w-full md:w-1/3 mb-10 lg:mb-0 md:mr-6">
              <SkillsFeatured featuredSkills={featuredSkills} />
            </div>

            <div className="w-full md:w-2/3 mb-10 lg:mb-0 md:ml-6">
              <SkillsRated ratedSkills={ratedSkills} />
            </div>
          </div>
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<SkillsPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      ratedSkills: ratedSkillsData,
      featuredSkills: featuredSkillsData,
    },
    revalidate: 60,
  };
};

export default SkillsPage;
