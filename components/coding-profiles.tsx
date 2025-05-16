"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Award, Code, RefreshCw, AlertCircle, TrendingUp, Calendar, Hash } from "lucide-react"
import { fetchLeetCodeStats, fetchCodeChefStats, fetchCodeforcesStats } from "@/lib/coding-profiles"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LeetCodeStats {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
  contestRating: number
  contestRanking: number
  contestsAttended: number
  contestBadge: string
  totalContestParticipants: number
  topPercentage: number
  recentContests: {
    title: string
    date: string
    rating: number
    ranking: number
    problemsSolved: number
    totalProblems: number
  }[]
}

interface CodeChefStats {
  username: string
  rating: number
  highestRating: number
  globalRank: number
  countryRank: number
  stars: number
  problems: number
  contests: number
  division: string
  fullName: string
  institution: string
  lastContestDate: string
  recentContests: {
    name: string
    rank: number
    solved: number
    total: number
    rating: number
  }[]
}

interface CodeforcesStats {
  handle: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
  contribution: number
  problemsSolved: number
  contestsParticipated: number
  registrationTimeSeconds: number
  lastOnlineTimeSeconds: number
}

export function CodingProfiles() {
  const [leetcode, setLeetcode] = useState<LeetCodeStats | null>(null)
  const [codechef, setCodechef] = useState<CodeChefStats | null>(null)
  const [codeforces, setCodeforces] = useState<CodeforcesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [usingFallbackData, setUsingFallbackData] = useState(false)

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const [leetcodeData, codechefData, codeforcesData] = await Promise.all([
        fetchLeetCodeStats(),
        fetchCodeChefStats(),
        fetchCodeforcesStats(),
      ])
      setLeetcode(leetcodeData)
      setCodechef(codechefData)
      setCodeforces(codeforcesData)
      setLastUpdated(new Date())
      setUsingFallbackData(true) // We're using fallback data for at least CodeChef
      setError(null)
    } catch (err) {
      console.error("Error fetching coding profiles:", err)
      setError("Failed to load coding profiles")
      setUsingFallbackData(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = () => {
    fetchData()
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

  // Function to get color based on Codeforces rank
  const getCodeforcesRankColor = (rank: string) => {
    const rankColors: Record<string, string> = {
      Newbie: "text-gray-500",
      Pupil: "text-green-500",
      Specialist: "text-cyan-500",
      Expert: "text-blue-500",
      "Candidate Master": "text-purple-500",
      Master: "text-orange-500",
      "International Master": "text-orange-600",
      Grandmaster: "text-red-500",
      "International Grandmaster": "text-red-600",
      "Legendary Grandmaster": "text-red-700",
    }
    return rankColors[rank] || "text-gray-500"
  }

  // Function to get color based on LeetCode badge
  const getLeetCodeBadgeColor = (badge: string) => {
    const badgeColors: Record<string, string> = {
      Knight: "text-green-600",
      Guardian: "text-blue-600",
      Master: "text-purple-600",
      Grandmaster: "text-orange-600",
    }
    return badgeColors[badge] || "text-gray-600"
  }

  // Function to get color based on CodeChef stars
  const getCodeChefStarColor = (stars: number) => {
    const starColors: Record<number, string> = {
      1: "text-gray-500",
      2: "text-green-500",
      3: "text-blue-500",
      4: "text-purple-500",
      5: "text-yellow-500",
      6: "text-orange-500",
      7: "text-red-500",
    }
    return starColors[stars] || "text-gray-500"
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <Skeleton className="h-8 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
                <Skeleton className="h-10 w-1/3 mx-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Use real data if available, otherwise use null (component will handle this)
  const leetcodeData = leetcode
  const codechefData = codechef
  const codeforcesData = codeforces

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          {lastUpdated && <span>Last updated: {lastUpdated.toLocaleString()}</span>}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fetch the latest data from coding platforms</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {error && (
        <div className="text-center p-4 bg-destructive/10 rounded-lg mb-6">
          <p className="text-destructive font-medium">{error}</p>
          <p className="mt-2 text-muted-foreground">Using cached data instead.</p>
        </div>
      )}

      {usingFallbackData && (
        <div className="text-center p-4 bg-muted rounded-lg mb-6 flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Some profile data is displayed using cached values as real-time data is not available.
          </p>
        </div>
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-8">
        {/* LeetCode Card */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="md:col-span-2">
          <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFA116]/10 p-2 rounded-full">
                    <Code className="h-6 w-6 text-[#FFA116]" />
                  </div>
                  <h3 className="text-xl font-bold">LeetCode</h3>
                </div>
                {leetcodeData && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      Rank: {leetcodeData.ranking > 0 ? leetcodeData.ranking.toLocaleString() : "N/A"}
                    </Badge>
                    {leetcodeData.contestBadge && (
                      <Badge
                        variant="outline"
                        className={`font-medium ${getLeetCodeBadgeColor(leetcodeData.contestBadge)}`}
                      >
                        {leetcodeData.contestBadge}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {leetcodeData ? (
                <Tabs defaultValue="problems" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="problems">Problems</TabsTrigger>
                    <TabsTrigger value="contests">Contests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="problems" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.totalSolved}</div>
                        <div className="text-xs text-muted-foreground">Solved</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.acceptanceRate}%</div>
                        <div className="text-xs text-muted-foreground">Acceptance</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.contributionPoints}</div>
                        <div className="text-xs text-muted-foreground">Points</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Easy: {leetcodeData.easySolved}</span>
                        <span>Medium: {leetcodeData.mediumSolved}</span>
                        <span>Hard: {leetcodeData.hardSolved}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
                        <div
                          className="bg-green-500 h-full"
                          style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }}
                        ></div>
                        <div
                          className="bg-yellow-500 h-full"
                          style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }}
                        ></div>
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="contests" className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.contestRating}</div>
                        <div className="text-xs text-muted-foreground">Contest Rating</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">#{leetcodeData.contestRanking.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Global Ranking</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.contestsAttended}</div>
                        <div className="text-xs text-muted-foreground">Contests Attended</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{leetcodeData.topPercentage}%</div>
                        <div className="text-xs text-muted-foreground">Top Percentage</div>
                      </div>
                    </div>

                    {leetcodeData.recentContests && leetcodeData.recentContests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Contest</th>
                              <th className="text-center py-2">Date</th>
                              <th className="text-center py-2">Rating</th>
                              <th className="text-center py-2">Rank</th>
                              <th className="text-center py-2">Solved</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leetcodeData.recentContests.map((contest, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2">{contest.title}</td>
                                <td className="text-center py-2">{contest.date}</td>
                                <td className="text-center py-2">{contest.rating}</td>
                                <td className="text-center py-2">#{contest.ranking.toLocaleString()}</td>
                                <td className="text-center py-2">
                                  {contest.problemsSolved}/{contest.totalProblems}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-4">No recent contest data available</div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No LeetCode data available</div>
              )}

              <div className="flex justify-center mt-4">
                <Button asChild className="shadow-md hover:shadow-lg transition-all">
                  <a href="https://leetcode.com/u/abhijeet_kumar27/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CodeChef Card */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#5B4638]/10 p-2 rounded-full">
                    <Award className="h-6 w-6 text-[#5B4638]" />
                  </div>
                  <h3 className="text-xl font-bold">CodeChef</h3>
                </div>
                {codechefData && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`font-mono ${getCodeChefStarColor(codechefData.stars)}`}>
                      {Array(codechefData.stars).fill("★").join("")}
                    </Badge>
                    <Badge variant="outline" className="font-mono">
                      {codechefData.division}
                    </Badge>
                  </div>
                )}
              </div>

              {codechefData ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="contests">Contests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{codechefData.rating}</div>
                        <div className="text-xs text-muted-foreground">Current Rating</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">{codechefData.highestRating}</div>
                        <div className="text-xs text-muted-foreground">Highest Rating</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold">#{codechefData.globalRank.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Global Rank</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold">{codechefData.problems}</div>
                        <div className="text-xs text-muted-foreground">Problems Solved</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Last Contest: {codechefData.lastContestDate}</span>
                    </div>
                  </TabsContent>

                  <TabsContent value="contests" className="space-y-4">
                    {codechefData.recentContests && codechefData.recentContests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Contest</th>
                              <th className="text-center py-2">Rank</th>
                              <th className="text-center py-2">Solved</th>
                              <th className="text-center py-2">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {codechefData.recentContests.map((contest, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2">{contest.name}</td>
                                <td className="text-center py-2">#{contest.rank.toLocaleString()}</td>
                                <td className="text-center py-2">
                                  {contest.solved}/{contest.total}
                                </td>
                                <td className="text-center py-2">{contest.rating}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-4">No recent contest data available</div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                      <Hash className="h-4 w-4" />
                      <span>Total Contests: {codechefData.contests}</span>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No CodeChef data available</div>
              )}

              <div className="flex justify-center mt-4">
                <Button asChild className="shadow-md hover:shadow-lg transition-all">
                  <a href="https://www.codechef.com/users/abhijeet73" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Codeforces Card */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1F8ACB]/10 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-[#1F8ACB]" />
                  </div>
                  <h3 className="text-xl font-bold">Codeforces</h3>
                </div>
                {codeforcesData && (
                  <Badge variant="outline" className={`font-medium ${getCodeforcesRankColor(codeforcesData.rank)}`}>
                    {codeforcesData.rank}
                  </Badge>
                )}
              </div>

              {codeforcesData ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{codeforcesData.rating}</div>
                      <div className="text-xs text-muted-foreground">Current Rating</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{codeforcesData.maxRating}</div>
                      <div className="text-xs text-muted-foreground">Max Rating</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">{codeforcesData.problemsSolved}</div>
                      <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">{codeforcesData.contestsParticipated}</div>
                      <div className="text-xs text-muted-foreground">Contests</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Rating Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {codeforcesData.rating} / {codeforcesData.maxRating}
                      </span>
                    </div>
                    <Progress value={(codeforcesData.rating / codeforcesData.maxRating) * 100} className="h-2" />
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No Codeforces data available</div>
              )}

              <div className="flex justify-center">
                <Button asChild className="shadow-md hover:shadow-lg transition-all">
                  <a href="https://codeforces.com/profile/abhijeet1kumar123" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
