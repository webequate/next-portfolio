// components/ProjectModals.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import ScreenshotLink from "@/components/ScreenshotLink";
import { useRef } from "react";

interface ProjectModalsProps {
  projects: Project[];
  activeModal: number | null;
  setActiveModal: (index: number | null) => void;
}

const ProjectModals: React.FC<ProjectModalsProps> = ({
  projects,
  activeModal,
  setActiveModal,
}) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {projects.map((project, index) => (
        <div
          key={index}
          id={`modal-${project.id}`}
          className={`modal ${activeModal === index ? "modal-open" : ""}`}
          onClick={() => setActiveModal(null)}
        >
          <div
            ref={modalContentRef}
            className="modal-content text-dark-2 dark:text-light-2 bg-light-1 dark:bg-dark-1 p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/${project.modal.imgurl}`}
              alt={project.modal.name}
              width={1050}
              height={700}
              className="w-full mb-4"
            />
            <h2 className="text-2xl font-bold text-dark-1 dark:text-light-1 mb-2 md:mb-4">
              {project.modal.name}
            </h2>
            <p className="mb-4 md:mb-6">{project.modal.description}</p>
            <p className="mb-4 md:mb-6">Tags: {project.modal.tags}</p>
            {project.modal.path && (
              <div className="flex flex-row mb-4 md:mb-6">
                <div className="hidden md:flex md:mr-6">Screenshots: </div>
                {project.modal.mobile && (
                  <ScreenshotLink
                    name="Mobile"
                    path={project.modal.path}
                    url={project.modal.mobile}
                  />
                )}
                {project.modal.tablet && (
                  <ScreenshotLink
                    name="Tablet"
                    path={project.modal.path}
                    url={project.modal.tablet}
                  />
                )}
                {project.modal.laptop && (
                  <ScreenshotLink
                    name="Laptop"
                    path={project.modal.path}
                    url={project.modal.laptop}
                  />
                )}
                {project.modal.desktop && (
                  <ScreenshotLink
                    name="Desktop"
                    path={project.modal.path}
                    url={project.modal.desktop}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectModals;
