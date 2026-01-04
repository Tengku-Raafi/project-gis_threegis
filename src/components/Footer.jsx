import { MapPin, Phone, Mail, Hotel } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-navy text-cream overflow-hidden">
      <div className="absolute w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-[140px] -bottom-32 -right-32" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-cream/10 border border-cream/20">
                <Hotel className="w-6 h-6 text-gold" />
              </div>
              <h2 className="text-xl font-bold tracking-wide">
                ThreeGIS
              </h2>
            </div>

            <p className="text-cream/70 leading-relaxed max-w-md">
              ThreeGIS adalah sistem informasi penginapan yang membantu
              Anda menemukan hotel, homestay, dan akomodasi terbaik di Kota
              Pekanbaru dengan peta interaktif dan data yang akurat.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-cream mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3 text-cream/70">
              <li>
                <Link to="/" className="hover:text-gold transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/penginapan" className="hover:text-gold transition">
                  Daftar Penginapan
                </Link>
              </li>
              <li>
                <Link to="/peta" className="hover:text-gold transition">
                  Peta Interaktif
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-cream mb-4">
              Kontak
            </h3>
            <ul className="space-y-4 text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1" />
                <span>
                  Kota Pekanbaru,  
                  <br />Riau, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@threeGIS.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 border-t border-cream/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/60">
          <p>
            © {new Date().getFullYear()} ThreeGIS. All rights reserved.
          </p>

          <p className="tracking-wide">
            Designed with ThreeGIS
          </p>
        </div>
      </div>
    </footer>
  );
}
