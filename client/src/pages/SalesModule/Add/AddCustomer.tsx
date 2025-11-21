import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { Customer } from "@/common/data/sales.model";
import { customerList } from "@/common/data/demo";

const SALUTATIONS = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];
const LANGUAGES = ["English", "Arabic", "Spanish", "French"];
const CURRENCIES = ["USD", "AED", "GBP", "INR", "EUR"];

export default function AddCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({
    id: "",
    first_name: "",
    last_name: "",
    salutation: "Mr.",
    company_name: "",
    email: "",
    phone: "",
    language: "English",
    currency: "USD",
    account_recievable: "0",
    opening_balance: 0,
    // extra fields (hidden by default)
    country: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const customer = customerList.find((c) => c.id === id);
      if (customer) {
        setFormData(customer);
      }
    }
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name || formData.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }
    if (!formData.last_name || formData.last_name.trim().length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }
    if (!formData.company_name || formData.company_name.trim().length < 2) {
      newErrors.company_name = "Company name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone || formData.phone.trim().length < 5) {
      newErrors.phone = "Phone must be valid";
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === "opening_balance" ? parseFloat(value) || 0 : value,
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

      {/* Main Container with Scrollable Content and Fixed Footer */}
      <div
        className="w-full flex flex-col gap-0"
        style={{ height: "calc(100vh - 73px - 80px)" }}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-6 max-w-3xl">
            <form id="customer-form" className="space-y-6">
              {/* Salutation */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Salutation
                </label>
                <select
                  name="salutation"
                  value={formData.salutation || "Mr."}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  {SALUTATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.first_name
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.first_name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.last_name
                        ? "border-destructive bg-destructive/5 focus:border-destructive"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                  {errors.last_name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Company Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name || ""}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors ${
                    errors.company_name
                      ? "border-destructive bg-destructive/5 focus:border-destructive"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.company_name && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.company_name}
                  </p>
                )}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={formData.phone || ""}
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
              </div>

              {/* Language and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language || "English"}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency || "USD"}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {CURRENCIES.map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Account Receivable and Opening Balance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Account Receivable
                  </label>
                  <input
                    type="text"
                    name="account_recievable"
                    value={formData.account_recievable || "0"}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Opening Balance
                  </label>
                  <input
                    type="number"
                    name="opening_balance"
                    value={formData.opening_balance || 0}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Extra (hidden) fields */}

              {showExtra && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors border-border bg-background"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors border-border bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        placeholder="Enter state"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors border-border bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        Zipcode
                      </label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode || ""}
                        onChange={handleChange}
                        placeholder="Enter zipcode"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors border-border bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none transition-colors border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* small in-form toggle button at bottom of form */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-xs h-8 px-2"
                  onClick={() => setShowExtra((s) => !s)}
                >
                  {showExtra ? "Hide extra fields" : "Show extra fields"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="mx-auto w-full  flex items-center justify-start">
            <div className="flex gap-3">
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
      </div>
    </Layout>
  );
}
