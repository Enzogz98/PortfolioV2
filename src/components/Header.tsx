import { Moon, Sun, Globe, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = content[language];

  const handleDownloadCV = () => {
    // Simulate CV download - in production, these would be actual PDF files
    const cvUrls = {
      en: './CV-English.pdf',
      es: './CV-Spanish.pdf',
    };
    
    const link = document.createElement('a');
    link.href = cvUrls[language];
    link.download = `CV-${language === 'en' ? 'English' : 'Spanish'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white">&lt;/&gt;</span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          {Object.entries(t.nav).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => scrollToSection(key)}
              className="text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {value}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadCV}
            className="border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t.hero.downloadCV}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="hover:bg-cyan-500/10"
          >
            <Globe className="w-5 h-5" />
            <span className="sr-only">Toggle language</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-cyan-500/10"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
