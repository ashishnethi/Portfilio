"use client";

import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";
import { FaCode, FaTools, FaProjectDiagram, FaRobot } from "react-icons/fa";

export function Skills() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const skillVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
  };

  const SkillCard = ({ name, level, icon }: { name: string; level: string; icon: string }) => (
    <motion.div
      variants={skillVariants}
      whileHover={{ y: -2, scale: 1.04 }}
      className="group p-2 sm:p-3 rounded-lg cursor-pointer border border-gray-200/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex flex-col items-center text-center gap-1">
        <div className="text-2xl sm:text-3xl text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-600 transition-colors">
          {icon}
        </div>
        <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{name}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200/40 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400">
          {level}
        </span>
      </div>
    </motion.div>
  );

  const SectionHeading = ({ title, icon }: { title: string; icon: JSX.Element }) => (
    <motion.h3
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-lg sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2"
    >
      <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-sky-500 animate-pulse"></span>
      <span className="text-cyan-500 dark:text-cyan-400">{icon}</span>
      {title}
    </motion.h3>
  );

  const sectionIcons = [<FaCode />, <FaProjectDiagram />, <FaTools />, <FaRobot />];

  return (
    <section id="skills" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
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
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-medium"
          >
            Technical Stack
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-500 bg-clip-text text-transparent px-4">
            Skills & Expertise
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skill Sections */}
        {[
          { title: "Programming Languages", data: skillsData.languages },
          { title: "Frameworks & Libraries", data: skillsData.frameworks },
          { title: "Tools & Technologies", data: skillsData.tools },
          { title: "AI & ML", data: skillsData.ai_skills },
        ].map((section, idx) => (
          <div key={idx} className="mb-6 sm:mb-8">
            <SectionHeading title={section.title} icon={sectionIcons[idx]} />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3"
            >
              {section.data?.map((skill, index) => (
                <SkillCard key={index} {...skill} />
              ))}
            </motion.div>
          </div>
        ))}

        {/* DSA / LeetCode Section */}
        {skillsData.dsa && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8"
          >
            <div className="rounded-lg p-4 sm:p-5 bg-white/50 dark:bg-gray-800/50 border border-gray-200/20 dark:border-gray-700/20 shadow-sm flex flex-col sm:flex-row items-center gap-3 sm:gap-4 backdrop-blur-sm">
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-4xl sm:text-5xl flex-shrink-0 text-cyan-500 dark:text-cyan-400"
              >
                {skillsData.dsa.icon}
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  {skillsData.dsa.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
                  {skillsData.dsa.description}
                </p>
                <motion.a
                  href={"https://leetcode.com/u/ashishnethi/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit LeetCode
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
