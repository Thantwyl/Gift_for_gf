import React, { useEffect, useState } from 'react';
import { Linkedin, ArrowUp } from 'lucide-react';
import { getSectionData } from '../../services/firestore';

const Footer = () => {
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const data = await getSectionData('contact');
      if (mounted && data?.socials?.linkedin) setLinkedin(data.socials.linkedin);
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <footer className="relative mt-20 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors duration-500">
      {/* Decorative Top Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors">
              SHUNN<span className="text-primary"> PORTFOLIO</span>
            </a>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-sm text-sm">
              Building polished, modern, and highly intuitive web experiences.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div id="footer-socials" className="flex items-center gap-3">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 shadow-md shadow-slate-200 dark:shadow-lg rounded-full bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-all hover:scale-110 border border-slate-200 dark:border-slate-700"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>

            <a
              href="#home"
              aria-label="Back to top"
              className="p-3 shadow-md shadow-slate-200 dark:shadow-lg rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-all hover:scale-110 border border-slate-200 dark:border-slate-700"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center text-slate-500 text-sm">
          <p className="text-center">© {new Date().getFullYear()} Shunn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
