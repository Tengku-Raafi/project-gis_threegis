import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/penginapan", label: "Daftar Penginapan" },
    { path: "/peta", label: "Peta Interaktif" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-navy/90 border-b border-cream/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
              <img
                src="/images/A-ICON-LOGO.png"
                alt="Logo Penginapan"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold text-cream">
                SIG Penginapan Pekanbaru
              </h1>
              <p className="text-xs text-cream/60">
                Sistem Informasi Geografis
              </p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    isActive(link.path)
                      ? "bg-cream text-navy shadow"
                      : "text-cream/80 hover:text-cream hover:bg-cream/10"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/login"
              className="px-4 py-2 bg-white text-navy font-semibold
                         rounded-md shadow hover:scale-[1.02] transition"
            >
              Login
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-cream hover:bg-cream/10 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur border-t border-cream/10 px-4 pb-6 pt-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-5 py-3 rounded-xl text-sm font-medium transition
                ${
                  isActive(link.path)
                    ? "bg-cream text-navy shadow"
                    : "text-cream/80 hover:bg-cream/10 hover:text-cream"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2 bg-white text-navy font-semibold rounded-md shadow hover:scale-[1.02] transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
