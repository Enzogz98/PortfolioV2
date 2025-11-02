import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center py-20 bg-slate-100 dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-5xl md:text-6xl mb-12 text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="text-cyan-400">&gt;</span> {t.about.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-lg overflow-hidden border border-cyan-500/30 relative">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
                  <div className="absolute text-8xl opacity-50">&lt;/&gt;</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.about.description}
              </p>

              <div className="p-4 border-l-4 border-cyan-500 bg-cyan-500/10 rounded">
                <p className="text-cyan-400 italic">
                  {t.about.highlight}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
