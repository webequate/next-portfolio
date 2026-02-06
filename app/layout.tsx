import "@/styles/globals.css";

import Layout from "@/components/Layout";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { ThemeProvider } from "next-themes";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Allen Johnson",
    template: "%s | Allen Johnson",
  },
  description:
    "Allen Johnson's portfolio. A place to showcase my experience as a front end software engineer and full stack web developer.",
  openGraph: {
    title: "Allen Johnson's Portfolio",
    description:
      "Allen Johnson's portfolio. A place to showcase my experience as a front end software engineer and full stack web developer.",
    images: [
      {
        url: "https://portfolio.webequate.com/images/portfolio-og.jpg",
      },
    ],
    url: "https://portfolio.webequate.com",
    type: "website",
  },
  icons: {
    icon: "/allen.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
        />
      </head>
      <body className="flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="mx-auto max-w-7xl sm:px-8 lg:px-16">
            <Layout>{children}</Layout>
            <UseScrollToTop />
          </div>
        </ThemeProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      </body>
    </html>
  );
}
