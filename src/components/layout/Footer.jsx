'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="w-full py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Wave decoration */}
        <div className="relative h-12 mb-8 overflow-hidden">
          <div className="absolute w-full h-12 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About</h3>
            <p className="text-gray-300 mb-4">
              A passionate web developer creating modern, responsive, and user-friendly websites with attention to detail.
            </p>
            <div className="flex space-x-4 mt-4">
              <motion.a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right column - contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <p className="text-gray-300 mb-4">
              Feel free to reach out if you have any questions or would like to work together.
            </p>
            <a 
              href="mailto:your.email@example.com" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Mail size={16} className="mr-2" />
              ebongthierry569@gmail.com
            </a>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {currentYear} Your Portfolio. Built with <span className="text-red-400"><Heart size={12} className="inline" /></span> using Next.js and Tailwind CSS.
          </p>
          
          <motion.button 
            onClick={scrollToTop}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}