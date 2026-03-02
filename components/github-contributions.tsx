"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Calendar } from "lucide-react"

// Assuming this function is correctly set up to accept a username
import { fetchGitHubContributions } from "@/lib/github" 

interface GitHubContributionsProps {
  username: string
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1. Wrap the random graph generation in useMemo 
  // This prevents hydration errors and stops the graph from flashing on re-renders
  const mockGraphData = useMemo(() => {
    return Array.from({ length: 52 }).map(() =>
      Array.from({ length: 7 }).map(() => Math.random())
    )
  }, [])

  useEffect(() => {
    async function loadContributions() {
      try {
        setLoading(true)
        // 2. Pass the username to the fetcher
        const data = await fetchGitHubContributions(username) 
        setContributions(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err)
        setError("Failed to load GitHub contributions")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      loadContributions()
    }
  }, [username])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-40 w-full mb-4" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-1/3" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // 3. Optional: If you want to show the mock graph EVEN if it fails, 
  // you might want to remove this error block and just rely on the fallback below.
  if (error && !contributions) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-destructive font-medium">{error}</p>
          <p className="mt-2 text-muted-foreground">Please check your GitHub token and try again.</p>
        </CardContent>
      </Card>
    )
  }

  // Fallback if API returns 0 or null
  const contributionCount = contributions || 500

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">{contributionCount}+ Contributions in the Last Year</h3>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg mb-6 overflow-hidden">
            <div className="h-32 flex items-end justify-center">
              {/* Render the memoized graph */}
              {mockGraphData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col-reverse h-full mx-px">
                  {week.map((intensity, dayIndex) => {
                    let bgColor = "bg-muted"

                    if (intensity > 0.9) bgColor = "bg-primary"
                    else if (intensity > 0.7) bgColor = "bg-primary/70"
                    else if (intensity > 0.5) bgColor = "bg-primary/50"
                    else if (intensity > 0.3) bgColor = "bg-primary/30"

                    return (
                      <div
                        key={dayIndex}
                        className={`w-2 h-2 m-px rounded-sm ${bgColor}`}
                        title={`${Math.floor(intensity * 10)} contributions`}
                      ></div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild className="shadow-md hover:shadow-lg transition-all">
              {/* 4. Use the dynamic username here */}
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}