import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import {
  Plus,
  Download,
  Send,
  Copy,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  email: string;
}

export default function Sales() {
  const [activeTab, setActiveTab] = useState<"invoices" | "quotations">(
    "invoices",
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      customer: "Acme Corporation",
      amount: 5000,
      date: "2024-06-28",
      dueDate: "2024-07-28",
      status: "Paid",
      email: "contact@acmecorp.com",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      customer: "Tech Solutions Inc",
      amount: 3200,
      date: "2024-06-25",
      dueDate: "2024-07-25",
      status: "Pending",
      email: "billing@techsolutions.com",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      customer: "Global Industries Ltd",
      amount: 8500,
      date: "2024-06-15",
      dueDate: "2024-07-15",
      status: "Overdue",
      email: "accounts@globalind.com",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      customer: "Digital Ventures",
      amount: 2100,
      date: "2024-06-10",
      dueDate: "2024-07-10",
      status: "Paid",
      email: "finance@digitalventures.com",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      customer: "NextGen Systems",
      amount: 6700,
      date: "2024-06-05",
      dueDate: "2024-07-05",
      status: "Draft",
      email: "contact@nextgen.com",
    },
  ];

  const quotations = [
    {
      id: "1",
      number: "QT-2024-001",
      customer: "Future Corp",
      amount: 12000,
      date: "2024-06-20",
      validUntil: "2024-07-20",
      status: "Sent",
    },
    {
      id: "2",
      number: "QT-2024-002",
      customer: "Innovation Labs",
      amount: 4500,
      date: "2024-06-15",
      validUntil: "2024-07-15",
      status: "Draft",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-accent/10 text-accent";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Overdue":
        return "bg-destructive/10 text-destructive";
      case "Draft":
        return "bg-muted/10 text-muted-foreground";
      case "Sent":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        !filters.status || invoice.status === filters.status;
      const matchesAmount =
        (!filters.amount_min ||
          invoice.amount >= parseFloat(filters.amount_min)) &&
        (!filters.amount_max ||
          invoice.amount <= parseFloat(filters.amount_max));
      const matchesDate =
        (!filters.date_from ||
          new Date(invoice.date) >= new Date(filters.date_from)) &&
        (!filters.date_to ||
          new Date(invoice.date) <= new Date(filters.date_to));
      return matchesSearch && matchesStatus && matchesAmount && matchesDate;
    });
  }, [invoices, filters, searchTerm]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Sales</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage invoices, quotations, and customer payments
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>

        {/* Create Invoice Form */}
        {showCreateForm && (
          <Card className="space-y-4 p-6">
            <h2 className="text-lg font-bold text-foreground">
              Create New Invoice
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Due Date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-foreground">
                  Description
                </label>
                <textarea
                  placeholder="Enter invoice details and items"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-white text-xs">
                Save Invoice
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "invoices"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Invoices ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab("quotations")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "quotations"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quotations ({quotations.length})
          </button>
        </div>

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="space-y-4">
            {/* Advanced Filter */}
            <AdvancedFilter
              filterOptions={[
                {
                  id: "status",
                  label: "Status",
                  type: "select",
                  isPrimary: true,
                  options: [
                    { label: "Paid", value: "Paid" },
                    { label: "Pending", value: "Pending" },
                    { label: "Overdue", value: "Overdue" },
                    { label: "Draft", value: "Draft" },
                  ],
                },
                {
                  id: "date",
                  label: "Invoice Date",
                  type: "date-range",
                  isPrimary: true,
                },
                {
                  id: "amount",
                  label: "Amount",
                  type: "number-range",
                  isPrimary: false,
                },
              ]}
              onFilterChange={setFilters}
            />

            {/* Invoices Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Invoice #
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Customer
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Due Date
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-2 text-right font-semibold text-xs text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors text-xs"
                      >
                        <td className="px-4 py-2 font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-4 py-2 text-foreground">
                          {invoice.customer}
                        </td>
                        <td className="px-4 py-2 font-semibold text-foreground">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {invoice.date}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {invoice.dueDate}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                              invoice.status,
                            )}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-end gap-2">
                            <button
                              title="View"
                              className="rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              title="Send"
                              className="rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <Send size={12} />
                            </button>
                            <button
                              title="More"
                              className="rounded-lg bg-muted p-1.5 text-muted-foreground hover:bg-muted/70 transition-colors"
                            >
                              <MoreHorizontal size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Quotations Tab */}
        {activeTab === "quotations" && (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Quotation #
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Customer
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Valid Until
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-xs text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-2 text-right font-semibold text-xs text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotations.map((quote) => (
                      <tr
                        key={quote.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors text-xs"
                      >
                        <td className="px-4 py-2 font-medium text-foreground">
                          {quote.number}
                        </td>
                        <td className="px-4 py-2 text-foreground">
                          {quote.customer}
                        </td>
                        <td className="px-4 py-2 font-semibold text-foreground">
                          ${quote.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {quote.date}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {quote.validUntil}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                              quote.status,
                            )}`}
                          >
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-end gap-2">
                            <button
                              title="View"
                              className="rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              title="Convert to Invoice"
                              className="rounded-lg bg-accent/10 p-1.5 text-accent hover:bg-accent/20 transition-colors"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
