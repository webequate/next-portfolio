// pages/testimonials.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Testimonial } from "@/types/testimonial";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type TestimonialsPageProps = {
  name: string;
  socialLinks: SocialLink[];
  testimonials: Testimonial[];
};

const TestimonialsPage: NextPage<TestimonialsPageProps> = ({
  name,
  socialLinks,
  testimonials,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Testimonials`}</title>
        <meta
          name="description"
          content="Testimonials about Allen Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        <h1 className="text-xl font-bold uppercase text-dark-1 dark:text-light-1 sm:text-3xl mb-6">
          Testimonials
        </h1>

        <ul>
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <p className="mt-4 mb-4">{testimonial.description}</p>
              <p className="mt-4 mb-4">{testimonial.name}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  TestimonialsPageProps
> = async () => {
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const testimonialsCollection = db.collection<Testimonial>("testimonials");
  const testimonials: Testimonial[] = await testimonialsCollection
    .find()
    .toArray();

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      testimonials: JSON.parse(JSON.stringify(testimonials)),
    },
    revalidate: 60,
  };
};

export default TestimonialsPage;
