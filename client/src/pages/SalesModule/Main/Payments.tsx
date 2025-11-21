import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { paymentList, Payment } from "@/common/data/demo";

export default function Payments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>(paymentList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    payment?: Payment;
  }>({ isOpen: false, mode: "create" });

  const handleDeletePayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.payment) {
      setPayments(payments.filter((p) => p.id !== modalState.payment!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedPayments = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Payments</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Track and manage customer payments
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.paymentsNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Payment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalPayments.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {payments.length} payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${completedPayments.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {payments.filter((p) => p.status === "Completed").length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${pendingPayments.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {payments.filter((p) => p.status === "Pending").length} pending
              </p>
            </CardContent>
          </Card>
        </div>

        <DataTable
          dataSource={payments}
          tableKey={"payment"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Payment"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete payment "${modalState.payment?.paymentNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeletePayment}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
