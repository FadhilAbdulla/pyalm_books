import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function Banking() {
  return (
    <Layout>
      <div className="flex  items-center justify-center px-4 py-20 bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-xl font-medium text-foreground ">
            Stay on top of your money
          </h1>

          <p className="mb-6 text-sm text-muted-foreground">
            Connect your bank and credit cards to fetch all your transactions.
            Create, categorize and match these transactions to those you have in
            Pyalm Books.
          </p>

          <div className="flex items-center justify-center gap-2">
            <Button variant="default" className="px-4 py-2 text-sm text-white">
              Connect Bank / Credit Card
            </Button>
            <Button variant="outline" className="px-3 py-2 text-sm">
              Add Manually
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
