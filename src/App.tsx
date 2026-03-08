import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import SmartLearning from "./pages/SmartLearning";
import Tests from "./pages/Tests";
import Chat from "./pages/Chat";
import Bookmarks from "./pages/Bookmarks";
import ProgressDashboard from "./pages/ProgressDashboard";
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
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<Study />} />
          <Route path="/smart-learning" element={<SmartLearning />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
