import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      email: formData.email ? '' : 'Email is required',
      message: formData.message ? '' : 'Message is required'
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

    emailjs.send('service_oyyto7g', 'template_ewlzi49', formData, 'Glai-R1daTW_8_mbt')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
            <div className="backdrop-blur-lg bg-primary-900/70 p-8 rounded-2xl border border-primary-700/70 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
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
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
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
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
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
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </motion.div>

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
                className="backdrop-blur-lg bg-primary-900/70 p-6 rounded-2xl border border-primary-700/70 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]"
                style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)' }}
              >
                <h3 className="text-xl font-semibold text-accent-400 mb-4">Contact Information</h3>
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
                className="backdrop-blur-lg bg-primary-900/70 p-6 rounded-2xl border border-primary-700/70 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]"
                style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)' }}
              >
                <h3 className="text-xl font-semibold text-accent-400 mb-4">Response Time</h3>
                <p className="text-primary-200">
                  I typically respond within 24 hours during business days.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Your Message Sent Successfully</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;