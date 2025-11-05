import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import { FormModal } from "@/components/FormModal";
import {
  Plus,
  Edit,
  Mail,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  {
    id: "6",
    name: "Future Enterprises",
    email: "info@future.com",
    phone: "+1-555-0106",
    city: "Seattle",
    totalInvoices: 7,
    totalAmount: 28000,
    status: "Active",
    createdDate: "2024-02-10",
  },
  {
    id: "7",
    name: "Innovation Labs",
    email: "hello@innovationlabs.com",
    phone: "+1-555-0107",
    city: "San Diego",
    totalInvoices: 9,
    totalAmount: 35000,
    status: "Active",
    createdDate: "2024-01-30",
  },
  {
    id: "8",
    name: "Pioneer Group",
    email: "contact@pioneer.com",
    phone: "+1-555-0108",
    city: "Denver",
    totalInvoices: 6,
    totalAmount: 22000,
    status: "Inactive",
    createdDate: "2024-03-12",
  },
];

type SortField = "name" | "email" | "totalAmount" | "createdDate" | "status";
type SortOrder = "asc" | "desc";

export default function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    customer?: Customer;
  }>({ isOpen: false, mode: "create" });

  // Apply filters and search
  const filteredAndSortedCustomers = useMemo(() => {
    let result = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        !filters.status || customer.status === filters.status;

      const matchesAmount =
        (!filters.amount_min ||
          customer.totalAmount >= parseFloat(filters.amount_min)) &&
        (!filters.amount_max ||
          customer.totalAmount <= parseFloat(filters.amount_max));

      const matchesDate =
        (!filters.date_from ||
          new Date(customer.createdDate) >= new Date(filters.date_from)) &&
        (!filters.date_to ||
          new Date(customer.createdDate) <= new Date(filters.date_to));

      const matchesCity =
        !filters.city || (filters.city && filters.city.includes(customer.city));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAmount &&
        matchesDate &&
        matchesCity
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
  }, [customers, filters, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedCustomers.length / recordsPerPage,
  );
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    startIndex,
    endIndex,
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteCustomer = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.customer) {
      setCustomers(customers.filter((c) => c.id !== modalState.customer!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  const customerFields = [
    {
      id: "name",
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
      id: "phone",
      label: "Phone",
      type: "text" as const,
      required: true,
      placeholder: "+1-555-0000",
    },
    {
      id: "city",
      label: "City",
      type: "text" as const,
      required: true,
      placeholder: "City name",
    },
    {
      id: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Customers</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage your customer database
            </p>
          </div>
          <Button
            onClick={() => navigate("/customers/new")}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
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
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ],
            },
            {
              id: "date",
              label: "Created Date",
              type: "date-range",
              isPrimary: true,
            },
            {
              id: "amount",
              label: "Total Amount",
              type: "number-range",
              isPrimary: false,
            },
            {
              id: "city",
              label: "City",
              type: "multi-select",
              isPrimary: false,
              options: [
                { label: "New York", value: "New York" },
                { label: "San Francisco", value: "San Francisco" },
                { label: "London", value: "London" },
                { label: "Austin", value: "Austin" },
                { label: "Boston", value: "Boston" },
                { label: "Seattle", value: "Seattle" },
                { label: "San Diego", value: "San Diego" },
                { label: "Denver", value: "Denver" },
              ],
            },
          ]}
          onFilterChange={setFilters}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedCustomers.length)} of{" "}
            {filteredAndSortedCustomers.length} customers
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

        {/* Customers Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap" style={{ minWidth: "600px" }}>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Name
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "name" ? "opacity-100" : "opacity-50"
                        }
                      />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Phone
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    City
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    Invoices
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-foreground">
                    <button
                      onClick={() => handleSort("totalAmount")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Amount
                      <ArrowUpDown
                        size={12}
                        className={
                          sortField === "totalAmount"
                            ? "opacity-100"
                            : "opacity-50"
                        }
                      />
                    </button>
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
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-4 py-2 font-medium">
                      <button
                        onClick={() => navigate(`/customers/view/${customer.id}`)}
                        className="text-primary hover:underline transition-colors"
                      >
                        {customer.name}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {customer.email}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {customer.phone}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {customer.city}
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {customer.totalInvoices}
                    </td>
                    <td className="px-4 py-2 font-semibold text-foreground">
                      ${customer.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted/10 text-muted-foreground"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/customers/${customer.id}`)}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => window.location.href = `mailto:${customer.email}`}
                          className="p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                          title="Email"
                        >
                          <Mail size={12} />
                        </button>
                        <button
                          onClick={() =>
                            setModalState({
                              isOpen: true,
                              mode: "delete",
                              customer,
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

        {paginatedCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No customers found matching your filters
          </div>
        )}

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

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Customer"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete "${modalState.customer?.name}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteCustomer}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
