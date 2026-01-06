import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  Star,
  Phone,
  Wallet,
  Navigation,
} from "lucide-react";

/* ================= FIX DEFAULT ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ================= ICON FACTORY ================= */
const createIcon = (url, size = 38) =>
  new L.Icon({
    iconUrl: url,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 6],
  });

/* ================= ICON SET ================= */
const ICONS = {
  hotel: createIcon(
    "https://cdn-icons-png.flaticon.com/512/139/139899.png"
  ),
  wisma: createIcon(
    "https://cdn-icons-png.flaticon.com/512/619/619034.png"
  ),
  villa: createIcon(
    "https://cdn-icons-png.flaticon.com/512/1018/1018579.png"
  ),
  "guest house": createIcon(
    "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
  ),
  homestay: createIcon(
    "https://cdn-icons-png.flaticon.com/512/609/609803.png"
  ),
  recommended: createIcon(
    "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    44
  ),
  user: createIcon(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    36
  ),
  default: createIcon(
    "https://cdn-icons-png.flaticon.com/512/684/684908.png"
  ),
};

const getMarkerIcon = (type, isHighlighted) => {
  if (isHighlighted) return ICONS.recommended;
  return ICONS[type?.toLowerCase()] || ICONS.default;
};

const getLatLng = (item) => {
  if (!item?.geometry?.coordinates) return null;
  const [lng, lat] = item.geometry.coordinates;
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  return [lat, lng];
};

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 1.3,
      });
    }
  }, [center, zoom, map]);

  return null;
}
export default function MapComponent({
  data = [],
  selectedId = null,
  userLocation = null,
  highlightIds = [],
  center = [0.5071, 101.4478],
  zoom = 13,
}) {
  const selectedItem = selectedId
    ? data.find((i) => i.id === selectedId)
    : null;

  const selectedLatLng = selectedItem
    ? getLatLng(selectedItem)
    : null;

  const mapCenter =
    selectedLatLng ??
    (userLocation
      ? [userLocation.lat, userLocation.lng]
      : center);

  const mapZoom = selectedLatLng
    ? 16
    : userLocation
    ? 15
    : zoom;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom
      className="w-full h-full rounded-3xl border shadow-2xl"
    >
      <MapUpdater center={mapCenter} zoom={mapZoom} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={ICONS.user}
        >
          <Popup closeButton={false}>
            <div className="text-sm font-semibold flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600" />
              Posisi Anda
            </div>
          </Popup>
        </Marker>
      )}

      {data.map((item) => {
        const latLng = getLatLng(item);
        if (!latLng) return null;

        const {
          nama,
          alamat,
          rating,
          harga,
          telepon,
          foto,
          type,
          distance,
        } = item.properties;

        const isHighlighted = highlightIds.includes(item.id);

        return (
          <Marker
            key={item.id}
            position={latLng}
            icon={getMarkerIcon(type, isHighlighted)}
          >
            <Popup closeButton={false}>
              <div className="w-[260px] rounded-xl overflow-hidden bg-white shadow-xl">
                {foto && (
                  <img
                    src={foto}
                    alt={nama}
                    className="w-full h-32 object-cover"
                  />
                )}

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <h3 className="font-bold text-sm text-navy">
                      {nama}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">{alamat}</p>

                  <div className="flex items-center gap-2 text-xs">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{rating ?? "-"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Wallet className="w-4 h-4 text-green-600" />
                    <span>
                      Rp {harga?.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {telepon && (
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{telepon}</span>
                    </div>
                  )}

                  {distance && (
                    <div className="text-xs text-navy/60">
                      {distance.toFixed(2)} km dari Anda
                    </div>
                  )}

                  <div className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-semibold bg-gold/20 text-gold">
                    {type}
                  </div>

                  {isHighlighted && (
                    <div className="mt-1 text-[10px] text-gold font-semibold">
                      ⭐ Rekomendasi Terdekat
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
