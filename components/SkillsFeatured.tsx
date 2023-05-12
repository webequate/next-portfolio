// components/SkillsFeatured.tsx
import type { FeaturedSkill } from "@/types/skills";
import Heading from "@/components/Heading";

interface SkillsFeaturedProps {
  featuredSkills: FeaturedSkill[];
}

const SkillsFeatured: React.FC<SkillsFeaturedProps> = ({ featuredSkills }) => {
  return (
    <div>
      <Heading text="Featured Skills" />
      <ul className="list-disc list-inside lg:list-outside columns-2 md:columns-1">
        {featuredSkills.map((featuredSkill, index) => (
          <li key={index} className="md:ml-5 mb-2">
            {featuredSkill.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsFeatured;
