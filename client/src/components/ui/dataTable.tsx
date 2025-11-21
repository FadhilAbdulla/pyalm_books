import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Mail,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import {
  SalesCategoryOptions as categoryOptions,
  SalesSortOptions as sortOptions,
  SalesTableColumns as TableColumns,
  SalesEditRoutes as editRoutes,
} from "@/common/data/sales.data";
import {
  PurchaseCategoryOptions as purchaseCategoryOptions,
  PurchaseSortOptions as purchaseSortOptions,
  PurchaseTableColumns as PurchaseTableColumns,
  PurchaseEditRoutes as purchaseEditRoutes,
} from "@/common/data/purchase.data";
import {
  getNavigationLink,
  PerPageCount,
  SortOrder,
} from "@/common/data/common";
import { SimpleFilter } from "../TableFiltes";

const DataTable = ({ dataSource, tableKey, totalPages }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_column = searchParams.get("sort_column") || "";
  const sort_order = (searchParams.get("sort_order") as SortOrder) || "A";
  const per_page = Number(searchParams.get("per_page")) || 10;
  const page_number = Number(searchParams.get("page")) || 1;

  const updateSearchParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) =>
      newParams.set(key, value)
    );
    setSearchParams(newParams);
  };

  const FilterUpdateFunction = {
    page_number: (page: string) => updateSearchParams({ page }),
    sort: (key: string, order: SortOrder) =>
      updateSearchParams({ sort_column: key, sort_order: order }),
    status: (status: SortOrder) => updateSearchParams({ status }),
    per_page: (count: string) => updateSearchParams({ per_page: count }),
  };

  const handleSort = (field: string) => {
    if (sort_column === field) {
      FilterUpdateFunction.sort(field, sort_order === "A" ? "B" : "A");
    } else {
      FilterUpdateFunction.sort(field, "A");
    }
  };

  // Pagination
  const startIndex = (page_number - 1) * per_page;
  const endIndex = startIndex + per_page;

  // choose mappings: prefer purchase mappings when available for this tableKey
  const columns = (PurchaseTableColumns as any)?.[tableKey]
    ? (PurchaseTableColumns as any)[tableKey]
    : TableColumns?.[tableKey];

  const sortOptionsForTable =
    (purchaseSortOptions as any)?.[tableKey] || sortOptions?.[tableKey];
  const categoryOptionsForTable =
    (purchaseCategoryOptions as any)?.[tableKey] || categoryOptions?.[tableKey];
  const editRoutesForTable =
    (purchaseEditRoutes as any)?.[tableKey] || (editRoutes as any)?.[tableKey];

  return (
    <>
      {/* Advanced Filter */}
      <SimpleFilter
        sortOptions={sortOptionsForTable}
        categoryOptions={categoryOptionsForTable}
      />

      {/* Results Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, dataSource.length)} of{" "}
          {dataSource.length} records
        </span>
        <div className="flex items-center gap-2">
          <label className="text-xs">Records per page:</label>
          <select
            value={per_page}
            onChange={(e) => FilterUpdateFunction.per_page(e.target.value)}
            className="rounded border border-border bg-background px-2 py-1 text-xs"
          >
            {PerPageCount.map((it) => (
              <option key={it} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className="w-full text-xs whitespace-nowrap"
            style={{ minWidth: "600px" }}
          >
            <thead className="border-b border-border bg-muted/50">
              <tr>
                {columns?.map((it) => (
                  <th
                    key={it.key}
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    {it.sort ? (
                      <button
                        onClick={() => handleSort(it.key)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        {it.name}

                        {sort_column === it.key ? (
                          sort_order === "A" ? (
                            <ArrowUp size={12} className="text-blue-400" />
                          ) : (
                            <ArrowDown size={12} className="text-blue-400" />
                          )
                        ) : (
                          ""
                        )}
                      </button>
                    ) : (
                      <span>{it.name}</span>
                    )}
                  </th>
                ))}
                <th className="px-4 py-2 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSource?.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors group"
                >
                  {columns?.map((it) =>
                    it.redirect ? (
                      <td className="px-4 py-2 font-medium" key={it.key}>
                        <button
                          onClick={() =>
                            navigate(getNavigationLink(it.redirect, record.id))
                          }
                          className="text-primary hover:underline transition-colors"
                        >
                          {record?.[it.key]}
                        </button>
                      </td>
                    ) : (
                      <td
                        className="px-4 py-2 text-muted-foreground"
                        key={it.key}
                      >
                        {record?.[it.key]}
                      </td>
                    )
                  )}

                  {/* <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted/10 text-muted-foreground"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td> */}
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const editRoute = editRoutesForTable;
                          if (editRoute) {
                            navigate(getNavigationLink(editRoute, record.id));
                          }
                        }}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Edit"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = `mailto:${"it.key"}`)
                        }
                        className="p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                        title="Email"
                      >
                        <Mail size={12} />
                      </button>
                      <button
                        // onClick={() =>
                        //   setModalState({
                        //     isOpen: true,
                        //     mode: "delete",
                        //     "customer",
                        //   })
                        // }
                        className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {dataSource.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No customers found matching your filters
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Page {page_number} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                FilterUpdateFunction.page_number(
                  String(Number(page_number) - 1)
                )
              }
              disabled={page_number == 1}
            >
              <ChevronLeft size={14} />
            </Button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Button
                key={idx + 1}
                variant={page_number === idx + 1 ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  FilterUpdateFunction.page_number(String(idx + 1))
                }
                className="text-xs w-8 h-8"
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                FilterUpdateFunction.page_number(
                  String(Number(page_number) + 1)
                )
              }
              disabled={page_number == totalPages}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
