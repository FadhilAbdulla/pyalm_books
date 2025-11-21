import { RedirectionRoutes } from "../RedirectionRoutes";
import { DropDownItem } from "./common";

interface Column {
    name: string;
    key: string;
    redirect?: string;
    sort?: boolean
}

export type TableKey = "customer" | "qutation" | "quote" | "invoice" | "recurring" | "challan" | "payment" | "credit"

export const TableColumns: Record<TableKey, Column[]> = {
    "customer": [
        {
            name: "Name",
            key: "first_name",
            redirect: RedirectionRoutes.customerDetail,
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
    ],

    "qutation": [],
    "quote": [
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
    ],
    "invoice": [
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
    ],
    "recurring": [
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
    ],
    "challan": [
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
    ],
    "payment": [
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
    ],
    "credit": [
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
    ]
}

export const sortOptions: Record<TableKey, DropDownItem[]> = {
    "customer": [
        { label: "Name", value: "name" },
        { label: "Phone", value: "phone" },
        { label: "Email", value: "email" },
        { label: "Date Added", value: "date" },
    ],
    "qutation": [],
    "quote": [
        { label: "Quote #", value: "quoteNumber" },
        { label: "Customer", value: "customerName" },
        { label: "Amount", value: "amount" },
        { label: "Status", value: "status" },
        { label: "Date", value: "issueDate" },
    ],
    "invoice": [
        { label: "Invoice #", value: "invoiceNumber" },
        { label: "Customer", value: "customerName" },
        { label: "Amount", value: "amount" },
        { label: "Status", value: "status" },
        { label: "Date", value: "issueDate" },
    ],
    "recurring": [
        { label: "Name", value: "name" },
        { label: "Amount", value: "amount" },
        { label: "Frequency", value: "frequency" },
        { label: "Status", value: "status" },
    ],
    "challan": [
        { label: "Challan #", value: "challanNumber" },
        { label: "Customer", value: "customerName" },
        { label: "Amount", value: "amount" },
        { label: "Status", value: "status" },
        { label: "Date", value: "issuedDate" },
    ],
    "payment": [
        { label: "Reference", value: "referenceNumber" },
        { label: "Customer", value: "customerName" },
        { label: "Amount", value: "amount" },
        { label: "Method", value: "paymentMethod" },
        { label: "Status", value: "status" },
    ],
    "credit": [
        { label: "Credit #", value: "creditNumber" },
        { label: "Customer", value: "customerName" },
        { label: "Amount", value: "amount" },
        { label: "Reason", value: "reason" },
        { label: "Status", value: "status" },
    ]
}

export const categoryOptions: Record<TableKey, DropDownItem[]> = {
    "customer": [
        { label: "All Customers", value: "all" },
        { label: "Archived", value: "archived" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ],
    "qutation": [],
    "quote": [
        { label: "All Quotes", value: "all" },
        { label: "Draft", value: "Draft" },
        { label: "Sent", value: "Sent" },
        { label: "Accepted", value: "Accepted" },
        { label: "Rejected", value: "Rejected" },
        { label: "Expired", value: "Expired" },
    ],
    "invoice": [
        { label: "All Invoices", value: "all" },
        { label: "Draft", value: "Draft" },
        { label: "Sent", value: "Sent" },
        { label: "Paid", value: "Paid" },
        { label: "Overdue", value: "Overdue" },
        { label: "Cancelled", value: "Cancelled" },
    ],
    "recurring": [
        { label: "All", value: "all" },
        { label: "Active", value: "Active" },
        { label: "Paused", value: "Paused" },
        { label: "Cancelled", value: "Cancelled" },
    ],
    "challan": [
        { label: "All", value: "all" },
        { label: "Draft", value: "Draft" },
        { label: "Generated", value: "Generated" },
        { label: "Delivered", value: "Delivered" },
        { label: "Cancelled", value: "Cancelled" },
    ],
    "payment": [
        { label: "All", value: "all" },
        { label: "Pending", value: "Pending" },
        { label: "Completed", value: "Completed" },
        { label: "Failed", value: "Failed" },
        { label: "Refunded", value: "Refunded" },
    ],
    "credit": [
        { label: "All", value: "all" },
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Applied", value: "Applied" },
        { label: "Cancelled", value: "Cancelled" },
    ]
}

export const editRoutes: Record<TableKey, string> = {
    "customer": RedirectionRoutes.customerEdit,
    "qutation": "",
    "quote": RedirectionRoutes.quotesEdit,
    "invoice": RedirectionRoutes.invoicesEdit,
    "recurring": RedirectionRoutes.recurringEdit,
    "challan": RedirectionRoutes.challansEdit,
    "payment": RedirectionRoutes.paymentsEdit,
    "credit": RedirectionRoutes.creditsEdit,
};