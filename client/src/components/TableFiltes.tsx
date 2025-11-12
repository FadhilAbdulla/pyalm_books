import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface FilterOption {
  label: string;
  value: string;
}

interface SimpleFilterProps {
  sortOptions: FilterOption[];
  categoryOptions: FilterOption[];
}

export function SimpleFilter({
  sortOptions,
  categoryOptions,
}: SimpleFilterProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_column = searchParams.get("sort_column") || null;
  const sort_order = searchParams.get("sort_order") || null;
  const status = searchParams.get("status") || null;

  const handleSort = (value: string) => {
    if (sort_column === value) {
      handleFilterChange("sort_order", sort_order === "A" ? "B" : "A");
    } else {
      handleFilterChange("sort_order", "A");
      handleFilterChange("sort_column", value);
    }
  };

  const handleFilterChange = (filterId: string, value: string) => {
    searchParams.set(filterId, value);
    setSearchParams(searchParams);
    setShowSortDropdown(false);
    setShowCategoryDropdown(false);
  };

  const handleRemoveFilter = (filterId: string) => {
    searchParams.delete(filterId);
    if (filterId === "sort_column") {
      searchParams.delete("sort_column");
      searchParams.delete("sort_order");
    }
    setSearchParams(searchParams);
    setShowSortDropdown(false);
    setShowCategoryDropdown(false);
  };

  const handleClearAll = () => {
    ["sort_column", "status", "sort_order"].forEach((key) =>
      searchParams.delete(key)
    );
    setSearchParams(searchParams);
    setShowSortDropdown(false);
    setShowCategoryDropdown(false);
  };

  const getFilterLabel = (sortOptions: FilterOption[], value: string) => {
    return sortOptions.find((it) => it.value === value)?.label;
  };

  const getSortButtonLabel = () => {
    if (sort_column) {
      return getFilterLabel(sortOptions, sort_column);
    }
    return "Sort By";
  };

  const getCategoryButtonLabel = () => {
    if (status) {
      return getFilterLabel(categoryOptions, status);
    }
    return "Status";
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort By Dropdown */}
        {sortOptions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowCategoryDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-xs font-medium"
            >
              {getSortButtonLabel()}
              {sort_column ? (
                <X
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFilter("sort_column");
                  }}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-1 z-50 min-w-48">
                {sortOptions.map((opt) => (
                  <button
                    key={`sort_column-${opt.value}`}
                    onClick={() => handleSort(opt.value)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 transition-colors flex items-center gap-2 justify-between ${sort_column === opt.value && "bg-blue-50"}`}
                  >
                    {opt.label}
                    {sort_column === opt.value ? (
                      // <span className="text-blue-600">✓</span>
                      sort_order === "A" ? (
                        <ArrowUp size={14} className="text-blue-400" />
                      ) : (
                        <ArrowDown size={14} className="text-blue-400" />
                      )
                    ) : (
                      ""
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category Dropdown */}
        {categoryOptions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowSortDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-xs font-medium"
            >
              {getCategoryButtonLabel()}
              {status ? (
                <X
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFilter("status");
                  }}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-1 z-50 min-w-48">
                {categoryOptions.map((opt) => (
                  <button
                    key={`status-${opt.value}`}
                    onClick={() => handleFilterChange("status", opt.value)}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    {status === opt.value && (
                      <span className="text-blue-600">✓</span>
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clear All Button */}
        {(sort_column || status) && (
          <button
            onClick={handleClearAll}
            className="px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
