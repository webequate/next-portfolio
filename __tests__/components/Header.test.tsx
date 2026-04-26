import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

const SOCIAL_LINK = { name: "github", handle: "@test", url: "https://github.com/test" };

// The large-screen nav links live inside .nav-primary; HomeButton also has
// aria-label="Home" so we scope queries to the nav container to avoid ambiguity.
const getDesktopNav = (container: HTMLElement) =>
  container.querySelector(".nav-primary") as HTMLElement;

describe("Header", () => {
  // ── nav links ─────────────────────────────────────────────────────────────
  it("renders all navigation links in the desktop nav", () => {
    mockPathname = "/";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Resume" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Skills" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  // ── isActive: home route ──────────────────────────────────────────────────
  it("marks Home link active when pathname is /", () => {
    mockPathname = "/";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveClass("active");
  });

  it("marks Home link active when pathname starts with /featured", () => {
    mockPathname = "/featured/project-1";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveClass("active");
  });

  it("does not mark Home link active on /about", () => {
    mockPathname = "/about";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "Home" })).not.toHaveClass("active");
  });

  // ── isActive: other routes ────────────────────────────────────────────────
  it("marks About link active when pathname is /about", () => {
    mockPathname = "/about";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "About" })).toHaveClass("active");
  });

  it("marks Projects link active when pathname starts with /projects", () => {
    mockPathname = "/projects/my-project";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "Projects" })).toHaveClass("active");
  });

  it("does not mark About link active on /contact", () => {
    mockPathname = "/contact";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);
    const nav = getDesktopNav(container);
    expect(within(nav).getByRole("link", { name: "About" })).not.toHaveClass("active");
  });

  // ── hamburger ─────────────────────────────────────────────────────────────
  it("renders the hamburger menu button", () => {
    mockPathname = "/";
    render(<Header socialLink={SOCIAL_LINK} />);
    expect(
      screen.getByRole("button", { name: "Hamburger Menu" })
    ).toBeInTheDocument();
  });

  it("toggles the mobile menu visibility on hamburger click", async () => {
    const user = userEvent.setup();
    mockPathname = "/";
    const { container } = render(<Header socialLink={SOCIAL_LINK} />);

    const navMobile = container.querySelector(".nav-mobile");
    expect(navMobile).not.toHaveClass("show");

    await user.click(screen.getByRole("button", { name: "Hamburger Menu" }));
    expect(navMobile).toHaveClass("show");

    await user.click(screen.getByRole("button", { name: "Hamburger Menu" }));
    expect(navMobile).not.toHaveClass("show");
  });
});
