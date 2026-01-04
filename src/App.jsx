import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import PersebaranPenginapan from "./pages/PersebaranPenginapan";
import PersebaranDetail from "./pages/PersebaranDetail";
import MapPage from "./pages/MapPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

import DashboardPenginapan from "./pages/DashboardPenginapan.jsx";
import DataPenginapan from "./pages/DataPenginapan.jsx";
import Settings from "./pages/Settings.jsx";
import LogHistory from "./pages/LogHistory.jsx";


function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AuthLayout({ children }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Main pages wrapped with MainLayout */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/penginapan" element={<MainLayout><PersebaranPenginapan /></MainLayout>} />
      <Route path="/penginapan/:id" element={<MainLayout><PersebaranDetail /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/peta" element={<MainLayout><MapPage /></MainLayout>} />

      {/* DASHBOARD ADMIN */}
      <Route path="/dashboard" element={<DashboardPenginapan />} />
      <Route path="/data-penginapan" element={<DataPenginapan />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/riwayat-log" element={<LogHistory />} />

      {/* Auth pages wrapped with AuthLayout */}
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
      <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

      {/* Not Found */}
      <Route path="*" element={<AuthLayout><NotFound /></AuthLayout>} />
    </Routes>
  );
}
