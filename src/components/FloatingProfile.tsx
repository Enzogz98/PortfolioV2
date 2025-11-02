import { motion } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function FloatingProfile() {
  const [isMinimized, setIsMinimized] = useState(false);
  const { language } = useLanguage();
  const tooltipText = language === 'es' ? '¡Arrástrame!' : 'Drag me around!';

  // Si el documento todavía no está listo (SSR o carga inicial), no montamos el portal
  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {!isMinimized && (
        <motion.div
          drag
          dragElastic={0.15}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', bounce: 0.5 }}
          className="fixed bottom-8 right-8 z-[9999] group cursor-grab active:cursor-grabbing select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Efecto brillante */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
            
            {/* Imagen de perfil */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
              <ImageWithFallback
                src="https://i.postimg.cc/6pbpQ0mk/20250722-105517.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Botón de minimizar */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              aria-label="Minimize profile"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Indicador de estado */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-50 dark:border-slate-950">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
            </div>

            {/* Tooltip traducido */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm pointer-events-none shadow-md">
              {tooltipText}
              <div className="absolute top-full right-4 w-2 h-2 bg-slate-100 dark:bg-slate-900 rotate-45 -mt-1" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Botón para restaurar */}
      {isMinimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          aria-label="Show profile"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
            <ImageWithFallback
              src="https://i.postimg.cc/6pbpQ0mk/20250722-105517.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.button>
      )}
    </>,
    document.body // 🔥 se monta directamente sobre <body>
  );
}
