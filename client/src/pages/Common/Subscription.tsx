import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  features: string[];
  current: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    period: "monthly",
    features: [
      "Up to 5 invoices per month",
      "Basic customer management",
      "Email support",
      "Limited reporting",
    ],
    current: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: 29,
    period: "monthly",
    features: [
      "Unlimited invoices",
      "Advanced customer management",
      "Priority email & chat support",
      "Detailed reporting & analytics",
      "Custom invoice templates",
      "Recurring invoices",
    ],
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "monthly",
    features: [
      "Everything in Professional",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SSO & advanced security",
      "White-label options",
      "Phone support",
    ],
    current: false,
  },
];

export default function Subscription() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    // In a real app, this would redirect to a payment page
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            title="Back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Subscription Plans</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Choose the perfect plan for your business
            </p>
          </div>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${billingPeriod === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-primary transition-transform ${
                billingPeriod === "yearly" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${billingPeriod === "yearly" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
            Yearly <span className="text-accent text-xs ml-1">(Save 20%)</span>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 flex flex-col transition-all ${
                plan.current ? "border-primary bg-primary/5 scale-105" : "hover:shadow-lg"
              }`}
            >
              {plan.current && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Current Plan
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
              </div>

              <div className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.current}
                className={`w-full text-xs ${
                  plan.current
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, bank transfers, and popular digital payment methods.",
              },
              {
                q: "Is there a free trial?",
                a: "The Starter plan is completely free. You can try Professional features with a 14-day free trial.",
              },
              {
                q: "What happens to my data if I downgrade?",
                a: "Your data is always safe. If you downgrade, we'll help you manage your invoices to comply with your new plan limits.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">{faq.q}</h3>
                <p className="text-xs text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Billing History</h2>
          <Card className="overflow-hidden">
            <table className="w-full text-xs">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">Description</th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2024-06-01", desc: "Professional Plan - Monthly", amount: "$29.00", status: "Paid" },
                  { date: "2024-05-01", desc: "Professional Plan - Monthly", amount: "$29.00", status: "Paid" },
                  { date: "2024-04-01", desc: "Professional Plan - Monthly", amount: "$29.00", status: "Paid" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-2 text-muted-foreground">{item.date}</td>
                    <td className="px-4 py-2 text-foreground">{item.desc}</td>
                    <td className="px-4 py-2 font-semibold text-foreground">{item.amount}</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
