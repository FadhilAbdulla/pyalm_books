import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import type { RecurringInvoice } from "@/common/data/sales.model";
import { recurringList } from "@/common/data/demo";
import type { CartItem } from "@/common/data/sales.model";
import CartItemsTable from "@/components/ui/cartItemsTable";

const STATUSES = ["Active", "Paused", "Ended", "Draft"];
const FREQUENCIES = ["Weekly", "Monthly", "Quarterly", "Yearly"];

export default function AddRecurring() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<RecurringInvoice>>({
    invoiceNumber: "",
    customerName: "",
    salesPersonName: "",
    amount: 0,
    status: "Draft",
    frequency: "Monthly",
    startDate: "",
    nextDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [items, setItems] = useState<CartItem[]>([
    {
      id: String(Date.now()),
      item_id: "",
      item_name: "",
      quantity: "1",
      rate: "0",
      discount: "0",
    },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now() + Math.random()),
        item_id: "",
        item_name: "",
        quantity: "1",
        rate: "0",
        discount: "0",
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1)
      setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof CartItem,
    value: string
  ) => {
    setItems((prev) => {
      const next = [...prev];
      // @ts-ignore
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const total = items.reduce((sum, it) => {
    const q = parseFloat((it.quantity as any) || "0") || 0;
    const r = parseFloat((it.rate as any) || "0") || 0;
    const d = parseFloat((it.discount as any) || "0") || 0;
    const row = Math.max(0, q * r - d);
    return sum + row;
  }, 0);

  useEffect(() => {
    if (isEditing && id) {
      const recurring = recurringList.find((r) => r.id === id);
      if (recurring) {
        setFormData(recurring);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.invoiceNumber || formData.invoiceNumber.trim().length < 2) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    if (!formData.customerName || formData.customerName.trim().length < 2) {
      newErrors.customerName = "Customer name is required";
    }
    const itemsTotal = items.reduce((sum, it) => {
      const q = parseFloat((it.quantity as any) || "0") || 0;
      const r = parseFloat((it.rate as any) || "0") || 0;
      const d = parseFloat((it.discount as any) || "0") || 0;
      const row = Math.max(0, q * r - d);
      return sum + row;
    }, 0);
    if (itemsTotal <= 0) {
      newErrors.amount = "Add at least one item with a positive total";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.nextDate) {
      newErrors.nextDate = "Next date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate(RedirectionRoutes.recurring);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Layout>
      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div
        className="w-full flex flex-col gap-0 pt-4"
        style={{ height: "calc(100vh - 55px )" }}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mb-4">
          <Card className="p-6 max-w-3xl">
            {/* Header (scrollable) */}
            <div className="border-b border-border pb-4 mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(RedirectionRoutes.recurring)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {isEditing
                      ? "Edit Recurring Invoice"
                      : "Add Recurring Invoice"}
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isEditing
                      ? "Update recurring invoice details"
                      : "Create a new recurring invoice"}
                  </p>
                </div>
              </div>
            </div>
            <form id="recurring-form" className="space-y-6">
              {/* Invoice Number and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Invoice Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber || ""}
                    onChange={handleChange}
                    placeholder="REC-INV-001"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.invoiceNumber
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.invoiceNumber && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.invoiceNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || "Draft"}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Customer Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName || ""}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.customerName
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Sales Person
                  </label>
                  <input
                    type="text"
                    name="salesPersonName"
                    value={(formData as any).salesPersonName || ""}
                    onChange={handleChange}
                    placeholder="Sales person"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount (computed from items) and Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Amount
                  </label>
                  <div className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    {total.toFixed(2)}
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency || "Monthly"}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {FREQUENCIES.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items Table */}
              <CartItemsTable
                items={items}
                onAdd={addItem}
                onRemove={removeItem}
                onChangeItem={handleItemChange}
              />

              {/* Start Date, Next Date, End Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Start Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.startDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Next Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="nextDate"
                    value={formData.nextDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.nextDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.nextDate && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.nextDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="mx-auto w-full flex items-center justify-start">
            <div className="flex gap-3">
              <Button
                type="submit"
                form="recurring-form"
                disabled={isLoading}
                onClick={handleSubmit}
                className="bg-primary text-white text-sm"
              >
                {isLoading
                  ? "Saving..."
                  : isEditing
                    ? "Update Recurring Invoice"
                    : "Add Recurring Invoice"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.recurring)}
                variant="outline"
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
