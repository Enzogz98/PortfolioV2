import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

export function Contact() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactLinks = [
    {
      icon: Mail,
      label: t.contact.email,
      href: `mailto:${t.contact.email}`,
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: MessageCircle,
      label: t.contact.phone,
      href: `https://wa.me/${t.contact.phone.replace(/\D/g, '')}`,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      href: `https://${t.contact.linkedin}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Github,
      label: t.contact.github,
      href: `https://${t.contact.github}`,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center py-20 bg-slate-100 dark:bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ea5e91a_0,transparent_65%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="text-5xl md:text-6xl mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <span className="text-cyan-400">&gt;</span> {t.contact.title}
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-400 mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t.contact.subtitle}
          </motion.p>

          <motion.p
            className="text-xl text-slate-700 dark:text-slate-300 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.contact.message}
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="group"
                >
                  <div className="p-6 rounded-lg border border-cyan-500/20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {/* <p className="text-slate-700 dark:text-slate-300 break-all">
                      {link.label}
                    </p> */}
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="pt-8 border-t border-cyan-500/20"
          >
            <p className="text-slate-600 dark:text-slate-500">
              &copy; 2025 All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
