import {
    Vendor,
    Expense,
    RecurringPurchase,
    Bill,
    PaymentMade,
    VendorCredit,
    PurchaseItem,
} from "./purchase.model";

export const vendorList: Vendor[] = [
    {
        id: "V-001",
        name: "Al Fahd Supplies",
        company: "Al Fahd Trading LLC",
        email: "contact@alfahd.ae",
        phone: "+971501112233",
        address: "Dubai, UAE",
    },
    {
        id: "V-002",
        name: "Green Office",
        company: "Green Office Solutions",
        email: "sales@greenoffice.com",
        phone: "+44 7700 900111",
        address: "London, UK",
    },
];

export const expenseList: Expense[] = [
    {
        id: "E-001",
        expenseNumber: "EXP-2025-001",
        vendorName: "Al Fahd Supplies",
        amount: 450,
        account: "Operations",
        date: "2025-10-01",
        notes: "Office stationery purchase",
    },
    {
        id: "E-002",
        expenseNumber: "EXP-2025-002",
        vendorName: "Green Office",
        amount: 1200,
        account: "IT",
        date: "2025-09-15",
        notes: "Printer lease",
    },
];

const sampleItems: PurchaseItem[] = [
    { id: "pi-1", item_id: "itm-001", item_name: "Paper Ream", quantity: 10, rate: 5, discount: 0 },
    { id: "pi-2", item_id: "itm-002", item_name: "Ink Cartridge", quantity: 2, rate: 75, discount: 0 },
];

export const recurringPurchaseList: RecurringPurchase[] = [
    {
        id: "RP-001",
        referenceNumber: "RPU-2025-001",
        vendorName: "Al Fahd Supplies",
        cart_items: sampleItems,
        amount: 200,
        frequency: "Monthly",
        startDate: "2025-01-01",
        nextDate: "2025-12-01",
        endDate: null,
        notes: "Monthly office supplies",
    },
];

export const billList: Bill[] = [
    {
        id: "B-001",
        billNumber: "BILL-2025-001",
        vendorName: "Al Fahd Supplies",
        cart_items: sampleItems,
        amount: 550,
        status: "Paid",
        issueDate: "2025-10-02",
        dueDate: "2025-10-30",
        notes: "Stationery and consumables",
    },
];

export const paymentsMadeList: PaymentMade[] = [
    {
        id: "PM-001",
        paymentNumber: "PM-2025-001",
        billNumber: "BILL-2025-001",
        vendorName: "Al Fahd Supplies",
        amount: 550,
        method: "Bank Transfer",
        paymentDate: "2025-10-05",
        referenceNumber: "TRX-550-01",
    },
];

export const vendorCreditList: VendorCredit[] = [
    {
        id: "VC-001",
        creditNumber: "VC-2025-001",
        vendorName: "Green Office",
        amount: 150,
        notes: "Price adjustment",
        appliedDate: null,
        cart_items: [],
    },
];

export default {};
