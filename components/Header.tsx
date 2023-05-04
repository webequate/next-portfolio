// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import type { SocialLink } from "@/types/basics";
import HomeButton from "@/components/HomeButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  name: string;
  socialLink: SocialLink;
}

const Header: React.FC<HeaderProps> = ({ name, socialLink }) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      <div className="container mx-auto px-0 pt-5 pb-10">
        <div className="flex justify-center items-center">
          {/* Home link */}
          <div className="flex mr-auto">
            <HomeButton />
          </div>

          {/* Navigation links - Large screen */}
          <div className="hidden md:flex font-general-medium m-0 sm:p-0">
            <div className="nav-primary">
              <Link href="/" aria-label="About" className="nav-link">
                Home
              </Link>
              <Link href="/about" aria-label="About" className="nav-link">
                About
              </Link>
              <Link href="/projects" aria-label="Projects" className="nav-link">
                Projects
              </Link>
              <Link href="/resume" aria-label="Resume" className="nav-link">
                Resume
              </Link>
              <Link href="/skills" aria-label="Skills" className="nav-link">
                Skills
              </Link>
              <Link href="/contact" aria-label="Contact" className="nav-link">
                Contact
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
        <div className={showMenu ? "nav-mobile" : "hidden"}>
          <Link href="/" aria-label="Home" className="nav-link">
            Home
          </Link>
          <Link href="/about" aria-label="About" className="nav-link">
            About
          </Link>
          <Link href="/projects" aria-label="Projects" className="nav-link">
            Projects
          </Link>
          <Link href="/resume" aria-label="Resume" className="nav-link">
            Resume
          </Link>
          <Link href="/skills" aria-label="Skills" className="nav-link">
            Skills
          </Link>
          <Link href="/contact" aria-label="Contact" className="nav-link">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
