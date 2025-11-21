import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { paymentsMadeList } from "@/common/data/purchase.demo";

export default function AddPaymentMade() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = paymentsMadeList.find((p) => p.id === id);

  const [number, setNumber] = useState(existing?.paymentNumber ?? "");
  const [bill, setBill] = useState(existing?.billNumber ?? "");
  const [vendor, setVendor] = useState(existing?.vendorName ?? "");
  const [amount, setAmount] = useState(existing?.amount ?? 0);
  const [method, setMethod] = useState(existing?.method ?? "");

  function onSave() {
    navigate("/purchases/payments-made");
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
                  onClick={() => navigate(RedirectionRoutes.payments)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {id ? "Edit" : "New"} Payment
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {id ? "Update payment" : "Create a new payment"}
                  </p>
                </div>
              </div>
            </div>

            <form id="payment-form" onSubmit={onSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Payment #"
                  value={number}
                  onChange={(e) =>
                    setNumber((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Bill #"
                  value={bill}
                  onChange={(e) =>
                    setBill((e.target as HTMLInputElement).value)
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
                  placeholder="Method"
                  value={method}
                  onChange={(e) =>
                    setMethod((e.target as HTMLInputElement).value)
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
                form="payment-form"
                className="bg-primary text-white"
              >
                {id ? "Update Payment" : "Create Payment"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.payments)}
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
