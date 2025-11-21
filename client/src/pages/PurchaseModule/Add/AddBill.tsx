import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { billList } from "@/common/data/purchase.demo";

export default function AddBill() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = billList.find((b) => b.id === id);

  const [number, setNumber] = useState(existing?.billNumber ?? "");
  const [vendor, setVendor] = useState(existing?.vendorName ?? "");
  const [amount, setAmount] = useState(existing?.amount ?? 0);
  const [date, setDate] = useState(existing?.issueDate ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");

  function onSave() {
    navigate("/purchases/bills");
  }

  return (
    <Layout>
      <div
        className="w-full flex flex-col gap-0 pt-4"
        style={{ height: "calc(100vh - 55px )" }}
      >
        <div className="flex-1 overflow-y-auto mb-4">
          <Card className="p-6 max-w-3xl">
            <div className="border-b border-border pb-4 mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(RedirectionRoutes.bills)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {id ? "Edit" : "New"} Bill
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {id ? "Update bill" : "Create a new bill"}
                  </p>
                </div>
              </div>
            </div>

            <form id="bill-form" onSubmit={onSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Bill #"
                  value={number}
                  onChange={(e) =>
                    setNumber((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Vendor"
                  value={vendor}
                  onChange={(e) =>
                    setVendor((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Amount"
                  value={String(amount)}
                  onChange={(e) =>
                    setAmount(Number((e.target as HTMLInputElement).value))
                  }
                />
                <Input
                  placeholder="Issue Date"
                  value={date}
                  onChange={(e) =>
                    setDate((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) =>
                    setNotes((e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </form>
          </Card>
        </div>

        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="mx-auto w-full flex items-center justify-start">
            <div className="flex gap-3">
              <Button
                type="submit"
                form="bill-form"
                className="bg-primary text-white"
              >
                {id ? "Update Bill" : "Create Bill"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.bills)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
