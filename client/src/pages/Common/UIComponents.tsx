import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export default function UIComponents() {
  const [selectedComponent, setSelectedComponent] = useState("buttons");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const components = [
    { id: "buttons", label: "Buttons" },
    { id: "alerts", label: "Alerts" },
    { id: "modals", label: "Modals" },
    { id: "cards", label: "Cards" },
    { id: "badges", label: "Badges" },
    { id: "inputs", label: "Inputs" },
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case "buttons":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Primary Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-white">Primary</Button>
                <Button className="bg-primary text-white" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Outline Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Outline</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm" className="bg-primary text-white text-xs">
                  Small
                </Button>
                <Button className="bg-primary text-white">Default</Button>
                <Button className="bg-primary text-white px-6">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-white flex items-center gap-2">
                  <CheckCircle size={16} />
                  Success
                </Button>
                <Button className="bg-destructive text-white flex items-center gap-2">
                  <AlertCircle size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );

      case "alerts":
        return (
          <div className="space-y-4">
            <div className="flex gap-3 p-4 rounded-lg bg-accent/10 border border-accent/30 items-start">
              <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Success Alert</h4>
                <p className="text-sm text-muted-foreground">Operation completed successfully.</p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30 items-start">
              <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Info Alert</h4>
                <p className="text-sm text-muted-foreground">This is an informational message.</p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 items-start">
              <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Warning Alert</h4>
                <p className="text-sm text-muted-foreground">Please review this warning message.</p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 items-start">
              <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Error Alert</h4>
                <p className="text-sm text-muted-foreground">An error occurred. Please try again.</p>
              </div>
            </div>
          </div>
        );

      case "modals":
        return (
          <div className="space-y-4">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white"
            >
              Open Modal Example
            </Button>

            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="w-96 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Modal Title</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-1 hover:bg-muted rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    This is a modal dialog example. It can be used for confirmations, forms, or other interactions.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-primary text-white flex-1">Confirm</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              Click "Open Modal Example" to see a modal dialog in action.
            </p>
          </div>
        );

      case "cards":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground">Basic Card</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is a basic card component used throughout the application.
              </p>
            </Card>

            <Card className="p-4 border-primary bg-primary/5">
              <h3 className="font-semibold text-foreground">Primary Card</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is a card with primary styling for highlighted content.
              </p>
            </Card>

            <Card className="p-4 border-destructive bg-destructive/5">
              <h3 className="font-semibold text-foreground">Danger Card</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is a card with danger styling for important warnings.
              </p>
            </Card>

            <Card className="p-4 border-accent bg-accent/5">
              <h3 className="font-semibold text-foreground">Accent Card</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is a card with accent styling for special information.
              </p>
            </Card>
          </div>
        );

      case "badges":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Status Badges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  Active
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Pending
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                  Cancelled
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium">
                  Inactive
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Size Variants</h3>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Small
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Default
                </span>
              </div>
            </div>
          </div>
        );

      case "inputs":
        return (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Select Input
              </label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Textarea
              </label>
              <textarea
                placeholder="Enter text..."
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-xs text-foreground">Checkbox</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radio" className="rounded-full border-border" />
                <span className="text-xs text-foreground">Radio Button</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-bold text-foreground">UI Components</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Browse all available UI components in the system
          </p>
        </div>

        {/* Component Navigation */}
        <div className="flex flex-wrap gap-2">
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedComponent(comp.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedComponent === comp.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
            >
              {comp.label}
            </button>
          ))}
        </div>

        {/* Component Display */}
        <Card className="p-6">
          {renderComponent()}
        </Card>
      </div>
    </Layout>
  );
}
