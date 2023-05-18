// pages/skills.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { FeaturedSkill, RatedSkill } from "@/types/skills";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
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
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
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
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const ratedSkillsCollection = db.collection<RatedSkill>("ratedSkills");
  const ratedSkills: RatedSkill[] = await ratedSkillsCollection
    .find()
    .toArray();

  const featuredSkillsCollection =
    db.collection<FeaturedSkill>("featuredSkills");
  const featuredSkills: FeaturedSkill[] = await featuredSkillsCollection
    .find()
    .toArray();

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      ratedSkills: JSON.parse(JSON.stringify(ratedSkills)),
      featuredSkills: JSON.parse(JSON.stringify(featuredSkills)),
    },
    revalidate: 60,
  };
};

export default SkillsPage;
