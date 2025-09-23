
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import ReservationVoucherPage from "./pages/ReservationVoucherPage";
import ReservationReceiptPage from "./pages/ReservationReceiptPage";
import RoomAvailabilityCalendar from "./components/room-availability/RoomAvailabilityCalendar";
import Layout from "./components/Layout";
import AccountsPaymentPage from "./pages/accounts/PaymentPage";
import AccountsReportsPage from "./pages/accounts/ReportsPage";
import AccountsFinancePage from "./pages/accounts/FinancePage";
import AccountsOutstandingPage from "./pages/accounts/OutstandingPage";
import AccountsIncomePage from "./pages/accounts/IncomePage";
import AccountsExpensePage from "./pages/accounts/ExpensePage";
import AccountsLedgerSetupPage from "./pages/accounts/LedgerSetupPage";
import AccountsCashBookPage from "./pages/accounts/CashBookPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/houseboat" element={<Index />} />
          <Route path="/shikara" element={<Index />} />
          <Route path="/hotel" element={<Index />} />
          <Route path="/reservation-voucher" element={<ReservationVoucherPage />} />
          <Route path="/reservation-receipt" element={<ReservationReceiptPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/room-availability" element={<Layout><RoomAvailabilityCalendar /></Layout>} />
          
          {/* Accounts Routes */}
          <Route path="/accounts/income" element={<AccountsIncomePage />} />
          <Route path="/accounts/expense" element={<AccountsExpensePage />} />
          <Route path="/accounts/ledger-setup" element={<AccountsLedgerSetupPage />} />
          <Route path="/accounts/cash-book" element={<AccountsCashBookPage />} />
          <Route path="/accounts/settlement/payment" element={<AccountsPaymentPage />} />
          <Route path="/accounts/settlement/reports" element={<AccountsReportsPage />} />
          <Route path="/accounts/settlement/finance" element={<AccountsFinancePage />} />
          <Route path="/accounts/outstanding" element={<AccountsOutstandingPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
