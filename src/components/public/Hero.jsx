import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { getSectionData } from '../../services/firestore';

const Hero = () => {
  const defaultData = {

  };

  const [mockData, setMockData] = useState(defaultData);

  useEffect(() => {
    const fetchHeroData = async () => {
      const liveData = await getSectionData('hero');
      if (liveData) {
        setMockData({
          name: liveData.name || defaultData.name,
          title: liveData.title || defaultData.title,
          introduction: liveData.introduction || defaultData.introduction,
          profileImageUrl: liveData.profileImageUrl || defaultData.profileImageUrl,
          cvUrl: liveData.cvUrl || null
        });
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center lg:text-left"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-500">
            <span className="block">Hi, I'm</span>
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500 dark:to-indigo-400 whitespace-nowrap overflow-hidden text-4xl sm:text-5xl lg:text-6xl max-w-[90vw]">
              {mockData.name}
            </span>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-medium text-slate-700 dark:text-slate-400 transition-colors duration-500">
            {mockData.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-500">
            {mockData.introduction}
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href={mockData.cvUrl || "/cv.pdf"} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-primary text-white dark:text-slate-900 font-semibold hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20">
              Download CV
            </a>
            <a href="#projects" className="px-8 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm shadow-slate-200 dark:shadow-none">
              Explore Projects
            </a>
          </div>

          <div className="pt-6 flex gap-4 justify-center lg:justify-start">
            <a href="mailto:hello@example.com" className="p-3 shadow-md shadow-slate-200 dark:shadow-lg dark:shadow-none rounded-full bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-all hover:scale-110 border border-slate-200 dark:border-slate-700">
              <Mail size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 shadow-md shadow-slate-200 dark:shadow-lg dark:shadow-none rounded-full bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-all hover:scale-110 border border-slate-200 dark:border-slate-700">
              <Linkedin size={22} />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end relative"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-2xl relative z-10 transition-colors duration-500">
            <img 
              src={mockData.profileImageUrl} 
              alt={mockData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Orbital circular animations behind image */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none origin-center scale-[1.2]"
          >
            {/* These blobs orbit the center because their container rotates */}
            <div className="absolute -top-4 -left-4 w-32 lg:w-48 h-32 lg:h-48 bg-primary/40 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 lg:w-48 h-32 lg:h-48 bg-indigo-500/40 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 -right-8 w-24 h-24 bg-teal-400/30 rounded-full blur-2xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
