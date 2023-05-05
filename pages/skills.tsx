// pages/skills.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { FeaturedSkill, RatedSkill } from "@/types/skills";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import SkillsFeatured from "@/components/SkillsFeatured";
import SkillsRated from "@/components/SkillsRated";
import Footer from "@/components/Footer";

type SkillsProps = {
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
  name: string;
  socialLinks: SocialLink[];
};

const Skills: NextPage<SkillsProps> = ({
  featuredSkills,
  ratedSkills,
  name,
  socialLinks,
}) => {
  return (
    <div className="mx-auto">
      <Header name={name} socialLink={socialLinks[0]} />

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

      <Footer name={name} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<SkillsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const featuredSkillsCollection =
    db.collection<FeaturedSkill>("featuredSkills");
  const featuredSkills: FeaturedSkill[] = await featuredSkillsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const ratedSkillsCollection = db.collection<RatedSkill>("ratedSkills");
  const ratedSkills: RatedSkill[] = await ratedSkillsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      featuredSkills: JSON.parse(JSON.stringify(featuredSkills)),
      ratedSkills: JSON.parse(JSON.stringify(ratedSkills)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks,
    },
    revalidate: 60,
  };
};

export default Skills;
