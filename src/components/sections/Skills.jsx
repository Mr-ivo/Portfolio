'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../animations/AnimatedText';
import AnimateInView from '../animations/AnimateInView';
import Sparkles from '../animations/Sparkles';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    icon: "💻",
    items: [
      { name: "HTML5", level: 90 },
      { name: "CSS3/SCSS", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    category: "Backend",
    icon: "🔧",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 75 },
      { name: "RESTful APIs", level: 85 },
      { name: "Python", level: 70 },
    ]
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Webpack", level: 75 },
      { name: "Figma", level: 70 },
      { name: "UI/UX Design", level: 70 },
      { name: "Testing", level: 70 },
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate skill bars with GSAP
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
      
      // Add pulse animation at the end of the bar
      gsap.to(
        bar.querySelector('.skill-pulse'),
        {
          opacity: 1,
          scale: 1.2,
          duration: 0.6,
          ease: 'power2.out',
          delay: 1.2,
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: bar,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Animate skill cards with GSAP
    const skillCards = document.querySelectorAll('.skill-category');
    
    gsap.fromTo(
      skillCards,
      { 
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Create hover effects on skill items
    document.querySelectorAll('.skill-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          scale: 1.02,
          duration: 0.3
        });
        
        gsap.to(item.querySelector('.skill-name'), {
          color: 'rgba(255, 255, 255, 0.95)',
          duration: 0.3
        });
        
        gsap.to(item.querySelector('.skill-bar-fill'), {
          backgroundColor: '#818CF8',
          duration: 0.3
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          backgroundColor: 'transparent',
          borderColor: 'rgba(99, 102, 241, 0.2)',
          scale: 1,
          duration: 0.3
        });
        
        gsap.to(item.querySelector('.skill-name'), {
          color: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3
        });
        
        gsap.to(item.querySelector('.skill-bar-fill'), {
          backgroundColor: 'linear-gradient(to right, #6366F1, #14B8A6)',
          duration: 0.3
        });
      });
    });
    
    // Background animation
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0.1 },
        {
          opacity: 0.2,
          duration: 1 + (i % 5) * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.05
        }
      );
    });
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95 relative overflow-hidden"
    >
      {/* Background grid animation */}
      <div className="absolute inset-0 z-0 grid-background">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="grid-item absolute bg-primary-500/5 rounded-md"
            style={{
              width: '40px',
              height: '40px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 30}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-secondary-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Sparkles>
          <AnimatedText
            text="My Skills"
            className="section-heading gradient-text mb-16"
          />
        </Sparkles>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="skill-category card hover:transform hover:scale-[1.01] transition-all duration-500 relative"
            >
              {/* Card accent */}
              <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-xl"></div>
              
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-dark flex items-center justify-center rounded-full border-2 border-gray-800 text-2xl"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * categoryIndex }}
              >
                {skillCategory.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-primary-400 mb-8 font-heading pt-6 text-center">{skillCategory.category}</h3>
              
              <div className="space-y-5">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item space-y-2 p-2 rounded-lg border border-gray-800/20 transition-all duration-300">
                    <div className="flex justify-between text-sm">
                      <span className="skill-name text-light/80 font-medium transition-colors duration-300">{skill.name}</span>
                      <span className="text-light/60">{skill.level}%</span>
                    </div>
                    
                    <div className="h-1.5 bg-dark/80 rounded-full overflow-hidden">
                      <div 
                        className="skill-bar-fill h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative"
                        data-level={skill.level}
                      >
                        <div className="skill-pulse absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full blur-[1px] opacity-0"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Floating decorative element */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  delay: categoryIndex * 1.5
                }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-500/50 blur-[1px]"
              ></motion.div>
              
              {/* Progress indicator */}
              <div className="mt-5 flex justify-center">
                <div className="w-16 h-1 bg-dark/60 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 * categoryIndex }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Extra decorative element */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="w-20 h-20 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-primary-500/20 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-secondary-500/20 rounded-full"></div>
            <div className="absolute inset-4 border-2 border-primary-500/20 rounded-full"></div>
            <div className="absolute inset-6 border-2 border-secondary-500/20 rounded-full"></div>
            <div className="absolute inset-8 border-2 border-primary-500/20 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
