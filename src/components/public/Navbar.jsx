import React, { useState, useEffect, useRef } from 'react';
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
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#home', Icon: FiHome },
    { name: 'About', href: '#about', Icon: FiUser },
    { name: 'Skills', href: '#skills', Icon: FiStar },
    { name: 'Projects', href: '#projects', Icon: FiBriefcase },
    { name: 'Contact', href: '#contact', Icon: FiMail },
  ];

  useEffect(() => {
    const calcHeights = () => {
      const navH = navRef.current ? navRef.current.offsetHeight : 0;
      const menuH = mobileMenuRef.current ? mobileMenuRef.current.offsetHeight : 0;
      setNavHeight(navH);
      setSpacerHeight(mobileOpen ? navH + menuH : navH);
    };
    calcHeights();
    window.addEventListener('resize', calcHeights);
    return () => window.removeEventListener('resize', calcHeights);
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    const id = href.startsWith('#') ? href.slice(1) : null;

    const doScroll = () => {
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.hash = href;
        }
      } else {
        window.location.href = href;
      }
    };

    // If the mobile menu is open, close it first so layout stabilizes,
    // then scroll after the close animation completes. Otherwise scroll immediately.
    if (mobileOpen) {
      setMobileOpen(false);
      setTimeout(() => {
        doScroll();
      }, 260); // slightly longer than motion's 220ms to be safe
    } else {
      doScroll();
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        ref={navRef}
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
          SHUNN<span className="text-primary">PORTFOLIO</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
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
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="moon-mobile"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Moon size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun-mobile"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Sun size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md text-slate-700 dark:text-slate-200 bg-transparent focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed left-0 right-0 z-40"
            style={{
              // ensure background matches navbar for visual continuity
              backdropFilter: 'blur(8px)',
              top: navHeight ? `${navHeight}px` : undefined,
            }}
          >
            <div className="px-6 pb-6 pt-4 space-y-3 flex flex-col items-start bg-white dark:bg-darkBase/95 border-b border-slate-200 dark:border-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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

      {/* spacer pushes page content down when nav is fixed and mobile menu open */}
      <div
        aria-hidden
        style={{ height: spacerHeight, transition: 'height 200ms ease' }}
      />
    </>
  );
};

export default Navbar;
