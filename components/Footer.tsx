// components/Footer.tsx
import Copyright from "@/components/Copyright";
import Link from "next/link";

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <div className="mx-auto">
      <div className="mt-8 pb-8 border-t-2 border-light-1 dark:border-dark-2">
        <div>
          {/* Footer links - large screen */}
          <div className="mt-8 hidden sm:flex justify-center items-center">
            <div className="nav-secondary">
              <Link href="/" aria-label="Home">
                Home
              </Link>
              <Link href="/about" aria-label="About">
                About
              </Link>
              <Link href="/projects" aria-label="Projects">
                Projects
              </Link>
              <Link href="/resume" aria-label="Resume">
                Resume
              </Link>
              <Link href="/skills" aria-label="Skills">
                Skills
              </Link>
              <Link href="/contact" aria-label="Contact">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Copyright name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
