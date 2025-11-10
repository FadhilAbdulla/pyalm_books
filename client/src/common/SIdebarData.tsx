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
    link: RedirectionRoutes.sales,
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
        link: RedirectionRoutes.customer,
        name: "Recurring",
        icon: TrendingUp,
      },
      {
        link: RedirectionRoutes.customer,
        name: "Challans",
        icon: FileText,
      },
      {
        link: RedirectionRoutes.customer,
        name: "Payments",
        icon: DollarSign,
      },
      {
        link: RedirectionRoutes.customer,
        name: "Credits",
        icon: CreditCard,
      },
    ],
  },
  {
    name: "Purchase",
    icon: ShoppingCart,
    link: RedirectionRoutes.purchase,
    subItems: [
      {
        link: RedirectionRoutes.purchase,
        name: "Vendors",
        icon: Users,
      },
      {
        link: RedirectionRoutes.purchase,
        name: "Expenses",
        icon: DollarSign,
      },
      {
        link: RedirectionRoutes.purchase,
        name: "Recurring",
        icon: TrendingUp,
      },
      {
        link: RedirectionRoutes.purchase,
        name: "Bills",
        icon: Receipt,
      },
      {
        link: RedirectionRoutes.purchase,
        name: "Paid",
        icon: DollarSign,
      },
      {
        link: RedirectionRoutes.purchase,
        name: "Credits",
        icon: CreditCard,
      },
    ],
  },
  {
    name: "Time Tracking",
    link: RedirectionRoutes.dashboard,
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
