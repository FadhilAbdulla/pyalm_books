import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { invoiceList, Invoice } from "@/common/data/demo";

export default function Invoices() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>(invoiceList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    invoice?: Invoice;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteInvoice = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.invoice) {
      setInvoices(invoices.filter((inv) => inv.id !== modalState.invoice!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Invoices</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Create, send, and manage your invoices
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.invoicesNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Invoice
          </Button>
        </div>

        <DataTable
          dataSource={invoices}
          tableKey={"invoice"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Invoice"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete invoice "${modalState.invoice?.invoiceNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteInvoice}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
