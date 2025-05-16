"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Code, Briefcase, Award, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const techStack = [
    { name: "React", icon: "react.svg" },
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "MongoDB", icon: "mongodb.svg" },
    { name: "Express", icon: "express.svg" },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <motion.div className="md:w-1/2 text-center md:text-left" variants={itemVariants}>
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Full Stack Developer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hi, I'm <span className="text-primary">Abhijeet Ansal</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-md">
              A passionate full-stack developer specializing in MERN stack with a strong foundation in data structures
              and algorithms.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                <Link href="/portfolio" className="flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dehradun, Uttarakhand</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:ak4492473@gmail.com" className="hover:text-primary transition-colors">
                  ak4492473@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+916299774839" className="hover:text-primary transition-colors">
                  +91 6299774839
                </a>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <motion.div variants={iconVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <a href="https://github.com/000000000abhi" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={iconVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/abhijeet-ansal-9993a3275/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={iconVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <a href="https://leetcode.com/u/abhijeet_kumar27/" target="_blank" rel="noopener noreferrer">
                    <Code className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mr-2">MERN Stack:</p>
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center bg-muted/50 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                >
                  {tech.name}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Profile image */}
          <motion.div className="md:w-1/2 flex justify-center md:justify-end" variants={itemVariants}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -z-10 inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl transform scale-110"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image src="/profile.png" alt="Abhijeet Ansal" fill className="object-cover" priority />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-background rounded-full p-3 shadow-lg flex items-center gap-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              >
                <Briefcase className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-primary text-xl font-bold">10+</div>
                  <div className="text-xs">Projects</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-background rounded-full p-3 shadow-lg flex items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              >
                <Award className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-primary text-xl font-bold">1200+</div>
                  <div className="text-xs">LeetCode</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
