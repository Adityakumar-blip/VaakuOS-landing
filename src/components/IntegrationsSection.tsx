import { Card } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";

const integrations = [
  { name: "Shopify", category: "E-commerce" },
  { name: "WooCommerce", category: "E-commerce" },
  { name: "Google Sheets", category: "Productivity" },
  { name: "Wix", category: "E-commerce" },
  // { name: "HubSpot", category: "CRM" },
  // { name: "Salesforce", category: "CRM" },
  // { name: "Stripe", category: "Payments" },
  // { name: "PayPal", category: "Payments" },
  // { name: "Mailchimp", category: "Marketing" },
  // { name: "Slack", category: "Communication" },
  // { name: "Notion", category: "Productivity" },
  // { name: "Airtable", category: "Database" }
];

export const IntegrationsSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section id="integrations" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Seamless <span className="text-primary italic">Integrations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with your favorite tools and platforms. Sync data
            automatically and streamline your workflow.
          </p>
        </div>

        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {integrations.map((integration, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-5 min-w-[200px] h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card text-center group cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-muted mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/10 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {integration.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-sm md:text-base text-foreground mb-1">
                  {integration.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  {integration.category}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find your tool? We're working on more integrations.
          </p>
          {/* <a
            href="#"
            className="text-primary font-bold hover:underline inline-flex items-center gap-2"
          >
            View all integrations <span>→</span>
          </a> */}
        </div>
      </div>
    </section>
  );
};
