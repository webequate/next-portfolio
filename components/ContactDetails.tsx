// components/ContactDetails.tsx
import DownloadCV from "@/components/DownloadCV";
import Link from "next/link";
import { FiUser, FiPhone, FiMapPin, FiMail, FiGlobe } from "react-icons/fi";

interface ContactDetailsProps {
  name: string;
  contactIntro: string;
  location: string;
  phone: string;
  website: string;
  resumeLink: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  name,
  contactIntro,
  location,
  phone,
  website,
  resumeLink,
}) => {
  return (
    <div className="text-base text-left text-dark-2 dark:text-light-2 lg:ml-4 p-6 sm:p-8">
      <h2 className="text-gradient-dark dark:text-gradient-light font-bold font-general-medium text-2xl mb-8">
        Contact Details
      </h2>
      <p className="text-base mt-4 mb-8">{contactIntro}</p>
      <ul>
        <li className="flex mb-4">
          <i className="text-2xl mr-4 mt-1">
            <FiUser />
          </i>
          <span className="text-lg">{name}</span>
        </li>
        <li className="flex mb-4">
          <i className="text-2xl mr-4 mt-1">
            <FiMapPin />
          </i>
          <span className="text-lg">{location}</span>
        </li>
        <li className="flex mb-4">
          <i className="text-2xl mr-4 mt-1">
            <FiPhone />
          </i>
          <span className="text-lg">{phone}</span>
        </li>
        <li className="flex mb-4">
          <i className="text-2xl mr-4 mt-1">
            <FiGlobe />
          </i>
          <span className="text-lg">
            <Link href={`http://${website}`}>{website}</Link>
          </span>
        </li>
      </ul>
      <DownloadCV resumelink={resumeLink} />
    </div>
  );
};

export default ContactDetails;
