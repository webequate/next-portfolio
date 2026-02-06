// app/resume/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import schoolsData from "@/data/schools.json";
import jobsData from "@/data/jobs.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Resume",
  description: "Allen Johnson's professional experience.",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio.webequate.com/resume",
  },
};

export const revalidate = 60;

export default function ResumePage() {
  const schools = schoolsData.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
  const jobs = jobsData.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

  const { name, titles, socialLinks } = basics;

  return (
    <>
      <Header socialLink={socialLinks[0]} />

      <div>
        <div className="lg:flex lg:flex-row mt-4 mb-10">
          <div className="w-full lg:w-1/3"></div>
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl lg:text-5xl font-bold uppercase mb-4">
              {name}
            </h1>
            <div className="mb-4">
              {titles.map((title, index) => (
                <h2 key={index} className="text-2xl md:text-3xl font-bold">
                  <span className="text-gradient-dark dark:text-gradient-light">
                    {title}
                  </span>
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:flex lg:flex-row align-top">
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl text-align-top font-bold uppercase decoration-dark-1 dark:decoration-light-1 pr-8 pb-8 lg:pb-0">
              Education
            </h3>
          </div>
          <div className="w-full lg:w-2/3">
            {schools.map((school, index) => (
              <div
                key={index}
                className="text-base text-dark-2 dark:text-light-2 mb-5"
              >
                <h2 className="text-2xl font-bold text-dark-1 dark:text-light-1 mb-1">
                  {school.school}
                </h2>
                <p className="text-gradient-dark dark:text-gradient-light text-xl font-bold mb-1">
                  <span className="text-gradient-dark dark:text-gradient-light">
                    {school.program}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold">{school.city} • </span>
                  <span className="font-semibold italic">{school.endDate}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:flex lg:flex-row my-12 align-top">
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl text-align-top font-bold uppercase decoration-dark-1 dark:decoration-light-1 pr-8 pb-8 lg:pb-0">
              Work Experience
            </h3>
          </div>
          <div className="w-full lg:w-2/3">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="text-base text-dark-2 dark:text-light-2 mb-10"
              >
                <h2 className="text-2xl font-bold text-dark-1 dark:text-light-1 mb-1">
                  {job.company}
                </h2>
                <p className="text-gradient-dark dark:text-gradient-light text-xl font-bold mb-1">
                  <span className="text-gradient-dark dark:text-gradient-light">
                    {job.role}
                  </span>
                </p>
                <p className="mb-3">
                  <span className="font-semibold">{job.city} • </span>
                  <span className="font-semibold italic">
                    {job.startDate} - {job.endDate}
                  </span>
                </p>
                <ul className="list-disc list-outside ml-5 lg:ml-0">
                  {job.achievements.map((achievement, index) => (
                    <li key={index} className="mb-2">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
}
