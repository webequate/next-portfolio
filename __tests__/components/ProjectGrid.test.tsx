import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectGrid from "@/components/ProjectGrid";
import type { Project } from "@/types/project";

const makeProject = (id: string, name: string): Project => ({
  id,
  name,
  type: "Web App",
  company: "Acme",
  thumbImage: `images/${id}.jpg`,
  tags: "React",
  description: "A project.",
  mainImage: `images/${id}-main.jpg`,
});

const PROJECTS = [makeProject("proj-1", "Project One"), makeProject("proj-2", "Project Two")];

describe("ProjectGrid", () => {
  it("renders a link for each project", () => {
    render(<ProjectGrid projects={PROJECTS} path="projects" />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("constructs href as /{path}/{id} for each project", () => {
    render(<ProjectGrid projects={PROJECTS} path="projects" />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/projects/proj-1");
    expect(links[1]).toHaveAttribute("href", "/projects/proj-2");
  });

  it("uses the path prop in the href", () => {
    render(<ProjectGrid projects={PROJECTS} path="featured" />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/featured/proj-1");
  });

  it("renders an image for each project", () => {
    render(<ProjectGrid projects={PROJECTS} path="projects" />);
    expect(screen.getByAltText("Project One")).toBeInTheDocument();
    expect(screen.getByAltText("Project Two")).toBeInTheDocument();
  });

  it("renders nothing when projects is empty", () => {
    render(<ProjectGrid projects={[]} path="projects" />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
