import { useState, useEffect, useRef } from "react";
import { Mail, User, Send, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../lib/SupabaseClients";
import ContactCard from "../components/ContactCard";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const containerRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("contact_messages").insert([form]);
    setLoading(false);

    if (error) {
      setError("Gagal mengirim pesan. Coba lagi.");
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      fetchContacts();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const scroll = (dir) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8; // scroll sekitar 80% container
      containerRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-cream text-navy overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-40">
        <div className="max-w-5xl mx-auto px-6 text-center animate-fade-up">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-navy/10 text-xs tracking-widest uppercase">
            Kontak Kami
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hubungi
            <span className="block text-gold mt-2">Sistem Informasi Penginapan</span>
          </h1>

          <p className="mt-6 text-navy/70 max-w-3xl mx-auto text-lg">
            Kirimkan pertanyaan, kritik, atau saran Anda terkait
            Sistem Informasi Penginapan Kota Pekanbaru.
          </p>
        </div>

        {/* ================= WAVE ================= */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[120px]">
            <path
              d="M0,64 C240,120 480,0 720,32 960,64 1200,96 1440,64 L1440,120 L0,120 Z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="bg-navy text-cream py-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* INFO KONTAK */}
          <div className="animate-fade-up space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Informasi Kontak</h2>
            <p className="text-cream/70 leading-relaxed">
              Silakan hubungi kami jika Anda membutuhkan informasi tambahan
              terkait penginapan di Kota Pekanbaru atau penggunaan sistem ini.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h4 className="font-semibold">Lokasi</h4>
                <p className="text-sm text-cream/70">Pekanbaru, Riau – Indonesia</p>
              </div>
            </div>
          </div>

          {/* FORM CONTACT */}
          <form onSubmit={handleSubmit} className="bg-cream text-navy rounded-3xl p-10 shadow-2xl space-y-5 animate-fade-up">
            <div>
              <label className="text-sm font-semibold">Nama</label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Nama lengkap"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Subjek</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="Subjek pesan"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-2 px-4 py-3 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="Tuliskan pesan Anda..."
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">Pesan berhasil dikirim ✔</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </section>

      {/* ================= PESAN MASUK ================= */}
      <section className="py-16 bg-cream relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
            Pesan Masuk
          </h2>

          {/* Panah navigasi */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-navy/80 text-cream p-3 rounded-full hover:bg-navy transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-navy/80 text-cream p-3 rounded-full hover:bg-navy transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Container card */}
          <div
            ref={containerRef}
            className="flex gap-4 overflow-hidden scroll-smooth relative"
            style={{ padding: "0 50px" }} // padding supaya card pertama dan terakhir tidak menempel
          >
            {contacts.length === 0 ? (
              <p className="text-navy/70 text-center w-full">Belum ada pesan.</p>
            ) : (
              contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
