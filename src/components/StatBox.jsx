export default function StatBox({ stats }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {stats.map((item, i) => (
        <div
          key={i}
          className="
            group relative overflow-hidden rounded-2xl
            border border-gold/20
            bg-gradient-to-br from-navy/95 via-navy/90 to-navy/95
            p-10 text-center
            shadow-lg transition-all duration-500
            hover:-translate-y-1 hover:shadow-xl
          "
        >
          <div
            className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_65%)]
              transition-opacity duration-500
            "
          />

          <div className="relative z-10">
            <h3
              className="
                text-5xl font-extrabold tracking-tight
                bg-gradient-to-r from-gold via-cream to-gold
                bg-clip-text text-transparent
              "
            >
              {item.value}
            </h3>

            <p className="mt-4 text-base tracking-wide text-cream/70">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
