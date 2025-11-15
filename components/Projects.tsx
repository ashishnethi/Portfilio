"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import projectsData from "@/data/projects.json";
import { useState, useRef } from "react";
import Image from "next/image";

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const safeProjects = projects.filter((p) => p && typeof p === "object");

  const getFallbackImage = (title?: string) => {
    if (!title) return "/project-placeholder.svg";
    const t = title.toLowerCase();
    if (t.includes("e-commerce") || t.includes("ecommerce") || t.includes("store")) return "/projects/ecommerce.svg";
    if (t.includes("task") || t.includes("todo") || t.includes("kanban")) return "/projects/tasks.svg";
    if (t.includes("weather") || t.includes("climate") || t.includes("forecast")) return "/projects/weather.svg";
    if (t.includes("algo") || t.includes("algorithm") || t.includes("dsa")) return "/projects/algorithm.svg";
    if (t.includes("dashboard") || t.includes("analytics") || t.includes("admin")) return "/projects/dashboard.svg";
    if (t.includes("inputguard") || t.includes("guard")) return "/projects/inputguard.svg";
    if (t.includes("thinkpart") || t.includes("think")) return "/projects/thinkpart.svg";
    if (t.includes("recruit") || t.includes("recruitment")) return "/projects/recruit-assistant.svg";
    if (t.includes("insight") || t.includes("rag")) return "/projects/insight-rag.svg";
    if (t.includes("browser") || t.includes("agent")) return "/projects/browser-agent.svg";
    return "/project-placeholder.svg";
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 dark:via-indigo-950/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
          >
            Featured Work
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent px-4">
            Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            A curated collection of innovative solutions and creative implementations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr"
        >
          {safeProjects.map((project, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            
            const rotateX = useTransform(y, [-0.5, 0.5], [7.5, -7.5]);
            const rotateY = useTransform(x, [-0.5, 0.5], [-7.5, 7.5]);

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              if (!cardRef.current) return;
              const rect = cardRef.current.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              x.set((e.clientX - centerX) / rect.width);
              y.set((e.clientY - centerY) / rect.height);
            };

            const handleMouseLeave = () => {
              x.set(0);
              y.set(0);
            };

            return (
              <motion.div
                key={project.id ?? index}
                ref={cardRef}
                variants={itemVariants}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex flex-col"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Image Container with Overlay */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={(project as any)?.image || getFallbackImage(project?.title)}
                        alt={project?.title ?? "Project image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Featured Badge */}
                    {project?.featured && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
                          ⭐ Featured
                        </span>
                      </motion.div>
                    )}

                    {/* Hover Overlay with Actions */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {project?.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl hover:shadow-2xl pointer-events-auto z-10"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
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
                          className="p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl hover:shadow-2xl pointer-events-auto z-10"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white"
                      layoutId={`title-${project.id}`}
                    >
                      {project?.title ?? "Untitled Project"}
                    </motion.h3>

                    {project?.description && (() => {
                      const isExpanded = expandedCards.has(project.id ?? index);
                      const description = project.description;
                      const wordCount = description.split(' ').length;
                      const shouldShowToggle = wordCount > 15;
                      const displayText = isExpanded || !shouldShowToggle 
                        ? description 
                        : description.split(' ').slice(0, 15).join(' ') + '...';

                      return (
                        <div className="mb-4 flex-grow">
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                            {displayText}
                          </p>
                          {shouldShowToggle && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedCards(prev => {
                                  const newSet = new Set(prev);
                                  if (newSet.has(project.id ?? index)) {
                                    newSet.delete(project.id ?? index);
                                  } else {
                                    newSet.add(project.id ?? index);
                                  }
                                  return newSet;
                                });
                              }}
                              className="mt-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-xs font-medium transition-colors"
                            >
                              {isExpanded ? 'Read less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      );
                    })()}

                    {Array.isArray(project?.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 4).map((tech: string, techIdx: number) => (
                          <motion.span
                            key={techIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + techIdx * 0.05 }}
                            className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-indigo-100 dark:from-cyan-900/30 dark:to-indigo-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium border border-cyan-200/50 dark:border-cyan-800/50"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoUrl(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoUrl(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/^https?:\/\/(www\.)?youtube\.com|youtu\.be/.test(videoUrl) ? (
                <iframe
                  src={videoUrl.includes("embed") ? videoUrl : videoUrl.replace(/watch\?v=/, "embed/")}
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
