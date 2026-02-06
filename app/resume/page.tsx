// app/resume/page.tsx
import { Metadata } from "next";
import basics from "@/data/basics.json";
import schoolsData from "@/data/schools.json";
import jobsData from "@/data/jobs.json";
import ResumeClient from "./ResumeClient";

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
    <ResumeClient
      name={name}
      titles={titles}
      socialLinks={socialLinks}
      schools={schools}
      jobs={jobs}
    />
  );
}
