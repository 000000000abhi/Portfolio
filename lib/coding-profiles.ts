"use server"

// ==========================================
// 1. LEETCODE STATS
// ==========================================
"use server"

export async function fetchLeetCodeStats() {
  try {
    const username = "abhijeet_kumar27"
    
    // FaisalShohag (Vercel) for instant problem stats
    // Alfa API (Render) for the contest data
    const [statsRes, contestRes] = await Promise.all([
      fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`, { cache: "no-store" }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, { cache: "no-store" })
    ])

    if (!statsRes.ok || !contestRes.ok) {
      console.error(`LeetCode APIs failed. Stats: ${statsRes.status}, Contest: ${contestRes.status}`)
      return getFallbackLeetCodeStats()
    }

    const statsData = await statsRes.json()
    const contestData = await contestRes.json()

    if (statsData.errors) {
      console.error("LeetCode Stats API error:", statsData.errors)
      return getFallbackLeetCodeStats()
    }

    // Safely calculate acceptance rate from the Faisal API format
    const allSubmissions = statsData.totalSubmissions?.find((x: any) => x.difficulty === "All")
    const totalSubmissionsCount = allSubmissions?.submissions || 0
    const totalSolved = statsData.totalSolved || 0
    const acceptanceRate = totalSubmissionsCount > 0 
      ? Math.round((totalSolved / totalSubmissionsCount) * 1000) / 10 
      : 0

    return {
      // Problem Stats (Corrected JSON keys!)
      totalSolved: statsData.totalSolved || 0,
      totalQuestions: statsData.totalQuestions || 3549, 
      easySolved: statsData.easySolved || 0,
      mediumSolved: statsData.mediumSolved || 0,
      hardSolved: statsData.hardSolved || 0,
      acceptanceRate: acceptanceRate || 0,
      ranking: statsData.ranking || 0,
      contributionPoints: statsData.contributionPoints || 0,
      reputation: statsData.reputation || 0,
      
      // Contest Stats
      contestRating: Math.round(contestData.contestRating) || 0,
      contestBadge: contestData.contestBadges?.name || "",
      contestRanking: contestData.contestGlobalRanking || 0,
      contestsAttended: contestData.contestAttend || 0,
      totalContestParticipants: contestData.totalParticipants || 0,
      topPercentage: contestData.contestTopPercentage || 100,
      recentContests: [],
    }
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error)
    return getFallbackLeetCodeStats()
  }
}

// ==========================================
// 2. CODECHEF STATS
// ==========================================
export async function fetchCodeChefStats() {
  try {
    const username = "abhijeet73"
    
    // CodeChef's internal APIs block external requests. 
    // We use a popular community proxy specifically designed for CodeChef portfolios.
    const apiUrl = `https://codechef-api.vercel.app/handle/${username}`
    
    const response = await fetch(apiUrl, { cache: "no-store" })

    if (!response.ok) {
      console.log(`CodeChef API responded with status: ${response.status}`)
      return getFallbackCodeChefStats()
    }

    const data = await response.json()
    
    if (data.success === false) {
      console.log("CodeChef user data invalid, using cached data")
      return getFallbackCodeChefStats()
    }

    // Parse the stars string ("3★" -> 3)
    const starsNum = parseInt(data.stars?.replace(/[^0-9]/g, '')) || 0

    return {
      username: data.name || username,
      rating: data.currentRating || 0,
      highestRating: data.highestRating || 0,
      globalRank: data.globalRank || 99999,
      countryRank: data.countryRank || 9999,
      stars: starsNum,
      problems: 0, // This proxy doesn't return total problems solved, default to 0
      contests: data.ratingData?.length || 0,
      division: `Div ${data.stars ? data.stars.charAt(0) : '3'}`,
      fullName: data.name || username,
      institution: "N/A",
      lastContestDate: data.ratingData?.length > 0 ? data.ratingData[data.ratingData.length - 1].end_date : "N/A",
      recentContests: parseCodeChefContests(data.ratingData || []),
    }
  } catch (error) {
    console.error("Error fetching CodeChef stats:", error)
    return getFallbackCodeChefStats()
  }
}

// Helper function for CodeChef
function parseCodeChefContests(contests: any[]): any[] {
  if (!Array.isArray(contests)) return []
  
  // Reversing to get the most recent first
  return contests.slice().reverse().slice(0, 3).map((contest: any) => ({
    name: contest.name,
    rank: contest.rank || 0,
    solved: 0, 
    total: 0, 
    rating: contest.rating || 0,
  }))
}

// ==========================================
// 3. CODEFORCES STATS
// ==========================================
export async function fetchCodeforcesStats() {
  try {
    const username = "abhijeet1kumar123"
    
    // Fetch user info
    const infoUrl = `https://codeforces.com/api/user.info?handles=${username}`
    const response = await fetch(infoUrl, { cache: "no-store" })

    if (!response.ok) {
      console.log(`Codeforces API responded with status: ${response.status}`)
      return getFallbackCodeforcesStats()
    }

    const data = await response.json()

    if (data.status !== "OK" || !data.result || data.result.length === 0) {
      console.log("Codeforces user not found, using fallback data")
      return getFallbackCodeforcesStats()
    }

    const userInfo = data.result[0]

    // Fetch Submissions (for problem count) & Ratings (for contest count)
    const submissionsUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`
    const ratingUrl = `https://codeforces.com/api/user.rating?handle=${username}`
    
    const [submissionsResponse, ratingResponse] = await Promise.all([
      fetch(submissionsUrl, { cache: "no-store" }),
      fetch(ratingUrl, { cache: "no-store" })
    ])

    let problemsSolved = 0
    let contestsParticipated = 0

    // Count unique solved problems
    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json()
      if (submissionsData.status === "OK" && submissionsData.result) {
        const solvedProblems = new Set()
        submissionsData.result.forEach((submission: any) => {
          if (submission.verdict === "OK") {
            const problemId = `${submission.problem.contestId}-${submission.problem.index}`
            solvedProblems.add(problemId)
          }
        })
        problemsSolved = solvedProblems.size
      }
    }

    // Count attended contests
    if (ratingResponse.ok) {
        const ratingData = await ratingResponse.json()
        if (ratingData.status === "OK" && ratingData.result) {
            contestsParticipated = ratingData.result.length
        }
    }

    return {
      handle: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || "Unrated",
      maxRank: userInfo.maxRank || "Unrated",
      contribution: userInfo.contribution || 0,
      problemsSolved,
      contestsParticipated,
      registrationTimeSeconds: userInfo.registrationTimeSeconds,
      lastOnlineTimeSeconds: userInfo.lastOnlineTimeSeconds,
    }
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error)
    return getFallbackCodeforcesStats()
  }
}

// ==========================================
// 4. FALLBACK FUNCTIONS
// ==========================================

function getFallbackLeetCodeStats() {
  return {
    totalSolved: 1241,
    totalQuestions: 3549,
    easySolved: 317,
    mediumSolved: 826,
    hardSolved: 98,
    acceptanceRate: 65.4,
    ranking: 9224,
    contributionPoints: 0,
    reputation: 0,
    contestRating: 2066,
    contestBadge: "Knight",
    contestRanking: 12379,
    contestsAttended: 46,
    totalContestParticipants: 100000,
    topPercentage: 1.87,
    recentContests: [
      { title: "Weekly Contest 387", date: "2024-12-15", rating: 2100, ranking: 5432, problemsSolved: 3, totalProblems: 4 },
      { title: "Biweekly Contest 103", date: "2024-12-10", rating: 2080, ranking: 6789, problemsSolved: 2, totalProblems: 4 },
      { title: "Weekly Contest 386", date: "2024-12-08", rating: 2050, ranking: 7654, problemsSolved: 3, totalProblems: 4 },
    ],
  }
}

function getFallbackCodeChefStats() {
  return {
    username: "abhijeet73",
    rating: 1776,
    highestRating: 1800,
    globalRank: 15243,
    countryRank: 1245,
    stars: 3,
    problems: 152,
    contests: 25,
    division: "Div 3",
    fullName: "Abhijeet Ansal",
    institution: "Graphic Era Deemed to be University",
    lastContestDate: "March 2025",
    recentContests: [
      { name: "March Long Challenge 2025", rank: 1243, solved: 6, total: 10, rating: 1776 },
      { name: "February Cook-Off 2025", rank: 1567, solved: 4, total: 8, rating: 1750 },
      { name: "January Lunchtime 2025", rank: 1890, solved: 3, total: 7, rating: 1720 },
    ],
  }
}

function getFallbackCodeforcesStats() {
  return {
    handle: "abhijeet1kumar123",
    rating: 1200,
    maxRating: 1250,
    rank: "Pupil",
    maxRank: "Pupil",
    contribution: 0,
    problemsSolved: 75,
    contestsParticipated: 10,
    registrationTimeSeconds: 0,
    lastOnlineTimeSeconds: 0,
  }
}