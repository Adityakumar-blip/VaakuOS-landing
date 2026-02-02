import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl pt-32 pb-20 px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last Updated: January 16, 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using VaakuOS, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              VaakuOS provides an omnichannel communication platform powered by AI to help businesses recover abandoned sales and engage with customers. We reserve the right to withdraw or amend our service without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Fees and Payments</h2>
            <p className="text-muted-foreground mb-4">
              Certain aspects of the Service may be provided for a fee. You agree to pay all fees and charges incurred in connection with your account. We reserve the right to change our pricing and to institute new charges at any time, upon notice to you, which may be sent by email or posted on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Service and its original content, features and functionality are and will remain the exclusive property of VaakuOS and its licensors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall VaakuOS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which VaakuOS operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
