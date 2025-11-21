import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { paymentsMadeList } from "@/common/data/purchase.demo";

export default function PaymentMadeDetail() {
  const { id } = useParams();
  const p = paymentsMadeList.find((x) => x.id === id);

  return (
    <Layout>
      <div className="space-y-4 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Payment Made</h1>
          <p className="text-sm text-muted-foreground">
            Detail for payment {p?.paymentNumber ?? id}
          </p>
        </div>

        {p ? (
          <div className="grid grid-cols-1 gap-2">
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Payment #</div>
              <div className="text-sm">{p.paymentNumber}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Bill</div>
              <div className="text-sm">{p.billNumber}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Vendor</div>
              <div className="text-sm">{p.vendorName}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Amount</div>
              <div className="text-sm">{p.amount}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Method</div>
              <div className="text-sm">{p.method}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Payment not found.
          </div>
        )}
      </div>
    </Layout>
  );
}
