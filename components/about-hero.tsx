"use client"

import { motion } from "framer-motion"
import { Briefcase, Award, GraduationCap, Code } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Passionate <span className="text-primary">Full Stack Developer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Building innovative web applications with the MERN stack and a strong foundation in algorithms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
        >
          <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-bold">9.3</h3>
            <p className="text-sm text-muted-foreground">CGPA</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-bold">4+</h3>
            <p className="text-sm text-muted-foreground">Projects</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-bold">1200+</h3>
            <p className="text-sm text-muted-foreground">LeetCode Problems</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-bold">AWS</h3>
            <p className="text-sm text-muted-foreground">Certified</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
