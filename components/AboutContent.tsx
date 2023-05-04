// components/AboutContent.tsx
import Social from "@/components/Social";
import { SocialLink } from "@/types/basics";

interface AboutContentProps {
  aboutIntro: string;
  aboutItems: string[];
  socialLinks: SocialLink[];
}

const AboutContent: React.FC<AboutContentProps> = ({
  aboutIntro,
  aboutItems,
  socialLinks,
}) => {
  return (
    <div className="text-dark-2 dark:text-light-2">
      <h1 className="text-4xl font-bold text-gradient-dark dark:text-gradient-light mb-6">
        {aboutIntro}
      </h1>
      <div className="mb-6">
        {aboutItems.map((aboutItem, index) => (
          <p key={index} className="mb-4">
            {aboutItem}
          </p>
        ))}
      </div>
      <div className="mb-6">
        <Social socialLinks={socialLinks} />
      </div>
    </div>
  );
};

export default AboutContent;
