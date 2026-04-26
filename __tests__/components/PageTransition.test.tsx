import { describe, it, expect, vi, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import PageTransition from "@/components/PageTransition";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

afterEach(() => {
  vi.useRealTimers();
});

describe("PageTransition", () => {
  it("renders children on initial mount without fade-out", () => {
    mockPathname = "/";
    const { container } = render(
      <PageTransition>
        <div>Home Page</div>
      </PageTransition>
    );
    expect(container.querySelector(".page-transition")).not.toHaveClass("fade-out");
  });

  it("renders the children passed to it", () => {
    mockPathname = "/";
    const { getByText } = render(
      <PageTransition>
        <div>Hello World</div>
      </PageTransition>
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("adds fade-out class on route change before timer fires", () => {
    vi.useFakeTimers();
    mockPathname = "/";
    const { container, rerender } = render(
      <PageTransition>
        <div>Home</div>
      </PageTransition>
    );

    mockPathname = "/about";
    rerender(
      <PageTransition>
        <div>About</div>
      </PageTransition>
    );

    expect(container.querySelector(".page-transition")).toHaveClass("fade-out");
  });

  it("removes fade-out class after 200ms timer fires", () => {
    vi.useFakeTimers();
    mockPathname = "/";
    const { container, rerender } = render(
      <PageTransition>
        <div>Home</div>
      </PageTransition>
    );

    mockPathname = "/about";
    rerender(
      <PageTransition>
        <div>About</div>
      </PageTransition>
    );

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(container.querySelector(".page-transition")).not.toHaveClass("fade-out");
  });

  it("does not add fade-out when the same route is re-rendered", () => {
    vi.useFakeTimers();
    mockPathname = "/";
    const { container, rerender } = render(
      <PageTransition>
        <div>Home</div>
      </PageTransition>
    );

    rerender(
      <PageTransition>
        <div>Home</div>
      </PageTransition>
    );

    expect(container.querySelector(".page-transition")).not.toHaveClass("fade-out");
  });
});
