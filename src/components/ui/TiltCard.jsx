'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ 
  children, 
  className = "", 
  scale = 1.05, 
  perspective = 1000, 
  speed = 500, 
  tiltMaxAngle = 10, 
  transitionEasing = "cubic-bezier(.03,.98,.52,.99)", 
  ...props 
}) {
  const cardRef = useRef(null);
  const constraintsRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    let updateRate = 10;
    let xPos = 0;
    let yPos = 0;
    let xRotation = 0;
    let yRotation = 0;
    
    let requestId = null;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const update = () => {
      xRotation = (yPos / card.clientHeight * 2 - 1) * -tiltMaxAngle;
      yRotation = (xPos / card.clientWidth * 2 - 1) * tiltMaxAngle;
      
      card.style.transform = `perspective(${perspective}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1, 1, 1)`;
      
      requestId = null;
    };
    
    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      xPos = e.clientX - rect.left;
      yPos = e.clientY - rect.top;
      
      if (requestId === null) {
        requestId = window.requestAnimationFrame(update);
      }
    };
    
    const onMouseEnter = () => {
      card.style.transition = `transform ${speed}ms ${transitionEasing}`;
      setTimeout(() => {
        card.style.transition = '';
      }, speed);
    };
    
    const onMouseLeave = () => {
      card.style.transition = `transform ${speed}ms ${transitionEasing}`;
      xPos = card.clientWidth / 2;
      yPos = card.clientHeight / 2;
      
      if (requestId === null) {
        requestId = window.requestAnimationFrame(update);
      }
      
      setTimeout(() => {
        card.style.transition = '';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }, speed);
    };
    
    // Add event listeners
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);
    
    // Clean up
    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
      
      if (requestId) {
        window.cancelAnimationFrame(requestId);
      }
    };
  }, [perspective, speed, tiltMaxAngle, transitionEasing]);
  
  return (
    <div 
      ref={constraintsRef} 
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full"
        whileHover={{ scale }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
