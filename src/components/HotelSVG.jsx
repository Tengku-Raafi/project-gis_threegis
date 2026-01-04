export default function HotelSVG() {
  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-float"
    >
      <g className="cloud-move" opacity="0.35">
        <ellipse cx="90" cy="90" rx="38" ry="16" fill="#CBD5E1" />
        <ellipse cx="120" cy="90" rx="26" ry="12" fill="#CBD5E1" />
      </g>

      <g
        className="cloud-move"
        opacity="0.25"
        transform="translate(220 30)"
      >
        <ellipse cx="60" cy="70" rx="42" ry="18" fill="#CBD5E1" />
        <ellipse cx="95" cy="70" rx="28" ry="14" fill="#CBD5E1" />
      </g>

      <rect
        x="110"
        y="120"
        width="200"
        height="210"
        rx="20"
        fill="#1E293B"
      />

      <rect
        x="90"
        y="100"
        width="240"
        height="36"
        rx="18"
        fill="#0F172A"
      />

      <text
        x="210"
        y="150"
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="#D4AF37"
      >
        HOTEL
      </text>

      <g className="hotel-light">
        <rect x="145" y="175" width="32" height="32" rx="6" fill="#FACC15" />
        <rect x="195" y="175" width="32" height="32" rx="6" fill="#FACC15" />
        <rect x="245" y="175" width="32" height="32" rx="6" fill="#FACC15" />

        <rect x="145" y="225" width="32" height="32" rx="6" fill="#FACC15" />
        <rect x="195" y="225" width="32" height="32" rx="6" fill="#FACC15" />
        <rect x="245" y="225" width="32" height="32" rx="6" fill="#FACC15" />
      </g>

      <rect
        x="185"
        y="270"
        width="50"
        height="60"
        rx="10"
        fill="#334155"
      />
      <circle cx="225" cy="300" r="4" fill="#D4AF37" />

      <ellipse
        cx="210"
        cy="350"
        rx="90"
        ry="14"
        fill="#000"
        opacity="0.15"
      />
    </svg>
  );
}
