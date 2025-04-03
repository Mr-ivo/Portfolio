"use client";
import React, { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Page() { // Load GSAP ScrollTrigger on client-side only
  useEffect(() => {
    const loadGsapPlugins = async () => {
      const { ScrollTrigger, ScrollToPlugin } = await import('gsap/all');
      const gsap = (await import('gsap')).default;
      
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      ScrollTrigger.refresh();
    };
    
    loadGsapPlugins();

    return () => {
      try {
        const { ScrollTrigger } = require('gsap/all');
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.clearMatchMedia();
      } catch (error) {
        console.error("Error during ScrollTrigger cleanup:", error);
      }
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
