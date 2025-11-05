import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface Bill {
  id: string;
  billNumber: string;
  vendor: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  category: string;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  amount: number;
  date: string;
  expectedDelivery: string;
  status: "Draft" | "Sent" | "Confirmed" | "Received";
}

export default function Purchases() {
  const [activeTab, setActiveTab] = useState<"bills" | "purchase-orders">(
    "bills",
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const bills: Bill[] = [
    {
      id: "1",
      billNumber: "BILL-2024-001",
      vendor: "Office Supplies Inc",
      amount: 450,
      date: "2024-06-25",
      dueDate: "2024-07-05",
      status: "Pending",
      category: "Office Supplies",
    },
    {
      id: "2",
      billNumber: "BILL-2024-002",
      vendor: "Cloud Services Ltd",
      amount: 1200,
      date: "2024-06-20",
      dueDate: "2024-07-10",
      status: "Pending",
      category: "Subscriptions",
    },
    {
      id: "3",
      billNumber: "BILL-2024-003",
      vendor: "Marketing Agency",
      amount: 3500,
      date: "2024-06-15",
      dueDate: "2024-07-15",
      status: "Overdue",
      category: "Marketing",
    },
    {
      id: "4",
      billNumber: "BILL-2024-004",
      vendor: "Utilities Provider",
      amount: 850,
      date: "2024-06-10",
      dueDate: "2024-07-10",
      status: "Paid",
      category: "Utilities",
    },
    {
      id: "5",
      billNumber: "BILL-2024-005",
      vendor: "Tech Equipment Co",
      amount: 2400,
      date: "2024-06-05",
      dueDate: "2024-07-05",
      status: "Draft",
      category: "Equipment",
    },
  ];

  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "1",
      poNumber: "PO-2024-001",
      vendor: "Inventory Supplies",
      amount: 5600,
      date: "2024-06-22",
      expectedDelivery: "2024-07-05",
      status: "Confirmed",
    },
    {
      id: "2",
      poNumber: "PO-2024-002",
      vendor: "Raw Materials Ltd",
      amount: 8200,
      date: "2024-06-20",
      expectedDelivery: "2024-07-10",
      status: "Received",
    },
    {
      id: "3",
      poNumber: "PO-2024-003",
      vendor: "Wholesale Distributor",
      amount: 3400,
      date: "2024-06-15",
      expectedDelivery: "2024-07-20",
      status: "Sent",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
      case "Received":
        return "bg-accent/10 text-accent";
      case "Pending":
      case "Sent":
        return "bg-warning/10 text-warning";
      case "Overdue":
        return "bg-destructive/10 text-destructive";
      case "Draft":
        return "bg-muted/10 text-muted-foreground";
      case "Confirmed":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || bill.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total Payable",
      value: `$${bills.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}`,
      icon: DollarSign,
    },
    {
      label: "Due This Month",
      value: `$${bills
        .filter(
          (b) =>
            new Date(b.dueDate) <= new Date("2024-07-30") &&
            b.status !== "Paid",
        )
        .reduce((sum, b) => sum + b.amount, 0)
        .toLocaleString()}`,
      icon: AlertCircle,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Purchases</h1>
            <p className="mt-1 text-muted-foreground">
              Manage purchase orders, bills, and vendor payments
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-primary text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Bill
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="rounded-lg bg-warning/10 p-3">
                    <Icon className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Create Bill Form */}
        {showCreateForm && (
          <Card className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-foreground">
              Create New Bill
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Vendor Name
                </label>
                <input
                  type="text"
                  placeholder="Enter vendor name"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none">
                  <option>Office Supplies</option>
                  <option>Subscriptions</option>
                  <option>Marketing</option>
                  <option>Utilities</option>
                  <option>Equipment</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Due Date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-white">Save Bill</Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("bills")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "bills"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bills ({bills.length})
          </button>
          <button
            onClick={() => setActiveTab("purchase-orders")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "purchase-orders"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Purchase Orders ({purchaseOrders.length})
          </button>
        </div>

        {/* Bills Tab */}
        {activeTab === "bills" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by bill number or vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
              >
                <option>All</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
                <option>Draft</option>
              </select>
            </div>

            {/* Bills Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Bill #
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Vendor
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Due Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill) => (
                      <tr
                        key={bill.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {bill.billNumber}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {bill.vendor}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {bill.category}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          ${bill.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {bill.date}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {bill.dueDate}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                              bill.status,
                            )}`}
                          >
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-muted/70 transition-colors">
                              <MoreHorizontal size={16} />
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

        {/* Purchase Orders Tab */}
        {activeTab === "purchase-orders" && (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        PO #
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Vendor
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Expected Delivery
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((po) => (
                      <tr
                        key={po.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {po.poNumber}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {po.vendor}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          ${po.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {po.date}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {po.expectedDelivery}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                              po.status,
                            )}`}
                          >
                            {po.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-muted/70 transition-colors">
                              <MoreHorizontal size={16} />
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
