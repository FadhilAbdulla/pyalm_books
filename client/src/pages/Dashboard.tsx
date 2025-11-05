import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function Dashboard() {
  // Sample data for charts
  const revenueData = [
    { month: "Jan", income: 45000, expenses: 32000 },
    { month: "Feb", income: 52000, expenses: 38000 },
    { month: "Mar", income: 48000, expenses: 35000 },
    { month: "Apr", income: 61000, expenses: 42000 },
    { month: "May", income: 55000, expenses: 40000 },
    { month: "Jun", income: 67000, expenses: 45000 },
  ];

  const cashFlowData = [
    { week: "W1", cash: 25000 },
    { week: "W2", cash: 28000 },
    { week: "W3", cash: 31000 },
    { week: "W4", cash: 28500 },
    { week: "W5", cash: 32000 },
    { week: "W6", cash: 35000 },
  ];

  const expensesData = [
    { name: "Salaries", value: 45000 },
    { name: "Operations", value: 28000 },
    { name: "Marketing", value: 18000 },
    { name: "Others", value: 9000 },
  ];

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const metrics = [
    {
      label: "Total Income",
      value: "$287,000",
      change: "+12.5%",
      positive: true,
      icon: TrendingUp,
    },
    {
      label: "Total Expenses",
      value: "$232,000",
      change: "-8.3%",
      positive: true,
      icon: TrendingDown,
    },
    {
      label: "Net Profit",
      value: "$55,000",
      change: "+24.1%",
      positive: true,
      icon: DollarSign,
    },
    {
      label: "Outstanding Invoices",
      value: "$12,500",
      change: "5 invoices",
      positive: false,
      icon: AlertCircle,
    },
  ];

  const recentInvoices = [
    {
      id: "INV-001",
      customer: "Acme Corp",
      amount: "$5,000",
      status: "Paid",
      date: "Jun 28",
    },
    {
      id: "INV-002",
      customer: "Tech Solutions",
      amount: "$3,200",
      status: "Pending",
      date: "Jun 25",
    },
    {
      id: "INV-003",
      customer: "Global Industries",
      amount: "$8,500",
      status: "Overdue",
      date: "Jun 15",
    },
    {
      id: "INV-004",
      customer: "Digital Ventures",
      amount: "$2,100",
      status: "Paid",
      date: "Jun 10",
    },
  ];

  const upcomingBills = [
    {
      id: "BILL-001",
      vendor: "Office Supplies Inc",
      amount: "$450",
      dueDate: "Jul 05",
    },
    {
      id: "BILL-002",
      vendor: "Cloud Services Ltd",
      amount: "$1,200",
      dueDate: "Jul 10",
    },
    {
      id: "BILL-003",
      vendor: "Marketing Agency",
      amount: "$3,500",
      dueDate: "Jul 15",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back! Here's your financial overview for June 2024
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Generate Report</Button>
            <Button className="bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {metric.value}
                    </p>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        metric.positive ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {metric.change}
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Income vs Expenses */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">
                Income vs Expenses
              </h2>
              <p className="text-sm text-muted-foreground">
                Last 6 months comparison
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
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
                <Bar dataKey="income" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Expense Breakdown */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">
                Expense Breakdown
              </h2>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
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
            <div className="mt-4 space-y-2">
              {expensesData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors[idx] }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    ${item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Cash Flow & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cash Flow */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">Cash Flow</h2>
              <p className="text-sm text-muted-foreground">
                Last 6 weeks trend
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="week" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: `1px solid var(--border)`,
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cash"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Invoices */}
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Recent Invoices
                </h2>
                <p className="text-sm text-muted-foreground">Latest activity</p>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {invoice.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.id} • {invoice.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {invoice.amount}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "text-accent"
                          : invoice.status === "Pending"
                            ? "text-warning"
                            : "text-destructive"
                      }`}
                    >
                      {invoice.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Bills & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Bills */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground">
                Upcoming Bills
              </h2>
              <p className="text-sm text-muted-foreground">Due this month</p>
            </div>
            <div className="space-y-3">
              {upcomingBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {bill.vendor}
                    </p>
                    <p className="text-xs text-muted-foreground">{bill.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {bill.amount}
                    </p>
                    <p className="text-xs text-warning">Due: {bill.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="mb-6 text-lg font-bold text-foreground">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Record Expense
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Reconcile Bank Account
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Generate P&L Report
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Recent Activity
              </h2>
              <p className="text-sm text-muted-foreground">
                Latest transactions and events
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                action: "Invoice INV-2024-005 created",
                time: "2 mins ago",
                icon: "📄",
                color: "text-blue-500",
              },
              {
                action: "Payment received from Acme Corp - $5,000",
                time: "1 hour ago",
                icon: "💰",
                color: "text-green-500",
              },
              {
                action: "New bill from Cloud Services added",
                time: "3 hours ago",
                icon: "📋",
                color: "text-orange-500",
              },
              {
                action: "Bank reconciliation completed",
                time: "5 hours ago",
                icon: "🏦",
                color: "text-purple-500",
              },
              {
                action: "Expense report submitted by John Doe",
                time: "Yesterday",
                icon: "📊",
                color: "text-indigo-500",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="text-xl">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
