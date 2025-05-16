import { Suspense } from "react"
import { GitHubProjects } from "./github-projects"
import { CodingProfiles } from "./coding-profiles"
import { AcademicInfo } from "./academic-info"
import { GitHubContributions } from "./github-contributions"
import PageLayout from "./page-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioContent() {
  // Updated with the correct GitHub username
  const githubUsername = "000000000abhi"

  return (
    <PageLayout title="My Portfolio" subtitle="Showcasing my projects, coding profiles, and academic achievements">
      <div className="space-y-16">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">GitHub Projects</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            These are my public GitHub repositories, automatically fetched and updated in real-time.
          </p>
          <Suspense fallback={<ProjectsSkeleton />}>
            <GitHubProjects />
          </Suspense>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Coding Profiles</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            My performance and statistics from competitive coding platforms, updated in real-time.
          </p>
          <Suspense fallback={<ProfilesSkeleton />}>
            <CodingProfiles />
          </Suspense>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Academic Performance</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            My academic achievements and progress at Graphic Era Deemed to be University.
          </p>
          <AcademicInfo />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">GitHub Contributions</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            My open-source contributions and activity on GitHub over the past year.
          </p>
          <Suspense fallback={<ContributionsSkeleton />}>
            <GitHubContributions username={githubUsername} />
          </Suspense>
        </section>
      </div>
    </PageLayout>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-6 rounded-lg shadow-lg bg-card h-[350px] flex flex-col">
          <Skeleton className="w-full h-48 mb-4 rounded-lg" />
          <Skeleton className="w-3/4 h-8 mb-4" />
          <Skeleton className="w-full h-20 mb-4" />
          <Skeleton className="w-1/3 h-10 mt-auto" />
        </div>
      ))}
    </div>
  )
}

function ProfilesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 rounded-lg shadow-lg bg-card md:col-span-2">
        <Skeleton className="w-1/2 h-8 mb-4" />
        <Skeleton className="w-full h-20 mb-4" />
        <Skeleton className="w-1/3 h-10 mx-auto" />
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="p-6 rounded-lg shadow-lg bg-card">
          <Skeleton className="w-1/2 h-8 mb-4" />
          <Skeleton className="w-full h-20 mb-4" />
          <Skeleton className="w-1/3 h-10 mx-auto" />
        </div>
      ))}
    </div>
  )
}

function ContributionsSkeleton() {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-card">
      <Skeleton className="w-full h-40 rounded-lg mb-4" />
      <div className="flex justify-center">
        <Skeleton className="w-1/3 h-10" />
      </div>
    </div>
  )
}
