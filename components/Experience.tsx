"use client";

import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            My professional journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-emerald-500"></div>

          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative pl-20 pb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-gray-900"></div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {exp.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                      {exp.duration}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-blue-600 dark:text-blue-400 mt-1">
                          ✓
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


