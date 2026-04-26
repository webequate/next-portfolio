import { describe, it, expect, vi } from "vitest";

const { mockSendMail } = vi.hoisted(() => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: "test-id" });
  return { mockSendMail };
});

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockSendMail,
    })),
  },
}));

import { sendEmail } from "@/lib/sendEmail";

const BASE = {
  to: "recipient@example.com",
  subject: "Test Subject",
  text: "Plain text body",
};

describe("sendEmail", () => {
  it("calls sendMail with the correct to address", async () => {
    await sendEmail(BASE);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: "recipient@example.com" })
    );
  });

  it("calls sendMail with the correct subject", async () => {
    await sendEmail(BASE);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "Test Subject" })
    );
  });

  it("calls sendMail with the correct plain text", async () => {
    await sendEmail(BASE);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ text: "Plain text body" })
    );
  });

  it("uses the default from address when from is not supplied", async () => {
    await sendEmail(BASE);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ from: "WebEquate <webequate@gmail.com>" })
    );
  });

  it("uses a custom from address when supplied", async () => {
    await sendEmail({ ...BASE, from: "custom@example.com" });
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ from: "custom@example.com" })
    );
  });

  it("includes html when supplied", async () => {
    await sendEmail({ ...BASE, html: "<p>Hello</p>" });
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ html: "<p>Hello</p>" })
    );
  });

  it("includes cc when supplied", async () => {
    await sendEmail({ ...BASE, cc: "cc@example.com" });
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ cc: "cc@example.com" })
    );
  });

  it("returns the result from sendMail", async () => {
    const result = await sendEmail(BASE);
    expect(result).toEqual({ messageId: "test-id" });
  });
});
