'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Home, Briefcase, User, Code, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", icon: <Home size={16} />, to: "home" },
    { name: "About", icon: <User size={16} />, to: "about" },
    { name: "Skills", icon: <Code size={16} />, to: "skills" },
    { name: "Projects", icon: <Briefcase size={16} />, to: "projects" },
    { name: "Contact", icon: <Mail size={16} />, to: "contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <div className="flex items-center space-x-2">
            <Image 
              src="/waty.png"
              alt="Logo"
              width={45}
              height={45}
              className="rounded-full border-2 border-pink-500"
            />
            <span className="font-bold text-xl text-purple-400">
              Ebong<span className="text-pink-400">Thiery</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, i) => (
            <ScrollLink
              key={i}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="relative px-4 py-2 rounded-md text-gray-300 hover:text-white font-medium cursor-pointer group transition-all duration-300 mx-1"
              activeClass="text-white before:absolute before:inset-0 before:bg-purple-500/10 before:rounded-md"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-1.5">{item.icon}</span> 
                {item.name}
                <span className="absolute -bottom-px left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </ScrollLink>
          ))}
        </div>

        {/* Resume Button */}
        <div className="hidden lg:block">
          <a 
            href="/assets/Cv3.pdf" 
            download
            className="btn-outline flex items-center"
          >
            <Download size={18} className="mr-1.5" /> Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="lg:hidden relative z-50 p-1.5 rounded-md text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-6 p-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-xl font-medium text-gray-300 hover:text-white py-2 px-4 transition-colors duration-300"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </ScrollLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <a 
                  href="/assets/Cv3.pdf" 
                  download
                  className="btn-primary flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={18} className="mr-1.5" /> Download Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}