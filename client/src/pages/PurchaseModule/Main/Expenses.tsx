import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { expenseList } from "@/common/data/purchase.demo";

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses] = useState(expenseList);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Expenses</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Track your expenses
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.expensesNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>

        <DataTable dataSource={expenses} tableKey={"expense"} totalPages={1} />
      </div>
    </Layout>
  );
}
