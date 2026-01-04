import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Phone,
  Building2,
  Wallet,
  SlidersHorizontal,
} from "lucide-react";
import { supabase } from "../lib/SupabaseClients";
import MapComponent from "../components/MapComponent";

export default function MapPage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
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
          telepon: d.telepon,
          foto: d.foto,
        },
      }));

    setData(formatted);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("map-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accommodations" },
        () => fetchData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);
  const typeList = useMemo(
    () => [...new Set(data.map((f) => f.type))],
    [data]
  );

  const PRICE_CATEGORY = {
    murah: (h) => h <= 200000,
    normal: (h) => h > 200000 && h <= 400000,
    tinggi: (h) => h > 400000,
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { nama, alamat, rating, harga } = item.properties;

      const matchSearch =
        nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alamat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType ? item.type === selectedType : true;
      const matchRating = minRating ? rating >= minRating : true;
      const matchHarga = priceRange
        ? PRICE_CATEGORY[priceRange](harga)
        : true;

      return matchSearch && matchType && matchRating && matchHarga;
    });
  }, [data, searchQuery, selectedType, minRating, priceRange]);

  return (
    <div className="flex h-screen bg-cream">
      <aside className="w-96 bg-white border-r border-navy/20 shadow-lg flex flex-col">
        <div className="p-6 border-b border-navy/20 bg-white sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-bold text-navy">
              Daftar Penginapan
            </h2>
          </div>

          <p className="text-sm text-navy/70 mt-1">
            Menampilkan {filteredData.length} penginapan
          </p>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
            <input
              placeholder="Cari penginapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-navy/20
              text-sm focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <FilterGroup icon={<Building2 size={14} />} title="Jenis">
            <FilterButton
              active={!selectedType}
              onClick={() => setSelectedType(null)}
            >
              Semua
            </FilterButton>
            {typeList.map((t) => (
              <FilterButton
                key={t}
                active={selectedType === t}
                onClick={() => setSelectedType(t)}
              >
                {t}
              </FilterButton>
            ))}
          </FilterGroup>
          <FilterGroup icon={<Star size={14} />} title="Rating">
            {[null, 4, 4.5].map((r) => (
              <FilterButton
                key={r ?? "all"}
                active={minRating === r}
                onClick={() => setMinRating(r)}
              >
                {r ? `≥ ${r}` : "Semua"}
              </FilterButton>
            ))}
          </FilterGroup>
          <FilterGroup icon={<Wallet size={14} />} title="Harga">
            {[
              { k: null, l: "Semua" },
              { k: "murah", l: "≤ 200K" },
              { k: "normal", l: "200–400K" },
              { k: "tinggi", l: "> 400K" },
            ].map((i) => (
              <FilterButton
                key={i.l}
                active={priceRange === i.k}
                onClick={() => setPriceRange(i.k)}
              >
                {i.l}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredData.map((item) => {
            const { nama, alamat, rating, harga, foto } =
              item.properties;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`cursor-pointer rounded-xl border p-3
                  ${
                    selectedItem === item.id
                      ? "border-gold bg-gold/10"
                      : "border-navy/10"
                  }`}
              >
                <div className="flex gap-3">
                  <img
                    src={foto}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{nama}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {alamat}
                    </p>
                    <p className="text-xs text-gold font-semibold">
                      Rp {harga?.toLocaleString()}
                    </p>
                    <div className="text-xs">⭐ {rating}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 relative">
        <MapComponent data={filteredData} selectedId={selectedItem} />
      </div>
    </div>
  );
}

const FilterGroup = ({ icon, title, children }) => (
  <div className="mt-4">
    <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
      {icon} {title}
    </div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const FilterButton = ({ active, children, ...props }) => (
  <button
    {...props}
    className={`px-3 py-1 rounded-lg text-xs transition
      ${
        active
          ? "bg-gold text-navy"
          : "bg-navy/5 hover:bg-navy/10"
      }`}
  >
    {children}
  </button>
);
