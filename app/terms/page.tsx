import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import PageLayout from "@/components/page-layout"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <PageLayout title="Terms of Service">
        <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <p>
            Welcome to Abhijeet Ansal's portfolio website. By accessing this website, you agree to be bound by these
            Terms of Service.
          </p>

          <h2>1. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property of
            Abhijeet Ansal and is protected by copyright and other intellectual property laws.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials on this website for personal, non-commercial use
            only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on this website are provided "as is". Abhijeet Ansal makes no warranties, expressed or
            implied, and hereby disclaims and negates all other warranties, including without limitation, implied
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
            intellectual property.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall Abhijeet Ansal be liable for any damages (including, without limitation, damages for loss
            of data or profit, or due to business interruption) arising out of the use or inability to use the materials
            on this website, even if Abhijeet Ansal has been notified orally or in writing of the possibility of such
            damage.
          </p>

          <h2>5. Revisions</h2>
          <p>
            The materials appearing on this website may include technical, typographical, or photographic errors.
            Abhijeet Ansal does not warrant that any of the materials on this website are accurate, complete, or
            current. Abhijeet Ansal may make changes to the materials contained on this website at any time without
            notice.
          </p>

          <h2>6. Links</h2>
          <p>
            Abhijeet Ansal has not reviewed all of the sites linked to this website and is not responsible for the
            contents of any such linked site. The inclusion of any link does not imply endorsement by Abhijeet Ansal of
            the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>7. Modifications</h2>
          <p>
            Abhijeet Ansal may revise these Terms of Service at any time without notice. By using this website, you are
            agreeing to be bound by the then current version of these Terms of Service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of India, without
            giving effect to any principles of conflicts of law.
          </p>

          <p className="text-muted-foreground mt-8">Last updated: May 16, 2025</p>
        </div>
      </PageLayout>
      <Footer />
    </main>
  )
}
