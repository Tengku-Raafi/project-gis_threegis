import { useState, useMemo, useEffect } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { supabase } from "../lib/SupabaseClients";

import PenginapanCard from "../components/PenginapanCard";
import Loading from "../components/Loading";

export default function PersebaranPenginapan() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const formatted = data
      .filter((d) => d.latitude && d.longitude)
      .map((d) => ({
        id: d.id,
        type: d.type,
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude],
        },
        properties: {
          nama: d.nama,
          alamat: d.alamat,
          rating: d.rating,
          harga: d.harga,
          foto: d.foto,
        },
      }));

    setData(formatted);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("penginapan-public-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accommodations" },
        () => fetchData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);
  const typeList = useMemo(
    () => [...new Set(data.map((d) => d.type))],
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { nama, alamat } = item.properties;

      const matchSearch =
        nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alamat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType ? item.type === selectedType : true;

      return matchSearch && matchType;
    });
  }, [data, searchQuery, selectedType]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative bg-navy pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Daftar Penginapan
          </h1>
          <p className="text-cream/70 max-w-xl mx-auto">
            Temukan {data.length} penginapan terbaik di Kota Pekanbaru
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-[120px]"
          >
            <path
              d="M0,64 C240,120 480,0 720,32 960,64 1200,96 1440,64 L1440,120 L0,120 Z"
              fill="#f8f5ef"
            />
          </svg>
        </div>
      </section>
      <section className="py-6 bg-cream sticky top-20 z-40 backdrop-blur-md border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/50" />
              <input
                type="text"
                placeholder="Cari nama atau alamat penginapan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white
                border border-navy/10 focus:ring-2 focus:ring-navy"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-navy/50" />

              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 text-sm rounded-xl transition ${
                  selectedType === null
                    ? "bg-navy text-cream"
                    : "bg-white border border-navy/10 hover:bg-navy/5"
                }`}
              >
                Semua
              </button>

              {typeList.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 text-sm rounded-xl transition ${
                    selectedType === type
                      ? "bg-navy text-cream"
                      : "bg-white border border-navy/10 hover:bg-navy/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <MapPin className="w-5 h-5 text-navy" />
            <span className="text-navy/70">
              Menampilkan{" "}
              <span className="font-semibold text-navy">
                {filteredData.length}
              </span>{" "}
              penginapan
            </span>
          </div>

          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item, index) => (
                <PenginapanCard
                  key={item.id}
                  penginapan={item}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-navy/40" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">
                Data penginapan tidak ditemukan
              </h3>
              <p className="text-navy/60">
                Coba ubah kata kunci atau filter pencarian
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
