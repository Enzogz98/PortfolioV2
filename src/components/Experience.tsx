import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export function Experience() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen flex items-center py-20 bg-slate-100 dark:bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
      
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
            <span className="text-cyan-400">&gt;</span> {t.experience.title}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.experience.subtitle}
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-8">
            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="relative group"
              >
                <div className="p-6 rounded-lg border border-cyan-500/20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl text-cyan-400">
                            {job.title}
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300">
                            {job.company}
                          </p>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                          {job.period}
                        </span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {job.description}
                      </p>

                      <div className="space-y-2">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.5 }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
