import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { creditList, CreditNote } from "@/common/data/demo";

export default function Credits() {
  const navigate = useNavigate();
  const [credits, setCredits] = useState<CreditNote[]>(creditList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    credit?: CreditNote;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteCredit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.credit) {
      setCredits(credits.filter((c) => c.id !== modalState.credit!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  const totalCredits = credits.reduce((sum, c) => sum + c.amount, 0);
  const appliedCredits = credits
    .filter((c) => c.status === "Applied")
    .reduce((sum, c) => sum + c.amount, 0);
  const pendingCredits = credits
    .filter((c) => c.status === "Issued")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Credit Notes</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage credit notes and adjustments
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.creditsNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Credit
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalCredits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {credits.length} notes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${appliedCredits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {credits.filter((c) => c.status === "Applied").length} applied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${pendingCredits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {credits.filter((c) => c.status === "Issued").length} pending
              </p>
            </CardContent>
          </Card>
        </div>

        <DataTable
          dataSource={credits}
          tableKey={"credit"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Credit Note"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete credit note "${modalState.credit?.creditNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteCredit}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
