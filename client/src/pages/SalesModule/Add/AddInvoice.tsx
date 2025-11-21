import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { Invoice } from "@/common/data/demo";
import { invoiceList } from "@/common/data/demo";

const STATUSES = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"];

export default function AddInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: "",
    customerName: "",
    email: "",
    amount: 0,
    status: "Draft",
    issueDate: "",
    dueDate: "",
    paymentTerms: "Net 30",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && id) {
      const invoice = invoiceList.find((i) => i.id === id);
      if (invoice) {
        setFormData(invoice);
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
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
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
    navigate(RedirectionRoutes.invoices);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      {/* Fixed Header */}
      <div className="border-b border-border pb-4 mb-3">
        <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(RedirectionRoutes.invoices)}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              title="Back"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEditing ? "Edit Invoice" : "Add Invoice"}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isEditing ? "Update invoice details" : "Create a new invoice"}
              </p>
            </div>
                  </div>
      </div>

      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div className="w-full flex flex-col gap-0" style={{ height: "calc(100vh - 73px - 80px)" }}>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 max-w-3xl">
            <form id="invoice-form" className="space-y-6">
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
                    placeholder="INV-2024-001"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.invoiceNumber
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.invoiceNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.invoiceNumber}</p>
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
                    <p className="text-xs text-destructive mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="customer@example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount and Issue Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Amount <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount || 0}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.amount
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.amount && (
                    <p className="text-xs text-destructive mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Issue Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.issueDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.issueDate && (
                    <p className="text-xs text-destructive mt-1">{errors.issueDate}</p>
                  )}
                </div>
              </div>

              {/* Due Date and Payment Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Due Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.dueDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="text-xs text-destructive mt-1">{errors.dueDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    name="paymentTerms"
                    value={formData.paymentTerms || ""}
                    onChange={handleChange}
                    placeholder="Net 30"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleChange}
                  placeholder="Add additional notes"
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </form>
          </Card>
        </div>

                      {/* Fixed Footer with Buttons */}
        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="flex gap-3 max-w-3xl">
            <Button
              type="submit"
              form="invoice-form"
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-primary text-white text-sm"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Invoice" : "Add Invoice"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(RedirectionRoutes.invoices)}
              variant="outline"
              className="text-sm"
            >
              Cancel
            </Button>
        </div>
      </div>
    </div>
    </Layout>
  );
}
