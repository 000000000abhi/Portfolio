"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award } from "lucide-react"

export function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-lg shadow-md border border-border"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full shrink-0 mt-1">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Graphic Era Deemed to be University</h3>
          <p className="text-primary font-medium">B.Tech - Computer Science and Engineering</p>

          <div className="flex items-center gap-4 mt-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>2022 - 2026</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>CGPA: 9.3</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Relevant Coursework:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Data Structures",
                "Algorithms",
                "Operating Systems",
                "Computer Networks",
                "DBMS",
                "Object-Oriented Programming",
                "DevOps",
              ].map((course) => (
                <span key={course} className="bg-muted px-2 py-1 rounded-md text-xs">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
