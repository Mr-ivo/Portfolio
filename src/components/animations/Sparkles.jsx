'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInterval } from '@/hooks/useInterval';
import { cn } from '@/utils/cn';

const generateSparkle = (color = '#FFC700') => {
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color,
    size: Math.random() * 10 + 10,
    style: {
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      zIndex: 2
    }
  };
};

const Sparkle = ({ size, color, style }) => {
  const path = 
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
      style={style}
      className="absolute pointer-events-none"
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0.5, 0],
        rotate: [0, 0, 15, 30] 
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <path d={path} fill={color} />
    </motion.svg>
  );
};

export default function Sparkles({
  children,
  className,
  id,
  color = "#FFC700",
  variance = 0.5,
  minSize = 10,
  maxSize = 20,
  delayBetweenSparkles = 50,
  quantity = 1,
  ...props
}) {
  const [sparkles, setSparkles] = useState([]);
  const sparklesEnabled = id !== "disable-sparkles";
  
  useInterval(() => {
    if (!sparklesEnabled) return;
    
    const now = Date.now();
    const nextSparkles = sparkles.filter(sparkle => {
      const delta = now - sparkle.createdAt;
      return delta < 600;
    });
    
    for (let i = 0; i < quantity; i++) {
      setTimeout(() => {
        nextSparkles.push(generateSparkle(color));
        setSparkles(nextSparkles);
      }, i * delayBetweenSparkles);
    }
  }, 100);
  
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {sparklesEnabled && sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
