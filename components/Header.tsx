import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiMenu } from 'react-icons/fi';
import logoLight from '@/public/images/allen.png';
import logoDark from '@/public/images/allen.png';
import { useTheme } from 'next-themes';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
	const [ showMenu, setShowMenu ] = useState(false);
  const { theme, setTheme } = useTheme();

	function toggleMenu() {
		if (!showMenu) {
			setShowMenu(true);
		} else {
			setShowMenu(false);
		}
	}

	return (
		<motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="mx-auto">

      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center pt-6 pb-12">

				<div className="flex mx-auto items-center px-4 sm:px-0">

          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src={theme === 'dark' ? logoDark : logoLight}
                className="w-12 cursor-pointer"
                alt={`${ name }`}
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Header links large screen */}
          <div className="font-general-medium m-0 sm:ml-4 sm:flex sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
            <ul className="flex rounded-full bg-white/90 px-3 mx-6 text-sm font-medium text-primary-dark dark:text-primary-light shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10">
              <li className="text-left text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="About">
                <Link href="/about">About</Link>
              </li>
              <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Projects">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Resume">
                <Link href="/resume">Resume</Link>
              </li>
              <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Skills">
                <Link href="/skills">Skills</Link>
              </li>
              <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Testimonials">
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Contact">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Theme switcher */}
          <ThemeSwitcher />

        </div>

        <div>

          {/* Small screen - Hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              {showMenu ? (
                <FiX className="text-3xl" />
              ) : (
                <FiMenu className="text-3xl" />
              )}
            </button>
          </div>

          {/* Small screen - Header links */}
          <div
            className={
              showMenu
                ? 'block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none'
                : 'hidden'
            }
          >
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2">
              <Link href="/" aria-label="Home">Home</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2">
              <Link href="/about" aria-label="About">About</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
              <Link href="/projects" aria-label="Projects">Projects</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
              <Link href="/resume" aria-label="Resume">Resume</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
              <Link href="/skills" aria-label="Skills">Skills</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
              <Link href="/testimonials" aria-label="Testimonials">Testimonials</Link>
            </div>
            <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
              <Link href="/contact" aria-label="Contact">Contact</Link>
            </div>
          </div>

        </div>

      </div>

		</motion.nav>
	);
}

export default Header;