'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Code, Terminal, Layout } from 'lucide-react';
import AnimatedText from '../animations/AnimatedText';
import AnimateInView from '../animations/AnimateInView';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Canvas background animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const stars = [];
      const count = 150; // Increased star count for more density
      
      // Set canvas dimensions to match the window
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Star class for animation
      class Star {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.color = this.getRandomColor();
        }
        
        getRandomColor() {
          const colors = ['#ffffff', '#f5f5f5', '#e0e0e0'];
          return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Boundary check
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Create stars
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
          star.update();
          star.draw();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);
  
  // Text reveal animation
  useEffect(() => {
    if (!textRef.current) return;
    
    const textElement = textRef.current;
    const text = textElement.textContent;
    
    if (text) {
      textElement.innerHTML = '';
      
      // Split text into characters
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        textElement.appendChild(span);
        
        // Use dynamic import for GSAP
        const animateText = async () => {
          try {
            const { default: gsap } = await import('gsap');
            gsap.to(span, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 1 + i * 0.04,
              ease: 'back.out(1.7)'
            });
          } catch (error) {
            console.error('Failed to load GSAP:', error);
          }
        };
        
        animateText();
      });
    }
  }, []);
  
  // Image tilt effect
  useEffect(() => {
    // Keep track of whether component is mounted
    let isMounted = true;
    
    const handleMouseMove = (e) => {
      if (!isMounted) return;
      
      const profileImage = document.querySelector('.profile-container');
      
      if (profileImage) {
        // Calculate the center of the image
        const rect = profileImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        // Calculate how far the mouse is from the center (0 to 1)
        const maxDist = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));
        const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        const normalizedDist = Math.min(distance / maxDist, 1);
        
        // Calculate the tilt amount (max 15 degrees)
        const maxTilt = 10;
        const tiltX = (distY / maxDist) * maxTilt;
        const tiltY = (distX / maxDist) * -maxTilt;
        
        // Apply the transform with a faster transition for closer mouse positions
        const animateProfile = async () => {
          try {
            const { default: gsap } = await import('gsap');
            gsap.to(profileImage, {
              rotateX: tiltX,
              rotateY: tiltY,
              duration: 0.3,
              ease: 'power2.out'
            });
          } catch (error) {
            console.error('Failed to load GSAP:', error);
          }
        };
        
        animateProfile();
      }
    };
    
    const handleMouseLeave = () => {
      if (!isMounted) return;
      
      const profileImage = document.querySelector('.profile-container');
      
      if (profileImage) {
        const resetProfile = async () => {
          try {
            const { default: gsap } = await import('gsap');
            gsap.to(profileImage, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)'
            });
          } catch (error) {
            console.error('Failed to load GSAP:', error);
          }
        };
        
        resetProfile();
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10"></canvas>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start"
          >
            <div className="mb-4 inline-block">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-[length:100%_3px] bg-no-repeat bg-bottom pb-1 text-lg">
                Full-Stack Developer
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center lg:text-left">
              <span className="text-white">Hi, I&apos;m</span>{" "}
              <span className="gradient-text">Ebong Thiery</span>
            </h1>
            
            <p ref={textRef} className="text-gray-300 max-w-xl text-center lg:text-left mb-8">
              I design and develop engaging web applications that deliver exceptional user experiences. Let&apos;s bring your ideas to life!
            </p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/assets/Cv3.pdf"
                download
                variants={childVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" 
                }}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Download Resume</span>
                <Download size={18} className="transform group-hover:translate-y-1 transition-transform duration-300" />
              </motion.a>
              
              <motion.a
                href="#contact"
                variants={childVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)" 
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>Contact Me</span>
              </motion.a>
            </motion.div>
            
            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8">
              <AnimateInView className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 mb-2">
                  <Code size={24} />
                </div>
                <h3 className="font-semibold text-white">Frontend</h3>
                <p className="text-sm text-gray-300">React, Next.js</p>
              </AnimateInView>
              
              <AnimateInView delay={0.1} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-pink-500/10 text-pink-500 mb-2">
                  <Terminal size={24} />
                </div>
                <h3 className="font-semibold text-white">Backend</h3>
                <p className="text-sm text-gray-300">Node.js, Express</p>
              </AnimateInView>
              
              <AnimateInView delay={0.2} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 mb-2">
                  <Layout size={24} />
                </div>
                <h3 className="font-semibold text-white">UI/UX</h3>
                <p className="text-sm text-gray-300">Tailwind, CSS</p>
              </AnimateInView>
            </div>
          </motion.div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  delay: 0.2,
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              className="relative"
            >
              {/* Animated orbit circles */}
              <motion.div 
                className="absolute -inset-4 md:-inset-8"
                style={{ 
                  zIndex: -1, 
                }}
              >
                <motion.div
                  className="w-full h-full rounded-full border border-purple-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute -inset-8 md:-inset-16"
                style={{ 
                  zIndex: -1, 
                }}
              >
                <motion.div
                  className="w-full h-full rounded-full border border-pink-500/15"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              {/* Floating decoration elements */}
              <motion.div 
                className="absolute h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md"
                style={{ top: '-5%', left: '10%' }}
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-md"
                style={{ bottom: '5%', right: '10%' }}
                animate={{ 
                  y: [0, 15, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              <motion.div 
                className="absolute h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 blur-md"
                style={{ top: '15%', right: '-5%' }}
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              <motion.div 
                className="absolute h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-md"
                style={{ bottom: '10%', left: '5%' }}
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -10, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              {/* Main profile container with floating animation */}
              <motion.div 
                className="relative profile-container w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800 transition-all duration-300"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-gradient-border"></div>
                
                <div className="w-full h-full relative rounded-full overflow-hidden transform-gpu">
                  <Image
                    src="/thierry.jpg"
                    alt="Ebong Thiery"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50"></div>
                  
                  {/* Animated glow overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                    animate={{ 
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                
                {/* Animated corners */}
                <motion.div 
                  className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-purple-400"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-pink-400"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-pink-400"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-400"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}