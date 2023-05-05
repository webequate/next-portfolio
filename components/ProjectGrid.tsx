// components/ProjectGrid.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import { useState, useRef } from "react";

interface ProjectGridProps {
  projects: Project[];
  setActiveModal: (index: number | null) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  setActiveModal,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-light-1 dark:text-light-1">
      {projects.map((project, index) => (
        <a
          key={index}
          onClick={() => setActiveModal(index)}
          className="group relative cursor-pointer"
        >
          <Image
            src={`/${project.thumb.imgurl}`}
            alt={project.thumb.name}
            width={600}
            height={600}
            className="rounded shadow-md transition ease-in-out transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-300 rounded shadow-md"></div>
          <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-300 p-4">
            <h2 className="text-xl mb-2">{project.name}</h2>
            <p>{project.thumb.type}</p>
            <p>@ {project.thumb.company}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition duration-300">
            <span className="text-4xl">+</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
