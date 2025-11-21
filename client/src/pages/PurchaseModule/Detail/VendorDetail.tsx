import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { vendorList } from "@/common/data/purchase.demo";

export default function VendorDetail() {
  const { id } = useParams();
  const vendor = vendorList.find((v) => v.id === id);

  return (
    <Layout>
      <div className="space-y-4 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Vendor</h1>
          <p className="text-sm text-muted-foreground">
            Detail for vendor {vendor?.name ?? id}
          </p>
        </div>

        {vendor ? (
          <div className="grid grid-cols-1 gap-2">
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Name</div>
              <div className="text-sm">{vendor.name}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Company</div>
              <div className="text-sm">{vendor.company}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Email</div>
              <div className="text-sm">{vendor.email}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Phone</div>
              <div className="text-sm">{vendor.phone}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm font-semibold">Address</div>
              <div className="text-sm">{vendor.address}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Vendor not found.</div>
        )}
      </div>
    </Layout>
  );
}
