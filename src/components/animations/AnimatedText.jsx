'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function AnimatedText({ 
  text, 
  className = "", 
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.02
}) {
  // Split text into words and characters for animation
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: (i = 1) => ({
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delay 
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    }
  };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={child}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  );
}
