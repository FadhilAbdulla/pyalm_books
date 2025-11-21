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
import Recurring from "../pages/Recurring";
import AddRecurring from "../pages/AddRecurring";
import Challans from "../pages/Challans";
import AddChallan from "../pages/AddChallan";
import Payments from "../pages/Payments";
import AddPayment from "../pages/AddPayment";
import Credits from "../pages/Credits";
import AddCredit from "../pages/AddCredit";
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
    path: RedirectionRoutes.recurring,
    element: <Recurring />,
  },
  {
    path: RedirectionRoutes.recurringNew,
    element: <AddRecurring />,
  },
  {
    path: RedirectionRoutes.recurringEdit,
    element: <AddRecurring />,
  },
  {
    path: RedirectionRoutes.challans,
    element: <Challans />,
  },
  {
    path: RedirectionRoutes.challansNew,
    element: <AddChallan />,
  },
  {
    path: RedirectionRoutes.challansEdit,
    element: <AddChallan />,
  },
  {
    path: RedirectionRoutes.payments,
    element: <Payments />,
  },
  {
    path: RedirectionRoutes.paymentsNew,
    element: <AddPayment />,
  },
  {
    path: RedirectionRoutes.paymentsEdit,
    element: <AddPayment />,
  },
  {
    path: RedirectionRoutes.credits,
    element: <Credits />,
  },
  {
    path: RedirectionRoutes.creditsNew,
    element: <AddCredit />,
  },
  {
    path: RedirectionRoutes.creditsEdit,
    element: <AddCredit />,
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
