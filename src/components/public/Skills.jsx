import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollectionData } from '../../services/firestore';

const Skills = () => {
  const defaultSkills = [
    { name: "React / React Native", level: 90 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js / Express", level: 75 },
    { name: "Firebase / Firestore", level: 85 },
  ];

  const [mockSkills, setMockSkills] = useState(defaultSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      const liveData = await getCollectionData('skills');
      if (liveData && liveData.length > 0) {
        setMockSkills(liveData);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">My <span className="text-primary">Skills</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {mockSkills.map((skill, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="mb-8"
            >
              <div className="flex justify-between items-end mb-2 transition-colors duration-500">
                <span className="text-lg font-medium text-slate-700 dark:text-slate-300 transition-colors duration-500">{skill.name}</span>
                <span className="text-sm font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-500">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
