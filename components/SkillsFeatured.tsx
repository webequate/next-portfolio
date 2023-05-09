// components/SkillsFeatured.tsx
import type { FeaturedSkill } from "@/types/skills";

interface SkillsFeaturedProps {
  featuredSkills: FeaturedSkill[];
}

const SkillsFeatured: React.FC<SkillsFeaturedProps> = ({ featuredSkills }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        <span className="text-accent-dark dark:text-accent-light">
          Featured Skills
        </span>
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
