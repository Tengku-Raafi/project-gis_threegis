import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Star, ArrowLeft, Home, Image } from "lucide-react";
import { supabase } from "../lib/SupabaseClients";

export default function PersebaranDetail() {
  const { id } = useParams();
  const [penginapan, setPenginapan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setPenginapan(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-navy">Memuat data...</p>
      </div>
    );
  }

  if (!penginapan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-navy">Data penginapan tidak ditemukan</p>
      </div>
    );
  }

  const {
    nama,
    alamat,
    rating,
    foto,
    type,
    telepon,
  } = penginapan;

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative bg-navy pt-20 pb-44 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            to="/penginapan"
            className="inline-flex items-center gap-2 bg-white text-navy px-5 py-2.5 rounded-lg shadow-md hover:bg-cream hover:shadow-lg transition mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke daftar
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 bg-cream/10 text-cream px-4 py-1.5 rounded-full text-sm mb-5">
                <Home className="w-4 h-4" />
                {type}
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-cream leading-tight">
                {nama}
              </h1>

              <div className="flex flex-wrap gap-6 mt-6 text-cream/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {alamat}
                </span>

                {rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    {rating}
                  </span>
                )}
              </div>
            </div>

            <div className="relative animate-fade-up">
              {foto ? (
                <img
                  src={foto}
                  alt={nama}
                  className="w-full h-[320px] object-cover rounded-3xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-[320px] bg-cream/10 rounded-3xl flex items-center justify-center">
                  <Image className="w-16 h-16 text-cream/40" />
                </div>
              )}

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[120px]">
            <path
              d="M0,64 C240,120 480,0 720,32 960,64 1200,96 1440,64 L1440,120 L0,120 Z"
              fill="#f8f5ef"
            />
          </svg>
        </div>
      </section>
      <section className="-mt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg animate-fade-up">
              <h2 className="text-xl font-bold text-navy mb-4">
                Tentang Penginapan
              </h2>

              <p className="text-navy/70 leading-relaxed">
                Penginapan ini menawarkan kenyamanan dan lokasi strategis yang cocok
                untuk wisata maupun perjalanan bisnis di Kota Pekanbaru.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl sticky top-28 animate-fade-up">
              <h3 className="font-bold text-navy mb-5">Informasi Singkat</h3>

              <div className="space-y-5 text-sm text-navy/70">
                <div>
                  <span className="block text-navy font-medium">
                    Jenis Penginapan
                  </span>
                  {type}
                </div>

                {rating && (
                  <div>
                    <span className="block text-navy font-medium">Rating</span>
                    {rating} / 5
                  </div>
                )}

                {telepon && (
                  <div>
                    <span className="block text-navy font-medium">
                      Nomor Telepon
                    </span>
                    {telepon}
                  </div>
                )}

                <div>
                  <span className="block text-navy font-medium">Wilayah</span>
                  Kota Pekanbaru
                </div>
              </div>

              <Link
                to="/peta"
                className="block text-center mt-8 px-5 py-3 rounded-xl bg-gold text-navy font-semibold hover:scale-[1.03] transition"
              >
                Lihat di Peta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
