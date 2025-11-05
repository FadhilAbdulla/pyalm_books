import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterOption {
  id: string;
  label: string;
  type: "select" | "date-range" | "number-range" | "multi-select";
  options?: { label: string; value: string }[];
  isPrimary?: boolean;
}

interface AdvancedFilterProps {
  filterOptions: FilterOption[];
  onFilterChange: (filters: Record<string, any>) => void;
}

export function AdvancedFilter({
  filterOptions,
  onFilterChange,
}: AdvancedFilterProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showDatePresets, setShowDatePresets] = useState(false);
  const datePresetRef = useRef<HTMLDivElement | null>(null);

  const activeFilterCount = Object.values(filters).filter(
    (v) =>
      v !== null &&
      v !== undefined &&
      v !== "" &&
      (!Array.isArray(v) || v.length > 0),
  ).length;

  const primaryFilters = filterOptions.filter((f) => f.isPrimary !== false);
  const secondaryFilters = filterOptions.filter((f) => f.isPrimary === false);
  const statusFilter = filterOptions.find((f) => f.id === "status");
  const dateFilter = filterOptions.find(
    (f) => f.id === "date" || f.id === "invoiceDate" || f.id === "issueDate",
  );

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = { ...filters, [filterId]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDatePreset = (preset: string) => {
    const today = new Date();
    let fromDate = new Date();
    let toDate = new Date();

    switch (preset) {
      case "today":
        fromDate = new Date(today);
        toDate = new Date(today);
        break;
      case "yesterday":
        fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 1);
        toDate = new Date(fromDate);
        break;
      case "month":
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        toDate = new Date(today);
        break;
      case "custom":
        setShowDatePresets(true);
        return;
    }

    const dateId = dateFilter?.id || "date";
    const newFilters = {
      ...filters,
      [`${dateId}_from`]: fromDate.toISOString().split("T")[0],
      [`${dateId}_to`]: toDate.toISOString().split("T")[0],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setShowDatePresets(false);
  };

  const handleClearAll = () => {
    setFilters({});
    onFilterChange({});
    setShowMoreFilters(false);
  };

  const FilterInput = ({ option }: { option: FilterOption }) => {
    if (option.type === "select") {
      return (
        <select
          value={filters[option.id] || ""}
          onChange={(e) => handleFilterChange(option.id, e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
          title={option.label}
        >
          <option value="">{option.label}</option>
          {option.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (option.type === "date-range") {
      return (
        <div className="relative" ref={datePresetRef}>
          <button
            type="button"
            onClick={() => setShowDatePresets(!showDatePresets)}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs hover:bg-muted transition-colors"
          >
            <Calendar size={14} />
            <span>
              {filters[`${option.id}_from`] && filters[`${option.id}_to`]
                ? `${filters[`${option.id}_from`]} to ${filters[`${option.id}_to`]}`
                : "Select Date"}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${showDatePresets ? "rotate-180" : ""}`}
            />
          </button>

          {showDatePresets && (
            <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 min-w-72">
              <div className="p-3 space-y-2">
                <button
                  type="button"
                  onClick={() => handleDatePreset("today")}
                  className="w-full text-left px-3 py-2 text-xs rounded hover:bg-muted transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => handleDatePreset("yesterday")}
                  className="w-full text-left px-3 py-2 text-xs rounded hover:bg-muted transition-colors"
                >
                  Yesterday
                </button>
                <button
                  type="button"
                  onClick={() => handleDatePreset("month")}
                  className="w-full text-left px-3 py-2 text-xs rounded hover:bg-muted transition-colors"
                >
                  This Month
                </button>
                <div className="border-t border-border pt-2">
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Custom Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={filters[`${option.id}_from`] || ""}
                      onChange={(e) =>
                        handleFilterChange(`${option.id}_from`, e.target.value)
                      }
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none"
                    />
                    <input
                      type="date"
                      value={filters[`${option.id}_to`] || ""}
                      onChange={(e) =>
                        handleFilterChange(`${option.id}_to`, e.target.value)
                      }
                      className="w-full rounded border border-border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (option.type === "number-range") {
      return (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters[`${option.id}_min`] || ""}
            onChange={(e) =>
              handleFilterChange(`${option.id}_min`, e.target.value)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none w-24"
            title={`${option.label} Min`}
          />
          <span className="text-xs text-muted-foreground">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters[`${option.id}_max`] || ""}
            onChange={(e) =>
              handleFilterChange(`${option.id}_max`, e.target.value)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none w-24"
            title={`${option.label} Max`}
          />
        </div>
      );
    }

    if (option.type === "multi-select") {
      return (
        <div className="space-y-2">
          {option.options?.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(filters[option.id] || []).includes(opt.value)}
                onChange={(e) => {
                  const current = filters[option.id] || [];
                  const updated = e.target.checked
                    ? [...current, opt.value]
                    : current.filter((v: string) => v !== opt.value);
                  handleFilterChange(option.id, updated);
                }}
                className="rounded border-border"
              />
              <span className="text-xs">{opt.label}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-3">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Date Range Filter - Always Visible */}
        {dateFilter && <FilterInput option={dateFilter} />}

        {/* More Filters Dropdown Button */}
        {secondaryFilters.length > 0 && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-xs font-medium"
            >
              More Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`transition-transform ${showMoreFilters ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Panel for Secondary Filters */}
            {showMoreFilters && (
              <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-50 min-w-80">
                <div className="space-y-4">
                  {secondaryFilters.map((option) => (
                    <div key={option.id}>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        {option.label}
                      </label>
                      <FilterInput option={option} />
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="flex gap-2 pt-4 border-t border-border mt-4">
                  <Button
                    size="sm"
                    onClick={handleClearAll}
                    variant="outline"
                    className="text-xs flex-1"
                  >
                    <X size={12} className="mr-1" />
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status Filter - Right Aligned */}
        {statusFilter && (
          <div className="ml-auto flex-shrink-0">
            <FilterInput option={statusFilter} />
          </div>
        )}
      </div>
    </div>
  );
}
