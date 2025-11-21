import React from "react";
import type { CartItem } from "@/common/data/sales.model";
import { Button } from "@/components/ui/button";

interface Props {
  items: CartItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChangeItem: (index: number, field: keyof CartItem, value: string) => void;
}

export default function CartItemsTable({
  items,
  onAdd,
  onRemove,
  onChangeItem,
}: Props) {
  const total = items.reduce((sum, it) => {
    const q = parseFloat((it.quantity as any) || "0") || 0;
    const r = parseFloat((it.rate as any) || "0") || 0;
    const d = parseFloat((it.discount as any) || "0") || 0;
    const row = Math.max(0, q * r - d);
    return sum + row;
  }, 0);

  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-2">
        Items
      </label>
      <div className="overflow-x-auto">
        <div className="bg-muted/5 p-3 rounded-md border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground border-b border-border">
                <th className="pb-2">Item Name</th>
                <th className="pb-2 w-20">Qty</th>
                <th className="pb-2 w-24">Rate</th>
                <th className="pb-2 w-24">Discount</th>
                <th className="pb-2 w-24">Total</th>
                <th className="pb-2 w-8">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => {
                const q = parseFloat((it.quantity as any) || "0") || 0;
                const r = parseFloat((it.rate as any) || "0") || 0;
                const d = parseFloat((it.discount as any) || "0") || 0;
                const rowTotal = Math.max(0, q * r - d);
                return (
                  <tr
                    key={it.id}
                    className="border-b border-border/50 hover:bg-muted/30"
                  >
                    <td className="pr-4 py-2">
                      <input
                        type="text"
                        value={it.item_name}
                        onChange={(e) =>
                          onChangeItem(idx, "item_name", e.target.value)
                        }
                        placeholder="Item name"
                        className="w-full rounded-md border px-2 py-1 text-sm border-border bg-background focus:outline-none"
                      />
                    </td>
                    <td className="pr-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={it.quantity}
                        onChange={(e) =>
                          onChangeItem(idx, "quantity", e.target.value)
                        }
                        className="w-full rounded-md border px-2 py-1 text-sm border-border bg-background focus:outline-none"
                      />
                    </td>
                    <td className="pr-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        value={it.rate}
                        onChange={(e) =>
                          onChangeItem(idx, "rate", e.target.value)
                        }
                        className="w-full rounded-md border px-2 py-1 text-sm border-border bg-background focus:outline-none"
                      />
                    </td>
                    <td className="pr-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        value={it.discount}
                        onChange={(e) =>
                          onChangeItem(idx, "discount", e.target.value)
                        }
                        className="w-full rounded-md border px-2 py-1 text-sm border-border bg-background focus:outline-none"
                      />
                    </td>
                    <td className="pr-4 py-2 text-right font-medium">
                      {rowTotal.toFixed(2)}
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => onRemove(idx)}
                        className="text-destructive hover:text-destructive/80 transition"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          + Add item
        </Button>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
          <div className="text-2xl font-semibold">{total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
