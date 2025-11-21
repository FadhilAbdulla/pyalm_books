import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { Payment } from "@/common/data/demo";
import { paymentList } from "@/common/data/demo";

const STATUSES = ["Completed", "Pending", "Failed", "Cancelled"];
const PAYMENT_METHODS = ["Bank Transfer", "Credit Card", "Cash", "Cheque"];

export default function AddPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Payment>>({
    paymentNumber: "",
    invoiceNumber: "",
    customerName: "",
    email: "",
    amount: 0,
    status: "Pending",
    method: "Bank Transfer",
    paymentDate: "",
    referenceNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && id) {
      const payment = paymentList.find((p) => p.id === id);
      if (payment) {
        setFormData(payment);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.paymentNumber || formData.paymentNumber.trim().length < 2) {
      newErrors.paymentNumber = "Payment number is required";
    }
    if (!formData.invoiceNumber || formData.invoiceNumber.trim().length < 2) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    if (!formData.customerName || formData.customerName.trim().length < 2) {
      newErrors.customerName = "Customer name is required";
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.paymentDate) {
      newErrors.paymentDate = "Payment date is required";
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
    navigate(RedirectionRoutes.payments);
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
              onClick={() => navigate(RedirectionRoutes.payments)}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              title="Back"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEditing ? "Edit Payment" : "Add Payment"}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isEditing ? "Update payment details" : "Record a new payment"}
              </p>
            </div>
                  </div>
      </div>

      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div className="w-full flex flex-col gap-0" style={{ height: "calc(100vh - 73px - 80px)" }}>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 max-w-3xl">
            <form id="payment-form" className="space-y-6">
              {/* Payment Number and Invoice Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Payment Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="paymentNumber"
                    value={formData.paymentNumber || ""}
                    onChange={handleChange}
                    placeholder="PAY-2024-001"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.paymentNumber
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.paymentNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.paymentNumber}</p>
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
                    <p className="text-xs text-destructive mt-1">{errors.invoiceNumber}</p>
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
                    <p className="text-xs text-destructive mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || "Pending"}
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

              {/* Payment Method and Payment Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Payment Method
                  </label>
                  <select
                    name="method"
                    value={formData.method || "Bank Transfer"}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Payment Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.paymentDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.paymentDate && (
                    <p className="text-xs text-destructive mt-1">{errors.paymentDate}</p>
                  )}
                </div>
              </div>

              {/* Reference Number */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={formData.referenceNumber || ""}
                  onChange={handleChange}
                  placeholder="e.g., Bank transaction ID, cheque number"
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
              form="payment-form"
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-primary text-white text-sm"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Payment" : "Add Payment"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(RedirectionRoutes.payments)}
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
