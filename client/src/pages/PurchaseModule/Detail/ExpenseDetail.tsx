import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { expenseList } from "@/common/data/purchase.demo";

export default function ExpenseDetail() {
  const { id } = useParams();
  const expense = expenseList.find((e) => e.id === id);

  return (
    <Layout>
      <div className="space-y-4 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Expense</h1>
          <p className="text-sm text-muted-foreground">
            Details for expense {expense?.expenseNumber ?? id}
          </p>
        </div>

        {expense ? (
          <div className="grid grid-cols-1 gap-2">
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Expense #</div>
              <div className="text-sm">{expense.expenseNumber}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Vendor</div>
              <div className="text-sm">{expense.vendorName}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Amount</div>
              <div className="text-sm">{expense.amount}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Date</div>
              <div className="text-sm">{expense.date}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Notes</div>
              <div className="text-sm">{expense.notes}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Expense not found.
          </div>
        )}
      </div>
    </Layout>
  );
}
