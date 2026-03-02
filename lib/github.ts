"use server"

import { Octokit } from "@octokit/rest"

// ✅ Fetch repositories
export async function fetchGitHubRepos() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("GitHub token is not set")
      return []
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const username = "000000000abhi"

    const { data } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    })

    return data.filter((repo) => !repo.fork)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

// ✅ Fetch contributions via GraphQL API
export async function fetchGitHubContributions(username: string = "000000000abhi") {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("GitHub token is not set")
      return 0
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    })

    const result = await response.json()

    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return 0
    }

    return (
      result.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions ?? 0
    )
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    return 0
  }
}
