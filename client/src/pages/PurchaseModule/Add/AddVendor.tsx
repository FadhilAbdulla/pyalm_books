import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RedirectionRoutes } from "@/common/RedirectionRoutes";
import { vendorList } from "@/common/data/purchase.demo";

export default function AddVendor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const existing = vendorList.find((v) => v.id === id);

  const [name, setName] = useState(existing?.name ?? "");
  const [company, setCompany] = useState(existing?.company ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [phone, setPhone] = useState(existing?.phone ?? "");

  function onSave(e?: React.FormEvent) {
    e?.preventDefault();
    navigate(RedirectionRoutes.vendors);
  }

  return (
    <Layout>
      <div
        className="w-full flex flex-col gap-0 pt-4"
        style={{ height: "calc(100vh - 55px )" }}
      >
        <div className="flex-1 overflow-y-auto mb-4">
          <Card className="p-6 max-w-3xl">
            <div className="border-b border-border pb-4 mb-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(RedirectionRoutes.vendors)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  title="Back"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {isEditing ? "Edit Vendor" : "New Vendor"}
                  </h1>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isEditing
                      ? "Update vendor details"
                      : "Create a new vendor"}
                  </p>
                </div>
              </div>
            </div>

            <form id="vendor-form" onSubmit={onSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) =>
                    setName((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Company"
                  value={company}
                  onChange={(e) =>
                    setCompany((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                />
                <Input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) =>
                    setPhone((e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </form>
          </Card>
        </div>

        <div className="border-t border-border bg-background px-6 py-4 flex-shrink-0">
          <div className="mx-auto w-full flex items-center justify-start">
            <div className="flex gap-3">
              <Button
                type="submit"
                form="vendor-form"
                className="bg-primary text-white"
              >
                {isEditing ? "Update Vendor" : "Create Vendor"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(RedirectionRoutes.vendors)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
