"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Github, Star, GitFork, Eye, Code } from "lucide-react"
import { fetchGitHubRepos } from "@/lib/github"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

export function GitHubProjects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleRepos, setVisibleRepos] = useState(6)

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchGitHubRepos()
        // Sort by stars and then by most recently updated
        const sortedRepos = data.sort((a: Repository, b: Repository) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
        setRepos(sortedRepos)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching GitHub repos:", err)
        setError("Failed to load GitHub repositories")
        setLoading(false)
      }
    }

    loadRepos()
  }, [])

  const loadMoreRepos = () => {
    setVisibleRepos((prev) => prev + 6)
  }

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

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-destructive/10 rounded-lg">
        <p className="text-destructive font-medium">{error}</p>
        <p className="mt-2 text-muted-foreground">Please check your GitHub token and try again.</p>
      </div>
    )
  }

  // Fallback if no repos are found
  if (repos.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No repositories found.</p>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {repos.slice(0, visibleRepos).map((repo) => (
          <motion.div key={repo.id} variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{repo.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{repo.description || "No description"}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      {repo.topics?.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 shadow-sm hover:shadow-md transition-all"
                      asChild
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 shadow-sm hover:shadow-md transition-all"
                        asChild
                      >
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {visibleRepos < repos.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMoreRepos} className="gap-2 shadow-md hover:shadow-lg transition-all">
            <Code className="h-4 w-4" />
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  )
}
