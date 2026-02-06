"use client";

import { motion } from "framer-motion";
import { FeaturedSkill, RatedSkill } from "@/types/skills";
import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import SkillsFeatured from "@/components/SkillsFeatured";
import SkillsRated from "@/components/SkillsRated";
import Footer from "@/components/Footer";

type SkillsClientProps = {
  name: string;
  socialLinks: SocialLink[];
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
};

export default function SkillsClient({
  name,
  socialLinks,
  featuredSkills,
  ratedSkills,
}: SkillsClientProps) {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <div className="flex flex-col md:flex-row mx-auto">
          <div className="w-full md:w-1/3 mb-10 lg:mb-0 md:mr-6">
            <SkillsFeatured featuredSkills={featuredSkills} />
          </div>

          <div className="w-full md:w-2/3 mb-10 lg:mb-0 md:ml-6">
            <SkillsRated ratedSkills={ratedSkills} />
          </div>
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
