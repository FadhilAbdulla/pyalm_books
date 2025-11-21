import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Eye,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<
    "profit-loss" | "balance-sheet" | "cash-flow" | "templates"
  >("profit-loss");
  const [dateRange, setDateRange] = useState("last-month");

  const reportTemplates: ReportTemplate[] = [
    {
      id: "1",
      name: "Profit & Loss Statement",
      description: "Income, expenses, and net profit overview",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "Financial",
    },
    {
      id: "2",
      name: "Balance Sheet",
      description: "Assets, liabilities, and equity snapshot",
      icon: <BarChart3 className="h-6 w-6" />,
      category: "Financial",
    },
    {
      id: "3",
      name: "Cash Flow Statement",
      description: "Cash inflows and outflows analysis",
      icon: <TrendingDown className="h-6 w-6" />,
      category: "Financial",
    },
    {
      id: "4",
      name: "Trial Balance",
      description: "All accounts debit and credit balances",
      icon: <FileText className="h-6 w-6" />,
      category: "Accounting",
    },
    {
      id: "5",
      name: "Aged Receivables",
      description: "Customer outstanding payments analysis",
      icon: <Calendar className="h-6 w-6" />,
      category: "Analysis",
    },
    {
      id: "6",
      name: "Aged Payables",
      description: "Vendor outstanding payments analysis",
      icon: <Calendar className="h-6 w-6" />,
      category: "Analysis",
    },
  ];

  // P&L Data
  const plData = [
    { category: "Revenue", amount: 287000, variance: 12500 },
    { category: "Cost of Goods Sold", amount: -85000, variance: -5000 },
    { category: "Gross Profit", amount: 202000, variance: 7500 },
    { category: "Operating Expenses", amount: -147000, variance: -8000 },
    { category: "Net Profit", amount: 55000, variance: 2500 },
  ];

  // Balance Sheet Data
  const balanceSheet = {
    assets: [
      {
        name: "Current Assets",
        items: [
          { name: "Cash & Bank", amount: 76500 },
          { name: "Accounts Receivable", amount: 45000 },
          { name: "Inventory", amount: 32000 },
        ],
        total: 153500,
      },
      {
        name: "Fixed Assets",
        items: [
          { name: "Equipment", amount: 50000 },
          { name: "Furniture", amount: 25000 },
          { name: "Vehicles", amount: 40000 },
        ],
        total: 115000,
      },
    ],
    liabilities: [
      {
        name: "Current Liabilities",
        items: [
          { name: "Accounts Payable", amount: 28500 },
          { name: "Short-term Debt", amount: 15000 },
        ],
        total: 43500,
      },
      {
        name: "Long-term Liabilities",
        items: [{ name: "Long-term Debt", amount: 50000 }],
        total: 50000,
      },
    ],
    equity: 175000,
  };

  // Cash Flow Data
  const cashFlowData = [
    { month: "Jan", operating: 12000, investing: -5000, financing: 3000 },
    { month: "Feb", operating: 15000, investing: -3000, financing: 0 },
    { month: "Mar", operating: 18000, investing: -4000, financing: 2000 },
    { month: "Apr", operating: 14000, investing: -2000, financing: -1000 },
    { month: "May", operating: 20000, investing: -6000, financing: 0 },
    { month: "Jun", operating: 22000, investing: -3000, financing: 1000 },
  ];

  // Monthly Revenue Trend
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 38000 },
    { month: "Mar", revenue: 48000, expenses: 35000 },
    { month: "Apr", revenue: 61000, expenses: 42000 },
    { month: "May", revenue: 55000, expenses: 40000 },
    { month: "Jun", revenue: 67000, expenses: 45000 },
  ];

  // Expense Category Distribution
  const expensesByCategory = [
    { name: "Salaries", value: 120000 },
    { name: "Operations", value: 72000 },
    { name: "Marketing", value: 42000 },
    { name: "Utilities", value: 18000 },
    { name: "Others", value: 14000 },
  ];

  const categoryColors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const totalAssets = balanceSheet.assets.reduce((sum, a) => sum + a.total, 0);
  const totalLiabilities = balanceSheet.liabilities.reduce(
    (sum, l) => sum + l.total,
    0,
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="mt-1 text-muted-foreground">
              Financial statements and business analytics
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
            >
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Report Templates */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Quick Reports
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                className="flex cursor-pointer flex-col justify-between p-6 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <div>
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                    {template.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {template.category}
                  </span>
                  <button className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors">
                    <Eye size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Reports */}
        <div>
          <div className="mb-6 flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab("profit-loss")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "profit-loss"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              P&L Statement
            </button>
            <button
              onClick={() => setActiveTab("balance-sheet")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "balance-sheet"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setActiveTab("cash-flow")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "cash-flow"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cash Flow
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "templates"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Analysis
            </button>
          </div>

          {/* P&L Tab */}
          {activeTab === "profit-loss" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-6 text-lg font-bold text-foreground">
                  Profit & Loss Statement
                </h3>

                {/* P&L Chart */}
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: `1px solid var(--border)`,
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        fill="#3b82f6"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="expenses"
                        fill="#10b981"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* P&L Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          Category
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-foreground">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-foreground">
                          % of Revenue
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-foreground">
                          Variance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plData.map((row, idx) => {
                        const isTotal = idx === plData.length - 1;
                        return (
                          <tr
                            key={idx}
                            className={`border-b border-border ${
                              isTotal ? "bg-primary/5 font-semibold" : ""
                            }`}
                          >
                            <td className="px-4 py-3 text-foreground">
                              {row.category}
                            </td>
                            <td className="px-4 py-3 text-right text-foreground">
                              ${row.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right text-muted-foreground">
                              {row.amount > 0
                                ? ((row.amount / 287000) * 100).toFixed(1)
                                : "-"}
                              %
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-medium ${
                                row.variance > 0
                                  ? "text-accent"
                                  : "text-destructive"
                              }`}
                            >
                              {row.variance > 0 ? "+" : ""}$
                              {row.variance.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Balance Sheet Tab */}
          {activeTab === "balance-sheet" && (
            <Card className="p-6">
              <h3 className="mb-6 text-lg font-bold text-foreground">
                Balance Sheet
              </h3>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Assets */}
                <div>
                  <h4 className="mb-4 font-semibold text-foreground">Assets</h4>
                  <div className="space-y-4">
                    {balanceSheet.assets.map((section, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-medium text-foreground">
                            {section.name}
                          </span>
                          <span className="font-semibold text-foreground">
                            ${section.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-2 border-t border-border pt-3">
                          {section.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between pl-4 text-sm"
                            >
                              <span className="text-muted-foreground">
                                {item.name}
                              </span>
                              <span className="text-foreground">
                                ${item.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
                      <div className="flex items-center justify-between font-bold text-foreground">
                        <span>Total Assets</span>
                        <span>${totalAssets.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div>
                  <h4 className="mb-4 font-semibold text-foreground">
                    Liabilities & Equity
                  </h4>
                  <div className="space-y-4">
                    {balanceSheet.liabilities.map((section, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-medium text-foreground">
                            {section.name}
                          </span>
                          <span className="font-semibold text-foreground">
                            ${section.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-2 border-t border-border pt-3">
                          {section.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between pl-4 text-sm"
                            >
                              <span className="text-muted-foreground">
                                {item.name}
                              </span>
                              <span className="text-foreground">
                                ${item.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          Equity
                        </span>
                        <span className="font-semibold text-foreground">
                          ${balanceSheet.equity.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
                      <div className="flex items-center justify-between font-bold text-foreground">
                        <span>Total Liabilities & Equity</span>
                        <span>
                          $
                          {(
                            totalLiabilities + balanceSheet.equity
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Cash Flow Tab */}
          {activeTab === "cash-flow" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-6 text-lg font-bold text-foreground">
                  Cash Flow Statement
                </h3>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={cashFlowData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: `1px solid var(--border)`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="operating" fill="#3b82f6" name="Operating" />
                    <Bar dataKey="investing" fill="#ef4444" name="Investing" />
                    <Bar dataKey="financing" fill="#10b981" name="Financing" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h4 className="mb-4 font-semibold text-foreground">
                  Cash Flow Summary
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                      Operating Cash Flow
                    </p>
                    <p className="mt-2 text-2xl font-bold text-accent">
                      +$101,000
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                      Investing Cash Flow
                    </p>
                    <p className="mt-2 text-2xl font-bold text-destructive">
                      -$23,000
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                      Financing Cash Flow
                    </p>
                    <p className="mt-2 text-2xl font-bold text-primary">
                      +$5,000
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-6 text-lg font-bold text-foreground">
                  Expense Distribution by Category
                </h3>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={expensesByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={categoryColors[index]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: `1px solid var(--border)`,
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {expensesByCategory.map((item, idx) => {
                      const total = expensesByCategory.reduce(
                        (sum, i) => sum + i.value,
                        0,
                      );
                      const percentage = ((item.value / total) * 100).toFixed(
                        1,
                      );
                      return (
                        <div
                          key={idx}
                          className="rounded-lg border border-border p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: categoryColors[idx] }}
                              />
                              <span className="font-medium text-foreground">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {percentage}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${item.value.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6 text-lg font-bold text-foreground">
                  Revenue Trend Analysis
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: `1px solid var(--border)`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
