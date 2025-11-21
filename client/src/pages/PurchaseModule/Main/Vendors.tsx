import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { vendorList } from "@/common/data/purchase.demo";

export default function Vendors() {
  const navigate = useNavigate();
  const [vendors] = useState(vendorList);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Vendors</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage your vendors
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.vendorsNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Vendor
          </Button>
        </div>

        <DataTable dataSource={vendors} tableKey={"vendor"} totalPages={1} />
      </div>
    </Layout>
  );
}
