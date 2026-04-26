import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

const SOCIAL_LINKS = [
  { name: "github", handle: "@test", url: "https://github.com/test" },
  { name: "linkedin", handle: "@test", url: "https://linkedin.com/test" },
];

describe("Footer", () => {
  // ── nav links ─────────────────────────────────────────────────────────────
  it("renders all navigation links", () => {
    mockPathname = "/";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  // ── isActive ──────────────────────────────────────────────────────────────
  it("marks Home link active when pathname is /", () => {
    mockPathname = "/";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("active");
  });

  it("marks Home link active when pathname starts with /featured", () => {
    mockPathname = "/featured/project-1";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("active");
  });

  it("marks About link active on /about", () => {
    mockPathname = "/about";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "About" })).toHaveClass("active");
  });

  it("does not mark About link active on /contact", () => {
    mockPathname = "/contact";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "About" })).not.toHaveClass("active");
  });

  // ── social links ──────────────────────────────────────────────────────────
  it("renders a social button for each social link", () => {
    mockPathname = "/";
    render(<Footer name="Allen Johnson" socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "github" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "linkedin" })).toBeInTheDocument();
  });

  it("renders no social buttons when socialLinks is empty", () => {
    mockPathname = "/";
    render(<Footer name="Allen Johnson" socialLinks={[]} />);
    expect(screen.queryByRole("link", { name: "github" })).not.toBeInTheDocument();
  });
});
