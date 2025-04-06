'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Code, Server, Database, Layout, ChevronRight, User, Briefcase, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../animations/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Use framer-motion scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    const currentImageRef = imageRef.current;
    
    if (currentImageRef) {
      currentImageRef.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentImageRef) {
        currentImageRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  const skills = {
    technical: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", 
      "React.js", "Next.js", "Node.js", "Express", 
      "MongoDB", "PostgreSQL", "RESTful APIs",
      "Tailwind CSS", "Git/GitHub"
    ],
    design: [
      "UI/UX Design", "Figma", "Responsive Design",
      "Animation", "Wireframing", "Prototyping"
    ],
    soft: [
      "Problem Solving", "Team Collaboration", "Communication",
      "Time Management", "Adaptability", "Project Management"
    ]
  };
  
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive web applications with modern frameworks and libraries.",
      features: ["React.js & Next.js", "State Management", "Responsive Design", "Modern UI Components"]
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs that power your digital products.",
      features: ["Node.js & Express", "RESTful APIs", "Authentication", "Server Management"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Design",
      description: "Implementing efficient database solutions with proper schema design and optimization.",
      features: ["SQL & NoSQL", "Schema Design", "Query Optimization", "Data Modeling"]
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Crafting beautiful and intuitive user interfaces with a focus on user experience.",
      features: ["User Research", "Wireframing", "Prototyping", "Interaction Design"]
    }
  ];
  
  const personalData = {
    bio: "I'm a passionate Full-Stack Developer with over 5 years of experience creating web applications that combine elegant design with powerful functionality. My journey in web development began with a fascination for creating interactive user experiences, and has evolved into a professional career building solutions that solve real-world problems.",
    experience: "Throughout my career, I've worked on a diverse range of projects that have sharpened my skills across the full development stack. I've collaborated with talented teams on building everything from e-commerce platforms to complex web applications.",
    education: "My formal education in Computer Science provided me with a solid foundation in programming principles and software engineering. I've supplemented this with continuous learning through online courses, bootcamps, and professional certifications."
  };

  // Tab animation variants
  const tabVariants = {
    inactive: { opacity: 0.6, y: 0 },
    active: { opacity: 1, y: 0 },
    hover: { opacity: 0.8, y: -2 }
  };
  
  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,0)_60%)] z-0"></div>

      <div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='white' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"></div>
      <motion.div 
        className="absolute top-40 right-0 w-72 h-72 rounded-full blur-[120px] z-0"
        style={{ 
          background: 'radial-gradient(circle, rgba(75,75,75,0.3) 0%, rgba(50,50,50,0) 70%)',
          opacity 
        }}
      ></motion.div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity }}
      >
        <div className="text-center mb-16">
          <div className="inline-block">
            <h4 className="text-gray-400 text-sm tracking-wider uppercase mb-3">Get to know me</h4>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">About Me</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 about-image relative">
            <div 
              ref={imageRef} 
              className="relative mx-auto lg:mx-0 max-w-md perspective-[1000px] transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Decorative elements behind the image */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-gray-700/50 opacity-60"></div>
              <div className="absolute -inset-8 rounded-full border border-gray-800/50 opacity-40"></div>
              
              {/* Image with glass effect */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-900/30 backdrop-blur-sm p-3 border border-gray-800/50 shadow-[0_0_24px_rgba(0,0,0,0.3)]">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/thierry.jpg"
                    alt="Ebong Thiery"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 rounded-xl"></div>
                </div>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gray-500/50 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-500/50 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gray-500/50 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gray-500/50 rounded-br-2xl"></div>
              
              {/* Download Resume button */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                <a 
                  href="/assets/Cv3.pdf" 
                  download
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 border border-gray-700"
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="lg:col-span-7">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-800 mb-6 overflow-x-auto no-scrollbar">
              <motion.button
                onClick={() => setActiveTab('personal')}
                className={`px-5 py-3 font-medium flex items-center gap-2 ${activeTab === 'personal' ? 'text-white border-b-2 border-gray-400' : 'text-gray-400'}`}
                variants={tabVariants}
                animate={activeTab === 'personal' ? 'active' : 'inactive'}
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <User size={16} />
                <span>Personal</span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('experience')}
                className={`px-5 py-3 font-medium flex items-center gap-2 ${activeTab === 'experience' ? 'text-white border-b-2 border-gray-400' : 'text-gray-400'}`}
                variants={tabVariants}
                animate={activeTab === 'experience' ? 'active' : 'inactive'}
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <Briefcase size={16} />
                <span>Experience</span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('education')}
                className={`px-5 py-3 font-medium flex items-center gap-2 ${activeTab === 'education' ? 'text-white border-b-2 border-gray-400' : 'text-gray-400'}`}
                variants={tabVariants}
                animate={activeTab === 'education' ? 'active' : 'inactive'}
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <GraduationCap size={16} />
                <span>Education</span>
              </motion.button>
            </div>
            
            {/* Tab Content */}
            <div className="min-h-[260px]">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {activeTab === 'personal' && (
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-5">Hi there! I&apos;m <span className="text-gray-300">Ebong Thiery</span></h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{personalData.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-400">Location:</span>
                        <span>Cameroon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-400">Education:</span>
                        <span>Computer Science</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-400">Languages:</span>
                        <span>English, French</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-400">Interests:</span>
                        <span>Reading, Traveling</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'experience' && (
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-5">Work Experience</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">{personalData.experience}</p>
                    
                    <div className="space-y-8">
                      <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-gray-800">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-700"></div>
                        <div className="mb-2">
                          <h4 className="text-xl font-semibold text-white">Junior Frontend Developer</h4>
                          <div className="flex flex-wrap items-center gap-x-3 text-sm">
                            <span className="text-gray-400">TechSolutions Inc.</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                            <span className="text-gray-500">2022 - Present</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-gray-800">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-700"></div>
                        <div className="mb-2">
                          <h4 className="text-xl font-semibold text-white">Full Stack Developer</h4>
                          <div className="flex flex-wrap items-center gap-x-3 text-sm">
                            <span className="text-gray-400">WebCraft Agency</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                            <span className="text-gray-500">2023 - 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'education' && (
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-5">Education & Certifications</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">{personalData.education}</p>
                    
                    <div className="space-y-8 mb-8">
                      <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-gray-800">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-700"></div>
                        <div className="mb-2">
                          <h4 className="text-xl font-semibold text-white">Am still a student at Seven Advanced Academy</h4>
                          <div className="flex flex-wrap items-center gap-x-3 text-sm">
                            <span className="text-gray-400">Seven Advanced Academy</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                            <span className="text-gray-500">2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Certifications</h4>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 text-sm">
                          MongoDB Certified
                        </span>
                        <span className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 text-sm">
                          React.js Certification
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">My Skills</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Here are some of the technologies and skills I&apos;ve worked with.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg mb-4">
                <Code size={24} className="text-gray-300" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-5">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.technical.slice(0, 9).map((skill, index) => (
                  <div
                    key={index}
                    className="skill-badge px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg mb-4">
                <Layout size={24} className="text-gray-300" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-5">Design Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.design.slice(0, 8).map((skill, index) => (
                  <div
                    key={index}
                    className="skill-badge px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg mb-4">
                <User size={24} className="text-gray-300" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-5">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-badge px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Services I Offer</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Here are the main services I provide as a full-stack developer.</p>
          </div>
          
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="service-card group p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl transition-all duration-300 hover:border-gray-700"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 text-gray-300 group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">{service.title}</h4>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
