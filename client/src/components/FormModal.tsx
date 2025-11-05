import { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select" | "textarea";
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  validation?: (value: any) => string | null;
}

interface FormModalProps {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  isLoading?: boolean;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onClose: () => void;
  onConfirm?: () => Promise<void>;
  mode?: "create" | "edit" | "view";
}

export function FormModal({
  isOpen,
  title,
  fields,
  initialData = {},
  isLoading = false,
  onSubmit,
  onClose,
  onConfirm,
  mode = "create",
}: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.id];

      if (field.required && (!value || value === "")) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      if (field.validation) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      setSubmitMessage("Operation completed successfully!");

      setTimeout(() => {
        onClose();
        setFormData(initialData);
        setSubmitStatus("idle");
      }, 1500);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      setIsSubmitting(true);
      try {
        await onConfirm();
        setSubmitStatus("success");
        setSubmitMessage("Action confirmed!");
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 1500);
      } catch (error) {
        setSubmitStatus("error");
        setSubmitMessage(
          error instanceof Error ? error.message : "An error occurred",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isViewMode = mode === "view";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform transition-all">
        <Card className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
              disabled={isSubmitting}
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  {field.label}
                  {field.required && (
                    <span className="text-destructive">*</span>
                  )}
                </label>

                {field.type === "select" && (
                  <select
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    disabled={isViewMode || isSubmitting}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "textarea" && (
                  <textarea
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    placeholder={field.placeholder}
                    disabled={isViewMode || isSubmitting}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}

                {!field.type.includes("select") &&
                  field.type !== "textarea" && (
                    <input
                      type={field.type}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      placeholder={field.placeholder}
                      disabled={isViewMode || isSubmitting}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  )}

                {errors[field.id] && (
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-destructive">
                    <AlertCircle size={12} />
                    {errors[field.id]}
                  </div>
                )}
              </div>
            ))}

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 rounded-lg bg-accent/10 p-3 text-xs text-accent">
                <CheckCircle size={16} />
                {submitMessage}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                <AlertCircle size={16} />
                {submitMessage}
              </div>
            )}

            {/* Loading State */}
            {(isSubmitting || isLoading) && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                Processing...
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={isSubmitting}
                className="flex-1 text-xs"
              >
                Cancel
              </Button>

              {!isViewMode && (
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 text-xs bg-primary text-white"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </Button>
              )}

              {isViewMode && onConfirm && (
                <Button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 text-xs bg-primary text-white"
                >
                  {isSubmitting ? "Confirming..." : "Confirm"}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
