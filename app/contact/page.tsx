import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import PageLayout from "@/components/page-layout"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <PageLayout title="Contact Me" subtitle="Feel free to reach out for collaborations or just a friendly chat">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </PageLayout>
      <Footer />
    </main>
  )
}
