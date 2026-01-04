import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const hotelIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/139/139899.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -36],
});

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
      map.flyTo(center, zoom, { animate: true, duration: 1.2 });
    }
  }, [center, zoom, map]);

  return null;
}

export default function MapComponent({
  data = [],
  center = [0.5071, 101.4478],
  zoom = 13,
  selectedId = null,
}) {
  const selectedItem = selectedId
    ? data.find((item) => item.id === selectedId)
    : null;

  const selectedLatLng = selectedItem
    ? getLatLng(selectedItem)
    : null;

  const mapCenter = selectedLatLng ?? center;
  const mapZoom = selectedLatLng ? 16 : zoom;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom
      className="w-full h-full rounded-3xl overflow-hidden
                 border border-slate-800 shadow-2xl"
    >
      <MapUpdater center={mapCenter} zoom={mapZoom} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      {data.map((item) => {
        const latLng = getLatLng(item);
        if (!latLng) return null;

        const { nama, alamat, foto, kategori } = item.properties;

        return (
          <Marker
            key={item.id}
            position={latLng}
            icon={hotelIcon}
          >
            <Popup className="hotel-popup">
              <div
                className="min-w-[230px] overflow-hidden rounded-xl
                           bg-gradient-to-br from-[#0b1c2d] to-[#102a43]
                           text-cream shadow-xl"
              >
                <img
                  src={foto}
                  alt={nama}
                  className="w-full h-28 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-base font-bold text-[#f5f1e8] mb-1">
                    {nama}
                  </h3>

                  <p className="text-xs text-[#d6cfc2] mb-1">
                    {kategori}
                  </p>

                  <p className="text-xs text-[#bfb8ab] mb-3 leading-relaxed">
                    {alamat}
                  </p>

                  <Link
                    to={`/penginapan/${item.id}`}
                    className="block text-center px-4 py-2 rounded-lg
                               bg-[#e8dcc4] text-[#0b1c2d]
                               text-xs font-semibold
                               hover:bg-[#f3ead7] transition"
                  >
                    Lihat Detail Penginapan
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
