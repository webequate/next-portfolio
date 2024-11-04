// types/experience.ts
export type School = {
  school: string;
  program: string;
  city: string;
  endDate: string;
  order: number;
};

export type Job = {
  company: string;
  role: string;
  city: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  order: number;
};
