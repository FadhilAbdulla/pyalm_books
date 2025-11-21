import { Salutation } from "./common";

export interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    salutation: Salutation;
    company_name?: string;
    email?: string;
    phone?: string;
    language: string;

    currency: string;
    account_recievable: string;
    opening_balance: number;

    //Aditional Details 
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
}

export interface CartItem {
    id: string;
    item_id: string;
    item_name: string;
    quantity: string;
    rate: string;
    discount: string;
}

export interface Quotes {
    id: string;
    customer_id: string;
    customer_name: string;
    quote_number: string;
    reference: string;
    quote_date: Date;
    expiry_date: Date;
    sales_person_id?: string;
    sales_person_name?: string;
    cart_items: CartItem[];
    customer_notes: string;
    terms_conditions: string;
}

export interface Quote {
    id: string;
    quoteNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
    issueDate: string;
    expiryDate: string;
    notes: string;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
    issueDate: string;
    dueDate: string;
    paymentTerms: string;
    notes: string;
}

export interface RecurringInvoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Active" | "Paused" | "Ended" | "Draft";
    frequency: "Weekly" | "Monthly" | "Quarterly" | "Yearly";
    startDate: string;
    nextDate: string;
    endDate: string | null;
}

export interface Challan {
    id: string;
    challanNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Draft" | "Dispatched" | "Delivered" | "Cancelled";
    issueDate: string;
    expectedDate: string;
    deliveryAddress: string;
    itemCount: number;
}

export interface Payment {
    id: string;
    paymentNumber: string;
    invoiceNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Completed" | "Pending" | "Failed" | "Cancelled";
    method: "Bank Transfer" | "Credit Card" | "Cash" | "Cheque";
    paymentDate: string;
    referenceNumber: string;
}

export interface CreditNote {
    id: string;
    creditNumber: string;
    invoiceNumber: string;
    customerName: string;
    email: string;
    amount: number;
    status: "Draft" | "Issued" | "Applied" | "Cancelled";
    reason: string;
    issueDate: string;
    appliedDate: string | null;
    notes: string;
}