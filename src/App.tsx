
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MiningKvartiry from "./pages/MiningKvartiry";
import Cabinet from "./pages/Cabinet";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { ContentProvider } from "@/content/ContentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mining-kvartiry" element={<MiningKvartiry />} />
          <Route path="/mine-flat" element={<MiningKvartiry />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;