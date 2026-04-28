
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
import SystemHub from "./pages/SystemHub";
import AboutPage from "./pages/AboutPage";
import AiKsiPage from "./pages/AiKsiPage";
import AoKsiPage from "./pages/AoKsiPage";
import FondPage from "./pages/FondPage";
import CalculatorPage from "./pages/CalculatorPage";
import MediaPage from "./pages/MediaPage";
import HowAiPage from "./pages/HowAiPage";
import RegistryExpPage from "./pages/RegistryExpPage";
import RegistryKmPage from "./pages/RegistryKmPage";
import CooperativePage from "./pages/CooperativePage";
import RoadmapPage from "./pages/RoadmapPage";
import CryptoairPage from "./pages/CryptoairPage";
import ForMembersPage from "./pages/ForMembersPage";
import ForAdvertisersPage from "./pages/ForAdvertisersPage";
import LssPage from "./pages/LssPage";
import LegalPage from "./pages/LegalPage";
import FaqPage from "./pages/FaqPage";
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
          {/* Хаб системы */}
          <Route path="/system" element={<SystemHub />} />
          {/* О проекте */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cooperative" element={<CooperativePage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/faq" element={<FaqPage />} />
          {/* Управляющая система */}
          <Route path="/ao-ksi" element={<AoKsiPage />} />
          <Route path="/ai-ksi" element={<AiKsiPage />} />
          <Route path="/how-ai" element={<HowAiPage />} />
          <Route path="/lss" element={<LssPage />} />
          {/* Экономика */}
          <Route path="/fond" element={<FondPage />} />
          <Route path="/registry-km" element={<RegistryKmPage />} />
          <Route path="/registry-exp" element={<RegistryExpPage />} />
          <Route path="/cryptoair" element={<CryptoairPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          {/* Участникам */}
          <Route path="/for-members" element={<ForMembersPage />} />
          <Route path="/for-advertisers" element={<ForAdvertisersPage />} />
          <Route path="/media" element={<MediaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
