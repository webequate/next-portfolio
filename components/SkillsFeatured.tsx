// components/SkillsFeatured.tsx
import type { FeaturedSkill } from "@/types/skills";

interface SkillsFeaturedProps {
  featuredSkills: FeaturedSkill[];
}

const SkillsFeatured: React.FC<SkillsFeaturedProps> = ({ featuredSkills }) => {
  return (
    <div className="mb-8">
      <h2 className="text-gradient-dark dark:text-gradient-light bg-gradient-dark dark:bg-gradient-light font-bold font-general-medium text-2xl mb-8">
        Featured Skills
      </h2>
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
