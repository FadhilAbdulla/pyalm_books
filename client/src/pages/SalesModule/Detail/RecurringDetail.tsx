import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { recurringList } from "@/common/data/demo";

const data = recurringList;

export default function RecurringDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list] = useState(data);
  const current = list.find((r) => r.id === id) || list[0];
  if (!current) return null;

  return (
    <Layout>
      <div className="flex gap-4 h-screen overflow-hidden">
        <div className="w-64 border-r border-border overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-background p-3 border-b border-border">
            <h3 className="font-semibold text-sm text-foreground">Recurring</h3>
          </div>
          <nav className="space-y-1 p-2">
            {list.map((it) => (
              <button
                key={it.id}
                onClick={() => navigate(`/sales/recurring/view/${it.id}`)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${current.id === it.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                <div className="font-semibold">{it.invoiceNumber}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {it.customerName}
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 border-b border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/sales/recurring")}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    {current.invoiceNumber}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {current.customerName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/sales/recurring/${current.id}`)}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <Card className={`p-8 bg-white`}>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Recurring Invoice
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      #{current.invoiceNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Next Date</p>
                    <p className="font-medium text-foreground">
                      {current.nextDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Bill To:
                  </p>
                  <p className="text-sm text-foreground">
                    {current.customerName}
                  </p>
                </div>

                {current.cart_items && current.cart_items.length > 0 && (
                  <div className="max-h-48 overflow-y-auto rounded">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-foreground/20">
                          <th className="text-left py-2 text-foreground">
                            Description
                          </th>
                          <th className="text-center py-2 text-foreground">
                            Qty
                          </th>
                          <th className="text-right py-2 text-foreground">
                            Rate
                          </th>
                          <th className="text-right py-2 text-foreground">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.cart_items.map((it) => (
                          <tr
                            key={it.id}
                            className="border-b border-foreground/10"
                          >
                            <td className="py-3 text-foreground">
                              {it.item_name}
                            </td>
                            <td className="text-center text-foreground">
                              {it.quantity}
                            </td>
                            <td className="text-right text-foreground">
                              ${Number(it.rate).toFixed(2)}
                            </td>
                            <td className="text-right font-medium text-foreground">
                              $
                              {(Number(it.rate) * Number(it.quantity)).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex justify-end">
                  <div className="w-48">
                    <div className="flex justify-between py-2 border-t-2 border-foreground/20">
                      <span className="font-bold text-foreground">Total:</span>
                      <span className="font-bold text-foreground">
                        ${current.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                {current.notes && (
                  <div className="pt-4 border-t border-foreground/10">
                    <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm text-foreground">{current.notes}</p>
                  </div>
                )}
              </div>
            </Card>
            {current.cart_items && current.cart_items.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-2">Items</h3>
                <div className="max-h-72 overflow-y-auto rounded">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-foreground/20">
                        <th className="text-left py-2 text-foreground">Item</th>
                        <th className="text-center py-2 text-foreground">
                          Qty
                        </th>
                        <th className="text-right py-2 text-foreground">
                          Rate
                        </th>
                        <th className="text-right py-2 text-foreground">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.cart_items.map((it) => (
                        <tr
                          key={it.id}
                          className="border-b border-foreground/10"
                        >
                          <td className="py-3 text-foreground">
                            {it.item_name}
                          </td>
                          <td className="text-center text-foreground">
                            {it.quantity}
                          </td>
                          <td className="text-right text-foreground">
                            ${Number(it.rate).toFixed(2)}
                          </td>
                          <td className="text-right font-medium text-foreground">
                            $
                            {(Number(it.rate) * Number(it.quantity)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
