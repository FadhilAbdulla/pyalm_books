import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit, Mail, Trash2 } from "lucide-react";
import { recurringPurchaseList } from "@/common/data/purchase.demo";

export default function RecurringPurchaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mockRecurring = recurringPurchaseList;
  const [currentRecurring, setCurrentRecurring] = useState<any | null>(
    mockRecurring.find((r) => r.id === id) || mockRecurring[0]
  );

  if (!currentRecurring) return null;

  const displayItems = (currentRecurring.cart_items || []).map((it: any) => ({
    description: it.item_name || it.description,
    quantity: Number(it.quantity || 0),
    unitPrice: Number(it.rate || it.unitPrice || 0),
  }));

  const handleChange = (recurringId: string) => {
    const r = mockRecurring.find((x) => x.id === recurringId);
    if (r) {
      setCurrentRecurring(r as any);
      navigate(`/purchases/recurring/view/${recurringId}`);
    }
  };

  return (
    <Layout>
      <div className="flex gap-4 h-screen overflow-hidden">
        <div className="w-64 border-r border-border overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-background p-3 border-b border-border">
            <h3 className="font-semibold text-sm text-foreground">Recurring Purchases</h3>
          </div>
          <nav className="space-y-1 p-2">
            {mockRecurring.map((r) => (
              <button
                key={r.id}
                onClick={() => handleChange(r.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentRecurring.id === r.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="font-semibold">{r.referenceNumber}</div>
                <div className="text-xs text-muted-foreground truncate">{r.vendorName}</div>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 border-b border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/purchases/recurring")}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-foreground">{currentRecurring.referenceNumber}</h1>
                  <p className="text-xs text-muted-foreground">{currentRecurring.vendorName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors" title="Send Email"><Mail size={16} /></button>
                <button onClick={() => navigate(`/purchases/recurring/${currentRecurring.id}`)} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Edit"><Edit size={16} /></button>
                <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <Card className="p-8 bg-white">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Recurring Purchase</h2>
                      <p className="text-sm text-muted-foreground">#{currentRecurring.referenceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-medium text-foreground">{currentRecurring.frequency}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Vendor:</p>
                    <p className="text-sm text-foreground">{currentRecurring.vendorName}</p>
                  </div>

                  <div>
                    <div className="max-h-72 overflow-y-auto rounded">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-foreground/20">
                            <th className="text-left py-2 text-foreground">Description</th>
                            <th className="text-center py-2 text-foreground">Qty</th>
                            <th className="text-right py-2 text-foreground">Unit Price</th>
                            <th className="text-right py-2 text-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayItems.map((item, idx) => (
                            <tr key={idx} className="border-b border-foreground/10">
                              <td className="py-3 text-foreground">{item.description}</td>
                              <td className="text-center text-foreground">{item.quantity}</td>
                              <td className="text-right text-foreground">${item.unitPrice.toFixed(2)}</td>
                              <td className="text-right font-medium text-foreground">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="w-48">
                      <div className="flex justify-between py-2 border-t-2 border-foreground/20">
                        <span className="font-bold text-foreground">Total:</span>
                        <span className="font-bold text-foreground">${currentRecurring.amount?.toLocaleString?.() ?? ""}</span>
                      </div>
                    </div>
                  </div>

                  {currentRecurring.notes && (
                    <div className="pt-4 border-t border-foreground/10">
                      <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm text-foreground">{currentRecurring.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
