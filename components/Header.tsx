// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import type { SocialLink } from "@/types/basics";
import HomeButton from "@/components/HomeButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  socialLink: SocialLink;
}

const Header: React.FC<HeaderProps> = ({ socialLink }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const route = router.pathname;

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
                className={route === "/" ? "active" : ""}
              >
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                aria-label="About"
                className={route === "/about" ? "active" : ""}
              >
                <span>About</span>
              </Link>
              <Link
                href="/projects"
                aria-label="Projects"
                className={route.startsWith("/projects") ? "active" : ""}
              >
                <span>Projects</span>
              </Link>
              <Link
                href="/resume"
                aria-label="Resume"
                className={route === "/resume" ? "active" : ""}
              >
                <span>Resume</span>
              </Link>
              <Link
                href="/skills"
                aria-label="Skills"
                className={route === "/skills" ? "active" : ""}
              >
                <span>Skills</span>
              </Link>
              <Link
                href="/contact"
                aria-label="Contact"
                className={route === "/contact" ? "active" : ""}
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
            className={route === "/" ? "active" : ""}
          >
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            aria-label="About"
            className={route === "/about" ? "active" : ""}
          >
            <span>About</span>
          </Link>
          <Link
            href="/projects"
            aria-label="Projects"
            className={route.startsWith("/projects") ? "active" : ""}
          >
            <span>Projects</span>
          </Link>
          <Link
            href="/resume"
            aria-label="Resume"
            className={route === "/resume" ? "active" : ""}
          >
            <span>Resume</span>
          </Link>
          <Link
            href="/skills"
            aria-label="Skills"
            className={route === "/skills" ? "active" : ""}
          >
            <span>Skills</span>
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className={route === "/contact" ? "active" : ""}
          >
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
