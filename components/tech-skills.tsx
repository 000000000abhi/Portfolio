"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Skill {
  name: string
  icon: string
  color: string
  category: "frontend" | "backend" | "database" | "language" | "framework" | "tool"
}

export function TechSkills() {
  const skills: Skill[] = [
    // Languages
    { name: "C++", icon: "cplusplus", color: "#00599C", category: "language" },
    { name: "C", icon: "c", color: "#A8B9CC", category: "language" },
    { name: "Java", icon: "java", color: "#007396", category: "language" },
    { name: "Python", icon: "python", color: "#3776AB", category: "language" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "language" },
    { name: "PHP", icon: "php", color: "#777BB4", category: "language" },

    // Frontend
    { name: "React", icon: "react", color: "#61DAFB", category: "frontend" },
    { name: "HTML5", icon: "html5", color: "#E34F26", category: "frontend" },
    { name: "CSS3", icon: "css3", color: "#1572B6", category: "frontend" },
    { name: "Bootstrap", icon: "bootstrap", color: "#7952B3", category: "frontend" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4", category: "frontend" },

    // Backend
    { name: "Node.js", icon: "nodedotjs", color: "#339933", category: "backend" },
    { name: "Express", icon: "express", color: "#000000", category: "backend" },
    { name: "REST API", icon: "openapiinitiative", color: "#6BA539", category: "backend" },
    { name: "Firebase", icon: "firebase", color: "#FFCA28", category: "backend" },

    // Database
    { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "database" },
    { name: "SQL", icon: "mysql", color: "#4479A1", category: "database" },

    // Tools & Others
    { name: "Git", icon: "git", color: "#F05032", category: "tool" },
    { name: "GitHub", icon: "github", color: "#181717", category: "tool" },
    { name: "VS Code", icon: "visualstudiocode", color: "#007ACC", category: "tool" },
    { name: "Postman", icon: "postman", color: "#FF6C37", category: "tool" },
    { name: "AWS", icon: "amazonaws", color: "#232F3E", category: "tool" },
    { name: "Linux", icon: "linux", color: "#FCC624", category: "tool" },
  ]

  const categories = [
    { id: "language", name: "Programming Languages" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "database", name: "Database" },
    { id: "tool", name: "Developer Tools" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="space-y-10">
      {/* MERN Stack Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">MERN Stack Specialist</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {["MongoDB", "Express", "React", "Node.js"].map((tech) => {
            const skill = skills.find((s) => s.name === tech)
            return (
              <motion.div key={tech} whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center bg-background rounded-full shadow-lg mb-2">
                  <img
                    src={`https://cdn.simpleicons.org/${skill?.icon}`}
                    alt={tech}
                    className="w-12 h-12"
                    style={{ filter: "var(--theme-filter, none)" }}
                  />
                </div>
                <span className="font-medium">{tech}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Skills by Category */}
      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <div className="h-px bg-border flex-grow"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {skills
              .filter((skill) => skill.category === category.id)
              .map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <Card className="w-full aspect-square flex items-center justify-center border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <img
                        src={`https://cdn.simpleicons.org/${skill.icon}`}
                        alt={skill.name}
                        className="w-16 h-16 mb-3"
                        style={{ filter: "var(--theme-filter, none)" }}
                      />
                      <Badge variant="outline" className="mt-2 font-medium">
                        {skill.name}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
