// components/SkillsRated.tsx
import type { RatedSkill } from "@/types/skills";
import SkillBar from "@/components/SkillBar";

interface SkillsRatedProps {
  ratedSkills: RatedSkill[];
}

const SkillsRated: React.FC<SkillsRatedProps> = ({ ratedSkills }) => {
  return (
    <div className="mb-8">
      <h2 className="text-gradient-dark dark:text-gradient-light font-bold font-general-medium text-2xl mb-8">
        Rated Skills
      </h2>
      <ul>
        {ratedSkills.map((ratedSkill, index) => (
          <SkillBar
            key={index}
            name={ratedSkill.name}
            level={ratedSkill.level}
          />
        ))}
      </ul>
    </div>
  );
};

export default SkillsRated;
