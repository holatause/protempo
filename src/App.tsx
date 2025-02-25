import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-lg">Cargando...</p>
        </div>
      }
    >
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
