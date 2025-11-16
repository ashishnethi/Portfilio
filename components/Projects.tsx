"use client";

import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { useState } from "react";
import Image from "next/image";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

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

  const allTechnologies = Array.from(
    new Set(safeProjects.flatMap((p) => p.technologies || []))
  );

  const filteredProjects =
    activeFilter === "all"
      ? safeProjects
      : safeProjects.filter((p) => p.technologies?.includes(activeFilter));

  const featuredProjects = safeProjects.filter((p) => p.featured);
  const regularProjects = safeProjects.filter((p) => !p.featured);

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
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/30 to-white dark:from-gray-950 dark:via-cyan-950/10 dark:to-gray-950 pointer-events-none" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-400/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block mb-4"
          >
            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-sm font-semibold shadow-lg backdrop-blur-sm">
              Featured Work
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into elegant solutions through code
          </p>
        </motion.div>

        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Highlighted Projects
            </h3>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id ?? index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 dark:from-yellow-500/10 dark:via-orange-500/10 dark:to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative aspect-video overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src={(project as any)?.image || getFallbackImage(project?.title)}
                        alt={project?.title ?? "Featured project"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.15, type: "spring" }}
                      className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-sm font-bold shadow-xl backdrop-blur-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      {project?.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-white dark:bg-gray-900 shadow-2xl hover:scale-110 transition-transform"
                          whileHover={{ rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-7 h-7 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
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
                          className="p-4 rounded-full bg-white dark:bg-gray-900 shadow-2xl hover:scale-110 transition-transform"
                          whileHover={{ rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-7 h-7 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.button>
                      )}
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        className="p-4 rounded-full bg-cyan-600 text-white shadow-2xl hover:scale-110 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>

                  <div className="relative p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                      {project?.title ?? "Untitled Project"}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                      {project?.description}
                    </p>

                    {Array.isArray(project?.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, techIdx: number) => (
                          <motion.span
                            key={techIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIdx * 0.05 }}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-200/50 dark:border-cyan-800/50"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {regularProjects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900 dark:text-white">
              All Projects
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id ?? index}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      {project?.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
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
                          className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl"
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                        {project?.title ?? "Untitled Project"}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                      {project?.description}
                    </p>

                    {Array.isArray(project?.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech: string, techIdx: number) => (
                          <span
                            key={techIdx}
                            className="px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {selectedProject?.featured && (
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-lg">
                    Featured Project
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedProject?.title ?? "Untitled Project"}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-6">
                  {selectedProject?.description}
                </p>

                {Array.isArray(selectedProject?.technologies) && selectedProject.technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold border border-cyan-200/50 dark:border-cyan-800/50"
                        >
                          {tech}
                        </span>
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
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:scale-105 transition-transform shadow-lg"
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
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
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
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
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
