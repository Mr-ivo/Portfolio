 'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, User, Mail } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "HOME", href: "home", icon: <Home className="w-3 h-3 inline" /> },
    { name: "REALISATIONS", href: "realisation", icon: <FileText className="w-3 h-3 inline" /> },
    { name: "ABOUT ME", href: "about", icon: <User className="w-3 h-3 inline" /> },
    { name: "SERVICE", href: "service", icon: <User className="w-3 h-3 inline" /> },
    { name: "CONTACT", href: "contact", icon: <Mail className="w-3 h-3 inline" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg fixed w-full z-10 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/waty.png" 
            width={60}
            height={10} 
            alt="Logo"
            className="transition-transform transform hover:scale-110"
          />
        </Link>
      </div>
      <ul className="hidden md:flex space-x-4"> {/* Reduced space between links */}
        {links.map((link, index) => (
          <li key={index} className="relative group">
            <a
              href={`#${link.href}`}
              onClick={() => scrollToSection(link.href)}
              className="flex items-center text-white text-sm font-medium rounded-lg transition duration-300 ease-in-out px-2 py-1 hover:bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {link.icon}
              <span className="ml-1">{link.name}</span>
            </a>
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </li>
        ))}
      </ul>
      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        <div className="w-5 h-1 bg-white mb-1 transition-all duration-300"></div>
        <div className="w-5 h-1 bg-white mb-1 transition-all duration-300"></div>
        <div className="w-5 h-1 bg-white transition-all duration-300"></div>
      </div>
      {isMenuOpen && (
        <ul className="absolute top-16 right-0 bg-white shadow-lg w-full text-center md:hidden">
          {links.map((link, index) => (
            <li key={index} className="py-1 cursor-pointer" onClick={() => scrollToSection(link.href)}>
              <a href={`#${link.href}`} className="flex items-center block py-2 px-4 text-gray-700 font-medium rounded-lg hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white transition duration-300 ease-in-out text-sm">
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
