// components/AboutDetails.tsx
import { SocialLink } from "@/types/basics";
import Image from "next/image";

interface AboutDetailsProps {
  name: string;
  location: string;
  phone: string;
  website: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  name,
  location,
  phone,
  website,
}) => {
  return (
    <Image
      src="/images/allen-ai.jpg"
      alt="Allen"
      width={600}
      height={625}
      className="w-100 h-100 rounded-xl ring-1 ring-dark-3 dark:ring-light-3 md:mr-4"
    />
  );
};

export default AboutDetails;
