import { RedirectionRoutes } from "../RedirectionRoutes";
import { DropDownItem } from "./common";

interface Column {
    name: string;
    key: string;
    redirect?: string;
    sort?: boolean
}

export type TableKey = "customer" | "qutation"

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
    "qutation": []
}

export const sortOptions: Record<TableKey, DropDownItem[]> = {
    "customer": [
        { label: "Name", value: "name" },
        { label: "Phone", value: "phone" },
        { label: "Email", value: "email" },
        { label: "Date Added", value: "date" },
    ], "qutation": []
}

export const categoryOptions: Record<TableKey, DropDownItem[]> = {
    "customer": [
        { label: "All Customers", value: "all" },
        { label: "Archived", value: "archived" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ], "qutation": []
}