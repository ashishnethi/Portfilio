"use client";

import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
  }) => (
    <motion.div
      variants={itemVariants}
      className="p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 hover:border-cyan-500/60 transition-all"
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-medium text-sm leading-tight">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{level}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
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
            Technical Stack
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent px-4">
            Skills & Expertise
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Languages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Programming Languages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {skillsData.languages?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </motion.div>

        {/* Frameworks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Frameworks & Libraries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {skillsData.frameworks?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Tools & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {skillsData.tools?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </motion.div>

        {/* AI Skills Section - Just below Tools */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
          >
          <h3 className="text-xl font-semibold mb-4 text-center">
              Artificial Intelligence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {skillsData.ai_skills?.map((skill, index) => (
              <SkillCard key={index} {...skill} />
      ))}
        </div>
    </motion.div>


        {/* DSA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{skillsData.dsa?.icon}</span>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {skillsData.dsa?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {skillsData.dsa?.description}
                </p>
                <a
                  href="https://leetcode.com/your-profile"
                  target="_blank"
                  className="text-cyan-600 dark:text-cyan-400 text-xs mt-2 inline-block hover:underline"
                >
                  Visit my LeetCode Profile
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
