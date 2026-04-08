import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl pt-32 pb-20 px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last Updated: January 16, 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to VaakuOS, operated by UNSOLVED TECHNOLOGIES LLP. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
            </p>
            <p className="text-muted-foreground mb-4">
              We also collect information through cookies and similar technologies. This includes your IP address, browser type, and operating system.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use personal information collected via our Services for a variety of business purposes described below:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders.</li>
              <li>To post testimonials with your consent.</li>
              <li>To deliver services to the user.</li>
              <li>To respond to user inquiries/offer support to users.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Sharing Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We aim to protect your personal information through a system of organizational and technical security measures. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or comments about this policy, you may email us at hello@vaakuos.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
