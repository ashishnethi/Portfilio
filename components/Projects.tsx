"use client";

import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { useState } from "react";
import Image from "next/image";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const safeProjects = projects.filter((p) => p && typeof p === "object");

  const getFallbackImage = (title?: string) => {
    if (!title) return "/project-placeholder.svg";
    const t = title.toLowerCase();
    if (t.includes("inputguard") || t.includes("guard")) return "/projects/inputguard.svg";
    if (t.includes("browser") || t.includes("agent")) return "/projects/browser-agent.svg";
    if (t.includes("task") || t.includes("todo")) return "/projects/tasks.svg";
    if (t.includes("weather")) return "/projects/weather.svg";
    if (t.includes("algo")) return "/projects/algorithm.svg";
    if (t.includes("dashboard")) return "/projects/dashboard.svg";
    if (t.includes("ecommerce")) return "/projects/ecommerce.svg";
    if (t.includes("thinkpart")) return "/projects/thinkpart.svg";
    if (t.includes("recruit")) return "/projects/recruit-assistant.svg";
    if (t.includes("insight") || t.includes("rag")) return "/projects/insight-rag.svg";
    return "/project-placeholder.svg";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/20 to-white dark:from-gray-950 dark:via-cyan-950/10 dark:to-gray-950 pointer-events-none" />

      <div className="absolute top-32 right-12 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-12 w-96 h-96 bg-sky-400/15 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block mb-4"
          >
            <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-sky-500/15 to-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm">
              Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            Crafting beautiful solutions with clean code and creative design
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
        >
          {safeProjects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/60 dark:border-gray-700/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={(project as any)?.image || getFallbackImage(project?.title)}
                    alt={project?.title ?? "Project"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  initial={false}
                >
                  {project?.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 sm:p-4 rounded-full bg-white/95 dark:bg-gray-900/95 shadow-2xl hover:shadow-3xl backdrop-blur-md"
                      whileHover={{ scale: 1.2, rotate: 8 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.a>
                  )}
                  {project?.video && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoUrl(project.video as string);
                      }}
                      className="p-3.5 sm:p-4 rounded-full bg-white/95 dark:bg-gray-900/95 shadow-2xl hover:shadow-3xl backdrop-blur-md"
                      whileHover={{ scale: 1.2, rotate: -8 }}
                      whileTap={{ scale: 0.85 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  )}
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <motion.h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-xl line-clamp-2">
                    {project?.title ?? "Untitled Project"}
                  </motion.h3>
                </div>
              </div>

              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">
                  {project?.title ?? "Untitled Project"}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                  {project?.description}
                </p>

                {Array.isArray(project?.technologies) && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech: string, techIdx: number) => (
                      <motion.span
                        key={techIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIdx * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-200/70 dark:border-cyan-800/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs font-semibold border border-gray-200/50 dark:border-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                style={{ transform: "skewX(-20deg)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <Image
                  src={(selectedProject as any)?.image || getFallbackImage(selectedProject?.title)}
                  alt={selectedProject?.title ?? "Project details"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                  {selectedProject?.title ?? "Untitled Project"}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  {selectedProject?.description}
                </p>

                {Array.isArray(selectedProject?.technologies) && selectedProject.technologies.length > 0 && (
                  <div className="mb-7 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.technologies.map((tech: string, idx: number) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40 text-cyan-700 dark:text-cyan-300 text-sm font-semibold border border-cyan-200/70 dark:border-cyan-800/50"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {selectedProject?.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </motion.a>
                  )}
                  {selectedProject?.video && (
                    <motion.button
                      onClick={() => {
                        setVideoUrl(selectedProject.video as string);
                        setSelectedProject(null);
                      }}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Demo
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoUrl && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoUrl(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoUrl(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|drive\.google\.com)/.test(videoUrl) ? (
                <iframe
                  src={videoUrl.includes("embed") ? videoUrl : videoUrl.includes("drive.google.com") ? videoUrl.replace("/view", "/preview") : videoUrl.replace(/watch\?v=/, "embed/")}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video className="w-full h-full" controls autoPlay src={videoUrl} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
