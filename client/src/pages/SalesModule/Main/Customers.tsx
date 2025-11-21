import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { Customer } from "@/common/data/sales.model";
import { customerList } from "@/common/data/demo";

export default function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>(customerList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    customer?: Customer;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteCustomer = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.customer) {
      setCustomers(customers.filter((c) => c.id !== modalState.customer!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Customers</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage your customer database
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.customerNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className=" h-1 w-4" />
            Add Customer
          </Button>
        </div>
        <DataTable
          dataSource={customers}
          tableKey={"customer"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Customer"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete "${modalState.customer?.first_name}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteCustomer}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
