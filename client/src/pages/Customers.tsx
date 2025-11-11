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
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";

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
    filteredAndSortedCustomers.length / recordsPerPage
  );
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    startIndex,
    endIndex
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
            onClick={() => navigate(RedirectionRoutes.customerNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className=" h-1 w-4" />
            Add Customer
          </Button>
        </div>
        <DataTable
          dataSource={[{ name: "customer", id: "123", key: "sample" }]}
          tableKey={"customer"}
        />
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
