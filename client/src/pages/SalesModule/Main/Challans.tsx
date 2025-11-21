import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { challanList, Challan } from "@/common/data/demo";

export default function Challans() {
  const navigate = useNavigate();
  const [challans, setChallans] = useState<Challan[]>(challanList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    challan?: Challan;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteChallan = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.challan) {
      setChallans(challans.filter((ch) => ch.id !== modalState.challan!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Challans</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Create and track delivery notes
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.challansNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Challan
          </Button>
        </div>

        <DataTable dataSource={challans} tableKey={"challan"} totalPages={1} />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Challan"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete challan "${modalState.challan?.challanNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteChallan}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
