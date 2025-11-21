import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { recurringList, RecurringInvoice } from "@/common/data/demo";

export default function Recurring() {
  const navigate = useNavigate();
  const [recurring, setRecurring] = useState<RecurringInvoice[]>(recurringList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    item?: RecurringInvoice;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteRecurring = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.item) {
      setRecurring(recurring.filter((item) => item.id !== modalState.item!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Recurring Invoices</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Set up and manage recurring billing
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.recurringNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Recurring
          </Button>
        </div>

        <DataTable
          dataSource={recurring}
          tableKey={"recurring"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Recurring Invoice"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete recurring invoice "${modalState.item?.invoiceNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteRecurring}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
