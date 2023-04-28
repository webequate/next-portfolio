// components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import logo from "@/public/images/allen.png";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      <div className="container mx-auto px-2 pt-6 pb-3 mb-12">
        <div className="flex items-center justify-between">
          {/* Home link */}
          <Link href="/" area-label="Home" className="home-link">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </Link>

          {/* Navigation links - Large screen */}
          <div className="items-center hidden md:block font-general-medium m-0 sm:ml-4 sm:p-0">
            <div className="nav-primary">
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
          <Hamburger showMenu={showMenu} toggleMenu={toggleMenu} />

          {/* Theme switcher */}
          <ThemeSwitcher />
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
