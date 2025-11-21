import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  industry: string;
  taxId: string;
  website: string;
  logo: string;
}

const mockOrganization: Organization = {
  id: "1",
  name: "Acme Corporation",
  email: "info@acmecorp.com",
  phone: "+1-555-0001",
  address: "123 Business Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  industry: "Technology",
  taxId: "12-3456789",
  website: "www.acmecorp.com",
  logo: "https://via.placeholder.com/150",
};

export default function Organization() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [org, setOrg] = useState<Organization>(mockOrganization);
  const [formData, setFormData] = useState<Organization>(mockOrganization);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOrg(formData);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData(org);
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            title="Back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Organization Settings</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage your organization details and information
            </p>
          </div>
        </div>

        {/* Organization Logo */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Organization Logo</h3>
          <div className="flex items-center gap-6">
            <div className="h-32 w-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <img src={org.logo} alt="Organization" className="w-full h-full object-cover" />
            </div>
            {isEditing && (
              <div>
                <Button variant="outline" className="text-xs">
                  Upload New Logo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended size: 150x150px
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Organization Details */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Organization Details</h3>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="text-xs"
              >
                Edit
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Organization Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Country and Industry */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Tax ID and Website */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary text-white text-xs"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Organization Name</p>
                  <p className="font-medium text-foreground mt-1">{org.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground mt-1">{org.email}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground mt-1">{org.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground mt-1">{org.address}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="font-medium text-foreground mt-1">{org.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="font-medium text-foreground mt-1">{org.state}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ZIP Code</p>
                  <p className="font-medium text-foreground mt-1">{org.zipCode}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="font-medium text-foreground mt-1">{org.country}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Industry</p>
                  <p className="font-medium text-foreground mt-1">{org.industry}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Tax ID</p>
                  <p className="font-medium text-foreground mt-1">{org.taxId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Website</p>
                  <p className="font-medium text-foreground mt-1">{org.website}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
