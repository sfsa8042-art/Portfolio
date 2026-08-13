// Realistic product previews as SVG (styled like screenshots in a browser window).
// Built from the projects real data.

function BrowserChrome({ url }: { url: string }) {
  return (
    <g>
      <rect x="0" y="0" width="600" height="26" rx="0" fill="#111113" />
      <circle cx="16" cy="13" r="3.5" fill="#3a3a3d" />
      <circle cx="30" cy="13" r="3.5" fill="#3a3a3d" />
      <circle cx="44" cy="13" r="3.5" fill="#3a3a3d" />
      <rect x="66" y="6" width="480" height="14" rx="7" fill="#1c1c1f" />
      <text x="80" y="16" fontFamily="monospace" fontSize="9" fill="#6a6a6f">
        {url}
      </text>
    </g>
  );
}

// ── APEX — telemetry dashboard (Monza / Porsche 992 GT3 R) ──
export function ApexMockup() {
  // fake delta trace across track distance
  const pts: string[] = [];
  const w = 560;
  const h = 70;
  const seed = [0, 8, 20, 12, -18, -30, -22, -5, 6, 14, 4, -10, -24, -14, 2, 10, 0];
  seed.forEach((v, i) => {
    const x = 20 + (i / (seed.length - 1)) * w;
    const y = 150 - v;
    pts.push(`${x},${y}`);
  });
  return (
    <svg viewBox="0 0 600 340" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="340" fill="#08090b" />
      <BrowserChrome url="apex-racing.online/dashboard" />

      {/* header */}
      <text x="20" y="58" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="15" fill="#f2f2f2">
        Telemetry
      </text>
      <text x="20" y="76" fontFamily="monospace" fontSize="10" fill="#6a6a6f">
        Monza · Porsche 992 GT3 R
      </text>

      {/* delta gap card */}
      <g>
        <text x="360" y="52" fontFamily="monospace" fontSize="9" fill="#6a6a6f">YOUR LAP</text>
        <text x="360" y="70" fontFamily="monospace" fontSize="14" fill="#f2f2f2">1:44.832</text>
        <text x="470" y="52" fontFamily="monospace" fontSize="9" fill="#6a6a6f">GAP</text>
        <text x="470" y="70" fontFamily="monospace" fontSize="14" fill="#89aacc">−1.241s</text>
      </g>

      {/* delta chart */}
      <line x1="20" y1="150" x2="580" y2="150" stroke="#26262a" strokeWidth="1" strokeDasharray="3 3" />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="url(#apexgrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="apexgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4e85bf" />
          <stop offset="100%" stopColor="#89aacc" />
        </linearGradient>
      </defs>

      {/* insight rows */}
      <g fontFamily="Inter, sans-serif" fontSize="10">
        <rect x="20" y="205" width="560" height="34" rx="6" fill="#141416" />
        <circle cx="36" cy="222" r="3" fill="#c85a5a" />
        <text x="50" y="219" fill="#d8d8d8">Late braking — Variante del Rettifilo</text>
        <text x="50" y="232" fill="#6a6a6f" fontSize="9">Loss −0.312s</text>
        <text x="540" y="226" fill="#c85a5a" textAnchor="end" fontFamily="monospace">−0.312</text>

        <rect x="20" y="245" width="560" height="34" rx="6" fill="#141416" />
        <circle cx="36" cy="262" r="3" fill="#c85a5a" />
        <text x="50" y="259" fill="#d8d8d8">Late throttle — exit Lesmo 2</text>
        <text x="50" y="272" fill="#6a6a6f" fontSize="9">Loss −0.208s</text>
        <text x="540" y="266" fill="#c85a5a" textAnchor="end" fontFamily="monospace">−0.208</text>

        <rect x="20" y="285" width="560" height="34" rx="6" fill="#141416" />
        <circle cx="36" cy="302" r="3" fill="#5aa06a" />
        <text x="50" y="299" fill="#d8d8d8">Consistent braking — Curva Grande</text>
        <text x="50" y="312" fill="#6a6a6f" fontSize="9">Spread &lt; 2m</text>
        <text x="540" y="306" fill="#5aa06a" textAnchor="end" fontFamily="monospace">good</text>
      </g>
    </svg>
  );
}

// ── NFQ — compliance report (NFQ Score) ──
export function NfqMockup() {
  const score = 58;
  const R = 34;
  const C = 2 * Math.PI * R;
  const filled = (score / 100) * C;
  return (
    <svg viewBox="0 0 600 340" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="340" fill="#0a0a0b" />
      <BrowserChrome url="nfq · compliance report — client copy" />

      <text x="20" y="56" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#f2f2f2">NFQ</text>
      <text x="60" y="56" fontFamily="Inter, sans-serif" fontSize="11" fill="#6a6a6f">Complex audit report</text>
      <text x="20" y="74" fontFamily="monospace" fontSize="9" fill="#565659">Gorodskaya Kukhnya cafe · Moscow</text>

      {/* score ring */}
      <g transform="translate(90,175)">
        <circle r={R} fill="none" stroke="#1e1e21" strokeWidth="8" />
        <circle
          r={R}
          fill="none"
          stroke="url(#nfqgrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${C}`}
          transform="rotate(-90)"
        />
        <text x="0" y="4" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="22" fill="#f2f2f2">{score}</text>
        <text x="0" y="20" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6a6a6f">/ 100</text>
      </g>
      <text x="90" y="235" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#89aacc">NFQ RISK SCORE</text>
      <defs>
        <linearGradient id="nfqgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#89aacc" />
          <stop offset="100%" stopColor="#4e85bf" />
        </linearGradient>
      </defs>

      {/* three direction bars */}
      <g fontFamily="Inter, sans-serif" fontSize="10">
        <text x="180" y="105" fill="#6a6a6f" fontSize="9">FIRE SAFETY</text>
        <rect x="180" y="112" width="380" height="8" rx="4" fill="#1a1a1c" />
        <rect x="180" y="112" width="152" height="8" rx="4" fill="#c85a5a" />
        <text x="568" y="119" textAnchor="end" fill="#d8d8d8" fontFamily="monospace" fontSize="9">16/40</text>

        <text x="180" y="150" fill="#6a6a6f" fontSize="9">SANITARY</text>
        <rect x="180" y="157" width="380" height="8" rx="4" fill="#1a1a1c" />
        <rect x="180" y="157" width="239" height="8" rx="4" fill="#c9a05a" />
        <text x="568" y="164" textAnchor="end" fill="#d8d8d8" fontFamily="monospace" fontSize="9">22/35</text>

        <text x="180" y="195" fill="#6a6a6f" fontSize="9">LABOR SAFETY</text>
        <rect x="180" y="202" width="380" height="8" rx="4" fill="#1a1a1c" />
        <rect x="180" y="202" width="304" height="8" rx="4" fill="#5aa06a" />
        <text x="568" y="209" textAnchor="end" fill="#d8d8d8" fontFamily="monospace" fontSize="9">20/25</text>
      </g>

      {/* exposure footer */}
      <rect x="20" y="258" width="560" height="60" rx="8" fill="#141416" />
      <text x="36" y="282" fontFamily="Inter, sans-serif" fontSize="10" fill="#6a6a6f">Fine exposure</text>
      <text x="36" y="304" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="18" fill="#f2f2f2">up to ₽640,000</text>
      <text x="564" y="282" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" fill="#6a6a6f">After remediation</text>
      <text x="564" y="304" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="18" fill="#5aa06a">86 / 100</text>
    </svg>
  );
}

// ── Placeholder ──
export function PlaceholderMockup() {
  return (
    <svg viewBox="0 0 600 340" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="340" fill="#0a0a0b" />
      <BrowserChrome url="coming soon" />
      <g transform="translate(300,180)" textAnchor="middle">
        <text fontFamily="Fraunces, serif" fontStyle="italic" fontSize="34" fill="#26262a">next</text>
        <text y="34" fontFamily="monospace" fontSize="10" fill="#3a3a3d">// in progress</text>
      </g>
    </svg>
  );
}

export const mockups = {
  apex: ApexMockup,
  nfq: NfqMockup,
  placeholder: PlaceholderMockup,
} as const;
