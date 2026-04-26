import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Social from "@/components/Social";

const SOCIAL_LINKS = [
  { name: "github", handle: "@test", url: "https://github.com/test" },
  { name: "linkedin", handle: "@test", url: "https://linkedin.com/test" },
  { name: "twitter", handle: "@test", url: "https://twitter.com/test" },
];

describe("Social", () => {
  it("renders a button for each social link", () => {
    render(<Social socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "github" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "linkedin" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "twitter" })).toBeInTheDocument();
  });

  it("renders nothing when socialLinks is empty", () => {
    const { container } = render(<Social socialLinks={[]} />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("passes the correct url to each social button", () => {
    render(<Social socialLinks={SOCIAL_LINKS} />);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      "https://github.com/test"
    );
    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute(
      "href",
      "https://linkedin.com/test"
    );
  });
});
