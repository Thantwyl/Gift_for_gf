import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Check, Send } from 'lucide-react';
import { getSectionData } from '../../services/firestore';

const Contact = () => {
  const [contact, setContact] = useState({
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    socials: { linkedin: '' },
    whyWorkWithMe: ['', '', '', '']
  });

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const data = await getSectionData('contact');
      if (data && mounted) {
        setContact(prev => ({
          ...prev,
          ...data,
          // Support both old string format and new array format
          whyWorkWithMe: Array.isArray(data.whyWorkWithMe)
            ? data.whyWorkWithMe
            : data.whyWorkWithMe
              ? data.whyWorkWithMe.split(/[.?!]+/).map(s => s.trim()).filter(Boolean).slice(0, 4)
              : prev.whyWorkWithMe
        }));
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  const whyItems = (contact.whyWorkWithMe || []).filter(s => s && s.trim());

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Side — Contact Info Card (takes 3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Contact Info Box */}
            <div className="bg-white/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm transition-colors duration-500 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-500">
                Contact Info
              </h3>

              {/* Email & Phone — Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location & LinkedIn row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">Location</p>
                    <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                      {contact.location}
                    </span>
                  </div>
                </div>

                {/* LinkedIn Icon — aligned with Phone text start margin */}
                {contact.socials?.linkedin && (
                  <div className="flex items-center pl-[52px]">
                    <a href={contact.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 shadow-md shadow-slate-200 dark:shadow-lg dark:shadow-none rounded-full bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-all hover:scale-110 border border-slate-200 dark:border-slate-700">
                      <Linkedin size={22} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Why Work With Me Box */}
            {whyItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="bg-white/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm transition-colors duration-500 shadow-sm dark:shadow-none"
              >
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-5 transition-colors duration-500">
                  Why Work With Me?
                </h4>
                <ul className="space-y-4">
                  {whyItems.map((sentence, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm transition-colors duration-500">
                        {sentence}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side — Send Message Form (takes 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none transition-colors duration-500 h-full flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-500">
                Send Message
              </h3>

              <form className="space-y-5 flex-1 flex flex-col" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none flex-1"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white dark:text-slate-900 font-bold text-base py-4 rounded-full hover:bg-teal-400 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mt-auto"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
