const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    title: "UI/UX",
    skills: [
      { name: "Styled-Components", level: 85 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl text-text-primary mb-8 relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl text-text-primary mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-text-secondary">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
