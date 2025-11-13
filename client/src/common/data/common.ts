export type Salutation = "Mr." | "Mrs." | "Ms." | "Miss." | "Dr." | "Prof.";
export type CurrencyType = "USD" | "INR" | "AED"
export type SortOrder = "A" | "B"
export type FilterStatus = "All" | "Active" | "Inactive"
export const PerPageCount = ["25", "50", "100"]
export const getNavigationLink = (link: string, id: string | number): string => {
    return link.replace(':id', String(id));
};

export interface DropDownItem {
    label: string;
    value: string;
}