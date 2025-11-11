import { Salutation } from "./common";

export interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    salutation: Salutation;
    company_name?: string;
    email_address?: string;
    phone?: string;
    language: string;

    currency: string;
    account_recievable: string;
    opening_balance: number;

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