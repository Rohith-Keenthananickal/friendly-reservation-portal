
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
import SettlementPaymentPage from "./pages/settlement/PaymentPage";
import SettlementReportsPage from "./pages/settlement/ReportsPage";
import SettlementFinancePage from "./pages/settlement/FinancePage";
import ReceiptListingPage from "./pages/ReceiptListingPage";
import ReceiptDetailPage from "./pages/ReceiptDetailPage";
import BookingListingPage from "./pages/BookingListingPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import FinalBillPage from "./pages/FinalBillPage";

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
          
          {/* Receipt Routes */}
          <Route path="/receipt" element={<ReceiptListingPage />} />
          <Route path="/receipt/:id" element={<ReceiptDetailPage />} />
          
          {/* Booking Routes */}
          <Route path="/bookings" element={<BookingListingPage />} />
          <Route path="/bookings/:id" element={<BookingDetailPage />} />
          
          {/* Final Bill Route */}
          <Route path="/final-bill/:id" element={<FinalBillPage />} />
          <Route path="/final-bill" element={<FinalBillPage />} />
          
          {/* Settlement Routes */}
          <Route path="/settlement/payment" element={<SettlementPaymentPage />} />
          <Route path="/settlement/reports" element={<SettlementReportsPage />} />
          <Route path="/settlement/finance" element={<SettlementFinancePage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
