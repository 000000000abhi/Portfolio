"use client"

import { motion } from "framer-motion"
import { Code, BookOpen, Users, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  date: string
  description: string[]
  technologies: string[]
  icon: "code" | "book" | "users" | "database"
}

export function AboutTimeline() {
  const projects: Project[] = [
    {
      id: 1,
      title: "BookFusion",
      date: "Feb 2025",
      description: [
        "Developed BookFusion, a comprehensive full-stack web application designed to offer a diverse selection of books across 10+ genres.",
        "Created an intelligent recommendation engine that suggests books and audiobooks based on user reading history and preferences, enhancing user engagement and satisfaction by 100%.",
        "Integrated a blogging module where users can write and share personal reviews and insights about books, fostering a community of readers and enhancing user interaction.",
      ],
      technologies: ["ReactJS", "ExpressJS", "MongoDB", "RestAPI", "Python"],
      icon: "book",
    },
    {
      id: 2,
      title: "U and I (NGO)",
      date: "July 2024",
      description: [
        "Designed and built a comprehensive portal tailored to the unique needs of 1000+ first-generation students, teachers, and management. The portal offers a range of resources, support systems, and tools aimed at enhancing the educational experience and optimizing administrative processes.",
        "Implemented a robust tech stack using React.js for the Frontend and MongoDB, Express for the Backend. Collaborated with a cross-functional team in an Agile environment to design the portal.",
        "Automated several key processes, including attendance tracking, lecture recording, and one-to-one interaction between teachers and students.",
      ],
      technologies: ["React", "MongoDB", "Express", "Tailwind CSS"],
      icon: "users",
    },
    {
      id: 3,
      title: "SchemeHelp",
      date: "March 2024",
      description: [
        "Developed a platform for frontline workers to register beneficiaries for government schemes using an eligibility-based matching algorithm and real-time scheme retrieval, helping 500+ beneficiaries.",
        "Implemented document verification and collection for secure beneficiary registration, along with an interactive dashboard for efficient management.",
        "Integrated Twilio API to send real-time updates and notifications to beneficiaries, enhancing communication and service delivery.",
      ],
      technologies: ["ReactJS", "Firebase", "Twilio API"],
      icon: "code",
    },
    {
      id: 4,
      title: "Credit Card Fraud Detection",
      date: "Feb 2024",
      description: [
        "Developed a Credit Card Fraud Detection Model, applied Logistic Regression as the primary model, optimized using GridSearchCV across 6 different values of the regularization parameter (C), capable of identifying fraudulent transactions from a dataset containing over 284,000 transactions.",
        "Used KFold Cross-Validation with 5 splits to ensure robust model performance, testing model accuracy of 99%.",
      ],
      technologies: ["Python", "Scikit-learn", "Tkinter", "Pandas", "NumPy"],
      icon: "database",
    },
  ]

  const getIcon = (icon: string) => {
    switch (icon) {
      case "code":
        return <Code className="h-5 w-5 text-primary" />
      case "book":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "users":
        return <Users className="h-5 w-5 text-primary" />
      case "database":
        return <Database className="h-5 w-5 text-primary" />
      default:
        return <Code className="h-5 w-5 text-primary" />
    }
  }

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
    hidden: { y: 50, opacity: 0 },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-8"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:border-primary/50 transition-colors"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">{getIcon(project.icon)}</div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              <span className="text-sm text-muted-foreground">{project.date}</span>
            </div>

            <div className="space-y-3 mb-4">
              {project.description.map((desc, index) => (
                <p key={index} className="text-muted-foreground">
                  {desc}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
