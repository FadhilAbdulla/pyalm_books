import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FormModal } from "@/components/FormModal";
import { Plus } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { quoteList, Quote } from "@/common/data/demo";

export default function Quotes() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>(quoteList);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | "view" | "delete";
    quote?: Quote;
  }>({ isOpen: false, mode: "create" });

  const handleDeleteQuote = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (modalState.quote) {
      setQuotes(quotes.filter((q) => q.id !== modalState.quote!.id));
    }
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-foreground">Quotes</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Create and manage quotations
            </p>
          </div>
          <Button
            onClick={() => navigate(RedirectionRoutes.quotesNew)}
            className="bg-primary text-white text-xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Quote
          </Button>
        </div>

        <DataTable
          dataSource={quotes}
          tableKey={"quote"}
          totalPages={1}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <FormModal
        isOpen={modalState.isOpen && modalState.mode === "delete"}
        title="Delete Quote"
        fields={[
          {
            id: "confirmation",
            label: `Are you sure you want to delete quote "${modalState.quote?.quoteNumber}"? This action cannot be undone.`,
            type: "text",
          },
        ]}
        onSubmit={async () => {}}
        onConfirm={handleDeleteQuote}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        mode="view"
      />
    </Layout>
  );
}
