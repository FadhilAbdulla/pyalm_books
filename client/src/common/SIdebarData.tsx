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
import { RedirectionRoutes } from "./RedirectionRoutes";

interface customItem {
  link: string;
  name: string;
  icon: React.ElementType;
}
interface SubItem {
  link: string;
  name: string;
  icon: React.ElementType;
  customItem?: customItem;
}
interface MainItem {
  link: string;
  subItems?: SubItem[];
  name: string;
  icon: React.ElementType;
}
export const SidebarData: MainItem[] = [
  {
    name: "Home",
    link: RedirectionRoutes.dashboard,
    icon: LayoutDashboard,
  },
  {
    name: "Sales",
    link: RedirectionRoutes.customer,
    icon: FileText,
    subItems: [
      {
        link: RedirectionRoutes.customer,
        name: "Customers",
        icon: Users,
        customItem: {
          link: RedirectionRoutes.customerNew,
          name: "Add Customer",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.quotes,
        name: "Quotes",
        icon: FileText,
        customItem: {
          link: RedirectionRoutes.quotesNew,
          name: "Add Quote",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.invoices,
        name: "Invoices",
        icon: Receipt,
        customItem: {
          link: RedirectionRoutes.invoicesNew,
          name: "Add Invoices",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.recurring,
        name: "Recurring",
        icon: TrendingUp,
        customItem: {
          link: RedirectionRoutes.recurringNew,
          name: "Add Recurring",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.challans,
        name: "Challans",
        icon: FileText,
        customItem: {
          link: RedirectionRoutes.challansNew,
          name: "Add Challans",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.payments,
        name: "Payments",
        icon: DollarSign,
        customItem: {
          link: RedirectionRoutes.paymentsNew,
          name: "Add Payments",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.credits,
        name: "Credits",
        icon: CreditCard,
        customItem: {
          link: RedirectionRoutes.creditsNew,
          name: "Add Credits",
          icon: Plus,
        },
      },
    ],
  },
  {
    name: "Purchase",
    icon: ShoppingCart,
    link: RedirectionRoutes.purchase,
    subItems: [
      {
        link: RedirectionRoutes.vendors,
        name: "Vendors",
        icon: Users,
        customItem: {
          link: RedirectionRoutes.vendorsNew,
          name: "Add Vendor",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.expenses,
        name: "Expenses",
        icon: DollarSign,
        customItem: {
          link: RedirectionRoutes.expensesNew,
          name: "Add Expense",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.recurring,
        name: "Recurring",
        icon: TrendingUp,
        customItem: {
          link: RedirectionRoutes.recurringNew,
          name: "Add Recurring",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.bills,
        name: "Bills",
        icon: Receipt,
        customItem: {
          link: RedirectionRoutes.billsNew,
          name: "Add Bill",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.payments,
        name: "Payments Made",
        icon: DollarSign,
        customItem: {
          link: RedirectionRoutes.paymentsNew,
          name: "Add Payment",
          icon: Plus,
        },
      },
      {
        link: RedirectionRoutes.vendorCredits,
        name: "Credits",
        icon: CreditCard,
        customItem: {
          link: RedirectionRoutes.vendorCreditsNew,
          name: "Add Credit",
          icon: Plus,
        },
      },
    ],
  },
  {
    name: "Time Tracking",
    link: "test",
    icon: Clock,
  },
  {
    name: "Banking",
    link: RedirectionRoutes.banking,
    icon: Wallet,
  },
  {
    name: "Reports",
    link: RedirectionRoutes.reports,
    icon: BarChart3,
  },
];
