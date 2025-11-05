import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    amount: "",
    expiryDate: "",
    notes: "",
    status: "Draft",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName || formData.customerName.length < 2) {
      newErrors.customerName = "Name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
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
    navigate("/quotes");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/quotes")}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            title="Back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {isEditing ? "Edit Quote" : "New Quote"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {isEditing ? "Update quote details" : "Create a new quote"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Customer Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
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
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                  errors.email
                    ? "border-destructive bg-destructive/5 focus:border-destructive"
                    : "border-border bg-background focus:border-primary"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Quote Amount <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
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
                Expiry Date <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                  errors.expiryDate
                    ? "border-destructive bg-destructive/5 focus:border-destructive"
                    : "border-border bg-background focus:border-primary"
                }`}
              />
              {errors.expiryDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Quote details..."
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white text-sm"
              >
                {isLoading
                  ? "Saving..."
                  : isEditing
                    ? "Update Quote"
                    : "Create Quote"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/quotes")}
                variant="outline"
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
