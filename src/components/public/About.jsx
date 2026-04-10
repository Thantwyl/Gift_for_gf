import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSectionData } from '../../services/firestore';

const About = () => {
  // Mock data representing standard Firebase payload (used as a fallback)
  const defaultMockData = {
    personalInfo: "Passionate software developer with a knack for turning complex problems into elegant, intuitive designs. I specialize in the React ecosystem and have a strong foundation in modern JavaScript and performance optimization.",
    education: [
      {
        institution: "University of Technology",
        degree: "B.S. in Computer Science",
        year: "2018 - 2022"
      },
      {
        institution: "Code Bootcamp",
        degree: "Full Stack Web Development",
        year: "2023"
      }
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Professional" }
    ],
    experiences: [
      {
        role: "Software Developer Intern",
        company: "Tech Solutions · Bangkok, Thailand",
        timeline: "Oct 2022 - Mar 2023",
        description: "- Built an internal AI workflow automation tool with React\n- Designed PostgreSQL schemas and REST APIs"
      },
      {
        role: "Full Stack Developer",
        company: "Startup Inc · Remote",
        timeline: "Jun 2023 - Present",
        description: "- Built production features with Svelte\n- Optimized LLM prompt logic for AI consistency"
      }
    ]
  };

  const [mockData, setMockData] = useState(defaultMockData);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const liveData = await getSectionData('about');
        if (liveData) {
          // Merge live data with default skeleton so it doesn't crash if arrays are empty
          setMockData({
            personalInfo: liveData.personalInfo || defaultMockData.personalInfo,
            education: liveData.education || [],
            languages: liveData.languages || [],
            experiences: liveData.experiences || []
          });
        }
      } catch (error) {
        console.error("Error fetching about section:", error);
      }
    };
    
    fetchRealData();
  }, []);

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">About <span className="text-primary">Me</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col gap-16">
          
          {/* Top Row: Personal Info & Education Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Personal Info</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-500">
                {mockData.personalInfo}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Education</h3>
              <div className="space-y-6">
                {mockData.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 w-full border-primary/40">
                    <div className="absolute w-4 h-4 bg-white dark:bg-slate-900 border-2 border-primary rounded-full -left-[9px] top-1 transition-colors duration-500"></div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 transition-colors duration-500">{edu.degree}</h4>
                    <p className="text-primary font-medium mt-1">{edu.institution}</p>
                    <p className="text-slate-500 text-sm mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Languages Section */}
          {mockData.languages && mockData.languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Languages</h3>
              <div className="flex flex-wrap gap-4">
                {mockData.languages.map((lang, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-lg flex items-center gap-4 transition-all duration-300 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary/50 shadow-sm dark:shadow-lg hover:shadow-primary/20 cursor-default"
                  >
                    <span className="text-slate-700 dark:text-slate-200 font-medium text-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{lang.language}</span>
                    <span className="text-primary font-medium">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-6 transition-colors duration-500">Experience</h3>
            <div className="space-y-12">
              {mockData.experiences && mockData.experiences.map((exp, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 group">
                  {/* Left Side: Date / Timeline */}
                  <div className="md:w-48 shrink-0 md:text-left pt-1">
                    {exp.timeline && (
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400/80 uppercase tracking-widest block group-hover:text-primary transition-colors">
                        {exp.timeline}
                      </span>
                    )}
                  </div>
                  
                  {/* Right Side: Vertical Line & Content */}
                  <div className="relative flex-1 pl-6 md:pl-10 border-l-2 border-indigo-500/20 group-hover:border-indigo-500/60 transition-colors pb-4">
                    {/* The timeline node dot */}
                    <div className="absolute w-4 h-4 bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-full -left-[9px] top-1.5 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-colors duration-500"></div>
                    
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{exp.role}</h4>
                    <p className="text-indigo-500 dark:text-indigo-400 font-medium my-2">{exp.company}</p>
                    <ul className="text-slate-600 dark:text-slate-400 text-base leading-relaxed space-y-2 mt-4 list-none transition-colors duration-500">
                      {exp.description.split('\n').map((line, i) => (
                        line.trim() ? <li key={i} className="flex gap-3"><span className="text-primary mt-1">▹</span> <span>{line.replace(/^-/, '').trim()}</span></li> : null
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {(!mockData.experiences || mockData.experiences.length === 0) && (
                 <p className="text-slate-500 italic">No experience data available.</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
