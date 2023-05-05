// components/ContactDetails.tsx
import DownloadCV from "@/components/DownloadCV";
import Link from "next/link";
import { FiUser, FiPhone, FiMapPin, FiMail, FiGlobe } from "react-icons/fi";

interface ContactDetailsProps {
  name: string;
  contactIntro?: string;
  location: string;
  phone: string;
  website: string;
  resumeLink?: string;
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
    <div className="text-base text-left text-dark-2 dark:text-light-2 mt-0 lg:mt-8">
      <h2 className="text-2xl font-bold font-general-medium mb-6">
        <span className="text-gradient-dark dark:text-gradient-light">
          Contact Details
        </span>
      </h2>
      {contactIntro && <p className="text-base mb-4">{contactIntro}</p>}
      <ul className="mb-6">
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
      {resumeLink && <DownloadCV resumelink={resumeLink} />}
    </div>
  );
};

export default ContactDetails;
