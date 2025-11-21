export interface ReportItem {
    id: string;
    name: string;
    category: string;
    lastVisited?: string | null;
    createdBy?: string;
}

export interface ReportCategory {
    id: string;
    name: string;
}

export const reportCategories: ReportCategory[] = [
    { id: "business", name: "Business Overview" },
    { id: "sales", name: "Sales" },
    { id: "receivables", name: "Receivables" },
    { id: "payments", name: "Payments Received" },
    { id: "recurring", name: "Recurring Invoices" },
    { id: "payables", name: "Payables" },
    { id: "purchases", name: "Purchases and Expenses" },
    { id: "banking", name: "Banking" },
    { id: "projects", name: "Projects and Timesheet" },
    { id: "accountant", name: "Accountant" },
];

export const reports: ReportItem[] = [
    // Business Overview
    { id: "r-business-1", name: "Profit and Loss", category: "business", lastVisited: null, createdBy: "System Generated" },
    { id: "r-business-2", name: "Cash Flow Statement", category: "business", lastVisited: null, createdBy: "System Generated" },
    { id: "r-business-3", name: "Balance Sheet", category: "business", lastVisited: null, createdBy: "System Generated" },
    { id: "r-business-4", name: "Business Performance Ratios", category: "business", lastVisited: null, createdBy: "System Generated" },
    { id: "r-business-5", name: "Movement of Equity", category: "business", lastVisited: null, createdBy: "System Generated" },

    // Sales
    { id: "r-sales-1", name: "Sales by Customer", category: "sales", lastVisited: "A few seconds ago", createdBy: "System Generated" },
    { id: "r-sales-2", name: "Sales by Item", category: "sales", lastVisited: null, createdBy: "System Generated" },
    { id: "r-sales-3", name: "Sales by Sales Person", category: "sales", lastVisited: null, createdBy: "System Generated" },
    { id: "r-sales-4", name: "Sales by Region", category: "sales", lastVisited: null, createdBy: "System Generated" },

    // Receivables
    { id: "r-rec-1", name: "Aged Receivables", category: "receivables", lastVisited: null, createdBy: "System Generated" },

    // Payments
    { id: "r-pay-1", name: "Payments Received Summary", category: "payments", lastVisited: null, createdBy: "System Generated" },

    // Purchases
    { id: "r-pur-1", name: "Purchases and Expenses Summary", category: "purchases", lastVisited: null, createdBy: "System Generated" },
];

export default { reportCategories, reports };
