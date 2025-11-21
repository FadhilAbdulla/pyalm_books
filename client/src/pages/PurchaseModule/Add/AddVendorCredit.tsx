import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { vendorCreditList } from "@/common/data/purchase.demo";

export default function AddVendorCredit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = vendorCreditList.find((v) => v.id === id);

  const [number, setNumber] = useState(existing?.creditNumber ?? "");
  const [vendor, setVendor] = useState(existing?.vendorName ?? "");
  const [amount, setAmount] = useState(existing?.amount ?? 0);
  const [notes, setNotes] = useState(existing?.notes ?? "");

  function onSave(e?: React.FormEvent) {
    e?.preventDefault();
    navigate(RedirectionRoutes.vendorCredits);
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
                  onClick={() => navigate(RedirectionRoutes.vendorCredits)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {id ? "Edit" : "New"} Vendor Credit
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {id ? "Update credit" : "Create a new credit"}
                  </p>
                </div>
              </div>
            </div>

            <form
              id="vendor-credit-form"
              onSubmit={onSave}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Credit #"
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
                form="vendor-credit-form"
                className="bg-primary text-white"
              >
                {id ? "Update Credit" : "Create Credit"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.vendorCredits)}
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
