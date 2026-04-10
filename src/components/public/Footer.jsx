import React from 'react';

const Footer = () => {
  return (
    <footer className="relative mt-20 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors duration-500">
      {/* Decorative Top Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors">
              PORT<span className="text-primary">FOLIO</span>
            </a>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-sm text-sm">
              Building polished, modern, and highly intuitive web experiences.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium">
            <a href="#home" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">Projects</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Designed & Built by You. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
