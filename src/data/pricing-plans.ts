// --- Configuration ---

export interface PricingFeature {
  code: string;
  label: string;
  description: string;
  value: any;
  display_value: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  amount: number;
  currency: string;
  billing_interval: number;
  features: PricingFeature[];
  isYearly: boolean;
  yearlyDiscount: number;
  yearlyPrice: number;
  discountedMonthlyPrice: number;
}

export const PRICING_DATA: Record<"monthly" | "yearly", PricingPlan[]> = {
  monthly: [
    {
      id: "10905305-5d8d-4bde-9e41-39f363ea3874",
      name: "Starter",
      subtitle: "Solo operators & tiny teams.",
      description: "Save 20% on annual — ₹9,590/yr",
      amount: 999,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: 2, display_value: "2" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: 1000, display_value: "1000" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: 200, display_value: "200" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: 1000, display_value: "1000" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: false, display_value: "Not Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: 0, display_value: "0" }
      ],
      isYearly: true,
      yearlyDiscount: 20,
      yearlyPrice: 9590,
      discountedMonthlyPrice: 799
    },
    {
      id: "7b0cd7c3-84ec-4f75-9cc8-31b8e98cfc4a",
      name: "Growth",
      subtitle: "Active SMBs scaling on WhatsApp",
      description: "Save 20% on annual — ₹23,990/yr",
      amount: 2499,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: 5, display_value: "5" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: 10000, display_value: "10000" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: -1, display_value: "Unlimited" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: -1, display_value: "Unlimited" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: true, display_value: "Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: -1, display_value: "Unlimited" }
      ],
      isYearly: true,
      yearlyDiscount: 18,
      yearlyPrice: 24590,
      discountedMonthlyPrice: 2049
    },
    {
      id: "3915a96c-f05a-4185-ada9-dd6014ee3c56",
      name: "Pro",
      subtitle: "Established teams & high volume",
      description: "Save 20% on annual — ₹57,590/yr",
      amount: 5999,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: -1, display_value: "Unlimited" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: -1, display_value: "Unlimited" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: -1, display_value: "Unlimited" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: -1, display_value: "Unlimited" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: true, display_value: "Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: -1, display_value: "Unlimited" }
      ],
      isYearly: true,
      yearlyDiscount: 20,
      yearlyPrice: 57590,
      discountedMonthlyPrice: 4799
    }
  ],
  yearly: [
    {
      id: "10905305-5d8d-4bde-9e41-39f363ea3874",
      name: "Starter",
      subtitle: "Solo operators & tiny teams.",
      description: "Save 20% on annual — ₹9,590/yr",
      amount: 999,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: 2, display_value: "2" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: 1000, display_value: "1000" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: 200, display_value: "200" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: 1000, display_value: "1000" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: false, display_value: "Not Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: 0, display_value: "0" }
      ],
      isYearly: true,
      yearlyDiscount: 20,
      yearlyPrice: 9590,
      discountedMonthlyPrice: 799
    },
    {
      id: "7b0cd7c3-84ec-4f75-9cc8-31b8e98cfc4a",
      name: "Growth",
      subtitle: "Active SMBs scaling on WhatsApp",
      description: "Save 20% on annual — ₹23,990/yr",
      amount: 2499,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: 5, display_value: "5" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: 10000, display_value: "10000" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: -1, display_value: "Unlimited" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: -1, display_value: "Unlimited" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: true, display_value: "Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: -1, display_value: "Unlimited" }
      ],
      isYearly: true,
      yearlyDiscount: 18,
      yearlyPrice: 24590,
      discountedMonthlyPrice: 2049
    },
    {
      id: "3915a96c-f05a-4185-ada9-dd6014ee3c56",
      name: "Pro",
      subtitle: "Established teams & high volume",
      description: "Save 20% on annual — ₹57,590/yr",
      amount: 5999,
      currency: "INR",
      billing_interval: 1,
      features: [
        { code: "api_access", label: "API Access", description: "Access to public APIs and webhooks", value: false, display_value: "Not Included" },
        { code: "max_agents", label: "Max Agents", description: "Total active team members allowed", value: -1, display_value: "Unlimited" },
        { code: "max_contacts", label: "Max Contacts", description: "Number of contacts that can be stored", value: -1, display_value: "Unlimited" },
        { code: "max_campaigns", label: "Max Campaigns", description: "Active campaigns allowed at a time", value: -1, display_value: "Unlimited" },
        { code: "monthly_messages", label: "Monthly Messages", description: "Outbound/automation WhatsApp messages per billing cycle", value: -1, display_value: "Unlimited" },
        { code: "priority_support", label: "Priority Support", description: "Includes priority support SLA", value: true, display_value: "Included" },
        { code: "broadcast_enabled", label: "Broadcast Enabled", description: "Allow broadcast/campaign sending", value: true, display_value: "Included" },
        { code: "markup_per_message", label: "Markup Per Message", description: "Per-message markup charged to customer (in INR)", value: 0, display_value: "0" },
        { code: "monthly_ai_replies", label: "Monthly AI Replies", description: "AI-assisted replies allowed each month", value: -1, display_value: "Unlimited" }
      ],
      isYearly: true,
      yearlyDiscount: 20,
      yearlyPrice: 57590,
      discountedMonthlyPrice: 4799
    }
  ]
};
