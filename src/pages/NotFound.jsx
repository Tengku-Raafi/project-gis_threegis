import { Link } from "react-router-dom";
import { MapPinOff, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-navy via-slate-900 to-navy">
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-cream/10 blur-[140px]" />
      <div className="absolute w-72 h-72 rounded-full bg-gold/10 blur-[120px] translate-x-40 translate-y-24" />

      <div className="relative z-10 text-center px-6 animate-fade-up">
        <div className="mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-cream/10 border border-cream/20 animate-float">
          <MapPinOff className="w-12 h-12 text-gold" />
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight text-cream mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-cream/90 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="max-w-md mx-auto text-cream/60 mb-8">
          Sepertinya lokasi yang Anda cari tidak tersedia atau tautan yang
          dimasukkan tidak valid.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream text-navy font-semibold transition-all duration-300 hover:bg-gold hover:text-navy shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
