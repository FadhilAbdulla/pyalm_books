import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export function ModulePlaceholder({
  title,
  description,
  features,
  icon,
}: PlaceholderProps) {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>

        {/* Placeholder Content */}
        <Card className="p-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>

          <h2 className="mb-3 text-2xl font-bold text-foreground">
            {title} Module
          </h2>

          <p className="mb-8 text-muted-foreground">
            This module is currently being developed. We're building a
            comprehensive {title.toLowerCase()} system with all the features
            listed below.
          </p>

          <div className="mx-auto mb-8 max-w-2xl text-left">
            <h3 className="mb-4 font-semibold text-foreground">
              Planned Features:
            </h3>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button className="bg-primary text-white">
            Back to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        {/* Coming Soon */}
        <div className="rounded-lg border border-dashed border-primary/50 bg-primary/5 p-8 text-center">
          <p className="text-sm font-medium text-primary">
            ✨ This feature is coming soon. Keep an eye on our roadmap for
            updates!
          </p>
        </div>
      </div>
    </Layout>
  );
}
