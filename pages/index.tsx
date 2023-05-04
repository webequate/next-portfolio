// pages/index.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { Basics } from "@/types/basics";
import Header from "@/components/Header";
import DownloadCV from "@/components/DownloadCV";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Footer from "@/components/Footer";

type HomeProps = {
  basics: Basics[];
};

const Home: NextPage<HomeProps> = ({ basics }) => {
  const { name, titles, summaryItems, resumeLink, socialLinks } = basics[0];
  return (
    <div className="mx-auto">
      <Header name={name} socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <section className="flex flex-col items-top sm:justify-between sm:flex-row">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark-1 dark:text-light-1 mb-4 uppercase">
              {name}
            </h1>
            <div className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-gradient-dark dark:text-gradient-light">
              {titles.map((title, index) => (
                <h2 key={index}>{title}</h2>
              ))}
            </div>
            <div className="mb-6">
              {summaryItems.map((summaryItem, index) => (
                <p
                  key={index}
                  className="text-base text-dark-2 dark:text-light-2 mb-4"
                >
                  {summaryItem}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <Social socialLinks={socialLinks} />
            </div>
            <div className="mb-6">
              <DownloadCV resumelink={resumeLink} />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
            className="sm:ml-10"
          >
            <ThemedImage />
          </motion.div>
        </section>
      </motion.div>

      <Footer name={name} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      basics: JSON.parse(JSON.stringify(basics)),
    },
    revalidate: 60,
  };
};

export default Home;
