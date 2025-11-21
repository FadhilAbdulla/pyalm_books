import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { Challan } from "@/common/data/demo";
import { challanList } from "@/common/data/demo";

const STATUSES = ["Draft", "Dispatched", "Delivered", "Cancelled"];

export default function AddChallan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Challan>>({
    challanNumber: "",
    customerName: "",
    email: "",
    amount: 0,
    status: "Draft",
    issueDate: "",
    expectedDate: "",
    deliveryAddress: "",
    itemCount: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing && id) {
      const challan = challanList.find((ch) => ch.id === id);
      if (challan) {
        setFormData(challan);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.challanNumber || formData.challanNumber.trim().length < 2) {
      newErrors.challanNumber = "Challan number is required";
    }
    if (!formData.customerName || formData.customerName.trim().length < 2) {
      newErrors.customerName = "Customer name is required";
    }
    if (!formData.deliveryAddress || formData.deliveryAddress.trim().length < 5) {
      newErrors.deliveryAddress = "Delivery address is required";
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.expectedDate) {
      newErrors.expectedDate = "Expected date is required";
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
    navigate(RedirectionRoutes.challans);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "itemCount" ? parseInt(value) || 0 : value,
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
              onClick={() => navigate(RedirectionRoutes.challans)}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              title="Back"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEditing ? "Edit Challan" : "Add Challan"}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isEditing ? "Update challan details" : "Create a new challan"}
              </p>
            </div>
                  </div>
      </div>

      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div className="w-full flex flex-col gap-0" style={{ height: "calc(100vh - 73px - 80px)" }}>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 max-w-3xl">
            <form id="challan-form" className="space-y-6">
              {/* Challan Number and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Challan Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="challanNumber"
                    value={formData.challanNumber || ""}
                    onChange={handleChange}
                    placeholder="CH-2024-001"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.challanNumber
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.challanNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.challanNumber}</p>
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

              {/* Amount and Item Count */}
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
                    Item Count
                  </label>
                  <input
                    type="number"
                    name="itemCount"
                    value={formData.itemCount || 0}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Delivery Address <span className="text-destructive">*</span>
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress || ""}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  rows={3}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.deliveryAddress
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.deliveryAddress && (
                  <p className="text-xs text-destructive mt-1">{errors.deliveryAddress}</p>
                )}
              </div>

              {/* Issue and Expected Dates */}
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
                    <p className="text-xs text-destructive mt-1">{errors.issueDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Expected Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="expectedDate"
                    value={formData.expectedDate || ""}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.expectedDate
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.expectedDate && (
                    <p className="text-xs text-destructive mt-1">{errors.expectedDate}</p>
                  )}
                </div>
              </div>
            </form>
          </Card>
        </div>

                      {/* Fixed Footer with Buttons */}
        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="flex gap-3 max-w-3xl">
            <Button
              type="submit"
              form="challan-form"
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-primary text-white text-sm"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Challan" : "Add Challan"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(RedirectionRoutes.challans)}
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
