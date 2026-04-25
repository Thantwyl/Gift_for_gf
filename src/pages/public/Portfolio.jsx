import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/public/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Skills from '../../components/public/Skills';
import Projects from '../../components/public/Projects';
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
        
        {/* Modern Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Orbital Animation Systems - Like Hero Profile Image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Orbital System */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 origin-center"
          >
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-12 w-20 h-20 bg-teal-400/20 rounded-full blur-xl"></div>
            <div className="absolute -left-12 top-1/3 w-16 h-16 bg-pink-400/15 rounded-full blur-lg"></div>
          </motion.div>
          
          {/* Medium Orbital System */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 origin-center"
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-500/25 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-teal-400/25 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -left-10 w-18 h-18 bg-primary/20 rounded-full blur-lg"></div>
            <div className="absolute -right-10 top-1/4 w-14 h-14 bg-purple-400/20 rounded-full blur-lg"></div>
          </motion.div>
          
          {/* Small Orbital System */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute top-1/2 left-1/2 w-64 h-64 origin-center -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-400/30 rounded-full blur-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/25 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 -right-6 w-10 h-10 bg-indigo-500/25 rounded-full blur-lg"></div>
          </motion.div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/20 rotate-45"
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-12 h-12 bg-indigo-500/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-3/4 w-8 h-8 bg-teal-400/20 rotate-12"
            animate={{
              rotate: [12, 72, 12],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/20 rotate-45"
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-12 h-12 bg-indigo-500/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-3/4 w-8 h-8 bg-teal-400/20 rotate-12"
            animate={{
              rotate: [12, 72, 12],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        {/* Animated Wave Patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent"
            animate={{
              x: [-100, 100, -100],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-indigo-500/5 to-transparent"
            animate={{
              x: [100, -100, 100],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5,
            }}
          />
        </div>
      </div>
      
      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
