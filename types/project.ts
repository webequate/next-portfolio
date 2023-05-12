// types/project.ts
export type Screenshots = {
  path?: string;
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
};

export type Project = {
  _id: string;
  id: string;
  name: string;
  type: string;
  company: string;
  thumbImage: string;
  tags: string;
  description: string;
  mainImage: string;
  details?: string;
  link?: string;
  screenshots?: Screenshots;
  featured?: boolean;
  order: number;
};
