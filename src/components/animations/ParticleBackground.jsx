'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const stars = [];
    const count = 100;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.05;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = ['#6366F1', '#818CF8', '#A5B4FC', '#14B8A6', '#2DD4BF'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        // Gentle twinkling effect
        this.opacity = Math.sin(Date.now() * this.speed) * 0.3 + 0.5;
      }
      
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
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
    
    // Create floating connection lines
    gsap.set(stars, {
      opacity: 0.5,
    });
    
    stars.forEach((star, i) => {
      gsap.to(star, {
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.01
      });
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(stars);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
