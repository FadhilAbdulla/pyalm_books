import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  MoreHorizontal,
  Search,
  AlertTriangle,
  Package,
  Warehouse,
  TrendingUp,
} from "lucide-react";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  reorderLevel: number;
  warehouse: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastRestocked: string;
}

interface InventoryAdjustment {
  id: string;
  date: string;
  product: string;
  type: "Inbound" | "Outbound" | "Adjustment";
  quantity: number;
  reason: string;
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<
    "products" | "adjustments" | "warehouses"
  >("products");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const products: Product[] = [
    {
      id: "1",
      sku: "PRD-001",
      name: "Office Chair - Executive",
      category: "Furniture",
      unitPrice: 250,
      quantity: 45,
      reorderLevel: 10,
      warehouse: "Main Warehouse",
      status: "In Stock",
      lastRestocked: "2024-06-20",
    },
    {
      id: "2",
      sku: "PRD-002",
      name: "Desk Lamp LED",
      category: "Lighting",
      unitPrice: 45,
      quantity: 8,
      reorderLevel: 15,
      warehouse: "Main Warehouse",
      status: "Low Stock",
      lastRestocked: "2024-06-15",
    },
    {
      id: "3",
      sku: "PRD-003",
      name: "Monitor 4K 27 inch",
      category: "Electronics",
      unitPrice: 450,
      quantity: 0,
      reorderLevel: 5,
      warehouse: "Main Warehouse",
      status: "Out of Stock",
      lastRestocked: "2024-05-10",
    },
    {
      id: "4",
      sku: "PRD-004",
      name: "Keyboard Mechanical",
      category: "Peripherals",
      unitPrice: 120,
      quantity: 32,
      reorderLevel: 10,
      warehouse: "Secondary Warehouse",
      status: "In Stock",
      lastRestocked: "2024-06-18",
    },
    {
      id: "5",
      sku: "PRD-005",
      name: "USB-C Cable 2m",
      category: "Cables",
      unitPrice: 15,
      quantity: 125,
      reorderLevel: 50,
      warehouse: "Main Warehouse",
      status: "In Stock",
      lastRestocked: "2024-06-22",
    },
  ];

  const adjustments: InventoryAdjustment[] = [
    {
      id: "1",
      date: "2024-06-28",
      product: "Office Chair - Executive",
      type: "Inbound",
      quantity: 20,
      reason: "Purchase order PO-2024-001",
    },
    {
      id: "2",
      date: "2024-06-27",
      product: "Desk Lamp LED",
      type: "Outbound",
      quantity: 5,
      reason: "Sale INV-2024-001",
    },
    {
      id: "3",
      date: "2024-06-26",
      product: "Monitor 4K 27 inch",
      type: "Adjustment",
      quantity: -2,
      reason: "Inventory count discrepancy",
    },
    {
      id: "4",
      date: "2024-06-25",
      product: "Keyboard Mechanical",
      type: "Inbound",
      quantity: 15,
      reason: "Purchase order PO-2024-002",
    },
  ];

  const warehouses = [
    {
      name: "Main Warehouse",
      location: "New York, NY",
      capacity: 5000,
      used: 2800,
    },
    {
      name: "Secondary Warehouse",
      location: "Los Angeles, CA",
      capacity: 3000,
      used: 1500,
    },
  ];

  const lowStockProducts = products.filter((p) => p.status !== "In Stock");
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-accent/10 text-accent";
      case "Low Stock":
        return "bg-warning/10 text-warning";
      case "Out of Stock":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
            <p className="mt-1 text-muted-foreground">
              Manage products, stock levels, and warehouses
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-primary text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Products
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {products.length}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Low Stock Alert
                </p>
                <p className="mt-2 text-2xl font-bold text-warning">
                  {lowStockProducts.length}
                </p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Inventory Value
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  $
                  {products
                    .reduce((sum, p) => sum + p.unitPrice * p.quantity, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-accent/10 p-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Create Product Form */}
        {showCreateForm && (
          <Card className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-foreground">
              Add New Product
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Auto-generated or enter SKU"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none">
                  <option>Furniture</option>
                  <option>Electronics</option>
                  <option>Peripherals</option>
                  <option>Cables</option>
                  <option>Lighting</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Unit Price
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Reorder Level
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-white">Save Product</Button>
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
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "products"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("adjustments")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "adjustments"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Adjustments ({adjustments.length})
          </button>
          <button
            onClick={() => setActiveTab("warehouses")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "warehouses"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Warehouses ({warehouses.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
              />
            </div>

            {/* Products Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        SKU
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Warehouse
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
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          ${product.unitPrice}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-semibold ${
                              product.quantity === 0
                                ? "text-destructive"
                                : product.quantity <= product.reorderLevel
                                  ? "text-warning"
                                  : "text-accent"
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.warehouse}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                              product.status,
                            )}`}
                          >
                            {product.status}
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

        {/* Adjustments Tab */}
        {activeTab === "adjustments" && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adjustments.map((adj) => (
                    <tr
                      key={adj.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        {adj.date}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {adj.product}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            adj.type === "Inbound"
                              ? "bg-accent/10 text-accent"
                              : adj.type === "Outbound"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-warning/10 text-warning"
                          }`}
                        >
                          {adj.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {adj.quantity > 0 ? "+" : ""}
                        {adj.quantity}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {adj.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Warehouses Tab */}
        {activeTab === "warehouses" && (
          <div className="space-y-4">
            {warehouses.map((warehouse) => {
              const utilization = (warehouse.used / warehouse.capacity) * 100;
              return (
                <Card key={warehouse.name} className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Warehouse className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {warehouse.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {warehouse.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {utilization.toFixed(0)}% Full
                    </span>
                  </div>

                  <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="mt-1 font-semibold text-foreground">
                        {warehouse.capacity} units
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Currently Stored
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {warehouse.used} units
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Available Space
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {warehouse.capacity - warehouse.used} units
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
