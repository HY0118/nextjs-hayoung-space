import { SKILL_LEVELS, SKILL_LEVEL_STYLES } from '@constants/skillLevels';
import { SKILL_CATEGORIES } from '@constants/skills';
import { getTechColor } from '@constants/techColors';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Skills = () => {
  const layouts = {
    lg: [
      { i: 'Frontend', x: 0, y: 0, w: 1.6, h: 3.3 },
      { i: 'Backend', x: 1.6, y: 0, w: 1.2, h: 1.99 },
      { i: 'DevOps', x: 2.8, y: 0, w: 1.2, h: 2.5 },
      { i: 'Desktop Development', x: 1.6, y: 1.99, w: 1.2, h: 1.3 },
    ],
  };

  return (
    <section
      id="skills"
      className="py-20 min-h-screen flex flex-col justify-center bg-gray-100 dark:bg-gray-800"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-text-primary mb-16 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
            Skills
          </h2>
          <div className="mt-8 flex items-center gap-2 text-sm">
            <span className="text-text-primary font-pret">level :</span>
            {Object.values(SKILL_LEVELS).map((level) => (
              <span
                key={level}
                className={`text-xs font-medium px-3 py-1 rounded-full ${SKILL_LEVEL_STYLES[level]}`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 480 }}
            cols={{ lg: 4, md: 4, sm: 1 }}
            rowHeight={180}
            containerPadding={[0, 0]}
            margin={[20, 20]}
            isDraggable={false}
            isResizable={false}
            compactType={null}
            preventCollision={true}
            useCSSTransforms={true}
          >
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md 
                         border border-gray-200 dark:border-gray-700
                         transition-all duration-300 hover:shadow-lg
                         overflow-auto h-full"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-3 font-sora">
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {category.title === 'Frontend'
                        ? '🎨'
                        : category.title === 'Backend'
                          ? '⚙️'
                          : category.title === 'DevOps'
                            ? '🛠️'
                            : '💻'}
                    </span>
                    {category.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-pret dark:text-white/90">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-white dark:bg-gray-900
                               border border-gray-200 dark:border-gray-700
                               group hover:border-primary/30 hover:shadow-md
                               transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className={`text-base font-semibold ${getTechColor(skill.name)} rounded-lg px-1 py-1
                                      group-hover:scale-105 group-hover:shadow-sm font-pret
                                      transition-transform duration-100`}
                        >
                          {skill.name}
                        </h4>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${SKILL_LEVEL_STYLES[skill.level]}
                                      group-hover:scale-105 font-pret dark:text-black/90
                                      transition-transform duration-300`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skill.expertise.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-text-secondary
                                     border border-gray-200 dark:border-gray-700 font-pret dark:text-white/90
                                     group-hover:bg-gray-100 dark:group-hover:bg-gray-700
                                     transition-colors duration-300"
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
          </ResponsiveGridLayout>
        </div>
      </div>
    </section>
  );
};

export default Skills;
