import { Icon } from "astro-icon/components";

function SkillsTerminal() {
  type SkillsEntry = {
    category: string;
    skills: {
      name: string;
      icon?: string;
      size?: number;
      tooltip?: string;
    }[];
  };
  const skillEntries: SkillsEntry[] = [
    {
      category: "frontend",
      skills: [
        { name: "React", icon: "simple-icons:react" },
        // { name: "TypeScript", icon: "simple-icons:typescript" },
        // { name: "Tailwind", icon: "simple-icons:tailwindcss" },
        // { name: "Astro", icon: "simple-icons:astro" },
      ],
    },
    {
      category: "backend",
      skills: [
        { name: "React", icon: "simple-icons:react" },
        // { name: "TypeScript", icon: "simple-icons:typescript" },
        // { name: "Tailwind", icon: "simple-icons:tailwindcss" },
        // { name: "Astro", icon: "simple-icons:astro" },
      ],
    },
  ];
  return (
    <div className="border w-[70%] flex flex-col font-mono">
      <div className="bg-black/10 border-b flex flex-row items-center py-2 pl-4">
        <p>~/portfolio/skills/</p>
        <span className="relative bottom-[-1px] h-[16px] w-[6px] ml-1 bg-nav-link animate-terminal-fade"></span>
      </div>
      <div className="bg-black/5 flex flex-col pt-4 pb-6">
        {skillEntries.map((entry) => {
          return (
            <div>
              <div className="flex gap-2 pl-6 mb-6">
                <p>$</p>
                <p>ls</p>
                <p>./{entry.category}</p>
              </div>
              <div>
                {entry.skills.map((skill) => {
                    return (
                      <div>
                        <Icon name="simple-icons:typescript" />
                        <p>{skill.name}</p>
                      </div>
                    );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsTerminal;
