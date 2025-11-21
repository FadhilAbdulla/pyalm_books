import Customers from "@/pages/SalesModule/Main/Customers";
import Quotes from "@/pages/SalesModule/Main/Quotes";
import Invoices from "@/pages/SalesModule/Main/Invoices";
import Recurring from "@/pages/SalesModule/Main/Recurring";
import Challans from "@/pages/SalesModule/Main/Challans";
import Payments from "@/pages/SalesModule/Main/Payments";
import Credits from "@/pages/SalesModule/Main/Credits";

import AddCustomer from "@/pages/SalesModule/Add/AddCustomer";
import AddQuote from "@/pages/SalesModule/Add/AddQuote";
import AddInvoice from "@/pages/SalesModule/Add/AddInvoice";
import AddRecurring from "@/pages/SalesModule/Add/AddRecurring";
import AddChallan from "@/pages/SalesModule/Add/AddChallan";
import AddPayment from "@/pages/SalesModule/Add/AddPayment";
import AddCredit from "@/pages/SalesModule/Add/AddCredit";

import CustomerDetail from "@/pages/SalesModule/Detail/CustomerDetail";
import QuoteDetail from "@/pages/SalesModule/Detail/QuoteDetail";
import InvoiceDetail from "@/pages/SalesModule/Detail/InvoiceDetail";
import RecurringDetail from "@/pages/SalesModule/Detail/RecurringDetail";
import ChallanDetail from "@/pages/SalesModule/Detail/ChallanDetail";
import PaymentDetail from "@/pages/SalesModule/Detail/PaymentDetail";
import CreditDetail from "@/pages/SalesModule/Detail/CreditDetail";

import { RoutesElement } from "../Routes";

export const SalesRoutePrefix = "/sales";

export const SalesRoutes = {
  customer: `${SalesRoutePrefix}/customers`,
  quotes: `${SalesRoutePrefix}/quotes`,
  invoices: `${SalesRoutePrefix}/invoices`,
  recurring: `${SalesRoutePrefix}/recurring`,
  challans: `${SalesRoutePrefix}/challans`,
  payments: `${SalesRoutePrefix}/payments`,
  credits: `${SalesRoutePrefix}/credits`,

  customerNew: `${SalesRoutePrefix}/customers/new`,
  quotesNew: `${SalesRoutePrefix}/quotes/new`,
  invoicesNew: `${SalesRoutePrefix}/invoices/new`,
  recurringNew: `${SalesRoutePrefix}/recurring/new`,
  challansNew: `${SalesRoutePrefix}/challans/new`,
  paymentsNew: `${SalesRoutePrefix}/payments/new`,
  creditsNew: `${SalesRoutePrefix}/credits/new`,

  customerEdit: `${SalesRoutePrefix}/customers/:id`,
  quotesEdit: `${SalesRoutePrefix}/quotes/:id`,
  invoicesEdit: `${SalesRoutePrefix}/invoices/:id`,
  recurringEdit: `${SalesRoutePrefix}/recurring/:id`,
  challansEdit: `${SalesRoutePrefix}/challans/:id`,
  paymentsEdit: `${SalesRoutePrefix}/payments/:id`,
  creditsEdit: `${SalesRoutePrefix}/credits/:id`,

  customerDetail: `${SalesRoutePrefix}/customers/view/:id`,
  quotesDetail: `${SalesRoutePrefix}/quotes/view/:id`,
  invoicesDetail: `${SalesRoutePrefix}/invoices/view/:id`,
  recurringDetail: `${SalesRoutePrefix}/recurring/view/:id`,
  challansDetail: `${SalesRoutePrefix}/challans/view/:id`,
  paymentsDetail: `${SalesRoutePrefix}/payments/view/:id`,
  creditsDetail: `${SalesRoutePrefix}/credits/view/:id`,
};

export const SalesElement: RoutesElement[] = [
  // main routes
  {
    path: SalesRoutes.customer,
    element: <Customers />,
  },
  {
    path: SalesRoutes.quotes,
    element: <Quotes />,
  },
  {
    path: SalesRoutes.invoices,
    element: <Invoices />,
  },
  {
    path: SalesRoutes.recurring,
    element: <Recurring />,
  },
  {
    path: SalesRoutes.challans,
    element: <Challans />,
  },
  {
    path: SalesRoutes.payments,
    element: <Payments />,
  },
  {
    path: SalesRoutes.credits,
    element: <Credits />,
  },

  //create new routes
  {
    path: SalesRoutes.customerNew,
    element: <AddCustomer />,
  },
  {
    path: SalesRoutes.quotesNew,
    element: <AddQuote />,
  },
  {
    path: SalesRoutes.invoicesNew,
    element: <AddInvoice />,
  },
  {
    path: SalesRoutes.recurringNew,
    element: <AddRecurring />,
  },
  {
    path: SalesRoutes.challansNew,
    element: <AddChallan />,
  },
  {
    path: SalesRoutes.paymentsNew,
    element: <AddPayment />,
  },
  {
    path: SalesRoutes.creditsNew,
    element: <AddCredit />,
  },

  //edit routes
  {
    path: SalesRoutes.customerEdit,
    element: <AddCustomer />,
  },
  {
    path: SalesRoutes.quotesEdit,
    element: <AddQuote />,
  },
  {
    path: SalesRoutes.invoicesEdit,
    element: <AddInvoice />,
  },
  {
    path: SalesRoutes.recurringEdit,
    element: <AddRecurring />,
  },
  {
    path: SalesRoutes.challansEdit,
    element: <AddChallan />,
  },
  {
    path: SalesRoutes.paymentsEdit,
    element: <AddPayment />,
  },
  {
    path: SalesRoutes.creditsEdit,
    element: <AddCredit />,
  },

  //detail routes
  {
    path: SalesRoutes.customerDetail,
    element: <CustomerDetail />,
  },
  {
    path: SalesRoutes.quotesDetail,
    element: <QuoteDetail />,
  },
  {
    path: SalesRoutes.invoicesDetail,
    element: <InvoiceDetail />,
  },
  {
    path: SalesRoutes.recurringDetail,
    element: <RecurringDetail />,
  },
  {
    path: SalesRoutes.challansDetail,
    element: <ChallanDetail />,
  },
  {
    path: SalesRoutes.paymentsDetail,
    element: <PaymentDetail />,
  },
  {
    path: SalesRoutes.creditsDetail,
    element: <CreditDetail />,
  },
];
