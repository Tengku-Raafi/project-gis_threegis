import { useState } from "react";
import { Home, Users, FileText, ChevronDown, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [manajemenOpen, setManajemenOpen] = useState(false);

  return (
    <div className="w-64 bg-[#1E2A38] min-h-screen text-cream flex flex-col shadow-2xl">
      <div className="text-center font-bold text-xl py-6 border-b border-cream/20">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${isActive("/dashboard") ? "bg-gold text-navy font-semibold" : "hover:bg-cream/10"}`}
        >
          <Home size={20} />
          Dashboard
        </Link>

        <button
          onClick={() => setManajemenOpen(!manajemenOpen)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-cream/10 transition"
        >
          <div className="flex items-center gap-3">
            <Users size={20} />
            Manajemen
          </div>
          <ChevronDown className={`${manajemenOpen ? "rotate-180" : ""} transition-transform`} />
        </button>

        {manajemenOpen && (
          <div className="pl-12 flex flex-col space-y-1 mt-1">
            <Link
              to="/data-penginapan"
              className={`px-4 py-2 rounded-lg transition
                ${isActive("/dashboard/data-penginapan") ? "bg-gold text-navy font-semibold" : "hover:bg-cream/10"}`}
            >
              Data Penginapan
            </Link>
            <Link
              to="/riwayat-log"
              className={`px-4 py-2 rounded-lg transition
                ${isActive("/dashboard/riwayat-log") ? "bg-gold text-navy font-semibold" : "hover:bg-cream/10"}`}
            >
              Riwayat Log Perubahan
            </Link>
          </div>
        )}

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-cream/10 transition"
        >
          <Settings size={20} />
          Settings
        </Link>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-cream transition mt-auto"
        >
          <LogOut size={20} />
          Log Out
        </Link>
      </nav>
    </div>
  );
}
