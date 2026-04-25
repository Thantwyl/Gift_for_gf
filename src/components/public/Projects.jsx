import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getCollectionData } from '../../services/firestore';

const Projects = () => {
  const defaultProjects = [
    
  ];

  const [mockProjects, setMockProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      const liveData = await getCollectionData('projects');
      if (liveData && liveData.length > 0) {
        setMockProjects(liveData);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">Featured <span className="text-primary">Projects</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockProjects.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-darkCard border border-slate-200 dark:border-slate-700/50 hover:border-primary border-transparent dark:hover:border-primary/50 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {item.liveLink && (
                    <a href={item.liveLink} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-primary dark:hover:bg-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-500">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-500">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;