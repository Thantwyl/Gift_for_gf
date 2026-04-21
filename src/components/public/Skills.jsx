import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollectionData } from '../../services/firestore';

const Skills = () => {
  const defaultSkills = [];

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

  // Separate hard and soft skills. Soft skills should have `type: 'soft'` in firestore.
  const hardSkills = mockSkills.filter(s => !s.type || s.type === 'hard');
  const softSkills = mockSkills.filter(s => s.type === 'soft');

  // Fallback soft skills if none provided from firestore
  const defaultSoft = [
,
  ];

  

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

        {/* Hard Skills - original progress bar style */}
        <div className="max-w-3xl mx-auto mb-12">
          {hardSkills.map((skill, idx) => (
            <motion.div 
              key={`hard-${idx}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="mb-6"
            >
              <div className="flex justify-between items-end mb-2 transition-colors duration-500">
                <span className="text-lg font-medium text-slate-700 dark:text-slate-300 transition-colors duration-500">{skill.name}</span>
                <span className="text-sm font-bold text-primary">{skill.level ?? 80}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-500">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level ?? 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.15 + (idx * 0.08) }}
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills - new style: chips with subtle animations */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {(
              // produce unified list of objects with name/proficiency
              (softSkills.length > 0 ? softSkills.map(s => ({ name: s.name, proficiency: s.proficiency })) : defaultSoft.map(s => ({ name: s.name })))
              // unique by name
              .filter(Boolean).filter((v, i, a) => a.findIndex(x => x.name === v.name) === i)
            ).map((item, i) => (
              <motion.div
                key={`soft-${i}`}
                layout
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.06, y: -6, boxShadow: '0 12px 30px rgba(2,6,23,0.08)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 220, damping: 22 }}
                className="group bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-lg flex items-center gap-4 transition-colors duration-200 hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary/50 cursor-default"
              >
                <span className="text-slate-700 dark:text-slate-200 font-medium text-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
                {item.proficiency && <span className="text-primary font-medium">{item.proficiency}</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
