import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  FileText,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Users,
  Globe,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      description: "Create, send, and track invoices with automatic reminders",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive financial reports and business insights",
    },
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Automatic expense categorization and tax calculations",
    },
    {
      icon: TrendingUp,
      title: "Cash Flow Forecasting",
      description: "Predict future cash flows and plan accordingly",
    },
    {
      icon: Clock,
      title: "Time-Saving Automation",
      description: "Automate repetitive tasks and focus on growth",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and data protection",
    },
  ];

  const highlights = [
    "Dashboard with real-time financial metrics",
    "Sales & invoice management with online payments",
    "Purchase order & bill tracking system",
    "Bank reconciliation & transaction categorization",
    "Inventory management with stock tracking",
    "Customizable chart of accounts",
    "Advanced reporting & analytics",
    "Multi-currency & multi-language support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Pyalm Books" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5">
            <span className="text-sm font-semibold text-primary">
              ✨ Modern Accounting Platform
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-gradient">
              {" "}
              Pyalm Books — Cloud Accounting Made Simple
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Pyalm Books brings enterprise-grade accounting features with modern
            UX design. Manage invoices, expenses, inventory, and financial
            reports all in one intuitive platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-white hover:shadow-lg hover:shadow-primary/50"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>No credit card required • Free for 30 days</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Used by 10,000+ businesses worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border/30 bg-card/50 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed for modern accounting teams
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-border bg-background p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
                >
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Modules Section */}
      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Complete Module Coverage
            </h2>
            <p className="text-lg text-muted-foreground">
              All the tools you need for comprehensive financial management
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to Simplify Your Accounting?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Join thousands of businesses using Pyalm Books for smarter financial
            management.
          </p>
          <Link to="/dashboard">
            <Button
              size="lg"
              className="bg-primary text-white hover:shadow-lg hover:shadow-primary/50"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/50 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <img src="/logo.png" alt="Pyalm Books" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                Modern accounting platform for the digital age
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Features
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Pricing
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Security
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  About
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Blog
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Contact
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Privacy
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Terms
                </li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  Cookies
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Pyalm Books. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
