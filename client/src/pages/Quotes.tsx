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
  Edit,
  Copy,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

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
  },
  {
    id: "4",
    quoteNumber: "QT-2024-004",
    customerName: "Global Industries Ltd",
    email: "accounts@globalind.com",
    amount: 45000,
    status: "Sent",
    issueDate: "2024-06-10",
    expiryDate: "2024-07-10",
    notes: "Infrastructure upgrade",
  },
  {
    id: "5",
    quoteNumber: "QT-2024-005",
    customerName: "Innovation Labs",
    email: "hello@innovationlabs.com",
    amount: 15000,
    status: "Draft",
    issueDate: "2024-06-22",
    expiryDate: "2024-07-22",
    notes: "Design project",
  },
];

type SortField =
  | "quoteNumber"
  | "customerName"
  | "amount"
  | "issueDate"
  | "status";
type SortOrder = "asc" | "desc";

export default function Quotes() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("quoteNumber");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete" | "convert";
    quote?: Quote;
  }>({ isOpen: false, mode: "create" });

  // Apply filters and search
  const filteredAndSortedQuotes = useMemo(() => {
    let result = quotes.filter((quote) => {
      const matchesSearch =
        quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status || quote.status === filters.status;

      const matchesAmount =
        (!filters.amount_min ||
          quote.amount >= parseFloat(filters.amount_min)) &&
        (!filters.amount_max || quote.amount <= parseFloat(filters.amount_max));

      const matchesDate =
        (!filters.date_from ||
          new Date(quote.issueDate) >= new Date(filters.date_from)) &&
        (!filters.date_to ||
          new Date(quote.issueDate) <= new Date(filters.date_to));

      const matchesCustomer =
        !filters.customer ||
        (filters.customer && filters.customer.includes(quote.customerName));

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
  }, [quotes, filters, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedQuotes.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedQuotes = filteredAndSortedQuotes.slice(startIndex, endIndex);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteQuote = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.quote) {
      setQuotes(quotes.filter((q) => q.id !== modalState.quote!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  const quoteFields = [
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
      label: "Quote Amount",
      type: "number" as const,
      required: true,
      placeholder: "0.00",
    },
    {
      id: "expiryDate",
      label: "Expiry Date",
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
        { label: "Accepted", value: "Accepted" },
        { label: "Rejected", value: "Rejected" },
        { label: "Expired", value: "Expired" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-accent/10 text-accent";
      case "Sent":
        return "bg-primary/10 text-primary";
      case "Draft":
        return "bg-muted/10 text-muted-foreground";
      case "Rejected":
      case "Expired":
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
            <h1 className="text-lg font-bold text-foreground">Quotes</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Create and manage quotations
            </p>
          </div>
          <Button
            onClick={() => navigate("/quotes/new")}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
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
                { label: "Accepted", value: "Accepted" },
                { label: "Rejected", value: "Rejected" },
                { label: "Expired", value: "Expired" },
              ],
            },
            {
              id: "date",
              label: "Issue Date",
              type: "date-range",
              isPrimary: true,
            },
            {
              id: "amount",
              label: "Quote Amount",
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
                { label: "Digital Ventures", value: "Digital Ventures" },
                {
                  label: "Global Industries Ltd",
                  value: "Global Industries Ltd",
                },
              ],
            },
          ]}
          onFilterChange={setFilters}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedQuotes.length)} of{" "}
            {filteredAndSortedQuotes.length} quotes
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

        {/* Quotes Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap" style={{ minWidth: "700px" }}>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("quoteNumber")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Quote #
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "quoteNumber"
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
                    Issue Date
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Expiry Date
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
                {paginatedQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-4 py-2 font-medium">
                      <button
                        onClick={() => navigate(`/quotes/detail/${quote.id}`)}
                        className="text-primary hover:underline transition-colors"
                      >
                        {quote.quoteNumber}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {quote.customerName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-foreground">
                      ${quote.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {quote.issueDate}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {quote.expiryDate}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(quote.status)}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            setModalState({ isOpen: true, mode: "view", quote })
                          }
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="View"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        {quote.status === "Sent" && (
                          <button
                            onClick={() =>
                              setModalState({
                                isOpen: true,
                                mode: "convert",
                                quote,
                              })
                            }
                            className="p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                            title="Convert to Invoice"
                          >
                            <Copy size={12} />
                          </button>
                        )}
                        <button
                          onClick={() =>
                            setModalState({
                              isOpen: true,
                              mode: "delete",
                              quote,
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

        {paginatedQuotes.length === 0 && quotes.length === 0 ? (
          <Card className="text-center py-12 px-6">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Quotes Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first quote and impress your customers with professional proposals.
              Get started today!
            </p>
            <Button
              onClick={() => navigate("/quotes/new")}
              className="bg-primary text-white text-xs"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create First Quote
            </Button>
          </Card>
        ) : paginatedQuotes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No quotes found matching your filters
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
        title="View Quote"
        fields={quoteFields}
        initialData={modalState.quote || {}}
        onSubmit={async () => {}}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />

      {/* Delete Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Quote"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete quote "${modalState.quote?.quoteNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteQuote}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
