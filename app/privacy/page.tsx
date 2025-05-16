import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import PageLayout from "@/components/page-layout"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <PageLayout title="Privacy Policy">
        <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit
            Abhijeet Ansal's portfolio website.
          </p>

          <h2>1. Personal Information We Collect</h2>
          <p>
            When you visit the website, we automatically collect certain information about your device, including
            information about your web browser, IP address, time zone, and some of the cookies that are installed on
            your device.
          </p>
          <p>
            Additionally, as you browse the website, we collect information about the individual web pages that you
            view, what websites or search terms referred you to the website, and information about how you interact with
            the website. We refer to this automatically-collected information as "Device Information."
          </p>

          <h2>2. How We Use Your Personal Information</h2>
          <p>We use the Device Information that we collect to:</p>
          <ul>
            <li>
              Improve and optimize our website (for example, by generating analytics about how our visitors browse)
            </li>
            <li>Assess the success of our marketing and outreach efforts</li>
            <li>
              When in line with the preferences you have shared with us, provide you with information or advertising
              relating to our products or services
            </li>
          </ul>

          <h2>3. Sharing Your Personal Information</h2>
          <p>
            We do not share your Personal Information with third parties, except as described in this Privacy Policy.
          </p>
          <p>
            We may share your Personal Information with service providers to help us operate our website or administer
            activities on our behalf.
          </p>
          <p>
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to
            respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise
            protect our rights.
          </p>

          <h2>4. Do Not Track</h2>
          <p>
            Please note that we do not alter our website's data collection and use practices when we see a Do Not Track
            signal from your browser.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access personal information we hold about you and to
            ask that your personal information be corrected, updated, or deleted. If you would like to exercise this
            right, please contact us.
          </p>
          <p>
            Additionally, if you are a European resident, we note that we are processing your information in order to
            fulfill contracts we might have with you, or otherwise to pursue our legitimate business interests listed
            above.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            When you contact us through the website, we will maintain your message information for our records unless
            and until you ask us to delete this information.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our
            practices or for other operational, legal or regulatory reasons.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a
            complaint, please contact us by e-mail at ak4492473@gmail.com.
          </p>

          <p className="text-muted-foreground mt-8">Last updated: May 16, 2025</p>
        </div>
      </PageLayout>
      <Footer />
    </main>
  )
}
