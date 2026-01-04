import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { supabase } from "../../lib/SupabaseClients";
import bcrypt from "bcryptjs";
import CustomAlert from "../../components/CustomAlert";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.trim())
        .single();

      if (error || !user) {
        setAlert({ message: "Email tidak ditemukan.", type: "error" });
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          setAlert({ message: "Login berhasil!", type: "success" });
          setTimeout(() => navigate("/dashboard"), 800);
        } else {
          setAlert({ message: "Password salah.", type: "error" });
        }
      }
    } catch {
      setAlert({ message: "Terjadi kesalahan, silakan coba lagi.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-navy/90">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden rounded-l-[50px]">
        <img
          src="/images/A-ICON-POSTER.png"
          alt="Penginapan"
          className="absolute inset-0 w-full h-full object-cover animate-fade-left"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/50 to-transparent flex items-center justify-center p-8">
          <h2 className="text-4xl font-extrabold text-cream text-center leading-snug">
            Selamat Datang di <br />
            <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cream animate-[typing_4s_steps(30)_infinite] animate-blink">
              SIG Penginapan Pekanbaru
            </span>
          </h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-cream rounded-[50px] shadow-2xl p-12 animate-fade-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">Login</h1>
            <p className="text-navy/70 text-sm">
              Masuk untuk mengakses daftar penginapan dan fitur SIG lainnya
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/50" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-black
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/50" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-black
                           focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-2xl bg-black text-cream font-semibold
                          hover:scale-[1.03] hover:shadow-xl transition-all duration-300 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                          }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-between mt-6 text-sm text-navy/60">
            <Link to="/forgot-password" className="hover:underline text-black">
              Lupa Password?
            </Link>
            <Link to="/register" className="hover:underline text-black">
              Daftar
            </Link>
          </div>
        </div>
      </div>

      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
