import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl pt-32 pb-20 px-4">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last Updated: January 16, 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How VaakuOS Uses Cookies</h2>
            <p className="text-muted-foreground mb-4">
              When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To enable certain functions of the Service.</li>
              <li>To provide analytics.</li>
              <li>To store your preferences.</li>
              <li>To enable delivery of advertisements, including behavioral advertising.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Preferences Cookies</h3>
                <p className="text-muted-foreground">We may use preferences cookies to remember information that changes the way the Service looks or behaves, such as your language preference.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground">We may use analytics cookies to track information how the Service is used so that we can make improvements.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. What Are Your Choices Regarding Cookies</h2>
            <p className="text-muted-foreground mb-4">
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. More Information</h2>
            <p className="text-muted-foreground mb-4">
              You can learn more about cookies at the following third-party websites: AllAboutCookies: http://www.allaboutcookies.org/
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
