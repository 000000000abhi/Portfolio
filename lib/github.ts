"use server"

import { Octokit } from "@octokit/rest"

export async function fetchGitHubRepos() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("GitHub token is not set")
      return []
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    // Updated with the correct GitHub username
    const username = "000000000abhi"

    // Fetch user's repositories
    const { data } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100, // Get more repos to display
    })

    return data.filter((repo) => !repo.fork) // Filter out forked repositories
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

export async function fetchGitHubContributions() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("GitHub token is not set")
      return 0
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    // Updated with the correct GitHub username
    const username = "000000000abhi"

    // For a real implementation, you would use GitHub's GraphQL API to get contribution counts
    // This is a simplified version that counts commits in the last year
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const { data: events } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    })

    // Count push events as contributions (simplified)
    const contributions = events.filter(
      (event) => event.type === "PushEvent" && new Date(event.created_at) > oneYearAgo,
    ).length

    // Multiply by a factor since we only get the most recent events
    return contributions * 5
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    return 0
  }
}
