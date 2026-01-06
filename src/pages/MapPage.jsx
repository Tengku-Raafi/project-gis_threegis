import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Wallet,
  SlidersHorizontal,
  Hotel,
  Home,
  Building,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";
import { supabase } from "../lib/SupabaseClients";
import MapComponent from "../components/MapComponent";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function MapPage() {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null); 
  const [priceRange, setPriceRange] = useState(null); 
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation(null),
      { enableHighAccuracy: true }
    );
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("accommodations")
      .select("*");

    if (error) return console.error(error);

    const formatted = data
      .filter((d) => d.latitude && d.longitude)
      .map((d) => {
        const distance =
          userLocation &&
          haversineDistance(
            userLocation.lat,
            userLocation.lng,
            d.latitude,
            d.longitude
          );

        return {
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
            type: d.type,
            distance,
          },
        };
      })
      .sort(
        (a, b) =>
          (a.properties.distance ?? 9999) -
          (b.properties.distance ?? 9999)
      );

    setData(formatted);
  };

  useEffect(() => {
    if (!userLocation) return;
    fetchData();

    const channel = supabase
      .channel("map-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accommodations" },
        fetchData
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userLocation]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { nama, alamat, rating, harga } = item.properties;

      const matchSearch =
        nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alamat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType
        ? item.type?.toLowerCase() === selectedType
        : true;

      const matchRating =
        ratingFilter === "low"
          ? rating < 3
          : ratingFilter === "high"
          ? rating >= 3
          : true;

      const matchHarga =
        priceRange === "murah"
          ? harga < 200000
          : priceRange === "normal"
          ? harga >= 200000 && harga <= 400000
          : priceRange === "premium"
          ? harga > 400000
          : true;

      return matchSearch && matchType && matchRating && matchHarga;
    });
  }, [data, searchQuery, selectedType, ratingFilter, priceRange]);

  const nearestFive = useMemo(
    () => filteredData.slice(0, 5),
    [filteredData]
  );
  return (
    <div className="flex h-screen bg-cream">
      <aside className="w-96 bg-white border-r shadow-lg flex flex-col">
        <div className="p-6 border-b sticky top-0 bg-white z-50 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-bold text-navy">
              Filter Penginapan
            </h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
            <input
              placeholder="Cari penginapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { k: "hotel", l: "Hotel", i: <Hotel size={16} /> },
              { k: "wisma", l: "Wisma", i: <Home size={16} /> },
              { k: "homestay", l: "Homestay", i: <Building size={16} /> },
              { k: "villa", l: "Villa", i: <MapPin size={16} /> },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() =>
                  setSelectedType(
                    selectedType === t.k ? null : t.k
                  )
                }
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs
                  ${
                    selectedType === t.k
                      ? "bg-gold/20 border-gold text-gold"
                      : "hover:bg-navy/5"
                  }`}
              >
                {t.i}
                {t.l}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setRatingFilter(
                  ratingFilter === "low" ? null : "low"
                )
              }
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border text-sm
                ${
                  ratingFilter === "low"
                    ? "bg-gold/20 border-gold text-gold"
                    : "hover:bg-navy/5"
                }`}
            >
              <Star size={14} /> &lt; 3
            </button>

            <button
              onClick={() =>
                setRatingFilter(
                  ratingFilter === "high" ? null : "high"
                )
              }
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border text-sm
                ${
                  ratingFilter === "high"
                    ? "bg-gold/20 border-gold text-gold"
                    : "hover:bg-navy/5"
                }`}
            >
              <Star size={14} /> ≥ 3
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "murah", l: "< 200K" },
              { k: "normal", l: "200–400K" },
              { k: "premium", l: "> 400K" },
            ].map((p) => (
              <button
                key={p.k}
                onClick={() =>
                  setPriceRange(
                    priceRange === p.k ? null : p.k
                  )
                }
                className={`flex items-center justify-center gap-1 py-2 rounded-lg border text-sm
                  ${
                    priceRange === p.k
                      ? "bg-gold/20 border-gold text-gold"
                      : "hover:bg-navy/5"
                  }`}
              >
                <Wallet size={14} />
                {p.l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredData.map((item, index) => {
            const { nama, alamat, rating, harga, foto, distance } =
              item.properties;

            const isRecommended = index < 5;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`cursor-pointer rounded-xl border p-3 transition
                  ${
                    selectedItem === item.id
                      ? "border-gold bg-gold/10"
                      : "hover:bg-navy/5"
                  }`}
              >
                <div className="flex gap-3">
                  <img
                    src={foto}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{nama}</h3>
                      {isRecommended && (
                        <span className="ml-auto text-[10px] flex items-center gap-1 bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                          <Sparkles size={10} />
                          Terdekat
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">
                      {alamat}
                    </p>

                    <div className="flex justify-between text-xs">
                      <span className="text-gold font-semibold">
                        Rp {harga?.toLocaleString()}
                      </span>
                      <span>⭐ {rating}</span>
                    </div>

                    {distance && (
                      <p className="text-xs text-navy/60 flex items-center gap-1">
                        <Navigation size={12} />
                        {distance.toFixed(2)} km
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 relative">
        <MapComponent
          data={filteredData}
          selectedId={selectedItem}
          userLocation={userLocation}
          highlightIds={nearestFive.map((i) => i.id)}
        />
      </div>
    </div>
  );
}
