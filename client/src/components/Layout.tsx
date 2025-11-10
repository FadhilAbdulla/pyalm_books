import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Wallet,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  User,
  Building2,
  Lock,
  HelpCircle,
  Search,
  Bell,
  Plus,
  Clock,
  Users,
  Receipt,
  DollarSign,
  TrendingUp,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { SidebarData } from "@/common/SIdebarData";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchasesOpen, setPurchasesOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const orgRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const quickCreateRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => location.pathname.includes(href);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
      if (
        quickCreateRef.current &&
        !quickCreateRef.current.contains(event.target as Node)
      ) {
        setQuickCreateOpen(false);
      }
      if (
        historyRef.current &&
        !historyRef.current.contains(event.target as Node)
      ) {
        setHistoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchSuggestions = [
    { label: "Acme Corporation", category: "Customers" },
    { label: "Tech Solutions Inc", category: "Customers" },
    { label: "QT-2024-001", category: "Quotes" },
    { label: "INV-2024-005", category: "Invoices" },
  ].filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickCreateOptions = [
    {
      label: "New Customer",
      action: () => {
        navigate("/customers/new");
        setQuickCreateOpen(false);
      },
    },
    {
      label: "New Quote",
      action: () => {
        navigate("/quotes/new");
        setQuickCreateOpen(false);
      },
    },
    {
      label: "New Invoice",
      action: () => {
        navigate("/invoices/new");
        setQuickCreateOpen(false);
      },
    },
    {
      label: "New Expense",
      action: () => {
        setQuickCreateOpen(false);
      },
    },
  ];

  const recentActivity = [
    {
      id: 1,
      text: "Invoice INV-2024-005 created",
      time: "2 mins ago",
      type: "invoice",
    },
    {
      id: 2,
      text: "Payment received from Acme Corp",
      time: "1 hour ago",
      type: "payment",
    },
    {
      id: 3,
      text: "New bill from Cloud Services",
      time: "3 hours ago",
      type: "expense",
    },
    {
      id: 4,
      text: "Quote QT-2024-001 sent to Tech Solutions",
      time: "5 hours ago",
      type: "quote",
    },
    {
      id: 5,
      text: "Customer Tech Solutions Inc added",
      time: "1 day ago",
      type: "customer",
    },
    {
      id: 6,
      text: "Invoice INV-2024-004 marked as paid",
      time: "2 days ago",
      type: "invoice",
    },
    {
      id: 7,
      text: "Expense report submitted",
      time: "3 days ago",
      type: "expense",
    },
    {
      id: 8,
      text: "Quote QT-2024-003 converted to invoice",
      time: "4 days ago",
      type: "quote",
    },
    {
      id: 9,
      text: "Customer Acme Corporation updated",
      time: "5 days ago",
      type: "customer",
    },
    {
      id: 10,
      text: "Invoice INV-2024-003 created",
      time: "1 week ago",
      type: "invoice",
    },
  ];

  const filteredHistory = recentActivity.filter((item) =>
    item.text.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen flex-col bg-background text-foreground">
        {/* Top Header */}
        <header className="z-50 bg-card border-b border-border/30">
          <div className="flex items-center justify-between gap-4 px-3 py-2.5 lg:px-6">
            {/* Left: Logo & Sidebar Toggle */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                  <span className="text-xs font-bold text-white">AF</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-bold text-foreground leading-tight">
                    AccFlow
                  </h1>
                </div>
              </Link>
            </div>

            {/* Center: Search Bar - After Sidebar on Desktop */}
            <div
              className="hidden lg:flex items-center gap-2 flex-1 max-w-md ml-4"
              ref={searchRef}
            >
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search..."
                  className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                />

                {/* Search Suggestions */}
                {searchOpen && searchQuery && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {searchSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted transition-colors border-b border-border/30 last:border-0"
                      >
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* History Dropdown */}
              <div className="relative" ref={historyRef}>
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                  title="Activity History"
                >
                  <Clock size={16} className="text-foreground" />
                </button>

                {historyOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg z-50 max-h-96 overflow-hidden flex flex-col">
                    {/* Search Bar */}
                    <div className="p-3 border-b border-border flex-shrink-0">
                      <input
                        type="text"
                        placeholder="Search history..."
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg pl-3 pr-3 py-1.5 text-xs placeholder-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    {/* History List */}
                    <div className="overflow-y-auto flex-1">
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((activity) => (
                          <div
                            key={activity.id}
                            className="px-3 py-2 border-b border-border/30 hover:bg-muted transition-colors cursor-pointer last:border-0"
                          >
                            <p className="text-xs font-medium text-foreground">
                              {activity.text}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {activity.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-4 text-center">
                          <p className="text-xs text-muted-foreground">
                            No matching activities
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Header Actions */}
            <div className="flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
              {/* Organization Dropdown - Hidden on small screens */}
              <div className="hidden sm:block relative" ref={orgRef}>
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-xs font-medium whitespace-nowrap"
                >
                  <Building2 size={13} />
                  <span className="hidden lg:inline">Acme</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform ${orgDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {orgDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-44 rounded-lg border border-border bg-card shadow-lg z-50">
                    <div className="p-1 space-y-0.5">
                      <Link
                        to="/organization"
                        onClick={() => setOrgDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        <Building2 size={12} />
                        <span>Acme Corp</span>
                      </Link>
                      <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground text-xs hover:bg-muted transition-colors">
                        <Building2 size={12} />
                        <span>TechVentures</span>
                      </button>
                      <Link
                        to="/organization"
                        onClick={() => setOrgDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground text-xs hover:bg-muted transition-colors"
                      >
                        <Plus size={12} />
                        <span>Add Org</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Subscription Badge - Hidden on small screens */}
              <Link
                to="/subscription"
                className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors"
              >
                <span className="text-xs font-semibold text-accent">Pro</span>
                <span className="text-xs text-muted-foreground hidden xl:inline">
                  3d
                </span>
              </Link>

              {/* Quick Create */}
              <div className="relative" ref={quickCreateRef}>
                <button
                  onClick={() => setQuickCreateOpen(!quickCreateOpen)}
                  className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary text-white hover:shadow-lg hover:shadow-primary/50 transition-all"
                  title="Quick create"
                >
                  <Plus size={16} />
                </button>

                {quickCreateOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
                    <div className="p-2 space-y-1">
                      {quickCreateOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={option.action}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <Plus size={12} />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-1.5 rounded-lg hover:bg-muted transition-colors"
                  title="Notifications"
                >
                  <Bell size={16} className="text-foreground" />
                  <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-destructive rounded-full animate-pulse"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-1 w-72 rounded-lg border border-border bg-card shadow-lg max-h-80 overflow-y-auto z-50">
                    <div className="p-3 border-b border-border">
                      <h3 className="font-semibold text-foreground text-xs">
                        Notifications
                      </h3>
                    </div>
                    <div className="p-2 space-y-2">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        >
                          <Clock
                            size={13}
                            className="text-muted-foreground mt-0.5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-foreground">
                              {activity.text}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border p-2">
                      <button className="w-full text-center py-1 text-xs text-primary hover:bg-muted rounded-lg transition-colors font-medium">
                        View All
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="Toggle dark mode"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-all"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                    <User size={12} className="text-white" />
                  </div>
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-1 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
                    <div className="border-b border-border px-3 py-2">
                      <p className="font-semibold text-foreground text-xs">
                        John Doe
                      </p>
                      <p className="text-xs text-muted-foreground">
                        john@accflow.com
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
                      >
                        <User size={12} /> Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
                      >
                        <Building2 size={12} /> Organization
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
                      >
                        <Lock size={12} /> Security
                      </Link>
                    </div>

                    <div className="border-t border-border"></div>
                    <Link
                      to="/signin"
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={12} /> Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Layout with Sidebar & Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`fixed left-0 top-0 z-40 h-screen w-56 transform bg-card transition-transform duration-300 ease-in-out border-r border-border/30 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:static lg:translate-x-0`}
          >
            <nav className="flex flex-col gap-1 overflow-y-auto p-3 -mt-1.5">
              {/* Home */}
              {SidebarData.map((it) =>
                it.subItems ? (
                  <div>
                    <button
                      onClick={() =>
                        it.link === openSubMenu
                          ? setOpenSubMenu(null)
                          : setOpenSubMenu(it.link)
                      }
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isActive(it.link)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <it.icon size={16} />
                      <span>{it.name}</span>
                      <ChevronDown
                        size={12}
                        className={`ml-auto transition-transform ${it.link === openSubMenu ? "rotate-180" : ""}`}
                      />
                    </button>
                    {it.link === openSubMenu &&
                      it.subItems.map((subIt) => (
                        <div className="ml-4 mt-1 space-y-1 border-l border-border/30 pl-2">
                          <div className="group relative flex items-center">
                            <Link
                              to={subIt.link}
                              onClick={() => setSidebarOpen(false)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                isActive(subIt.link)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              <subIt.icon size={12} /> {subIt.name}
                            </Link>
                            {subIt?.customItem && (
                              <Link
                                to={subIt.customItem.link}
                                onClick={() => setSidebarOpen(false)}
                                className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-light text-foreground hover:bg-primary hover:text-white  hover:shadow-primary/50"
                                title={subIt.customItem.name}
                              >
                                <subIt.customItem.icon size={12} />
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <Link
                    to={it.link}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      isActive(it.link)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <it.icon size={16} />
                    <span>{it.name}</span>
                  </Link>
                )
              )}

              {/* Settings at bottom */}
              <div className="mt-4 border-t border-border/30 pt-2">
                <Link
                  to="/settings"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive("/settings")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-card">
            <div className="p-3 lg:p-6">
              <div className="mx-auto max-w-7xl">{children}</div>
            </div>
          </main>
        </div>

        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
