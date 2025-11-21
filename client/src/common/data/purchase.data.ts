import { DropDownItem } from "./common";

interface Column {
    name: string;
    key: string;
    redirect?: string;
    sort?: boolean;
}

export type PurchaseTableKey =
    | "vendor"
    | "expense"
    | "recurring"
    | "bill"
    | "payment"
    | "vendorCredit";

export const VendorTableColumns: Column[] = [
    { name: "Name", key: "name", redirect: "/purchases/vendors/view/:id", sort: true },
    { name: "Company", key: "company", sort: true },
    { name: "Email", key: "email" },
    { name: "Phone", key: "phone" },
];

export const ExpenseTableColumns: Column[] = [
    { name: "Expense #", key: "expenseNumber", redirect: "/purchases/expenses/view/:id", sort: true },
    { name: "Vendor", key: "vendorName", sort: true },
    { name: "Amount", key: "amount", sort: true },
    { name: "Date", key: "date", sort: true },
];

export const RecurringPurchaseTableColumns: Column[] = [
    { name: "Reference", key: "referenceNumber", redirect: "/purchases/recurring/view/:id", sort: true },
    { name: "Vendor", key: "vendorName", sort: true },
    { name: "Amount", key: "amount", sort: true },
    { name: "Frequency", key: "frequency", sort: true },
];

export const BillTableColumns: Column[] = [
    { name: "Bill #", key: "billNumber", redirect: "/purchases/bills/view/:id", sort: true },
    { name: "Vendor", key: "vendorName", sort: true },
    { name: "Amount", key: "amount", sort: true },
    { name: "Status", key: "status", sort: true },
    { name: "Date", key: "issueDate", sort: true },
];

export const PaymentTableColumns: Column[] = [
    { name: "Payment #", key: "paymentNumber", redirect: "/purchases/payments-made/view/:id", sort: true },
    { name: "Vendor", key: "vendorName", sort: true },
    { name: "Amount", key: "amount", sort: true },
    { name: "Method", key: "method", sort: true },
    { name: "Date", key: "paymentDate", sort: true },
];

export const VendorCreditTableColumns: Column[] = [
    { name: "Credit #", key: "creditNumber", redirect: "/purchases/vendor-credits/view/:id", sort: true },
    { name: "Vendor", key: "vendorName", sort: true },
    { name: "Amount", key: "amount", sort: true },
    { name: "Notes", key: "notes", sort: false },
    { name: "Status", key: "appliedDate", sort: true },
];

export const PurchaseTableColumns: Record<PurchaseTableKey, Column[]> = {
    vendor: VendorTableColumns,
    expense: ExpenseTableColumns,
    recurring: RecurringPurchaseTableColumns,
    bill: BillTableColumns,
    payment: PaymentTableColumns,
    vendorCredit: VendorCreditTableColumns,
};

export const PurchaseSortOptions: Record<PurchaseTableKey, DropDownItem[]> = {
    vendor: [
        { label: "Name", value: "name" },
        { label: "Company", value: "company" },
    ],
    expense: [
        { label: "Expense #", value: "expenseNumber" },
        { label: "Vendor", value: "vendorName" },
    ],
    recurring: [
        { label: "Reference", value: "referenceNumber" },
        { label: "Vendor", value: "vendorName" },
    ],
    bill: [
        { label: "Bill #", value: "billNumber" },
        { label: "Vendor", value: "vendorName" },
    ],
    payment: [
        { label: "Payment #", value: "paymentNumber" },
        { label: "Vendor", value: "vendorName" },
    ],
    vendorCredit: [
        { label: "Credit #", value: "creditNumber" },
        { label: "Vendor", value: "vendorName" },
    ],
};

export const PurchaseCategoryOptions: Record<PurchaseTableKey, DropDownItem[]> = {
    vendor: [{ label: "All Vendors", value: "all" }],
    expense: [{ label: "All Expenses", value: "all" }],
    recurring: [{ label: "All", value: "all" }],
    bill: [{ label: "All Bills", value: "all" }],
    payment: [{ label: "All Payments", value: "all" }],
    vendorCredit: [{ label: "All Credits", value: "all" }],
};

export const PurchaseEditRoutes: Record<PurchaseTableKey, string> = {
    vendor: "/purchases/vendors/:id",
    expense: "/purchases/expenses/:id",
    recurring: "/purchases/recurring/:id",
    bill: "/purchases/bills/:id",
    payment: "/purchases/payments-made/:id",
    vendorCredit: "/purchases/vendor-credits/:id",
};

export default {};
