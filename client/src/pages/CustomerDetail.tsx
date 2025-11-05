import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Edit, Trash2, FileText, MessageCircle, CreditCard, FileBarChart } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalInvoices: number;
  totalAmount: number;
  status: "Active" | "Inactive";
  createdDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "+1-555-0101",
    city: "New York",
    totalInvoices: 12,
    totalAmount: 45000,
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    email: "billing@techsolutions.com",
    phone: "+1-555-0102",
    city: "San Francisco",
    totalInvoices: 8,
    totalAmount: 32000,
    status: "Active",
    createdDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Global Industries Ltd",
    email: "accounts@globalind.com",
    phone: "+1-555-0103",
    city: "London",
    totalInvoices: 15,
    totalAmount: 58500,
    status: "Active",
    createdDate: "2023-12-10",
  },
  {
    id: "4",
    name: "Digital Ventures",
    email: "finance@digitalventures.com",
    phone: "+1-555-0104",
    city: "Austin",
    totalInvoices: 5,
    totalAmount: 18000,
    status: "Inactive",
    createdDate: "2024-03-05",
  },
  {
    id: "5",
    name: "NextGen Systems",
    email: "contact@nextgen.com",
    phone: "+1-555-0105",
    city: "Boston",
    totalInvoices: 10,
    totalAmount: 42000,
    status: "Active",
    createdDate: "2024-01-25",
  },
];

type Tab = "overview" | "receivables" | "comments" | "transactions" | "mails" | "statement";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const currentCustomer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "receivables", label: "Receivables", icon: CreditCard },
    { id: "comments", label: "Comments", icon: MessageCircle },
    { id: "transactions", label: "Transactions", icon: FileBarChart },
    { id: "mails", label: "Mails", icon: Mail },
    { id: "statement", label: "Statement", icon: FileBarChart },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold text-foreground mt-2">{currentCustomer.totalInvoices}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-foreground mt-2">${currentCustomer.totalAmount.toLocaleString()}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className={`text-lg font-bold mt-2 ${currentCustomer.status === "Active" ? "text-accent" : "text-muted-foreground"}`}>
                  {currentCustomer.status}
                </p>
              </Card>
            </div>
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{currentCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground">{currentCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City:</span>
                  <span className="text-foreground">{currentCustomer.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created Date:</span>
                  <span className="text-foreground">{currentCustomer.createdDate}</span>
                </div>
              </div>
            </Card>
          </div>
        );
      case "receivables":
        return (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Receivables</h3>
            <p className="text-sm text-muted-foreground">Outstanding invoices and payment details</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Overdue Amount</span>
                <span className="text-sm font-semibold text-destructive">$0.00</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">Pending Amount</span>
                <span className="text-sm font-semibold text-primary">$0.00</span>
              </div>
            </div>
          </Card>
        );
      case "comments":
        return (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Comments</h3>
            <p className="text-sm text-muted-foreground">No comments yet</p>
          </Card>
        );
      case "transactions":
        return (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">No transactions found</p>
          </Card>
        );
      case "mails":
        return (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Email Communications</h3>
            <p className="text-sm text-muted-foreground">No emails sent</p>
          </Card>
        );
      case "statement":
        return (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Account Statement</h3>
            <p className="text-sm text-muted-foreground">Statement data will be displayed here</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex gap-4 h-screen overflow-hidden">
        {/* Sidebar - Customer List */}
        <div className="w-64 border-r border-border overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-background p-3 border-b border-border">
            <h3 className="font-semibold text-sm text-foreground">Customers</h3>
          </div>
          <nav className="space-y-1 p-2">
            {mockCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => navigate(`/customers/view/${customer.id}`)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentCustomer.id === customer.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {customer.name}
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
                  onClick={() => navigate("/customers")}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-foreground">{currentCustomer.name}</h1>
                  <p className="text-xs text-muted-foreground">{currentCustomer.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = `mailto:${currentCustomer.email}`}
                  className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  title="Email"
                >
                  <Mail size={16} />
                </button>
                <button
                  onClick={() => navigate(`/customers/${currentCustomer.id}`)}
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

          {/* Tabs */}
          <div className="flex-shrink-0 border-b border-border bg-muted/30">
            <div className="flex gap-1 p-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
