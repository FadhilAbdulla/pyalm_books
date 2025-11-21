export interface Vendor {
    id: string;
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface PurchaseItem {
    id: string;
    item_id?: string;
    item_name: string;
    quantity: string | number;
    rate: string | number;
    discount?: string | number;
}

export interface Expense {
    id: string;
    expenseNumber: string;
    vendorName?: string;
    amount: number;
    account?: string;
    date: string;
    notes?: string;
}

export interface RecurringPurchase {
    id: string;
    referenceNumber: string;
    vendorName?: string;
    cart_items?: PurchaseItem[];
    amount: number;
    frequency?: string;
    startDate?: string;
    nextDate?: string;
    endDate?: string | null;
    notes?: string;
}

export interface Bill {
    id: string;
    billNumber: string;
    vendorName?: string;
    cart_items?: PurchaseItem[];
    amount: number;
    status?: string;
    issueDate?: string;
    dueDate?: string;
    notes?: string;
}

export interface PaymentMade {
    id: string;
    paymentNumber: string;
    billNumber?: string;
    vendorName?: string;
    amount: number;
    method?: string;
    paymentDate?: string;
    referenceNumber?: string;
}

export interface VendorCredit {
    id: string;
    creditNumber: string;
    vendorName?: string;
    amount: number;
    notes?: string;
    appliedDate?: string | null;
    cart_items?: PurchaseItem[];
}

export default {};
