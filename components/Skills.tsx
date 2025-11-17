"use client";

import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";
import { useState } from "react";

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const SkillCard = ({
    name,
    level,
    icon,
  }: {
    name: string;
    level: string;
    icon: string;
  }) => {
    const isHovered = hoveredSkill === name;
    const isAdvanced = level === "Advanced";

    return (
      <motion.div
        variants={itemVariants}
        onMouseEnter={() => setHoveredSkill(name)}
        onMouseLeave={() => setHoveredSkill(null)}
        whileHover={{ y: -8, scale: 1.05 }}
        className={`group relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden border backdrop-blur-xl ${
          isHovered
            ? "border-cyan-500/60 shadow-2xl shadow-cyan-500/20 dark:shadow-cyan-600/20"
            : "border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl"
        } ${
          isAdvanced
            ? "bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-900/20 dark:to-sky-900/20"
            : "bg-white/80 dark:bg-gray-800/80"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col items-center text-center">
          <motion.div
            animate={isHovered ? { scale: 1.3, rotate: 12 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-3xl sm:text-4xl mb-2.5"
          >
            {icon}
          </motion.div>

          <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-tight mb-1.5">
            {name}
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-block transition-all ${
                isAdvanced
                  ? "bg-gradient-to-r from-cyan-500/30 to-sky-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-500/50"
                  : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400"
              }`}
            >
              {level}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-white/20 dark:via-white/5 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
          style={{ transform: "skewX(-20deg)" }}
        />
      </motion.div>
    );
  };

  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
    >
      <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-cyan-600 to-sky-600" />
      <span className="text-2xl">{icon}</span>
      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <span className="text-2xl">{icon}</span>
      <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-sky-600 to-cyan-600" />
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/15 to-white dark:from-gray-950 dark:via-cyan-950/10 dark:to-gray-950 pointer-events-none" />

      <div className="absolute top-40 left-20 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-sky-400/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block mb-4"
          >
            <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-sky-500/15 to-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm">
              Technical Arsenal
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive toolkit of technologies and expertise I've mastered
          </p>
        </motion.div>

        {/* Programming Languages */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <SectionHeader title="Programming Languages" icon="💻" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {skillsData.languages?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </motion.div>
        </motion.div>

        {/* Frameworks & Libraries */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <SectionHeader title="Frameworks & Libraries" icon="🚀" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {skillsData.frameworks?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </motion.div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <SectionHeader title="Tools & Technologies" icon="🛠️" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {skillsData.tools?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </motion.div>
        </motion.div>

        {/* AI Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <SectionHeader title="Artificial Intelligence" icon="🤖" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            {skillsData.ai_skills?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </motion.div>
        </motion.div>

        {/* DSA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600/10 via-sky-600/10 to-cyan-600/10 dark:from-cyan-900/20 dark:via-sky-900/20 dark:to-cyan-900/20 border border-cyan-500/30 dark:border-cyan-800/30 backdrop-blur-xl shadow-2xl p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/10 dark:via-white/5 to-cyan-500/0 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl sm:text-7xl lg:text-8xl flex-shrink-0"
              >
                {skillsData.dsa?.icon}
              </motion.div>

              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {skillsData.dsa?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                  {skillsData.dsa?.description}
                </p>
                <motion.a
                  href="https://leetcode.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  Visit LeetCode Profile
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
