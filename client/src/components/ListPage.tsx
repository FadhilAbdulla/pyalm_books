import { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ListPageProps {
  title: string;
  description: string;
  onAddNew: () => void;
  children: ReactNode;
  addButtonLabel?: string;
}

export function ListPage({
  title,
  description,
  onAddNew,
  children,
  addButtonLabel = "Add New",
}: ListPageProps) {
  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          </div>
          <Button onClick={onAddNew} className="bg-primary text-white text-xs">
            <Plus className="mr-2 h-4 w-4" />
            {addButtonLabel}
          </Button>
        </div>

        {/* Content */}
        {children}
      </div>
    </Layout>
  );
}
