import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { content, techStack } from "../data/content";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Server, Database, Wrench } from "lucide-react";

export function Skills() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const skillCategories = [
    {
      title: t.skills.frontend,
      icon: Code2,
      skills: techStack.frontend,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: t.skills.backend,
      icon: Server,
      skills: techStack.backend,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: t.skills.databases,
      icon: Database,
      skills: techStack.databases,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t.skills.tools,
      icon: Wrench,
      skills: techStack.tools,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ea5e91a_0,transparent_65%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <span className="text-cyan-400">&gt;</span>{" "}
            {t.skills.title}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.skills.subtitle}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: categoryIndex * 0.1 + 0.3,
                  }}
                  className="group"
                >
                  <div className="h-full p-6 rounded-lg border border-cyan-500/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl mb-4 text-cyan-400">
                      {category.title}
                    </h3>

                    <div className="space-y-2">
                      {category.skills.map(
                        (skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              isInView
                                ? { opacity: 1, x: 0 }
                                : {}
                            }
                            transition={{
                              delay:
                                categoryIndex * 0.1 +
                                skillIndex * 0.05 +
                                0.5,
                            }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                            <span className="text-slate-700 dark:text-slate-300">
                              {skill}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}