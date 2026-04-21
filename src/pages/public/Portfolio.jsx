import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/public/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Skills from '../../components/public/Skills';
import Experience from '../../components/public/Experience';
import Contact from '../../components/public/Contact';
import Footer from '../../components/public/Footer';

const Portfolio = () => {
  // Compute initial theme synchronously so the class is set before first paint
  const getInitialDark = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const dark = getInitialDark();
    // Set the class immediately
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return dark;
  });

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-darkBase overflow-x-hidden text-slate-800 dark:text-slate-300 transition-colors duration-500">
      
      {/* Global Premium Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Deep background star-like subtle noise or gradient mapping could go here */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-darkBase dark:to-black opacity-80 transition-colors duration-500"></div>
        
        {/* Animated Global Orbs - Multiply in light mode, Screen in dark mode */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] origin-center opacity-70 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
        >
          <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] md:blur-[150px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full blur-[100px] md:blur-[150px]"></div>
          <div className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] bg-teal-400/20 dark:bg-teal-500/20 rounded-full blur-[100px] md:blur-[150px]"></div>
        </motion.div>
        
        {/* Subtle grid layer for premium modern tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
