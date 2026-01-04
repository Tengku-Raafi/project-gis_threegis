export default function Loading() {
  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-navy via-slate-900 to-navy">

      <div className="absolute w-[28rem] h-[28rem] rounded-full bg-cream/10 blur-[140px]" />
      <div className="absolute w-72 h-72 rounded-full bg-gold/10 blur-[120px] translate-x-32 translate-y-20" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border border-cream/30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin" />
        </div>

        <p className="text-cream/80 text-sm tracking-[0.3em] uppercase animate-pulse">
          Memuat Data Penginapan
        </p>
      </div>
    </div>
  );
}
