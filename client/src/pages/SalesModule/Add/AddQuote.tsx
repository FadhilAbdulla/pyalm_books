import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import type { CartItem } from "@/common/data/sales.model";
import CartItemsTable from "@/components/ui/cartItemsTable";
import { customerList } from "@/common/data/demo";

const STATUSES = ["Draft", "Sent", "Accepted", "Rejected", "Expired"];

interface QuoteFormData {
  quote_number: string;
  customer_id: string;
  customer_name: string;
  status: string;
  quote_date: string;
  expiry_date: string;
  customer_notes: string;
  terms_conditions: string;
  cart_items: CartItem[];
}

export default function AddQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const [formData, setFormData] = useState<QuoteFormData>({
    quote_number: "",
    customer_id: "",
    customer_name: "",
    status: "Draft",
    quote_date: new Date().toISOString().split("T")[0],
    expiry_date: "",
    customer_notes: "",
    terms_conditions: "",
    cart_items: [],
  });

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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter customers by search
  const filteredCustomers = customerList.filter((c) =>
    `${c.first_name} ${c.last_name} ${c.company_name || ""}`
      .toLowerCase()
      .includes(searchCustomer.toLowerCase())
  );

  const selectCustomer = (customerId: string) => {
    const customer = customerList.find((c) => c.id === customerId);
    if (customer) {
      setFormData((prev) => ({
        ...prev,
        customer_id: customer.id,
        customer_name: `${customer.first_name} ${customer.last_name}`,
      }));
      setSearchCustomer("");
      setShowCustomerDropdown(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.quote_number || formData.quote_number.trim().length < 2) {
      newErrors.quote_number = "Quote number is required";
    }
    if (!formData.customer_id) {
      newErrors.customer_id = "Customer is required";
    }
    if (!formData.quote_date) {
      newErrors.quote_date = "Quote date is required";
    }
    if (!formData.expiry_date) {
      newErrors.expiry_date = "Expiry date is required";
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
    navigate(RedirectionRoutes.quotes);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Item handlers
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
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
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

  // Compute total
  const total = items.reduce((sum, it) => {
    const q = parseFloat((it.quantity as any) || "0") || 0;
    const r = parseFloat((it.rate as any) || "0") || 0;
    const d = parseFloat((it.discount as any) || "0") || 0;
    const row = Math.max(0, q * r - d);
    return sum + row;
  }, 0);

  return (
    <Layout>
      {/* Main Container */}
      <div
        className="w-full flex flex-col gap-0 pt-4"
        style={{ height: "calc(100vh - 55px )" }}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mb-4">
          <Card className="p-6 max-w-3xl">
            {/* Header (now scrollable with content) */}
            <div className="border-b border-border pb-4 mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(RedirectionRoutes.quotes)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {isEditing ? "Edit Quote" : "New Quote"}
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isEditing ? "Update quote details" : "Create a new quote"}
                  </p>
                </div>
              </div>
            </div>

            <form id="quote-form" className="space-y-6">
              {/* Top row: Quote Number, Status, Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Quote No. <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="quote_number"
                    value={formData.quote_number}
                    onChange={handleChange}
                    placeholder="QT-001"
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none transition-colors ${
                      errors.quote_number
                        ? "border-destructive bg-destructive/5"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="quote_date"
                    value={formData.quote_date}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                      errors.quote_date
                        ? "border-destructive bg-destructive/5"
                        : "border-border bg-background focus:border-primary"
                    }`}
                  />
                </div>
              </div>

              {/* Customer selection with search */}
              <div className="relative">
                <label className="block text-xs font-medium text-foreground mb-1">
                  Customer <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search customer..."
                      value={searchCustomer || formData.customer_name}
                      onChange={(e) => {
                        setSearchCustomer(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none transition-colors ${
                        errors.customer_id
                          ? "border-destructive bg-destructive/5"
                          : "border-border bg-background focus:border-primary"
                      }`}
                    />

                    {showCustomerDropdown && (
                      <div className="absolute z-10 top-full mt-1 w-full bg-background border border-border rounded-md shadow-md max-h-48 overflow-y-auto">
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <button
                              key={customer.id}
                              type="button"
                              onClick={() => selectCustomer(customer.id)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                            >
                              <div className="font-medium">
                                {customer.first_name} {customer.last_name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.company_name}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            No customers found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(RedirectionRoutes.customerNew)}
                    title="Add new customer"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                {errors.customer_id && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.customer_id}
                  </p>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Expiry Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errors.expiry_date
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-background focus:border-primary"
                  }`}
                />
                {errors.expiry_date && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.expiry_date}
                  </p>
                )}
              </div>

              {/* Items Table */}
              <CartItemsTable
                items={items}
                onAdd={addItem}
                onRemove={removeItem}
                onChangeItem={handleItemChange}
              />

              {/* Notes and Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Notes
                  </label>
                  <textarea
                    name="customer_notes"
                    value={formData.customer_notes}
                    onChange={handleChange}
                    placeholder="Add notes..."
                    rows={3}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Terms & Conditions
                  </label>
                  <textarea
                    name="terms_conditions"
                    value={formData.terms_conditions}
                    onChange={handleChange}
                    placeholder="Add T&C..."
                    rows={3}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="mx-auto w-full flex items-center justify-start">
            <div className="flex gap-3">
              <Button
                type="submit"
                form="quote-form"
                disabled={isLoading}
                onClick={handleSubmit}
                className="bg-primary text-white"
              >
                {isLoading
                  ? "Saving..."
                  : isEditing
                    ? "Update Quote"
                    : "Create Quote"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.quotes)}
                variant="outline"
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
