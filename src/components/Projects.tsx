import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function Projects() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      
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
            <span className="text-cyan-400">&gt;</span> {t.projects.title}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.projects.subtitle}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="group h-full"
              >
                <div className="h-full p-6 rounded-lg border border-cyan-500/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col">
                  <div className="h-40 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 mb-4 overflow-hidden relative group-hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">&lt;/&gt;</div>
                    </div>
                  </div>

                  <h3 className="text-xl text-cyan-400 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t.projects.viewCode}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.projects.viewLive}
                    </Button>
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
