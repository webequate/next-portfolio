// types/project.ts
export type Thumb = {
  name: string;
  type: string;
  company: string;
  imgurl: string;
}

export type Modal = {
  name: string;
  tags: string;
  description: string;
  imgurl: string;
  details: string;
}

export type Project = {
  _id: string;
  id: string;
  name: string;
  thumb: Thumb;
  modal: Modal;
}