import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { recurringPurchaseList } from "@/common/data/purchase.demo";

export default function RecurringPurchases() {
  const navigate = useNavigate();
  const [recurrings] = useState(recurringPurchaseList);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Recurring Purchases
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage recurring purchase schedules
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.recurringNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Recurring
          </Button>
        </div>

        <DataTable
          dataSource={recurrings}
          tableKey={"recurring"}
          totalPages={1}
        />
      </div>
    </Layout>
  );
}
