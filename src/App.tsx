import { Suspense, useEffect, useState } from "react";
import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import Dashboard from "./pages/Dashboard";
import DesignPage from "./pages/DesignPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import SuperAdminPage from "./pages/SuperAdminPage";
import AdminPage from "./pages/AdminPage";
import UnifiedDashboardPage from "./pages/UnifiedDashboardPage";
import CollaborationPage from "./pages/CollaborationPage";
import PreferencesPage from "./pages/PreferencesPage";
import MarketingToolsPage from "./pages/MarketingToolsPage";
import AIToolsPage from "./pages/AIToolsPage";
import GamificationPage from "./pages/GamificationPage";
import AgentBuilderPage from "./pages/AgentBuilderPage";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { authService } from "./lib/supabase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authService.getSession();
        setIsAuthenticated(!!session.session);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Proteger rutas que requieren autenticación
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // Temporalmente desactivamos la protección para desarrollo
    return <>{children}</>;

    /* Código original de protección
    if (isAuthenticated === null) {
      // Aún cargando el estado de autenticación
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-lg">Verificando autenticación...</p>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
    */
  };

  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <p className="text-lg">Cargando...</p>
          </div>
        }
      >
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/unified-dashboard" element={<UnifiedDashboardPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
          <Route path="/design" element={<DesignPage />} />
          <Route path="/marketing-tools" element={<MarketingToolsPage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/agent-builder" element={<AgentBuilderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/superadmin" element={<SuperAdminPage />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
