import Header from "@/components/header"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <Hero />
      <Footer />
    </main>
  )
}
