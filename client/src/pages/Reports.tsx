import * as React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  reportCategories,
  reports,
  ReportItem,
} from "@/common/data/reports.demo";

export default function Reports() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  const filtered = React.useMemo(() => {
    let list = reports.slice();
    if (activeCategory) {
      list = list.filter((r) => r.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    return list;
  }, [query, activeCategory]);

  const grouped = React.useMemo(() => {
    const map: Record<string, ReportItem[]> = {};
    for (const c of reportCategories) map[c.id] = [];
    for (const r of filtered) {
      if (!map[r.category]) map[r.category] = [];
      map[r.category].push(r);
    }
    return map;
  }, [filtered]);

  return (
    <Layout>
      <div className="flex gap-4 h-screen overflow-hidden">
        {/* Left - category list */}
        <aside className="w-64 border-r border-border overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-background p-4 border-b border-border">
            <h3 className="text-base font-semibold">Report Category</h3>
            <div className="mt-3">
              <Input
                placeholder="Search reports"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          <nav className="p-2 space-y-1">
            <button
              className={`w-full text-left rounded-md px-3 py-2 text-sm ${activeCategory === null ? "bg-accent/50" : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              All Reports
            </button>
            {reportCategories.map((c) => (
              <button
                key={c.id}
                className={`w-full text-left rounded-md px-3 py-2 text-sm ${activeCategory === c.id ? "bg-accent/50" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right - main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Reports Center
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default">Create New Report</Button>
                <Button variant="outline">⋮</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {reportCategories.map((cat) => {
                const items = grouped[cat.id] || [];
                if (items.length === 0) return null;
                return (
                  <section key={cat.id}>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{cat.name}</h3>
                        <span className="text-sm text-muted-foreground inline-block rounded bg-muted px-2 py-0.5">
                          {items.length}
                        </span>
                      </div>
                    </div>
                    <ul className="divide-y mt-3">
                      {items.map((r) => (
                        <li
                          key={r.id}
                          className="py-3 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <Link to="#" className="text-primary font-medium">
                              {r.name}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {r.createdBy}
                            </div>
                          </div>
                          <div className="ml-6 w-40 text-sm text-muted-foreground text-right">
                            {r.lastVisited ?? "-"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
