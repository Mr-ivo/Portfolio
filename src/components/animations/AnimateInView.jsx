'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function AnimateInView({
  children,
  className = "",
  initialY = 50,
  initialX = 0,
  initialOpacity = 0,
  delay = 0,
  duration = 0.5,
  once = true,
  ...props
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ y: initialY, x: initialX, opacity: initialOpacity }}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
