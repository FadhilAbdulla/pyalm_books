import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { CreditNote } from "@/common/data/demo";
import { creditList } from "@/common/data/demo";

const STATUSES = ["Draft", "Issued", "Applied", "Cancelled"];

export default function AddCredit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CreditNote>>({
    creditNumber: "",
    invoiceNumber: "",
    customerName: "",
    email: "",
    amount: 0,
    status: "Draft",
    reason: "",
    issueDate: "",
    appliedDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && id) {
      const credit = creditList.find((c) => c.id === id);
      if (credit) {
        setFormData(credit);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.creditNumber || formData.creditNumber.trim().length < 2) {
      newErrors.creditNumber = "Credit number is required";
    }
    if (!formData.invoiceNumber || formData.invoiceNumber.trim().length < 2) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    if (!formData.customerName || formData.customerName.trim().length < 2) {
      newErrors.customerName = "Customer name is required";
    }
    if (!formData.reason || formData.reason.trim().length < 3) {
      newErrors.reason = "Reason is required";
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
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
    navigate(RedirectionRoutes.credits);
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
      {/* Fixed Header */}
      <div className="border-b border-border pb-4 mb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(RedirectionRoutes.credits)}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            title="Back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {isEditing ? "Edit Credit Note" : "Add Credit Note"}
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isEditing
                ? "Update credit note details"
                : "Create a new credit note"}
            </p>
          </div>
                </div>
      </div>

      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div className="w-full flex flex-col gap-0" style={{ height: "calc(100vh - 73px - 80px)" }}>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 max-w-3xl">
          <form id="credit-form" className="space-y-6">
            {/* Credit Number and Invoice Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Credit Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="creditNumber"
                  value={formData.creditNumber || ""}
                  onChange={handleChange}
                  placeholder="CR-2024-001"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.creditNumber
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.creditNumber && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.creditNumber}
                  </p>
                )}
              </div>

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
                  <p className="text-xs text-destructive mt-1">
                    {errors.invoiceNumber}
                  </p>
                )}
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

            {/* Amount and Status */}
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
                  <p className="text-xs text-destructive mt-1">
                    {errors.amount}
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

            {/* Reason */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Reason <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="reason"
                value={formData.reason || ""}
                onChange={handleChange}
                placeholder="e.g., Damaged goods, return, discount"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                  errors.reason
                    ? "border-destructive bg-destructive/5 focus:border-destructive"
                    : "border-border bg-background focus:border-primary"
                }`}
              />
              {errors.reason && (
                <p className="text-xs text-destructive mt-1">{errors.reason}</p>
              )}
            </div>

            {/* Issue and Applied Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-xs text-destructive mt-1">
                    {errors.issueDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Applied Date (Optional)
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate || ""}
                  onChange={handleChange}
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
                placeholder="Add any additional notes"
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
            form="credit-form"
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-primary text-white text-sm"
          >
            {isLoading
              ? "Saving..."
              : isEditing
                ? "Update Credit Note"
                : "Add Credit Note"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(RedirectionRoutes.credits)}
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
