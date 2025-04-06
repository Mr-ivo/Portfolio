'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StarCanvas() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const stars = [];
    const starCount = 200; 
    

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      generateStars();
    };
    
    // Create a star object
    const generateStars = () => {
      stars.length = 0; 
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Size between 0.5 and 2
          opacity: Math.random() * 0.8 + 0.2, // Opacity between 0.2 and 1
          speed: Math.random() * 0.05 + 0.01, // Speed of twinkling
          twinkleDirection: Math.random() > 0.5 ? 1 : -1, // Direction of opacity change
          twinkleAmount: 0 // Current amount of twinkling (0-1)
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each star
      stars.forEach(star => {
        // Update star twinkling
        star.twinkleAmount += star.speed * star.twinkleDirection;
        
        // Change direction when reaching opacity bounds
        if (star.twinkleAmount > 1 || star.twinkleAmount < 0) {
          star.twinkleDirection *= -1;
        }
        
        // Calculate current opacity
        const currentOpacity = star.opacity * (1 - star.twinkleAmount * 0.5);
        
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
