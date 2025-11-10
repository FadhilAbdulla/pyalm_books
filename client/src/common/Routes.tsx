import Index from "../pages/Index";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import Purchases from "../pages/Purchases";
import Banking from "../pages/Banking";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Customers from "../pages/Customers";
import AddCustomer from "../pages/AddCustomer";
import CustomerDetail from "../pages/CustomerDetail";
import Quotes from "../pages/Quotes";
import AddQuote from "../pages/AddQuote";
import QuoteDetail from "../pages/QuoteDetail";
import Subscription from "../pages/Subscription";
import UIComponents from "../pages/UIComponents";
import Organization from "../pages/Organization";
import Invoices from "../pages/Invoices";
import AddInvoice from "../pages/AddInvoice";
import { RedirectionRoutes } from "./RedirectionRoutes";

interface Routes {
  path: string;
  element: React.ReactElement;
}

export const PublicRoutes: Routes[] = [
  {
    path: RedirectionRoutes.index,
    element: <Index />,
  },
  {
    path: RedirectionRoutes.signIn,
    element: <SignIn />,
  },
  {
    path: RedirectionRoutes.signUp,
    element: <SignUp />,
  },
];

export const PrivateRoutes: Routes[] = [
  {
    path: RedirectionRoutes.dashboard,
    element: <Dashboard />,
  },
  {
    path: RedirectionRoutes.sales,
    element: <Sales />,
  },
  {
    path: RedirectionRoutes.purchase,
    element: <Purchases />,
  },
  {
    path: RedirectionRoutes.banking,
    element: <Banking />,
  },
  {
    path: RedirectionRoutes.inventory,
    element: <Inventory />,
  },
  {
    path: RedirectionRoutes.reports,
    element: <Reports />,
  },
  {
    path: RedirectionRoutes.settings,
    element: <Settings />,
  },
  {
    path: RedirectionRoutes.customer,
    element: <Customers />,
  },
  {
    path: RedirectionRoutes.customerNew,
    element: <AddCustomer />,
  },
  {
    path: RedirectionRoutes.customerDetail,
    element: <CustomerDetail />,
  },
  {
    path: RedirectionRoutes.customerEdit,
    element: <AddCustomer />,
  },
  {
    path: RedirectionRoutes.quotes,
    element: <Quotes />,
  },
  {
    path: RedirectionRoutes.quotesNew,
    element: <AddQuote />,
  },
  {
    path: RedirectionRoutes.quotesDetail,
    element: <QuoteDetail />,
  },
  {
    path: RedirectionRoutes.quotesEdit,
    element: <AddQuote />,
  },
  {
    path: RedirectionRoutes.subscription,
    element: <Subscription />,
  },
  {
    path: RedirectionRoutes.invoices,
    element: <Invoices />,
  },
  {
    path: RedirectionRoutes.invoicesNew,
    element: <AddInvoice />,
  },
  {
    path: RedirectionRoutes.invoicesEdit,
    element: <AddInvoice />,
  },
  {
    path: RedirectionRoutes.subscription,
    element: <Subscription />,
  },
  {
    path: RedirectionRoutes.organization,
    element: <Organization />,
  },
  {
    path: RedirectionRoutes.uiComponents,
    element: <UIComponents />,
  },
];
