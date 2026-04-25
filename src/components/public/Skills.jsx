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

        {/* Modern Vertical Skills Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Hard Skills Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Technical Skills</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 md:gap-x-10 md:gap-y-6">
              {hardSkills.map((skill, idx) => (
                <div 
                  key={`hard-${idx}`} 
                  className="w-full group bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-lg flex items-center gap-4 transition-all duration-300 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary/50 shadow-sm dark:shadow-lg hover:shadow-primary/20 cursor-default"
                >
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Soft Skills</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 md:gap-x-10 md:gap-y-6">
              {(
                // produce unified list of objects with name/proficiency
                (softSkills.length > 0 ? softSkills.map(s => ({ name: s.name, proficiency: s.proficiency })) : defaultSoft.map(s => ({ name: s.name })))
                // unique by name
                .filter(Boolean).filter((v, i, a) => a.findIndex(x => x.name === v.name) === i)
              ).map((item, i) => (
                <div
                  key={`soft-${i}`}
                  className="w-full group bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-lg flex items-center gap-4 transition-all duration-300 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary/50 shadow-sm dark:shadow-lg hover:shadow-primary/20 cursor-default"
                >
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
