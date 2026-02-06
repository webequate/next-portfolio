"use client";

// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { SocialLink } from "@/types/basics";
import HomeButton from "@/components/HomeButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  socialLink: SocialLink;
}

const Header: React.FC<HeaderProps> = ({ socialLink }) => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  // Determine if the link should be active based on the prefix in the path
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/featured"); // Home & featured
    }
    return pathname.startsWith(path); // Other prefixes
  };

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      <div className="container mx-auto px-0 pt-4 pb-8 md:pb-10">
        <div className="flex justify-center items-center">
          {/* Home link */}
          <div className="flex mr-auto">
            <HomeButton />
          </div>

          {/* Navigation links - Large screen */}
          <div className="hidden md:flex font-general-medium m-0 sm:p-0">
            <div className="nav-primary">
              <Link
                href="/"
                aria-label="Home"
                className={isActive("/") ? "active" : ""}
              >
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                aria-label="About"
                className={isActive("/about") ? "active" : ""}
              >
                <span>About</span>
              </Link>
              <Link
                href="/projects"
                aria-label="Projects"
                className={isActive("/projects") ? "active" : ""}
              >
                <span>Projects</span>
              </Link>
              <Link
                href="/resume"
                aria-label="Resume"
                className={isActive("/resume") ? "active" : ""}
              >
                <span>Resume</span>
              </Link>
              <Link
                href="/skills"
                aria-label="Skills"
                className={isActive("/skills") ? "active" : ""}
              >
                <span>Skills</span>
              </Link>
              <Link
                href="/contact"
                aria-label="Contact"
                className={isActive("/contact") ? "active" : ""}
              >
                <span>Contact</span>
              </Link>
            </div>
          </div>

          {/* Hamburger menu - Small screen */}
          <div className="flex md:hidden">
            <Hamburger showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>

          {/* Theme switcher */}
          <div className="flex ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Navigation links - Small screen */}
        <div className={showMenu ? "nav-mobile show" : "nav-mobile"}>
          <Link
            href="/"
            aria-label="Home"
            className={isActive("/") ? "active" : ""}
          >
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            aria-label="About"
            className={isActive("/about") ? "active" : ""}
          >
            <span>About</span>
          </Link>
          <Link
            href="/projects"
            aria-label="Projects"
            className={isActive("/projects") ? "active" : ""}
          >
            <span>Projects</span>
          </Link>
          <Link
            href="/resume"
            aria-label="Resume"
            className={isActive("/resume") ? "active" : ""}
          >
            <span>Resume</span>
          </Link>
          <Link
            href="/skills"
            aria-label="Skills"
            className={isActive("/skills") ? "active" : ""}
          >
            <span>Skills</span>
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className={isActive("/contact") ? "active" : ""}
          >
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
