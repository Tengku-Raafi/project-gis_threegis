import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function PenginapanCard({ penginapan, index = 0 }) {
  if (!penginapan || !penginapan.properties) return null;

  const { id, properties } = penginapan;
  const { nama, alamat, harga, rating, foto } = properties;

  return (
    <Link
      to={`/penginapan/${id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="rounded-2xl overflow-hidden bg-white border border-navy/10 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={foto}
            alt={nama}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

          <div className="absolute top-4 right-4 flex items-center gap-1 bg-cream/90 text-navy px-2 py-1 rounded-full text-xs font-semibold">
            <Star className="w-4 h-4 text-gold fill-gold" />
            {rating}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-navy mb-1 line-clamp-1">
            {nama}
          </h3>

          <div className="flex items-start gap-2 text-sm text-navy/70 mb-3">
            <MapPin className="w-4 h-4 mt-0.5" />
            <span className="line-clamp-2">{alamat}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-navy/10">
            <span className="text-gold font-semibold">
              Rp {harga.toLocaleString("id-ID")}
            </span>
            <span className="text-sm font-medium text-navy group-hover:text-gold transition">
              Lihat Detail →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
