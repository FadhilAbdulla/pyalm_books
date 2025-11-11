import { RedirectionRoutes } from "../RedirectionRoutes";

interface Column {
    name: string;
    key: string;
    redirect?: string;
    sort?: boolean
}

export const TableColumns: Column[] = [
    {
        name: "Name",
        key: "name",
        redirect: RedirectionRoutes.customerEdit,
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
        key: "email"
    }
]