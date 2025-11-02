// src/components/Projects.tsx
import { motion, useInView } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { content } from "../data/content";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Projects() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Live demos por TÍTULO (en ambos idiomas usan estos títulos)
  const liveByTitle: Record<string, string> = {
    "Zoco Servicios de Pago": "https://zocopagos.com/",
    "Tordo Nefrogen": "https://nefrogen.com.ar/",
    "Medexis Clínica Mayo": "https://medexis.com.ar/",
  };

  // ⬇️ PONÉ ACÁ TUS URLs REALES DE LOGOS (PNG/SVG/JPG).
  // Si un título no aparece acá, usa el favicon del sitio live.
  const logoByTitle: Record<string, string> = {
    "Zoco Servicios de Pago": "https://zocopagos.com/wp-content/uploads/2025/08/perfil.webp",
    "Tordo Nefrogen": "https://i.postimg.cc/nLjsqg8T/504248310-17888441361273351-6367247986902666164-n.jpg",
    "Medexis Clínica Mayo": "https://medexis.com.ar/wp-content/uploads/2019/09/Sin-t%C3%ADtulo-1.png",
  };

  const withProtocol = (url: string) =>
    /^https?:\/\//i.test(url) ? url : `https://${url}`;

  const joinUrl = (base: string, path: string) =>
    base.endsWith("/") ? base + path.replace(/^\//, "") : base + "/" + path.replace(/^\//, "");

  const getLogoUrl = (title: string) => {
    const explicit = logoByTitle[title];
    if (explicit) return withProtocol(explicit);
    const live = liveByTitle[title];
    if (!live) return "";
    // Fallback: favicon del sitio
    return joinUrl(withProtocol(live), "favicon.ico");
  };

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.onerror = null;
    // Transparente para no romper el layout si el logo no carga o bloquea hotlink
    el.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='160'/>");
  };
const logoStyleByTitle: Record<
  string,
  { mode: "cover" | "contain"; padding?: string; position?: string }
> = {
  // Nefrogen: evitar recorte
  "Tordo Nefrogen": { mode: "contain", padding: "p-2 md:p-3" },
  // (opcional) podés afinar posición si hace falta:
  // "Tordo Nefrogen": { mode: "contain", padding: "p-2 md:p-3", position: "object-center" },
};

// helper para clases del <img>
const imgClassesFor = (title: string) => {
  const s = logoStyleByTitle[title] ?? { mode: "cover" as const };
  return [
    "w-full h-full rounded-md transition-transform duration-500 group-hover:scale-105",
    s.mode === "cover" ? "object-cover" : "object-contain",
    s.padding ?? "",
    s.position ?? "",
  ].join(" ");
};
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
            {t.projects.items.map((project, index) => {
              const title = project.title as string;
              const liveUrl = liveByTitle[title];
              const logoUrl = getLogoUrl(title);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="group h-full"
                >
                  <div className="h-full p-6 rounded-lg border border-cyan-500/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col">
                    {/* Header con LOGO desde URL */}
                    <div className="h-40 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 mb-4 overflow-hidden relative">
                      {logoUrl ? (
                        <img
  src={logoUrl}
  alt={`${title} logo`}
  onError={onImgError}
  className={imgClassesFor(title)}
  loading="lazy"
/>

                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-30">&lt;/&gt;</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    <h3 className="text-xl text-cyan-400 mb-3">{title}</h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech: string, techIndex: number) => (
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
                      {liveUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10"
                        >
                          <a
                            href={withProtocol(liveUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${title} – Live Demo`}
                            title={`${title} – Live Demo`}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t.projects.viewLive}
                          </a>
                        </Button>
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
