import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  MoreHorizontal,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Link as LinkIcon,
} from "lucide-react";

interface BankAccount {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  accountType: string;
  status: "Active" | "Inactive";
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "debit" | "credit";
  status: "Cleared" | "Pending";
  account: string;
}

export default function Banking() {
  const [activeTab, setActiveTab] = useState<
    "accounts" | "transactions" | "reconciliation"
  >("accounts");
  const [searchTerm, setSearchTerm] = useState("");

  const bankAccounts: BankAccount[] = [
    {
      id: "1",
      name: "Business Checking",
      bankName: "National Bank",
      accountNumber: "****1234",
      balance: 25000,
      accountType: "Checking",
      status: "Active",
    },
    {
      id: "2",
      name: "Savings Account",
      bankName: "National Bank",
      accountNumber: "****5678",
      balance: 50000,
      accountType: "Savings",
      status: "Active",
    },
    {
      id: "3",
      name: "Petty Cash",
      bankName: "Cash Box",
      accountNumber: "CASH-001",
      balance: 1500,
      accountType: "Cash",
      status: "Active",
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2024-06-28",
      description: "Client Invoice Payment - Tech Solutions",
      category: "Income",
      amount: 3200,
      type: "credit",
      status: "Cleared",
      account: "Business Checking",
    },
    {
      id: "2",
      date: "2024-06-27",
      description: "Office Rent Payment",
      category: "Rent",
      amount: 1500,
      type: "debit",
      status: "Cleared",
      account: "Business Checking",
    },
    {
      id: "3",
      date: "2024-06-26",
      description: "Supplies Purchase - Office Depot",
      category: "Supplies",
      amount: 250,
      type: "debit",
      status: "Cleared",
      account: "Business Checking",
    },
    {
      id: "4",
      date: "2024-06-25",
      description: "Client Invoice Payment - Acme Corp",
      category: "Income",
      amount: 5000,
      type: "credit",
      status: "Pending",
      account: "Business Checking",
    },
    {
      id: "5",
      date: "2024-06-24",
      description: "Utility Bill Payment",
      category: "Utilities",
      amount: 425,
      type: "debit",
      status: "Cleared",
      account: "Savings Account",
    },
    {
      id: "6",
      date: "2024-06-23",
      description: "Monthly Subscription - Cloud Services",
      category: "Subscriptions",
      amount: 99,
      type: "debit",
      status: "Cleared",
      account: "Business Checking",
    },
  ];

  const pendingTransactions = transactions.filter(
    (t) => t.status === "Pending",
  );
  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Banking</h1>
            <p className="mt-1 text-muted-foreground">
              Manage bank accounts, reconciliation, and transactions
            </p>
          </div>
          <Button className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Link Bank Account
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  ${(25000 + 50000 + 1500).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  This Month Income
                </p>
                <p className="mt-2 text-2xl font-bold text-accent">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-accent/10 p-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  This Month Expenses
                </p>
                <p className="mt-2 text-2xl font-bold text-destructive">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-3">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("accounts")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "accounts"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Accounts ({bankAccounts.length})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "transactions"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Transactions ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab("reconciliation")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "reconciliation"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reconciliation
          </button>
        </div>

        {/* Accounts Tab */}
        {activeTab === "accounts" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bankAccounts.map((account) => (
              <Card
                key={account.id}
                className="flex flex-col justify-between p-6"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {account.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {account.bankName}
                      </p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        account.status === "Active"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted/10 text-muted-foreground"
                      }`}
                    >
                      {account.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {account.accountNumber}
                  </p>
                  <p className="mt-4 text-2xl font-bold text-foreground">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <button className="flex-1 rounded-lg bg-primary/10 py-2 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                    Reconcile
                  </button>
                  <button className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-muted/70 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <select className="rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none">
                <option>All Accounts</option>
                <option>Business Checking</option>
                <option>Savings Account</option>
                <option>Petty Cash</option>
              </select>
            </div>

            {/* Pending Reconciliation Alert */}
            {pendingTransactions.length > 0 && (
              <Card className="border border-warning/30 bg-warning/5 p-4">
                <p className="text-sm text-warning">
                  ⚠️ {pendingTransactions.length} transaction(s) pending
                  reconciliation
                </p>
              </Card>
            )}

            {/* Transactions Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Account
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3 text-muted-foreground">
                          {transaction.date}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {transaction.description}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {transaction.category}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {transaction.account}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="h-4 w-4 text-accent" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-destructive" />
                            )}
                            <span
                              className={`font-semibold ${
                                transaction.type === "credit"
                                  ? "text-accent"
                                  : "text-destructive"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}$
                              {transaction.amount.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                              transaction.status === "Cleared"
                                ? "bg-accent/10 text-accent"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-muted/70 transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Reconciliation Tab */}
        {activeTab === "reconciliation" && (
          <Card className="space-y-6 p-6">
            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">
                Bank Reconciliation
              </h2>
              <p className="text-muted-foreground">
                Reconcile your bank accounts with system records
              </p>
            </div>

            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {account.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Current Balance: ${account.balance.toLocaleString()}
                      </p>
                    </div>
                    <Button className="bg-primary text-white">
                      Start Reconciliation
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Bank Balance
                      </p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        ${account.balance.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        System Balance
                      </p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        ${account.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
