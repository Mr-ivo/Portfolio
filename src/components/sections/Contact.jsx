'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Loader2, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedText from '../animations/AnimatedText';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const contactRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          throw new Error('Unable to parse server response');
        }
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Received non-JSON response from server');
      }
      
      if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong');
      }
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Message sent successfully!', {
        description: 'Thanks for reaching out. I\'ll get back to you soon!',
        duration: 5000,
      });
      
      showConfetti();
      
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to send message');
      
      toast.error('Message could not be sent', {
        description: err.message || 'Something went wrong. Please try again later.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const showConfetti = () => {
    console.log('Confetti!');
  };
  
  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary-500 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, y }}
      >
        <div className="text-center mb-16">
          <AnimatedText 
            text="Get In Touch" 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out to me using the form below or through my social media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary-500/10 rounded-lg mr-4">
                  <Mail className="text-primary-400" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-medium mb-1">Email</h4>
                  <a href="mailto:ebongngsite@ebongng.site" className="text-white hover:text-primary-400 transition-colors">
                     ebongngsite@ebongng.site
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-primary-500/10 rounded-lg mr-4">
                  <Phone className="text-primary-400" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-medium mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-white hover:text-primary-400 transition-colors">
                    (+237) 679373244
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-primary-500/10 rounded-lg mr-4">
                  <MapPin className="text-primary-400" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-300 font-medium mb-1">Location</h4>
                  <p className="text-white">Douala Cameroon</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-white font-medium mb-4">Find me on</h4>
              <div className="flex space-x-4">
                {['github', 'linkedin', 'instagram'].map((social, index) => (
                  <motion.a
                    key={index}
                    href={`https://${social}.com/WattyMc`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full text-gray-300 hover:text-white hover:bg-primary-500/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{social}</span>
                    {social === 'github' && <Github size={20} />}
                    {social === 'linkedin' && <Linkedin size={20} />}
                    {social === 'instagram' && <Instagram size={20} />}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            {submitted ? (
              <motion.div 
                className="h-full flex flex-col items-center justify-center p-8 bg-gray-800 rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 p-4 bg-green-500/20 rounded-full">
                  <Check className="text-green-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300 text-center mb-6">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                className="p-8 bg-gray-800 rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors w-full flex items-center justify-center disabled:opacity-70 disabled:hover:bg-primary-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}