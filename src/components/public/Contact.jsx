import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Check, Send } from 'lucide-react';
import { getSectionData } from '../../services/firestore';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [contact, setContact] = useState({

  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - you'll need to set these up
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log('🔍 EmailJS Configuration Debug:');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey ? 'Present' : 'Missing');

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please set up your EmailJS account and add the environment variables.');
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Portfolio Owner', // You can customize this
        reply_to: formData.email,
      };

      console.log('📤 Sending email with params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('✅ EmailJS API Response:', result);

      // Additional verification - check if email was actually queued
      if (result.status === 200 && result.text === 'OK') {
        console.log('✅ Email successfully queued for delivery');
      } else {
        console.warn('⚠️ EmailJS returned unexpected response:', result);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Show success message briefly
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('❌ Error submitting form:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text
      });
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

                <div className="flex md:justify-start justify-start">
                  {contact.socials?.linkedin && (
                    <a
                      href={contact.socials.linkedin} target="_blank" rel="noreferrer" className="mobile-optimized touch-manipulation p-3 shadow-md shadow-slate-200 dark:shadow-lg dark:shadow-none rounded-full bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 lg:hover:bg-primary/10 dark:lg:hover:bg-primary/20 lg:hover:text-primary dark:lg:hover:text-primary transition-all lg:hover:scale-110 border border-slate-200 dark:border-slate-700"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
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

              <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none flex-1"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mobile-optimized touch-manipulation w-full px-8 py-3 rounded-full bg-primary text-white dark:text-slate-900 font-semibold lg:hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all lg:hover:scale-105 active:scale-95 shadow-md shadow-primary/20 flex items-center justify-center gap-2 group mt-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="lg:group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <Check size={18} />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Thank you for your message. I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                    <span className="font-medium">Failed to send message</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Please try again or contact me directly via email.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
