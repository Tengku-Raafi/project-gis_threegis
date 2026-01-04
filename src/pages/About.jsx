import { MapPin, Hotel, Globe, Users } from "lucide-react";

export default function About() {
  return (
    <main className="bg-cream text-navy overflow-hidden">

      <section className="relative pt-32 pb-40">
        <div className="max-w-5xl mx-auto px-6 text-center animate-fade-up">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-navy/10 text-xs tracking-widest uppercase">
            Tentang Website
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Sistem Informasi
            <span className="block text-gold mt-2">
              Penginapan Pekanbaru
            </span>
          </h1>

          <p className="mt-6 text-navy/70 max-w-3xl mx-auto text-lg">
            Platform digital yang membantu masyarakat dan wisatawan
            menemukan penginapan terbaik di Kota Pekanbaru melalui
            peta interaktif, data akurat, dan visual yang mudah dipahami.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[120px]">
            <path
              d="M0,64 C240,120 480,0 720,32 960,64 1200,96 1440,64 L1440,120 L0,120 Z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </section>
      <section className="bg-navy text-cream py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mengapa Website Ini Dibuat?
            </h2>

            <p className="text-cream/70 leading-relaxed mb-6">
              Website ini dikembangkan sebagai media informasi berbasis
              Sistem Informasi Geografis (SIG) untuk mempermudah pencarian
              penginapan seperti hotel, homestay, dan guest house di Kota Pekanbaru.
            </p>

            <p className="text-cream/70 leading-relaxed">
              Dengan memanfaatkan peta interaktif, pengguna dapat melihat
              persebaran lokasi penginapan secara visual, lengkap dengan
              detail fasilitas, rating, dan informasi pendukung lainnya.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: <MapPin />,
                title: "Peta Interaktif",
                desc: "Visualisasi lokasi penginapan secara real-time dan mudah dipahami."
              },
              {
                icon: <Hotel />,
                title: "Data Penginapan",
                desc: "Informasi lengkap hotel, homestay, dan penginapan lainnya."
              },
              {
                icon: <Users />,
                title: "Untuk Semua",
                desc: "Bermanfaat bagi wisatawan, mahasiswa, dan masyarakat umum."
              },
              {
                icon: <Globe />,
                title: "Berbasis SIG",
                desc: "Menggunakan pendekatan Sistem Informasi Geografis modern."
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-cream text-navy rounded-2xl p-8
                           shadow-lg hover:-translate-y-2 transition
                           animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 mb-4 bg-gold rounded-xl
                                flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-navy/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Visi Website
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed">
            Menjadi media informasi penginapan yang informatif,
            mudah digunakan, dan visual-friendly untuk mendukung
            pariwisata serta kebutuhan hunian sementara di Kota Pekanbaru.
          </p>
        </div>
      </section>

    </main>
  );
}
