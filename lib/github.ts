"use server"

import { Octokit } from "@octokit/rest"

// ✅ Fetch repositories with better error handling
export async function fetchGitHubRepos() {
  const username = "000000000abhi";

  const fetchWithOctokit = async (octokitInstance: Octokit) => {
    const { data } = await octokitInstance.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });

    return data.filter((repo: any) => !repo.fork).map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
    }));
  };

  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (token) {
      const octokit = new Octokit({ auth: token });
      try {
        return await fetchWithOctokit(octokit);
      } catch (apiError: any) {
        if (apiError.status === 401) {
          console.error("GitHub token is invalid or expired. Falling back to unauthenticated request.");
          // Fallthrough to unauthenticated request
        } else {
          console.error("Error fetching GitHub repos with token:", apiError.message);
          return getFallbackRepos();
        }
      }
    } else {
      console.warn("GitHub token is not set. Using unauthenticated request (rate limits may apply).");
    }

    // Try unauthenticated request
    const unauthenticatedOctokit = new Octokit();
    try {
      return await fetchWithOctokit(unauthenticatedOctokit);
    } catch (unauthError: any) {
      console.error("Error fetching GitHub repos without token:", unauthError.message);
      return getFallbackRepos();
    }
  } catch (error) {
    console.error("Unexpected error fetching GitHub repos:", error);
    return getFallbackRepos();
  }
}

// Fallback repositories data
function getFallbackRepos() {
  return [
    {
      id: 1,
      name: "Portfolio",
      description: "Personal portfolio website built with Next.js and Tailwind CSS",
      html_url: "https://github.com/000000000abhi/Portfolio",
      homepage: "https://abhijeet-portfolio.vercel.app",
      stargazers_count: 42,
      forks_count: 8,
      watchers_count: 15,
      language: "TypeScript",
      topics: ["nextjs", "tailwindcss", "portfolio"],
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with React and Node.js",
      html_url: "https://github.com/000000000abhi/ecommerce",
      homepage: "https://ecommerce-demo.vercel.app",
      stargazers_count: 28,
      forks_count: 5,
      watchers_count: 12,
      language: "JavaScript",
      topics: ["react", "nodejs", "ecommerce"],
      updated_at: new Date().toISOString(),
    },
  ]
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
