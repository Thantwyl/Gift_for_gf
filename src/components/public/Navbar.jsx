import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import {
  FiHome,
  FiUser,
  FiStar,
  FiBriefcase,
  FiMail,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', Icon: FiHome },
    { name: 'About', href: '#about', Icon: FiUser },
    { name: 'Skills', href: '#skills', Icon: FiStar },
    { name: 'Projects', href: '#projects', Icon: FiBriefcase },
    { name: 'Contact', href: '#contact', Icon: FiMail },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-300 ease-out border-b ${
        scrolled
          ? 'bg-white/80 dark:bg-darkBase/80 backdrop-blur-md shadow-lg shadow-slate-200/20 dark:shadow-none border-slate-200 dark:border-transparent'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
        <a href="#home" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors flex items-center gap-2">
          PORT<span className="text-primary">FOLIO</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-transform transform hover:-translate-y-0.5"
            >
              <link.Icon className="text-slate-500 dark:text-slate-300" />
              <span>{link.name}</span>
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 ml-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md text-slate-700 dark:text-slate-200 bg-transparent focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden"
          >
            <div className="px-6 pb-6 space-y-3 flex flex-col items-start">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
                >
                  <link.Icon />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
