import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { supabase } from "../lib/SupabaseClients";
import { Search, Pencil, Trash2, Plus } from "lucide-react";

const LIMIT = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function DataPenginapan() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetchData();
  }, [page, search]);

  useEffect(() => {
    const channel = supabase
      .channel("accommodations-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accommodations" },
        () => refreshData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchData = async () => {
    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    let query = supabase
      .from("accommodations")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(from, to);

    if (search) query = query.ilike("nama", `%${search}%`);

    const { data, count } = await query;
    setData(data || []);
    setTotal(count || 0);
  };

  const refreshData = () => {
    setPage(1);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus data ini?")) return;
    await supabase.from("accommodations").delete().eq("id", id);
    refreshData();
  };

  const handleSave = async (payload) => {
    if (editData) {
      await supabase.from("accommodations").update(payload).eq("id", editData.id);
    } else {
      await supabase.from("accommodations").insert(payload);
    }

    setOpen(false);
    setEditData(null);
    refreshData();
  };

  return (
    <div className="flex min-h-screen bg-[#FFF9F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Accommodations</h1>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Cari nama penginapan..."
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="pl-9 pr-4 py-2 rounded-xl bg-white shadow-sm text-sm"
                />
              </div>

              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F3EFEA]">
                <tr>
                  {["Nama","Tipe","Alamat","Rating","Harga","Telepon","Lat","Lng","Foto","Action"].map(h => (
                    <th key={h} className="px-4 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-b hover:bg-[#FFF5EC]">
                    <Td>{item.nama}</Td>
                    <Td><TypeBadge type={item.type} /></Td>
                    <Td className="truncate max-w-xs">{item.alamat}</Td>
                    <Td>⭐ {item.rating}</Td>
                    <Td>Rp {Number(item.harga).toLocaleString("id-ID")}</Td>
                    <Td>{item.telepon}</Td>
                    <Td>{item.latitude}</Td>
                    <Td>{item.longitude}</Td>
                    <Td>
                      {item.foto && (
                        <img src={item.foto} className="w-12 h-12 rounded-lg object-cover" />
                      )}
                    </Td>
                    <Td>
                      <div className="flex gap-2">
                        <Btn icon={<Pencil size={16} />} onClick={() => { setEditData(item); setOpen(true); }} />
                        <Btn icon={<Trash2 size={16} />} danger onClick={() => handleDelete(item.id)} />
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
              <span>Page <b>{page}</b> of <b>{totalPages || 1}</b></span>
              <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <FormModal
          initial={editData}
          onClose={() => { setOpen(false); setEditData(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: "", type: "Hotel", alamat: "",
    rating: "", harga: "", latitude: "", longitude: "",
    telepon: "", foto: ""
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setPreview(initial.foto);
    }
  }, [initial]);

  const formatRupiah = (value) =>
    value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const uploadImage = async () => {
    if (!file) return form.foto || null;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Format gambar harus JPG / PNG / WEBP");
      return null;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran gambar maksimal 5MB");
      return null;
    }

    const ext = file.name.split(".").pop();
    const fileName = `penginapan/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("penginapan-images")
      .upload(fileName, file, { upsert: true });

    if (error) return null;

    return supabase.storage.from("penginapan-images").getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async () => {
    const fotoUrl = await uploadImage();
    if (file && !fotoUrl) return;

    await onSave({
      ...form,
      foto: fotoUrl,
      rating: Number(form.rating),
      harga: Number(form.harga.replace(/\./g, "")),
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">{initial ? "Edit" : "Add"} Accommodation</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Nama" placeholder="Nama penginapan" value={form.nama} onChange={v => setForm({ ...form, nama: v })} />
          <Select label="Tipe" value={form.type} onChange={v => setForm({ ...form, type: v })} />
          <Input label="Rating (1–5)" placeholder="Contoh: 4.5" value={form.rating}
            onChange={v => /^[1-5](\.\d)?$/.test(v) || v === "" ? setForm({ ...form, rating: v }) : null} />
          <Input label="Harga" placeholder="Contoh: 250000" value={form.harga}
            onChange={v => setForm({ ...form, harga: formatRupiah(v) })} />
          <Input label="Telepon" placeholder="Maks 13 digit" value={form.telepon}
            onChange={v => /^\d{0,13}$/.test(v) && setForm({ ...form, telepon: v })} />
          <Input label="Latitude" placeholder="-6.200000" value={form.latitude}
            onChange={v => /^-?\d*\.?\d*$/.test(v) && setForm({ ...form, latitude: v })} />
          <Input label="Longitude" placeholder="106.816666" value={form.longitude}
            onChange={v => /^-?\d*\.?\d*$/.test(v) && setForm({ ...form, longitude: v })} />
          <Textarea label="Alamat" placeholder="Alamat lengkap penginapan" value={form.alamat}
            onChange={v => setForm({ ...form, alamat: v })} />
        </div>

        <div>
          <label className="text-sm font-medium">Foto</label>
          <input type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(f ? URL.createObjectURL(f) : preview);
          }} />
          {preview && <img src={preview} className="mt-2 w-32 h-32 rounded-xl object-cover" />}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-200">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-slate-800 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}

const Td = ({ children, className = "" }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;

const Btn = ({ icon, danger, onClick }) => (
  <button onClick={onClick} className={`p-2 rounded-lg ${danger ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"}`}>
    {icon}
  </button>
);

const TypeBadge = ({ type }) => {
  const map = {
    Hotel: "bg-slate-800 text-white",
    Villa: "bg-purple-100 text-purple-800",
    Wisma: "bg-emerald-100 text-emerald-800",
    Homestay: "bg-yellow-100 text-yellow-800",
  };
  return <span className={`px-3 py-1 rounded-full text-xs ${map[type]}`}>{type}</span>;
};

const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100" />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder }) => (
  <div className="col-span-2">
    <label className="text-sm font-medium">{label}</label>
    <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100" />
  </div>
);

const Select = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100">
      <option>Hotel</option>
      <option>Villa</option>
      <option>Wisma</option>
      <option>Homestay</option>
    </select>
  </div>
);
