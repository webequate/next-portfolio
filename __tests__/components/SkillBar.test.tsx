import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import SkillBar from "@/components/SkillBar";

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallback: IntersectionCallback | null = null;
let observedElement: Element | null = null;
let unobserveSpy = vi.fn();

function makeMockObserver(callback: IntersectionCallback) {
  capturedCallback = callback;
  unobserveSpy = vi.fn();
  return {
    observe(el: Element) {
      observedElement = el;
    },
    unobserve: unobserveSpy,
    disconnect() {},
  };
}

beforeEach(() => {
  capturedCallback = null;
  observedElement = null;
  unobserveSpy = vi.fn();

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: makeMockObserver,
  });
});

const makeEntry = (isIntersecting: boolean) =>
  ({ isIntersecting } as IntersectionObserverEntry);

describe("SkillBar", () => {
  it("renders the skill name and level", () => {
    render(<SkillBar name="TypeScript" level={4} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("4/5")).toBeInTheDocument();
  });

  it("starts with width 0 before entering viewport", () => {
    const { container } = render(<SkillBar name="TypeScript" level={4} />);
    const bar = container.querySelector(".transition-all");
    expect(bar).toHaveClass("w-0");
  });

  it("fills to level * 20% when the element becomes visible", () => {
    const { container } = render(<SkillBar name="TypeScript" level={4} />);
    const bar = container.querySelector(".transition-all") as HTMLElement;

    act(() => {
      capturedCallback!([makeEntry(true)]);
    });

    expect(bar.style.width).toBe("80%");
    expect(bar).not.toHaveClass("w-0");
  });

  it("computes width correctly for level 1", () => {
    const { container } = render(<SkillBar name="HTML" level={1} />);
    const bar = container.querySelector(".transition-all") as HTMLElement;

    act(() => {
      capturedCallback!([makeEntry(true)]);
    });

    expect(bar.style.width).toBe("20%");
  });

  it("computes width correctly for level 5", () => {
    const { container } = render(<SkillBar name="CSS" level={5} />);
    const bar = container.querySelector(".transition-all") as HTMLElement;

    act(() => {
      capturedCallback!([makeEntry(true)]);
    });

    expect(bar.style.width).toBe("100%");
  });

  it("does not fill when the entry is not intersecting", () => {
    const { container } = render(<SkillBar name="TypeScript" level={4} />);
    const bar = container.querySelector(".transition-all");

    act(() => {
      capturedCallback!([makeEntry(false)]);
    });

    expect(bar).toHaveClass("w-0");
  });

  it("observes the skill bar element on mount", () => {
    render(<SkillBar name="TypeScript" level={4} />);
    expect(observedElement).not.toBeNull();
  });

  it("unobserves the element on unmount", () => {
    const { unmount } = render(<SkillBar name="TypeScript" level={4} />);
    const observed = observedElement;
    unmount();
    expect(unobserveSpy).toHaveBeenCalledWith(observed);
  });
});
