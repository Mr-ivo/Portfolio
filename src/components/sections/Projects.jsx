'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Layers, Database, Layout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../animations/AnimatedText';
import AnimateInView from '../animations/AnimateInView';
import TiltCard from '../ui/TiltCard';
import Sparkles from '../animations/Sparkles';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Apparell_glow",
    description: "A fully responsive e-commerce website with modern UI and seamless user experience.",
    image: "/assets/apparell_glow.jpg",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "MongoDB"],
    link: "https://apparellglow.vercel.app/",
    github: "#",
    category: "Web App",
    icon: <Code className="w-4 h-4" />
  },
  {
    title: "UrbanCamerron",
    description: "Interactive platform showcasing different cities in Cameroon with immersive visuals.",
    image: "/assets/urban_cameroon.jpg",
    technologies: ["React", "GSAP", "Tailwind CSS", "Firebase"],
    link: "https://urban-cameroon.vercel.app/",
    github: "#",
    category: "Web App",
    icon: <Layout className="w-4 h-4" />
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with animations and interactive elements.",
    image: "/assets/portfolio.jpg",
    technologies: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    link: "#",
    github: "#",
    category: "UI/UX",
    icon: <Layers className="w-4 h-4" />
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Web App", "UI/UX", "Backend"];
  
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    
    // Create a staggered animation for project cards
    gsap.fromTo(
      projectCards,
      { 
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Text reveal animations
    gsap.utils.toArray('.project-title').forEach((title, i) => {
      gsap.fromTo(
        title,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 + (i * 0.1),
          scrollTrigger: {
            trigger: title,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Filter tabs animation
    gsap.fromTo(
      '.filter-tab',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.filter-tabs',
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Create interesting background animations
    const particles = document.querySelectorAll('.project-particle');
    particles.forEach((particle, i) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * sectionRef.current.offsetHeight,
        opacity: Math.random() * 0.3 + 0.1,
        scale: Math.random() * 0.6 + 0.4
      });
      
      gsap.to(particle, {
        y: `+=${Math.random() * 100 - 50}`,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1
      });
    });
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    // Animate the filtering transition
    gsap.fromTo(
      '.project-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: 0.2
      }
    );
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden"
    >
      {/* Background floating particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="project-particle absolute rounded-md bg-primary-500/5 transform rotate-45 backdrop-blur-sm"
          style={{ 
            width: Math.random() * 60 + 40 + 'px', 
            height: Math.random() * 60 + 40 + 'px' 
          }}
        />
      ))}
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <Sparkles>
            <AnimatedText
              text="My Projects"
              className="section-heading gradient-text mb-6"
            />
          </Sparkles>
          
          <p className="text-light/70 max-w-2xl text-center mb-12">
            Explore my recent projects that showcase my skills in web development, design, and problem-solving.
            Each project represents a unique challenge and approach to creating impactful digital experiences.
          </p>
          
          {/* Filter tabs */}
          <div className="filter-tabs flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`filter-tab px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                    : 'bg-dark/60 text-light/70 hover:text-light border border-gray-800 hover:border-primary-500/30'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <TiltCard 
              key={index}
              className="h-full"
              perspective={1500}
              tiltMaxAngle={8}
            >
              <div className="project-card group relative bg-dark/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-primary-500/20 hover:border-primary-500/30 h-full flex flex-col">
                {/* Project category badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-dark/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary-400 border border-primary-500/20">
                  {project.icon}
                  <span>{project.category}</span>
                </div>
                
                <div className="project-image relative h-52 overflow-hidden">
                  {/* Image overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-secondary-500/20 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10 opacity-70"></div>
                  
                  <Image
                    src={project.image || "/thierry.jpg"} // Fallback image
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Animated corner accent */}
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 * index, duration: 0.5 }}
                  >
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-primary-500/30 transform rotate-45 origin-top-right translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="project-content p-6 relative z-20 flex flex-col flex-grow">
                  {/* Title with animated underline */}
                  <div className="mb-2 relative">
                    <h3 className="project-title text-xl font-bold text-light font-heading">
                      {project.title}
                    </h3>
                    <motion.div 
                      className="h-0.5 w-16 bg-gradient-to-r from-primary-500 to-secondary-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (index * 0.1), duration: 0.7 }}
                    />
                  </div>
                  
                  <p className="text-light/70 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs text-light/90 bg-primary-500/10 px-2 py-1 rounded-full border border-primary-500/20 hover:bg-primary-500/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-primary-500/10 hover:bg-primary-500/30 rounded-full text-light/80 hover:text-light transition-colors duration-300"
                      aria-label={`Visit ${project.title} website`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-primary-500/10 hover:bg-primary-500/30 rounded-full text-light/80 hover:text-light transition-colors duration-300"
                      aria-label={`View ${project.title} code on GitHub`}
                      whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>
                
                {/* Glowing hover effect */}
                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20 z-10 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Border hover effect */}
                <div className="absolute inset-0 border-2 border-primary-500/0 rounded-xl z-0 transition-all duration-500 group-hover:border-primary-500/30"></div>
              </div>
            </TiltCard>
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-dark/80 border border-gray-800"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 border border-primary-500/30 rounded-full"></div>
              <div className="absolute inset-2 border border-secondary-500/30 rounded-full"></div>
              <div className="absolute inset-4 border border-primary-500/30 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
