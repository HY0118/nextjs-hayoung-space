import { SKILL_CATEGORIES } from "@constants/skills";
import { SKILL_LEVEL_STYLES, SKILL_LEVELS } from "@constants/skillLevels";
import { getTechColor } from "@constants/techColors";

const Skills = () => {
  return (
    <section id="skills" className="py-20 min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-text-primary relative inline-block">
            Skills
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light"></div>
          </h2>
          <div className="mt-8 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${SKILL_LEVEL_STYLES[SKILL_LEVELS.EXPERT]}`}>
                {SKILL_LEVELS.EXPERT}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${SKILL_LEVEL_STYLES[SKILL_LEVELS.ADVANCED]}`}
              >
                {SKILL_LEVELS.ADVANCED}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  SKILL_LEVEL_STYLES[SKILL_LEVELS.INTERMEDIATE]
                }`}
              >
                {SKILL_LEVELS.INTERMEDIATE}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300
                       border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {category.title === "Frontend" ? "🎨" : category.title === "Backend" ? "⚙️" : "🛠️"}
                  </span>
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-text-secondary text-sm leading-relaxed">{category.description}</p>
                )}
              </div>

              <div className="space-y-8">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative p-6 rounded-xl bg-gray-50 dark:bg-gray-900
                             border border-gray-100 dark:border-gray-700
                             hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`text-lg font-semibold ${getTechColor(skill.name)} bg-inherit`}>{skill.name}</h4>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full 
                                  ${SKILL_LEVEL_STYLES[skill.level]} transition-colors`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {skill.experience}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        {skill.projects} Projects
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">{skill.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {skill.expertise.map((item) => (
                        <span
                          key={item}
                          className={`text-xs px-3 py-1 rounded-full
                                   ${getTechColor(skill.name).replace("/90", "/10")}
                                   hover:${getTechColor(skill.name).replace("/90", "/20")}
                                   transition-colors cursor-default`}
                        >
                          {item}
                        </span>
                      ))}
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
