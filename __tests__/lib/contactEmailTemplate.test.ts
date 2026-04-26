import { describe, it, expect } from "vitest";
import {
  generateContactEmailHTML,
  generateContactEmailText,
} from "@/lib/contactEmailTemplate";

const BASE = {
  name: "Alice",
  email: "alice@example.com",
  subject: "Hello",
  message: "This is a test message.",
};

describe("generateContactEmailHTML", () => {
  it("includes the sender name", () => {
    const html = generateContactEmailHTML(BASE);
    expect(html).toContain("Alice");
  });

  it("includes the sender email", () => {
    const html = generateContactEmailHTML(BASE);
    expect(html).toContain("alice@example.com");
  });

  it("includes the subject", () => {
    const html = generateContactEmailHTML(BASE);
    expect(html).toContain("Hello");
  });

  it("includes the message body", () => {
    const html = generateContactEmailHTML(BASE);
    expect(html).toContain("This is a test message.");
  });

  it("returns a string starting with <!DOCTYPE html>", () => {
    const html = generateContactEmailHTML(BASE);
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
  });

  // ── HTML escaping ─────────────────────────────────────────────────────────
  it("escapes & in name", () => {
    const html = generateContactEmailHTML({ ...BASE, name: "Alice & Bob" });
    expect(html).toContain("Alice &amp; Bob");
    expect(html).not.toContain("Alice & Bob");
  });

  it("escapes < and > in message", () => {
    const html = generateContactEmailHTML({
      ...BASE,
      message: "<script>alert('xss')</script>",
    });
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("escapes double quotes in subject", () => {
    const html = generateContactEmailHTML({ ...BASE, subject: 'Say "hi"' });
    expect(html).toContain("Say &quot;hi&quot;");
  });

  it("escapes single quotes in name", () => {
    const html = generateContactEmailHTML({ ...BASE, name: "O'Brien" });
    expect(html).toContain("O&#039;Brien");
  });
});

describe("generateContactEmailText", () => {
  it("includes the sender name", () => {
    const text = generateContactEmailText(BASE);
    expect(text).toContain("Alice");
  });

  it("includes the sender email", () => {
    const text = generateContactEmailText(BASE);
    expect(text).toContain("alice@example.com");
  });

  it("includes the subject", () => {
    const text = generateContactEmailText(BASE);
    expect(text).toContain("Hello");
  });

  it("includes the message body", () => {
    const text = generateContactEmailText(BASE);
    expect(text).toContain("This is a test message.");
  });

  it("references the portfolio website URL", () => {
    const text = generateContactEmailText(BASE);
    expect(text).toContain("portfolio.webequate.com");
  });

  it("does not escape HTML entities in plain text", () => {
    const text = generateContactEmailText({ ...BASE, name: "Alice & Bob" });
    expect(text).toContain("Alice & Bob");
    expect(text).not.toContain("&amp;");
  });
});
