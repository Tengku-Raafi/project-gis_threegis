import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import HeroSection from "../components/HeroSection";
import StatBox from "../components/StatBox";
import PenginapanCard from "../components/PenginapanCard";
import Loading from "../components/Loading";

import data from "../data/DataPenginapan.json";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({
        left: 320,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;

  const stats = [
    { value: "60+", label: "Penginapan Terdaftar" },
    { value: "4.6★", label: "Rata-rata Rating" },
    { value: "Pekanbaru", label: "Cakupan Wilayah" },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <main className="bg-cream text-navy">
      <HeroSection />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <StatBox stats={stats} />
        </div>
      </section>

      <section className="pb-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Rekomendasi Penginapan
            </h2>
            <p className="text-navy/70 max-w-xl mx-auto">
              Temukan penginapan terbaik dengan lokasi strategis dan fasilitas nyaman
            </p>
          </div>

          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2
                       bg-white shadow-lg p-3 rounded-full
                       hover:scale-110 transition z-10"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       bg-white shadow-lg p-3 rounded-full
                       hover:scale-110 transition z-10"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollRef}
            className="
              flex gap-6 overflow-x-auto pb-6
              scroll-smooth
              [&::-webkit-scrollbar]:hidden
            "
          >
            {data.features.map((item, index) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-[320px]"
              >
                <PenginapanCard penginapan={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
