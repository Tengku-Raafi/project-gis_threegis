import { MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import HotelSVG from "./HotelSVG";

export default function HeroSection() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-navy animate-fade-up">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-navy/10 text-xs tracking-widest uppercase">
            Sistem Informasi Penginapan
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Temukan Penginapan
            <span className="block text-gold mt-2">Nyaman & Strategis</span>
          </h1>

          <p className="mt-6 max-w-lg text-navy/70">
            Jelajahi hotel, homestay, dan penginapan terbaik di Kota Pekanbaru
            dengan peta interaktif dan informasi lengkap.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/peta"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                         bg-gold text-navy font-semibold
                         hover:scale-105 transition"
            >
              <MapPin className="w-4 h-4" />
              Lihat Peta
            </Link>

            <Link
              to="/penginapan"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                         border border-navy/30 text-navy font-semibold
                         hover:bg-navy/5 transition"
            >
              <Search className="w-4 h-4" />
              Cari Penginapan
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <HotelSVG />

          <div
            className="absolute -top-6 -right-6 w-11 h-11 bg-gold rounded-full
                          flex items-center justify-center
                          animate-bounce-slow shadow-md"
          >
            <MapPin className="w-5 h-5 text-navy" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="w-[200%] h-[120px]"
        >
          <path
            className="wave-animate"
            d="M0,64 C240,120 480,0 720,32
         960,64 1200,96 1440,64
         1680,32 1920,96 2160,64
         2400,32 2640,96 2880,64
         L2880,120 L0,120 Z"
            fill="#0f172a"
          />

          <path
            className="wave-animate"
            style={{ animationDuration: "20s", opacity: 0.5 }}
            d="M0,80 C240,40 480,120 720,96
         960,72 1200,120 1440,96
         1680,72 1920,120 2160,96
         2400,72 2640,120 2880,96
         L2880,120 L0,120 Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    </section>
  );
}
