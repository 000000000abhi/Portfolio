import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import PageLayout from "@/components/page-layout"
import { TechSkills } from "@/components/tech-skills"
import { AboutHero } from "@/components/about-hero"
import { Education } from "@/components/education"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <AboutHero />
      <PageLayout title="About Me">
        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">Introduction</h3>
              <p className="mb-4 text-muted-foreground">
                I'm Abhijeet Ansal, a passionate full-stack developer currently pursuing B.Tech in Computer Science and
                Engineering at Graphic Era Deemed to be University, Dehradun. I specialize in building web applications
                using the MERN stack and have a strong foundation in data structures and algorithms.
              </p>
              <p className="text-muted-foreground">
                My journey in web development began with a fascination for how things work behind the scenes. This
                curiosity has driven me to continuously learn and adapt to the ever-evolving landscape of web
                technologies.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">Education</h3>
              <Education />
            </div>
          </div>

          <section id="skills">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
            <TechSkills />
          </section>

          <section id="achievements">
            <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                <h3 className="text-xl font-bold mb-4">Coding Platforms</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    Solved <span className="font-bold text-primary">1200+</span> Problems on LeetCode with a Maximum
                    rating of <span className="font-bold text-primary">2058</span>.
                  </li>
                  <li>
                    Solved <span className="font-bold text-primary">150+</span> Problems on CodeChef with a Maximum
                    rating of <span className="font-bold text-primary">1746</span>.
                  </li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                <h3 className="text-xl font-bold mb-4">Certifications & Honors</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    Finalist of <span className="font-bold text-primary">Code For Good Hackathon (2024)</span> by JP
                    Morgan Chase, selected out of 50,000+ students across India.
                  </li>
                  <li>
                    Certified <span className="font-bold text-primary">AWS Cloud Practitioner</span> for basics of cloud
                    technologies.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
      <Footer />
    </main>
  )
}
