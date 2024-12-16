"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

function Page() {
  return (
    <div
      id="home"
      className="flex flex-col min-h-screen bg-neutral-900 text-neutral-50"
    >
      <Navbar />
      <header className="bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-600 text-white py-20 px-8 flex flex-col md:flex-row md:items-center md:justify-between relative">
        <div className="text-center md:text-left md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight font-heading"
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-semibold mt-4 font-heading"
          >
            I&apos;m Ebong Thiery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl max-w-xl mx-auto md:mx-0 font-sans"
          >
            Crafting impactful web applications with modern technologies and a
            passion for innovation.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Let&apos;s Collaborate
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
        >
          <div className="relative group w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-500 via-teal-600 to-indigo-700 p-2">
            <Image
              src="/thierry.jpg"
              alt="Ebong Thiery"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-8 border-white shadow-2xl group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-30 group-hover:animate-spin-slow"></div>
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section
        id="about"
        className="p-10 bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-600 text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center text-teal-300"
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center mt-10">
          <div className="md:w-1/2">
            <Image
              src="/thierry.jpg"
              width={350}
              height={350}
              alt="About me image"
              className="rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div id="service" className="md:ml-10 mt-6 md:mt-0 md:w-1/2">
            <h3 className="text-3xl font-semibold text-teal-400">Who Am I</h3>
            <p className="mt-4 text-lg leading-relaxed">
              I specialize in building complete and scalable web applications
              with seamless user experiences.
            </p>
            <p className="mt-2 text-lg leading-relaxed">
              I focus on performance and design to deliver products that are
              both functional and aesthetically pleasing.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "MongoDB",
                "SQL",
                "Python",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-teal-600 px-4 py-2 rounded-full text-sm font-medium text-white shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Download CV
            </motion.button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="p-10 bg-neutral-900">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-amber-400"
        >
          Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[
            {
              title: "Full-Stack Development",
              description:
                "Creating responsive and interactive web applications.",
            },
            {
              title: "API Design",
              description: "Building efficient APIs for seamless integrations.",
            },
            {
              title: "Database Optimization",
              description: "Ensuring data security and optimal performance.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-neutral-800 text-neutral-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                {service.title}
              </h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Realisations Section */}
      <section id="realisation" className="p-10 bg-neutral-800 text-white">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-teal-300"
        >
          Our Realisations
        </motion.h2>
        <ul className="mt-10 space-y-6">
          {[
            {
              title: "Apparell_glow ",
              description:
                "Developed a fully responsive e-commerce website using Next.Js and Node.js.",
              link: "https://apparellglow.vercel.app/",
            },
            {
              title: "UrbanCamerron",
              description: "Built to showcase the different cities in cameroon",
              link: "https://urban-cameroon.vercel.app/",
            },
            {
              title: "Music Project for a friend",
              description:
                "Just a streming platform built with next.js only just frontens",
              link: "https://niosy-1.vercel.app/",
            },
          ].map((project, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-teal-500">
                {project.title}
              </h3>
              <p>{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline mt-4 inline-block"
              >
                View Project
              </a>
            </motion.li>
          ))}
        </ul>
      </section>
      <section id="contact" className="p-10 bg-neutral-800">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-teal-300"
        >
          Get in Touch
        </motion.h2>
        <p className="mt-6 text-center max-w-xl mx-auto">
          I&apos;m open to discussing projects, collaborations, and ideas.
          Let&apos;s make something great together!
        </p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-lg mx-auto bg-neutral-700 p-6 rounded-lg shadow-md"
        >
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-teal-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-teal-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-teal-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 rounded bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:border-teal-500"
              ></textarea>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              type="submit"
              className="w-full bg-teal-500 text-white py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 mx-auto block bg-teal-500 text-white py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300"
        >
          <Link href="https://t.me/WattyMc01">Contact Me</Link>
        </motion.button>
      </section>

      <footer className="bg-neutral-900 text-neutral-500 p-6 text-center">
        <p>© 2024 Ebong Thiery. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          {["LinkedIn", "GitHub", "Twitter"].map((platform, index) => (
            <Link
              key={index}
              href="#"
              className="hover:text-white transition duration-300"
            >
              {platform}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Page;
