import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Edit, Trash2, Download, FileText, Settings } from "lucide-react";

interface Quote {
  id: string;
  quoteNumber: string;
  customerName: string;
  email: string;
  amount: number;
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
  issueDate: string;
  expiryDate: string;
  notes: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  template: "professional" | "modern" | "minimal";
}

const mockQuotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "QT-2024-001",
    customerName: "Acme Corporation",
    email: "contact@acmecorp.com",
    amount: 25000,
    status: "Sent",
    issueDate: "2024-06-20",
    expiryDate: "2024-07-20",
    notes: "Enterprise software package",
    items: [
      { description: "Software License", quantity: 1, unitPrice: 15000 },
      { description: "Implementation", quantity: 1, unitPrice: 10000 },
    ],
    template: "professional",
  },
  {
    id: "2",
    quoteNumber: "QT-2024-002",
    customerName: "Tech Solutions Inc",
    email: "billing@techsolutions.com",
    amount: 12500,
    status: "Accepted",
    issueDate: "2024-06-15",
    expiryDate: "2024-07-15",
    notes: "Consulting services",
    items: [
      { description: "Consulting Days", quantity: 5, unitPrice: 2500 },
    ],
    template: "modern",
  },
  {
    id: "3",
    quoteNumber: "QT-2024-003",
    customerName: "Digital Ventures",
    email: "finance@digitalventures.com",
    amount: 8750,
    status: "Draft",
    issueDate: "2024-06-25",
    expiryDate: "2024-07-25",
    notes: "Web development project",
    items: [
      { description: "Web Design", quantity: 1, unitPrice: 4000 },
      { description: "Development", quantity: 1, unitPrice: 4750 },
    ],
    template: "minimal",
  },
];

const templates = ["professional", "modern", "minimal"] as const;

export default function QuoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(
    mockQuotes.find((q) => q.id === id) || mockQuotes[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState(currentQuote?.template || "professional");
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);

  if (!currentQuote) return null;

  const handleQuoteChange = (quoteId: string) => {
    const quote = mockQuotes.find((q) => q.id === quoteId);
    if (quote) {
      setCurrentQuote(quote);
      navigate(`/quotes/detail/${quoteId}`);
    }
  };

  const getTemplatePreview = () => {
    switch (selectedTemplate) {
      case "professional":
        return "bg-gradient-to-br from-slate-50 to-blue-50";
      case "modern":
        return "bg-gradient-to-br from-purple-50 to-pink-50";
      case "minimal":
        return "bg-white";
      default:
        return "bg-white";
    }
  };

  return (
    <Layout>
      <div className="flex gap-4 h-screen overflow-hidden">
        {/* Sidebar - Quote List */}
        <div className="w-64 border-r border-border overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-background p-3 border-b border-border">
            <h3 className="font-semibold text-sm text-foreground">Quotes</h3>
          </div>
          <nav className="space-y-1 p-2">
            {mockQuotes.map((quote) => (
              <button
                key={quote.id}
                onClick={() => handleQuoteChange(quote.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentQuote.id === quote.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="font-semibold">{quote.quoteNumber}</div>
                <div className="text-xs text-muted-foreground truncate">{quote.customerName}</div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/quotes")}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-foreground">{currentQuote.quoteNumber}</h1>
                  <p className="text-xs text-muted-foreground">{currentQuote.customerName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = `mailto:${currentQuote.email}`}
                  className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  title="Send Email"
                >
                  <Mail size={16} />
                </button>
                <button
                  onClick={() => navigate(`/quotes/${currentQuote.id}`)}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Template Selection */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Settings size={14} />
                    Quote Template
                  </h3>
                  <Button
                    onClick={() => setIsEditingTemplate(!isEditingTemplate)}
                    variant="outline"
                    className="text-xs"
                  >
                    {isEditingTemplate ? "Done" : "Change"}
                  </Button>
                </div>

                {isEditingTemplate ? (
                  <div className="grid gap-3 md:grid-cols-3">
                    {templates.map((template) => (
                      <button
                        key={template}
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsEditingTemplate(false);
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedTemplate === template
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className={`h-32 rounded ${getTemplatePreview()} mb-2`} />
                        <div className="text-sm font-medium text-foreground capitalize">{template}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="text-sm text-foreground capitalize font-medium">{selectedTemplate} Template</p>
                  </div>
                )}
              </Card>

              {/* Quote Preview */}
              <Card className={`p-8 ${getTemplatePreview()}`}>
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Quote</h2>
                      <p className="text-sm text-muted-foreground">#{currentQuote.quoteNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Issue Date</p>
                      <p className="font-medium text-foreground">{currentQuote.issueDate}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Bill To:</p>
                    <p className="text-sm text-foreground">{currentQuote.customerName}</p>
                    <p className="text-xs text-muted-foreground">{currentQuote.email}</p>
                  </div>

                  {/* Items Table */}
                  <div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-2 text-foreground">Description</th>
                          <th className="text-center py-2 text-foreground">Qty</th>
                          <th className="text-right py-2 text-foreground">Unit Price</th>
                          <th className="text-right py-2 text-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuote.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-foreground/10">
                            <td className="py-3 text-foreground">{item.description}</td>
                            <td className="text-center text-foreground">{item.quantity}</td>
                            <td className="text-right text-foreground">${item.unitPrice.toFixed(2)}</td>
                            <td className="text-right font-medium text-foreground">
                              ${(item.quantity * item.unitPrice).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total */}
                  <div className="flex justify-end">
                    <div className="w-48">
                      <div className="flex justify-between py-2 border-t-2 border-foreground/20">
                        <span className="font-bold text-foreground">Total:</span>
                        <span className="font-bold text-foreground">${currentQuote.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {currentQuote.notes && (
                    <div className="pt-4 border-t border-foreground/10">
                      <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm text-foreground">{currentQuote.notes}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Quote Details */}
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Quote Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className={`text-sm font-medium ${currentQuote.status === "Accepted" ? "text-accent" : "text-foreground"}`}>
                      {currentQuote.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expiry Date</p>
                    <p className="text-sm font-medium text-foreground">{currentQuote.expiryDate}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
