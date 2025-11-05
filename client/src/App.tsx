import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Banking from "./pages/Banking";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import CustomerDetail from "./pages/CustomerDetail";
import Quotes from "./pages/Quotes";
import AddQuote from "./pages/AddQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Subscription from "./pages/Subscription";
import UIComponents from "./pages/UIComponents";
import Organization from "./pages/Organization";
import Invoices from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<AddCustomer />} />
          <Route path="/customers/view/:id" element={<CustomerDetail />} />
          <Route path="/customers/:id" element={<AddCustomer />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/new" element={<AddQuote />} />
          <Route path="/quotes/detail/:id" element={<QuoteDetail />} />
          <Route path="/quotes/:id" element={<AddQuote />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/new" element={<AddInvoice />} />
          <Route path="/invoices/:id" element={<AddInvoice />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/ui-components" element={<UIComponents />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
