import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const mockContact = {
    email: "hello@johndoe.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">Get In <span className="text-primary">Touch</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 bg-white/50 dark:bg-darkCard/50 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl items-center relative overflow-hidden backdrop-blur-sm transition-colors duration-500 shadow-sm dark:shadow-none">
          {/* Decorative element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-500">Let's work together!</h3>
            
            <div className="flex items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-xl text-primary">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <a href={`mailto:${mockContact.email}`} className="text-xl text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                  {mockContact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-xl text-primary">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Phone</p>
                <a href={`tel:${mockContact.phone}`} className="text-xl text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                  {mockContact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-xl text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <span className="text-xl text-slate-700 dark:text-slate-300 transition-colors duration-500">
                  {mockContact.location}
                </span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-4 transition-colors duration-500">
              {mockContact.socials.github && (
                <a href={mockContact.socials.github} target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700">
                  <Github size={20} />
                </a>
              )}
              {mockContact.socials.linkedin && (
                <a href={mockContact.socials.linkedin} target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700">
                  <Linkedin size={20} />
                </a>
              )}
               {mockContact.socials.twitter && (
                <a href={mockContact.socials.twitter} target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700">
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
              <textarea 
                placeholder="Your Message" 
                rows="5"
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none shadow-sm"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-primary text-white dark:text-slate-900 font-bold text-lg py-4 rounded-xl hover:bg-teal-400 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
