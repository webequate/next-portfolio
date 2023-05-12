// components/SkillsRated.tsx
import type { RatedSkill } from "@/types/skills";
import Heading from "@/components/Heading";
import SkillBar from "@/components/SkillBar";

interface SkillsRatedProps {
  ratedSkills: RatedSkill[];
}

const SkillsRated: React.FC<SkillsRatedProps> = ({ ratedSkills }) => {
  return (
    <div>
      <Heading text="Rated Skills" />
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
