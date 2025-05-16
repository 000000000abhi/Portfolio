import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import PortfolioContent from "@/components/portfolio-content"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <PortfolioContent />
      <Footer />
    </main>
  )
}
