import { DropDownItem } from "./common";

interface Column {
    name: string;
    key: string;
    redirect?: string;
    sort?: boolean
}

// Sales-related table type
export type SalesTableKey = "customer" | "quote" | "invoice" | "recurring" | "challan" | "payment" | "credit"

// Customer Table Columns
export const CustomerTableColumns: Column[] = [
    {
        name: "Name",
        key: "first_name",
        redirect: "/sales/customers/view/:id",
        sort: true
    },
    {
        name: "Company Name",
        key: "company_name"
    },
    {
        name: "Email",
        key: "email"
    },
    {
        name: "Phone",
        key: "phone"
    }
];

// Quote Table Columns
export const QuoteTableColumns: Column[] = [
    {
        name: "Quote #",
        key: "quoteNumber",
        sort: true
    },
    {
        name: "Customer",
        key: "customerName",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    },
    {
        name: "Date",
        key: "issueDate",
        sort: true
    }
];

// Invoice Table Columns
export const InvoiceTableColumns: Column[] = [
    {
        name: "Invoice #",
        key: "invoiceNumber",
        sort: true
    },
    {
        name: "Customer",
        key: "customerName",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    },
    {
        name: "Date",
        key: "issueDate",
        sort: true
    }
];

// Recurring Table Columns
export const RecurringTableColumns: Column[] = [
    {
        name: "Name",
        key: "name",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Frequency",
        key: "frequency",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    }
];

// Challan Table Columns
export const ChallanTableColumns: Column[] = [
    {
        name: "Challan #",
        key: "challanNumber",
        sort: true
    },
    {
        name: "Customer",
        key: "customerName",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    },
    {
        name: "Date",
        key: "issuedDate",
        sort: true
    }
];

// Payment Table Columns
export const PaymentTableColumns: Column[] = [
    {
        name: "Reference",
        key: "referenceNumber",
        sort: true
    },
    {
        name: "Customer",
        key: "customerName",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Method",
        key: "paymentMethod",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    }
];

// Credit Table Columns
export const CreditTableColumns: Column[] = [
    {
        name: "Credit #",
        key: "creditNumber",
        sort: true
    },
    {
        name: "Customer",
        key: "customerName",
        sort: true
    },
    {
        name: "Amount",
        key: "amount",
        sort: true
    },
    {
        name: "Reason",
        key: "reason",
        sort: true
    },
    {
        name: "Status",
        key: "status",
        sort: true
    }
];

// Consolidated Sales Table Columns (for backward compatibility)
export const SalesTableColumns: Record<SalesTableKey, Column[]> = {
    "customer": CustomerTableColumns,
    "quote": QuoteTableColumns,
    "invoice": InvoiceTableColumns,
    "recurring": RecurringTableColumns,
    "challan": ChallanTableColumns,
    "payment": PaymentTableColumns,
    "credit": CreditTableColumns,
};

// ============ Sort Options ============

export const CustomerSortOptions: DropDownItem[] = [
    { label: "Name", value: "first_name" },
    { label: "Phone", value: "phone" },
    { label: "Email", value: "email" },
    { label: "Date Added", value: "date" },
];

export const QuoteSortOptions: DropDownItem[] = [
    { label: "Quote #", value: "quoteNumber" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Status", value: "status" },
    { label: "Date", value: "issueDate" },
];

export const InvoiceSortOptions: DropDownItem[] = [
    { label: "Invoice #", value: "invoiceNumber" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Status", value: "status" },
    { label: "Date", value: "issueDate" },
];

export const RecurringSortOptions: DropDownItem[] = [
    { label: "Name", value: "name" },
    { label: "Amount", value: "amount" },
    { label: "Frequency", value: "frequency" },
    { label: "Status", value: "status" },
];

export const ChallanSortOptions: DropDownItem[] = [
    { label: "Challan #", value: "challanNumber" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Status", value: "status" },
    { label: "Date", value: "issuedDate" },
];

export const PaymentSortOptions: DropDownItem[] = [
    { label: "Reference", value: "referenceNumber" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Method", value: "paymentMethod" },
    { label: "Status", value: "status" },
];

export const CreditSortOptions: DropDownItem[] = [
    { label: "Credit #", value: "creditNumber" },
    { label: "Customer", value: "customerName" },
    { label: "Amount", value: "amount" },
    { label: "Reason", value: "reason" },
    { label: "Status", value: "status" },
];

// Consolidated Sales Sort Options (for backward compatibility)
export const SalesSortOptions: Record<SalesTableKey, DropDownItem[]> = {
    "customer": CustomerSortOptions,
    "quote": QuoteSortOptions,
    "invoice": InvoiceSortOptions,
    "recurring": RecurringSortOptions,
    "challan": ChallanSortOptions,
    "payment": PaymentSortOptions,
    "credit": CreditSortOptions,
};

// ============ Category Options ============

export const CustomerCategoryOptions: DropDownItem[] = [
    { label: "All Customers", value: "all" },
    { label: "Archived", value: "archived" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

export const QuoteCategoryOptions: DropDownItem[] = [
    { label: "All Quotes", value: "all" },
    { label: "Draft", value: "Draft" },
    { label: "Sent", value: "Sent" },
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "Expired", value: "Expired" },
];

export const InvoiceCategoryOptions: DropDownItem[] = [
    { label: "All Invoices", value: "all" },
    { label: "Draft", value: "Draft" },
    { label: "Sent", value: "Sent" },
    { label: "Paid", value: "Paid" },
    { label: "Overdue", value: "Overdue" },
    { label: "Cancelled", value: "Cancelled" },
];

export const RecurringCategoryOptions: DropDownItem[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "Active" },
    { label: "Paused", value: "Paused" },
    { label: "Cancelled", value: "Cancelled" },
];

export const ChallanCategoryOptions: DropDownItem[] = [
    { label: "All", value: "all" },
    { label: "Draft", value: "Draft" },
    { label: "Generated", value: "Generated" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
];

export const PaymentCategoryOptions: DropDownItem[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Failed", value: "Failed" },
    { label: "Refunded", value: "Refunded" },
];

export const CreditCategoryOptions: DropDownItem[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Applied", value: "Applied" },
    { label: "Cancelled", value: "Cancelled" },
];

// Consolidated Sales Category Options (for backward compatibility)
export const SalesCategoryOptions: Record<SalesTableKey, DropDownItem[]> = {
    "customer": CustomerCategoryOptions,
    "quote": QuoteCategoryOptions,
    "invoice": InvoiceCategoryOptions,
    "recurring": RecurringCategoryOptions,
    "challan": ChallanCategoryOptions,
    "payment": PaymentCategoryOptions,
    "credit": CreditCategoryOptions,
};

// ============ Edit Routes ============

export const SalesEditRoutes: Record<SalesTableKey, string> = {
    "customer": "/sales/customers/:id",
    "quote": "/sales/quotes/:id",
    "invoice": "/sales/invoices/:id",
    "recurring": "/sales/recurring/:id",
    "challan": "/sales/challans/:id",
    "payment": "/sales/payments/:id",
    "credit": "/sales/credits/:id",
};
