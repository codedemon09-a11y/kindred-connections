import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Invoice Generator</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your information." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="glass-card rounded-2xl p-8 space-y-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-muted-foreground">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
                <p className="leading-relaxed">
                  Welcome to Invoice Generator. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
                <p className="leading-relaxed">We may collect, use, store and transfer different kinds of personal data about you:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Identity Data: includes first name, last name, username or similar identifier</li>
                  <li>Contact Data: includes email address and telephone numbers</li>
                  <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location</li>
                  <li>Usage Data: includes information about how you use our website and services</li>
                </ul>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
                <p className="leading-relaxed">We use your personal data for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">4. Cookies and Tracking Technologies</h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
                  Cookies are files with a small amount of data which may include an anonymous unique identifier. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">5. Third-Party Advertising</h2>
                <p className="leading-relaxed">
                  We may use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. 
                  These companies may use information about your visits to this and other websites in order to provide 
                  advertisements about goods and services of interest to you. Google's use of advertising cookies enables 
                  it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
                </p>
                <p className="leading-relaxed">
                  You may opt out of personalized advertising by visiting{" "}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Ads Settings
                  </a>.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">6. Data Storage</h2>
                <p className="leading-relaxed">
                  Your invoice and quotation data is stored locally on your device using browser storage. 
                  We do not store your document data on our servers. This means your business information 
                  remains private and under your control.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">7. Data Security</h2>
                <p className="leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being 
                  accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                  We limit access to your personal data to those who have a genuine business need to know it.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">8. Your Legal Rights</h2>
                <p className="leading-relaxed">Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">9. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our service does not address anyone under the age of 13. We do not knowingly collect 
                  personally identifiable information from anyone under the age of 13.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">10. Changes to This Privacy Policy</h2>
                <p className="leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
                </p>
              </section>
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <Link to="/contact" className="text-primary hover:underline">our contact page</Link>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
