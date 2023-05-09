// components/SkillsRated.tsx
import type { RatedSkill } from "@/types/skills";
import SkillBar from "@/components/SkillBar";

interface SkillsRatedProps {
  ratedSkills: RatedSkill[];
}

const SkillsRated: React.FC<SkillsRatedProps> = ({ ratedSkills }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        <span className="text-accent-dark dark:text-accent-light">
          Rated Skills
        </span>
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
