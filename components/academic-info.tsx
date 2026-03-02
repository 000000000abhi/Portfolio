"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, Calendar } from "lucide-react"

export function AcademicInfo() {
  const academicInfo = {
    overallCGPA: 9.3,
    currentSemester: 8,
    totalSemesters: 8,
    university: "Graphic Era Deemed to be University",
    degree: "B.Tech in Computer Science and Engineering",
    graduationYear: 2026,
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 ,duration:0.5}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      
    >
      <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{academicInfo.university}</h3>
                <p className="text-muted-foreground">{academicInfo.degree}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Expected Graduation: {academicInfo.graduationYear}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <svg className="w-24 h-24">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="40"
                      cy="40"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="40"
                      cy="40"
                      strokeDasharray={`${(academicInfo.overallCGPA / 10) * 188.5}, 188.5`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl font-bold">{academicInfo.overallCGPA}</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold">Overall CGPA</h3>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-10 w-10 text-primary mb-2" />
              </div>
              <div className="text-3xl font-bold mb-1">{academicInfo.currentSemester}</div>
              <h3 className="text-lg font-semibold">Current Semester</h3>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center">
              <div className="relative h-16 flex items-center justify-center mb-2">
                <div className="w-full bg-muted h-2 rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(academicInfo.currentSemester / academicInfo.totalSemesters) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">1</div>
                <div className="absolute -bottom-6 right-0 text-xs text-muted-foreground">
                  {academicInfo.totalSemesters}
                </div>
              </div>
              <div className="mt-6 text-lg font-semibold">Progress</div>
              <div className="text-sm text-muted-foreground">
                {Math.round((academicInfo.currentSemester / academicInfo.totalSemesters) * 100)}% Complete
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
