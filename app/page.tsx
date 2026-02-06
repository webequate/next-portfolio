// app/page.tsx
import { Metadata } from "next";
import { Project } from "@/types/project";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import DownloadCV from "@/components/DownloadCV";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: basics.name,
  description: "Allen Johnson's portfolio website.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com",
  },
};

export const revalidate = 60;

export default function HomePage() {
  const featuredProjects = projectsData
    .filter((project: Project) => project.status?.featured)
    .sort(
      (a, b) => (a.status.featuredOrder ?? 0) - (b.status.featuredOrder ?? 0)
    );

  const { name, titles, summaryItems, resumeLink, socialLinks } = basics;

  return (
    <>
      <Header socialLink={socialLinks[0]} />

      <div>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-8">
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
            <div className="lg:ml-10">
              <ThemedImage />
            </div>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-light-1 dark:border-dark-2 mb-8">
          <Heading text="Featured Projects" />
          <ProjectGrid projects={featuredProjects} path="featured" />
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
}
