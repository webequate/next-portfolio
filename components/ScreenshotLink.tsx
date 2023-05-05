// components/ScreenshotLink.tsx
import Link from "next/link";
import { FaMobileAlt, FaTabletAlt, FaLaptop, FaDesktop } from "react-icons/fa";

interface ScreenshotLinkProps {
  name: string;
  path: string;
  url: string;
}

const ScreenshotLink: React.FC<ScreenshotLinkProps> = ({ name, path, url }) => {
  const iconFromName = (name: string) => {
    switch (name) {
      case "Mobile":
        return <FaMobileAlt />;
      case "Tablet":
        return <FaTabletAlt />;
      case "Laptop":
        return <FaLaptop />;
      case "Desktop":
        return <FaDesktop />;
      default:
        return <FaDesktop />;
    }
  };

  return (
    <Link
      href={`/${path}/${url}`}
      target="_blank"
      className="flex mr-2 md:mr-6"
    >
      <i className="text-lg mr-1 mt-1">{iconFromName(name)}</i>
      <span className="text-lg">{name}</span>
    </Link>
  );
};

export default ScreenshotLink;
