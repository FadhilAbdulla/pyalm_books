import Vendors from "@/pages/PurchaseModule/Main/Vendors";
import Expenses from "@/pages/PurchaseModule/Main/Expenses";
import RecurringPurchases from "@/pages/PurchaseModule/Main/RecurringPurchases";
import Bills from "@/pages/PurchaseModule/Main/Bills";
import PaymentsMade from "@/pages/PurchaseModule/Main/PaymentsMade";
import VendorCredits from "@/pages/PurchaseModule/Main/VendorCredits";

import AddVendor from "@/pages/PurchaseModule/Add/AddVendor";
import AddExpense from "@/pages/PurchaseModule/Add/AddExpense";
import AddRecurringPurchase from "@/pages/PurchaseModule/Add/AddRecurringPurchase";
import AddBill from "@/pages/PurchaseModule/Add/AddBill";
import AddPaymentMade from "@/pages/PurchaseModule/Add/AddPaymentMade";
import AddVendorCredit from "@/pages/PurchaseModule/Add/AddVendorCredit";

import VendorDetail from "@/pages/PurchaseModule/Detail/VendorDetail";
import ExpenseDetail from "@/pages/PurchaseModule/Detail/ExpenseDetail";
import RecurringPurchaseDetail from "@/pages/PurchaseModule/Detail/RecurringPurchaseDetail";
import BillDetail from "@/pages/PurchaseModule/Detail/BillDetail";
import PaymentMadeDetail from "@/pages/PurchaseModule/Detail/PaymentMadeDetail";
import VendorCreditDetail from "@/pages/PurchaseModule/Detail/VendorCreditDetail";

import { RoutesElement } from "@/common/Routes";

export const PurchaseRoutePrefix = "/purchases";

export const PurchaseRoutes = {
  vendors: `${PurchaseRoutePrefix}/vendors`,
  expenses: `${PurchaseRoutePrefix}/expenses`,
  recurring: `${PurchaseRoutePrefix}/recurring`,
  bills: `${PurchaseRoutePrefix}/bills`,
  payments: `${PurchaseRoutePrefix}/payments-made`,
  vendorCredits: `${PurchaseRoutePrefix}/vendor-credits`,

  vendorsNew: `${PurchaseRoutePrefix}/vendors/new`,
  expensesNew: `${PurchaseRoutePrefix}/expenses/new`,
  recurringNew: `${PurchaseRoutePrefix}/recurring/new`,
  billsNew: `${PurchaseRoutePrefix}/bills/new`,
  paymentsNew: `${PurchaseRoutePrefix}/payments-made/new`,
  vendorCreditsNew: `${PurchaseRoutePrefix}/vendor-credits/new`,

  vendorsEdit: `${PurchaseRoutePrefix}/vendors/:id`,
  expensesEdit: `${PurchaseRoutePrefix}/expenses/:id`,
  recurringEdit: `${PurchaseRoutePrefix}/recurring/:id`,
  billsEdit: `${PurchaseRoutePrefix}/bills/:id`,
  paymentsEdit: `${PurchaseRoutePrefix}/payments-made/:id`,
  vendorCreditsEdit: `${PurchaseRoutePrefix}/vendor-credits/:id`,

  vendorsDetail: `${PurchaseRoutePrefix}/vendors/view/:id`,
  expensesDetail: `${PurchaseRoutePrefix}/expenses/view/:id`,
  recurringDetail: `${PurchaseRoutePrefix}/recurring/view/:id`,
  billsDetail: `${PurchaseRoutePrefix}/bills/view/:id`,
  paymentsDetail: `${PurchaseRoutePrefix}/payments-made/view/:id`,
  vendorCreditsDetail: `${PurchaseRoutePrefix}/vendor-credits/view/:id`,
};

export const PurchaseElement: RoutesElement[] = [
  // main routes
  { path: PurchaseRoutes.vendors, element: <Vendors /> },
  { path: PurchaseRoutes.expenses, element: <Expenses /> },
  { path: PurchaseRoutes.recurring, element: <RecurringPurchases /> },
  { path: PurchaseRoutes.bills, element: <Bills /> },
  { path: PurchaseRoutes.payments, element: <PaymentsMade /> },
  { path: PurchaseRoutes.vendorCredits, element: <VendorCredits /> },

  // create
  { path: PurchaseRoutes.vendorsNew, element: <AddVendor /> },
  { path: PurchaseRoutes.expensesNew, element: <AddExpense /> },
  { path: PurchaseRoutes.recurringNew, element: <AddRecurringPurchase /> },
  { path: PurchaseRoutes.billsNew, element: <AddBill /> },
  { path: PurchaseRoutes.paymentsNew, element: <AddPaymentMade /> },
  { path: PurchaseRoutes.vendorCreditsNew, element: <AddVendorCredit /> },

  // edit
  { path: PurchaseRoutes.vendorsEdit, element: <AddVendor /> },
  { path: PurchaseRoutes.expensesEdit, element: <AddExpense /> },
  { path: PurchaseRoutes.recurringEdit, element: <AddRecurringPurchase /> },
  { path: PurchaseRoutes.billsEdit, element: <AddBill /> },
  { path: PurchaseRoutes.paymentsEdit, element: <AddPaymentMade /> },
  { path: PurchaseRoutes.vendorCreditsEdit, element: <AddVendorCredit /> },

  // detail
  { path: PurchaseRoutes.vendorsDetail, element: <VendorDetail /> },
  { path: PurchaseRoutes.expensesDetail, element: <ExpenseDetail /> },
  {
    path: PurchaseRoutes.recurringDetail,
    element: <RecurringPurchaseDetail />,
  },
  { path: PurchaseRoutes.billsDetail, element: <BillDetail /> },
  { path: PurchaseRoutes.paymentsDetail, element: <PaymentMadeDetail /> },
  { path: PurchaseRoutes.vendorCreditsDetail, element: <VendorCreditDetail /> },
];

export default {};
