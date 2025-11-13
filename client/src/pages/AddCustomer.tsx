import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";

export default function AddCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    status: "Active",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulate loading customer data for edit mode
  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch the customer data
      const mockCustomers: Record<string, any> = {
        "1": {
          name: "Acme Corporation",
          email: "contact@acmecorp.com",
          phone: "+1-555-0101",
          city: "New York",
          status: "Active",
        },
        "2": {
          name: "Tech Solutions Inc",
          email: "billing@techsolutions.com",
          phone: "+1-555-0102",
          city: "San Francisco",
          status: "Active",
        },
        "3": {
          name: "Global Industries Ltd",
          email: "accounts@globalind.com",
          phone: "+1-555-0103",
          city: "London",
          status: "Active",
        },
      };
      if (mockCustomers[id]) {
        setFormData(mockCustomers[id]);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
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
    navigate(RedirectionRoutes.customer);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b border-border pb-4 pt-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(RedirectionRoutes.customer)}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              title="Back"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {isEditing ? "Edit Customer" : "Add Customer"}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isEditing
                  ? "Update customer information"
                  : "Create a new customer record"}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="m-4 p-6 max-w-2xl">
            <form id="customer-form" className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Customer Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.name
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
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
                  <p className="text-xs text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-0000"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  City <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.city
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-destructive mt-1">{errors.city}</p>
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>
          </Card>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="flex-shrink-0 border-t border-border bg-background p-4">
          <div className="flex gap-3 max-w-2xl">
            <Button
              type="submit"
              form="customer-form"
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-primary text-white text-sm"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                  ? "Update Customer"
                  : "Add Customer"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(RedirectionRoutes.customer)}
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
