import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { supabase } from "../lib/SupabaseClients";
import { Search, Pencil, Trash2, Plus } from "lucide-react";

const LIMIT = 10;

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
        () => fetchData()
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

  const handleDelete = async (id) => {
    if (!confirm("Hapus data ini?")) return;

    const { error } = await supabase
      .from("accommodations")
      .delete()
      .eq("id", id);

    if (error) return alert(error.message);
    setPage(1);
  };

  const handleSave = async (payload) => {
    const { error } = editData
      ? await supabase
          .from("accommodations")
          .update(payload)
          .eq("id", editData.id)
      : await supabase.from("accommodations").insert(payload);

    if (error) return alert(error.message);

    setOpen(false);
    setEditData(null);
    setPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#FFF9F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Accommodations
            </h1>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search..."
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
                  {[
                    "Nama",
                    "Tipe",
                    "Alamat",
                    "Rating",
                    "Harga",
                    "Lat",
                    "Lng",
                    "Foto",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-[#FFF5EC]"
                  >
                    <Td>{item.nama}</Td>
                    <Td>
                      <TypeBadge type={item.type} />
                    </Td>
                    <Td className="truncate max-w-xs">{item.alamat}</Td>
                    <Td>⭐ {item.rating}</Td>
                    <Td className="font-semibold">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </Td>
                    <Td>{item.latitude}</Td>
                    <Td>{item.longitude}</Td>
                    <Td>
                      {item.foto && (
                        <img
                          src={item.foto}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                    </Td>
                    <Td>
                      <div className="flex gap-2">
                        <Btn
                          icon={<Pencil size={16} />}
                          onClick={() => {
                            setEditData(item);
                            setOpen(true);
                          }}
                        />
                        <Btn
                          icon={<Trash2 size={16} />}
                          danger
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center bg-white rounded-xl shadow px-3 py-1">
              <PageBtn
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </PageBtn>
              <span className="px-3 text-sm">
                Page <b>{page}</b> of <b>{totalPages}</b>
              </span>
              <PageBtn
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </PageBtn>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <FormModal
          initial={editData}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-3 text-slate-700 ${className}`}>
    {children}
  </td>
);

const Btn = ({ icon, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg ${
      danger
        ? "bg-rose-50 text-rose-600"
        : "bg-indigo-50 text-indigo-600"
    }`}
  >
    {icon}
  </button>
);

const PageBtn = (props) => (
  <button
    {...props}
    className="px-3 py-1 rounded-lg hover:bg-slate-200 disabled:opacity-40"
  />
);
const TypeBadge = ({ type }) => {
  const map = {
    Hotel: "bg-slate-800 text-white",
    Homestay: "bg-yellow-100 text-yellow-800",
    Wisma: "bg-emerald-100 text-emerald-800",
    Villa: "bg-purple-100 text-purple-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[type]}`}>
      {type}
    </span>
  );
};

function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || {
      nama: "",
      type: "Hotel",
      alamat: "",
      rating: "",
      harga: "",
      latitude: "",
      longitude: "",
    }
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.foto || null);

  const uploadImage = async () => {
    if (!file) return preview;

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { data } = await supabase.storage
      .from("penginapan-images")
      .upload(fileName, file, { upsert: true });

    if (!data?.path) return preview;

    const { data: url } = supabase.storage
      .from("penginapan-images")
      .getPublicUrl(data.path);

    return url.publicUrl;
  };

  const handleSubmit = async () => {
    const foto = await uploadImage();

    await onSave({
      ...form,
      rating: Number(form.rating),
      harga: Number(form.harga),
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      foto,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          {initial ? "Edit" : "Add"} Accommodation
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Nama" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} />
          <Select label="Tipe" value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
          <Input label="Rating" value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
          <Input label="Harga" value={form.harga} onChange={(v) => setForm({ ...form, harga: v })} />
          <Input label="Latitude" value={form.latitude} onChange={(v) => setForm({ ...form, latitude: v })} />
          <Input label="Longitude" value={form.longitude} onChange={(v) => setForm({ ...form, longitude: v })} />
          <Textarea label="Alamat" value={form.alamat} onChange={(v) => setForm({ ...form, alamat: v })} />
        </div>

        <div>
          <label className="text-sm font-medium">Foto</label>
          <input type="file" onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(f ? URL.createObjectURL(f) : preview);
          }} />
          {preview && (
            <img src={preview} className="mt-2 w-32 h-32 rounded-xl object-cover" />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-200">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-slate-800 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="col-span-2">
    <label className="text-sm font-medium">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100"
    />
  </div>
);

const Select = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-slate-100"
    >
      <option>Hotel</option>
      <option>Homestay</option>
      <option>Wisma</option>
      <option>Villa</option>
    </select>
  </div>
);
