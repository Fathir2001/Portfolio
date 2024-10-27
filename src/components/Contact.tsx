import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-900 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-primary-200 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Contact Form */}
            <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-accent-400' : 'text-primary-400'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/50 text-white placeholder-primary-400 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-accent-400' : 'text-primary-400'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/50 text-white placeholder-primary-400 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <div className={`absolute left-3 top-4 transition-colors duration-200 ${
                    focusedField === 'message' ? 'text-accent-400' : 'text-primary-400'
                  }`}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-primary-800/50 border border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400/50 text-white placeholder-primary-400 transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-400/50"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-4 text-primary-200">
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent-400" />
                    rifathanfathir@gmail.com
                  </p>
                  <p className="flex items-center gap-3">
                    <User className="w-5 h-5 text-accent-400" />
                    Available for freelance work
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Response Time</h3>
                <p className="text-primary-200">
                  I typically respond within 24 hours during business days.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;