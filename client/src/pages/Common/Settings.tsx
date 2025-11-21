import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Save,
  User,
  Building2,
  Lock,
  Bell,
  CreditCard,
  Key,
  LogOut,
  Eye,
  EyeOff,
  Upload,
  X,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "organization" | "security" | "preferences" | "billing" | "api"
  >("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@pyalmbooks.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "en",
  });

  const [orgData, setOrgData] = useState({
    companyName: "Acme Corporation",
    industry: "Technology",
    employees: "50-100",
    website: "https://acmecorp.com",
    address: "123 Business St, New York, NY 10001",
    taxId: "12-3456789",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const [apiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "sk_live_51L8j9K2eZvKl3j9K",
      created: "2024-01-15",
      lastUsed: "2024-06-28",
      status: "Active",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "sk_test_51L8j9K2eZvKl3j9K",
      created: "2024-01-10",
      lastUsed: "2024-06-20",
      status: "Active",
    },
  ]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrgChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecurityData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message (in real app, show toast)
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account, organization, and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Profile Picture
                  </h2>
                  <div className="flex items-start gap-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-4xl font-bold text-white">
                      JD
                    </div>
                    <div>
                      <label htmlFor="profile-image">
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </label>
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                        className="hidden"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        JPG, GIF or PNG. Max 5MB.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Personal Information */}
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Timezone
                        </label>
                        <select
                          name="timezone"
                          value={profileData.timezone}
                          onChange={handleProfileChange}
                          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option>America/New_York</option>
                          <option>America/Los_Angeles</option>
                          <option>Europe/London</option>
                          <option>Asia/Tokyo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Language
                        </label>
                        <select
                          name="language"
                          value={profileData.language}
                          onChange={handleProfileChange}
                          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Organization Settings */}
            {activeTab === "organization" && (
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Organization Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={orgData.companyName}
                      onChange={handleOrgChange}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={orgData.industry}
                        onChange={handleOrgChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option>Technology</option>
                        <option>Manufacturing</option>
                        <option>Retail</option>
                        <option>Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Number of Employees
                      </label>
                      <select
                        name="employees"
                        value={orgData.employees}
                        onChange={handleOrgChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option>1-10</option>
                        <option>10-50</option>
                        <option>50-100</option>
                        <option>100+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={orgData.website}
                      onChange={handleOrgChange}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={orgData.address}
                      onChange={handleOrgChange}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Tax ID / VAT Number
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={orgData.taxId}
                      onChange={handleOrgChange}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Current Password
                      </label>
                      <div className="relative mt-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 pr-10 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        New Password
                      </label>
                      <div className="relative mt-2">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={securityData.newPassword}
                          onChange={handleSecurityChange}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 pr-10 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Button className="bg-primary text-white">
                      Update Password
                    </Button>
                  </div>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Two-Factor Authentication
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Add an extra layer of security
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Require a code from your phone when signing in
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-11 rounded-full bg-muted relative">
                        <input
                          type="checkbox"
                          name="twoFactorEnabled"
                          checked={securityData.twoFactorEnabled}
                          onChange={handleSecurityChange}
                          className="sr-only"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {securityData.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Active Sessions */}
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Active Sessions
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium text-foreground">
                          Current Session
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Chrome on macOS • Last active 5 mins ago
                        </p>
                      </div>
                      <span className="text-xs font-medium text-accent">
                        Active
                      </span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === "preferences" && (
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Invoice Reminders",
                      desc: "Get notified when invoices are due",
                      enabled: true,
                    },
                    {
                      title: "Payment Received",
                      desc: "Notify when payments are received",
                      enabled: true,
                    },
                    {
                      title: "Expense Alerts",
                      desc: "Get notified about unusual expenses",
                      enabled: false,
                    },
                    {
                      title: "Weekly Reports",
                      desc: "Receive weekly financial summary",
                      enabled: true,
                    },
                    {
                      title: "System Updates",
                      desc: "Important security and system updates",
                      enabled: true,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-muted relative">
                        <input
                          type="checkbox"
                          defaultChecked={item.enabled}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Current Plan
                  </h2>
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          Professional
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Billed monthly • Renews on July 28, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          $99
                        </p>
                        <p className="text-xs text-muted-foreground">/month</p>
                      </div>
                    </div>
                    <Button className="mt-6 bg-primary text-white">
                      Change Plan
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Payment Method
                  </h2>
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-12 rounded bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            VISA
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Visa ending in 4242
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Billing History
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-foreground">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left font-semibold text-foreground">
                            Amount
                          </th>
                          <th className="px-4 py-2 text-left font-semibold text-foreground">
                            Status
                          </th>
                          <th className="px-4 py-2 text-right font-semibold text-foreground">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="px-4 py-2">June 28, 2024</td>
                          <td className="px-4 py-2">$99.00</td>
                          <td className="px-4 py-2">
                            <span className="inline-block rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button className="text-primary hover:underline">
                              Download
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/50">
                          <td className="px-4 py-2">May 28, 2024</td>
                          <td className="px-4 py-2">$99.00</td>
                          <td className="px-4 py-2">
                            <span className="inline-block rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button className="text-primary hover:underline">
                              Download
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* API Keys Settings */}
            {activeTab === "api" && (
              <Card className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      API Keys
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use these keys to integrate Pyalm Books with your
                      applications
                    </p>
                  </div>
                  <Button className="bg-primary text-white">
                    Generate New Key
                  </Button>
                </div>

                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="rounded-lg border border-border p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {key.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Created {key.created}
                          </p>
                        </div>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                          {key.status}
                        </span>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                          {key.key}
                        </code>
                        <button className="rounded-lg bg-muted p-2 hover:bg-muted/70 transition-colors">
                          <svg
                            className="h-4 w-4 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last used {key.lastUsed}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Save Button (for profile and organization tabs) */}
            {(activeTab === "profile" || activeTab === "organization") && (
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
