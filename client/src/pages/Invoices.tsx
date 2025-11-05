import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import { FormModal } from "@/components/FormModal";
import {
  Plus,
  Eye,
  Send,
  Download,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  email: string;
  amount: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  notes: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customerName: "Acme Corporation",
    email: "contact@acmecorp.com",
    amount: 5000,
    status: "Paid",
    issueDate: "2024-06-28",
    dueDate: "2024-07-28",
    paymentTerms: "Net 30",
    notes: "Professional services",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customerName: "Tech Solutions Inc",
    email: "billing@techsolutions.com",
    amount: 3200,
    status: "Sent",
    issueDate: "2024-06-25",
    dueDate: "2024-07-25",
    paymentTerms: "Net 30",
    notes: "Software license",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    customerName: "Global Industries Ltd",
    email: "accounts@globalind.com",
    amount: 8500,
    status: "Overdue",
    issueDate: "2024-06-15",
    dueDate: "2024-07-15",
    paymentTerms: "Net 30",
    notes: "Consulting project",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    customerName: "Digital Ventures",
    email: "finance@digitalventures.com",
    amount: 2100,
    status: "Paid",
    issueDate: "2024-06-10",
    dueDate: "2024-07-10",
    paymentTerms: "Net 30",
    notes: "Monthly retainer",
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-005",
    customerName: "NextGen Systems",
    email: "contact@nextgen.com",
    amount: 6700,
    status: "Draft",
    issueDate: "2024-06-30",
    dueDate: "2024-07-30",
    paymentTerms: "Net 30",
    notes: "Development services",
  },
  {
    id: "6",
    invoiceNumber: "INV-2024-006",
    customerName: "Innovation Labs",
    email: "hello@innovationlabs.com",
    amount: 4200,
    status: "Paid",
    issueDate: "2024-06-20",
    dueDate: "2024-07-20",
    paymentTerms: "Net 30",
    notes: "Design services",
  },
];

type SortField =
  | "invoiceNumber"
  | "customerName"
  | "amount"
  | "issueDate"
  | "status";
type SortOrder = "asc" | "desc";

export default function Invoices() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("invoiceNumber");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete" | "send";
    invoice?: Invoice;
  }>({ isOpen: false, mode: "create" });

  // Apply filters and search
  const filteredAndSortedInvoices = useMemo(() => {
    let result = invoices.filter((invoice) => {
      const matchesSearch =
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          new Date(invoice.issueDate) >= new Date(filters.date_from)) &&
        (!filters.date_to ||
          new Date(invoice.issueDate) <= new Date(filters.date_to));

      const matchesCustomer =
        !filters.customer ||
        (filters.customer && filters.customer.includes(invoice.customerName));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAmount &&
        matchesDate &&
        matchesCustomer
      );
    });

    // Sort
    result.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [invoices, filters, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedInvoices.length / recordsPerPage,
  );
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedInvoices = filteredAndSortedInvoices.slice(
    startIndex,
    endIndex,
  );

  const stats = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: invoices
      .filter((inv) => inv.status === "Paid")
      .reduce((sum, inv) => sum + inv.amount, 0),
    overdueAmount: invoices
      .filter((inv) => inv.status === "Overdue")
      .reduce((sum, inv) => sum + inv.amount, 0),
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteInvoice = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.invoice) {
      setInvoices(invoices.filter((inv) => inv.id !== modalState.invoice!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  const invoiceFields = [
    {
      id: "customerName",
      label: "Customer Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter customer name",
    },
    {
      id: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "customer@example.com",
    },
    {
      id: "amount",
      label: "Invoice Amount",
      type: "number" as const,
      required: true,
      placeholder: "0.00",
    },
    {
      id: "dueDate",
      label: "Due Date",
      type: "date" as const,
      required: true,
    },
    {
      id: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: [
        { label: "Draft", value: "Draft" },
        { label: "Sent", value: "Sent" },
        { label: "Paid", value: "Paid" },
        { label: "Overdue", value: "Overdue" },
        { label: "Cancelled", value: "Cancelled" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-accent/10 text-accent";
      case "Sent":
        return "bg-primary/10 text-primary";
      case "Draft":
        return "bg-muted/10 text-muted-foreground";
      case "Overdue":
      case "Cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Invoices</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Create, send, and manage your invoices
            </p>
          </div>
          <Button
            onClick={() => navigate("/invoices/new")}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Total Invoices</p>
            <p className="text-xl font-bold text-foreground mt-1">
              {stats.totalInvoices}
            </p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-xl font-bold text-foreground mt-1">
              ${stats.totalAmount.toLocaleString()}
            </p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Paid</p>
            <p className="text-xl font-bold text-accent mt-1">
              ${stats.paidAmount.toLocaleString()}
            </p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Overdue</p>
            <p className="text-xl font-bold text-destructive mt-1">
              ${stats.overdueAmount.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Advanced Filter */}
        <AdvancedFilter
          filterOptions={[
            {
              id: "status",
              label: "Status",
              type: "select",
              isPrimary: true,
              options: [
                { label: "Draft", value: "Draft" },
                { label: "Sent", value: "Sent" },
                { label: "Paid", value: "Paid" },
                { label: "Overdue", value: "Overdue" },
                { label: "Cancelled", value: "Cancelled" },
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
            {
              id: "customer",
              label: "Customer",
              type: "multi-select",
              isPrimary: false,
              options: [
                { label: "Acme Corporation", value: "Acme Corporation" },
                { label: "Tech Solutions Inc", value: "Tech Solutions Inc" },
                {
                  label: "Global Industries Ltd",
                  value: "Global Industries Ltd",
                },
                { label: "Digital Ventures", value: "Digital Ventures" },
                { label: "NextGen Systems", value: "NextGen Systems" },
              ],
            },
          ]}
          onFilterChange={setFilters}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedInvoices.length)} of{" "}
            {filteredAndSortedInvoices.length} invoices
          </span>
          <div className="flex items-center gap-2">
            <label className="text-xs">Records per page:</label>
            <select
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded border border-border bg-background px-2 py-1 text-xs"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap" style={{ minWidth: "700px" }}>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("invoiceNumber")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Invoice #
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "invoiceNumber"
                            ? "opacity-100"
                            : "opacity-50"
                        }
                      />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("customerName")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Customer
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "customerName"
                            ? "opacity-100"
                            : "opacity-50"
                        }
                      />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Amount
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "amount" ? "opacity-100" : "opacity-50"
                        }
                      />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Issued
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Due
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-4 py-2 font-medium text-foreground">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {invoice.customerName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-foreground">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {invoice.issueDate}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {invoice.dueDate}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(invoice.status)}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            setModalState({
                              isOpen: true,
                              mode: "view",
                              invoice,
                            })
                          }
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="View"
                        >
                          <Eye size={12} />
                        </button>
                        {invoice.status === "Draft" && (
                          <button
                            onClick={() =>
                              setModalState({
                                isOpen: true,
                                mode: "send",
                                invoice,
                              })
                            }
                            className="p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                            title="Send"
                          >
                            <Send size={12} />
                          </button>
                        )}
                        <button
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Download"
                        >
                          <Download size={12} />
                        </button>
                        <button
                          onClick={() =>
                            setModalState({
                              isOpen: true,
                              mode: "delete",
                              invoice,
                            })
                          }
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {paginatedInvoices.length === 0 && invoices.length === 0 ? (
          <Card className="text-center py-12 px-6">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Invoices Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We don't want to boast too much, but sending amazing invoices and getting paid is easier than ever.
              Go ahead! Try it yourself.
            </p>
            <Button
              onClick={() => navigate("/invoices/new")}
              className="bg-primary text-white text-xs"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create First Invoice
            </Button>
          </Card>
        ) : paginatedInvoices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No invoices found matching your filters
          </div>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Button
                  key={idx + 1}
                  variant={currentPage === idx + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(idx + 1)}
                  className="text-xs w-8 h-8"
                >
                  {idx + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "view"}
        title="View Invoice"
        fields={invoiceFields}
        initialData={modalState.invoice || {}}
        onSubmit={async () => {}}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />

      {/* Delete Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Invoice"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete invoice "${modalState.invoice?.invoiceNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteInvoice}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
