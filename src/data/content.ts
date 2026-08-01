// ─────────────────────────────────────────────────────────────
//  ВЕСЬ РЕДАКТИРУЕМЫЙ КОНТЕНТ ПОРТФОЛИО В ОДНОМ МЕСТЕ
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Artemiy Fomkin",
  initials: "AF",
  eyebrow: "PORTFOLIO — '26",
  roles: ["Founder", "Strategist", "Builder", "Student"],
  roleLinePrefix: "A",
  roleLineSuffix: "focused on real-world problems.",
  tagline:
    "High-school student and aspiring entrepreneur working at the intersection of international business, strategy, and product. I build things to understand how they really work.",
  email: "artemiy.fomkin@bk.ru",
};

export const about = {
  eyebrow: "About",
  heading: "Learning business by *building* it.",
  paragraphs: [
    "I'm passionate about international business, strategy, and building products that solve real problems. My work combines business research, product thinking, and technology.",
    "I explore how companies expand into new markets, make strategic decisions, and create sustainable competitive advantages. I believe the best way to learn business is by building, testing ideas, and shipping.",
    "Long-term, my goal is to build companies that create lasting impact on a global scale.",
  ],
  interests: [
    "International Business",
    "Entrepreneurship",
    "Business Strategy",
    "Market Expansion",
    "Product Development",
    "Decision-Making Systems",
  ],
};

export type Shot = { src: string; caption: string };
export type ShotGroup = { title: string; shots: Shot[] };
export type FeatureItem = { title: string; body: string };
export type LinkItem = { label: string; href: string; kind?: "primary" | "ghost" };
export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string; // short, for the card
  year: string;
  span: string;
  href?: string; // live site (card + detail)
  tags: string[];
  mockup: "apex" | "nfq" | "entrylens" | "placeholder";
  cardImage?: string; // real screenshot for the grid card (falls back to mockup)
  badge?: string; // optional highlight badge (e.g. "Award-winning")

  // ── detail page ──
  detail: {
    tagline: string;
    role: string;
    status: string;
    overview: string[];
    features: FeatureItem[];
    metrics?: Metric[];
    heroImage?: string; // real screenshot shown big at top instead of mockup
    shots?: Shot[]; // real screenshots (from /public/shots/…)
    shotGroups?: ShotGroup[]; // grouped materials (screens, slides, documents)
    embeds?: LinkItem[]; // live sites / materials to open
    embedLive?: string; // url to show inside an iframe on the detail page
  };
};

export const projects: Project[] = [
  {
    slug: "nfq",
    title: "NFQ",
    category: "Startup / Compliance",
    description:
      "Russia's first '3-in-1' business compliance audit — fire safety, sanitary norms and labor safety in a single visit. Structured checklists, an automated NFQ Score, and a step-by-step remediation plan.",
    year: "2026",
    span: "md:col-span-7",
    tags: ["Audit methodology", "Risk scoring", "SaaS roadmap"],
    mockup: "nfq",
    cardImage: "/shots/nfq_landing_hero.jpg",
    badge: "Award-winning",
    detail: {
      tagline: "Three inspections. One visit. Full protection.",
      role: "Founder · Methodology & Product",
      status: "Live product · 2026",
      overview: [
        "NFQ (New Found of Quality) is a compliance audit service for small and mid-sized businesses in Russia. It replaces three separate audits — fire safety (EMERCOM), sanitary norms (Rospotrebnadzor) and labor safety (Rostrud) — with a single on-site diagnostic done in about 1–1.5 weeks.",
        "The client gets one report: every violation found, mapped to the exact article of the law, prioritized by severity (P1/P2/P3), with the potential fine attached and a step-by-step plan to fix it. Think of it like a service inspection for a car — we find the problems before they become expensive.",
        "Under the hood is a documented methodology: 3 checklists of 52 points each, an NFQ Score (0–100) computed from a weighted risk formula, and a fine-exposure estimate based on the actual Russian administrative code. The whole thing is designed to scale from a manual audit into a SaaS platform.",
        "NFQ has been recognized at three competitions — including 1st place at the city \"Step into Business\" conference and a winner's diploma at \"Science for Life\" (Financial University), plus a prize at the All-Russian \"Creativity of the Young\" conference (MIET).",
      ],
      features: [
        { title: "3-in-1 in one visit", body: "Fire safety, sanitary norms and labor safety checked together — 80+ control points." },
        { title: "NFQ Score", body: "A single 0–100 risk index, weighted by direction (fire 0.40 · sanitary 0.35 · labor 0.25)." },
        { title: "Fine exposure", body: "Every violation linked to a Code-of-Administrative-Offences (КоАП) article with the maximum fine — real numbers, not vague risk." },
        { title: "Remediation plan", body: "Prioritized P1→P2→P3 roadmap with owners and deadlines, plus optional re-audit." },
        { title: "Expert OS platform", body: "A web platform for express self-diagnostics, tariff selection and an AI consultant." },
        { title: "Digital roadmap", body: "Designed to grow from manual audits to a full SaaS with dashboards and predictive analytics." },
      ],
      metrics: [
        { value: "3", label: "Awards won" },
        { value: "240%", label: "Project ROI (yr 1)" },
        { value: "40%", label: "Time & cost saved" },
        { value: "80K+", label: "Inspections in Moscow '23" },
      ],
      shotGroups: [
        {
          title: "Awards — recognition for NFQ",
          shots: [
            { src: "/shots/nfq_cert_diploma.jpg", caption: "Winner's Diploma — open city research-and-practice conference \"Science for Life\", track \"Step into Business\", section \"Entrepreneurship in Services\". Moscow Department of Education and Science · Moscow, 2026" },
            { src: "/shots/nfq_cert_gramota.jpg", caption: "Winner of the city research-and-practice conference \"Step into Business\" / \"Science for Life\". School No. 2045 · Moscow, 2025–2026" },
            { src: "/shots/nfq_cert_miet.jpg", caption: "Prize-winner's Diploma — 30th All-Russian student research-and-practice conference \"Creativity of the Young\", section \"Mathematics & Economics\". MIET National Research University · Moscow · Zelenograd, 2026" },
          ],
        },
        {
          title: "Landing site",
          shots: [
            { src: "/shots/nfq_landing_hero.jpg", caption: "Hero — \"Three inspections. One visit. Full protection.\" with a live Risk Dashboard (score 74)" },
            { src: "/shots/nfq_landing_risks.jpg", caption: "What's at stake — real administrative-code fines by regulator (fire / sanitary / labor)" },
            { src: "/shots/nfq_landing_riskscore.jpg", caption: "Express self-check — an interactive quiz that estimates your business Risk Score" },
            { src: "/shots/nfq_landing_how.jpg", caption: "How it works — the NFQ audit process step by step" },
            { src: "/shots/nfq_landing_pricing.jpg", caption: "Tariffs — Basic ₽35K · 3-in-1 ₽80K · Premium ₽110K" },
            { src: "/shots/nfq_landing_audience.jpg", caption: "Who needs NFQ — target segments (food service, entertainment, offices)" },
            { src: "/shots/nfq_landing_plan.jpg", caption: "Implementation plan — rollout roadmap for the service" },
          ],
        },
        {
          title: "Compliance report",
          shots: [
            { src: "/shots/nfq_report_top.jpg", caption: "Report cover — NFQ Score 58/100, fine exposure up to ₽640K" },
            { src: "/shots/nfq_report_violations.jpg", caption: "Violation register — each finding mapped to a law article and severity (P1/P2/P3)" },
          ],
        },
        {
          title: "Pitch deck",
          shots: [
            { src: "/shots/nfq_slide_market_growth.jpg", caption: "Relevance — inspections grew ~8× and violations ~15× (2021–2023)" },
            { src: "/shots/nfq_slide_process.jpg", caption: "Service process — from request to result" },
            { src: "/shots/nfq_slide_market_size.jpg", caption: "Market size — PAM / TAM / SAM breakdown" },
            { src: "/shots/nfq_slide_competitors.jpg", caption: "Competitors — no direct 3-in-1 player on the market" },
            { src: "/shots/nfq_slide_finance.jpg", caption: "Financial model — unit economics and payback" },
            { src: "/shots/nfq_slide_roadmap.jpg", caption: "Roadmap — development stages of the project" },
            { src: "/shots/nfq_slide_expertos.jpg", caption: "NFQ Expert OS — internal audit-management platform" },
          ],
        },
        {
          title: "Methodology — NFQ Standard v2.0",
          shots: [
            { src: "/shots/nfq_std_methodology.jpg", caption: "Inspection methodology — what's checked, how, and the legal consequence" },
            { src: "/shots/nfq_std_checklist.jpg", caption: "Checklist — one of three 52-point checklists (fire safety shown)" },
            { src: "/shots/nfq_std_score.jpg", caption: "NFQ Score — scoring formula, risk scale and P1/P2/P3 classification" },
          ],
        },
      ],
      embeds: [
        { label: "Open landing site", href: "/sites/nfq-landing.html", kind: "primary" },
        { label: "Open Expert OS platform", href: "/sites/nfq-expert-os.html" },
        { label: "Open compliance report", href: "/sites/nfq-report.html" },
        { label: "Pitch deck (PDF)", href: "/docs/nfq-pitch-deck.pdf" },
        { label: "Methodology standard (PDF)", href: "/docs/nfq-standard-v2.pdf" },
        { label: "Business plan (PDF)", href: "/docs/nfq-business-plan.pdf" },
      ],
      embedLive: "/sites/nfq-landing.html",
    },
  },
  {
    slug: "apex",
    title: "APEX",
    category: "Product / Web",
    description:
      "A sim-racing telemetry platform: upload a lap, and APEX shows exactly where you lose time, explains why, and gives a concrete plan. Delta timing, track heatmaps, an AI engineer and a desktop client.",
    year: "2025",
    span: "md:col-span-5",
    href: "https://www.apex-racing.online/",
    tags: ["Product", "Telemetry", "Front-end", "UX"],
    mockup: "apex",
    cardImage: "/shots/apex_telemetry.jpg",
    detail: {
      tagline: "Stop guessing. Start improving.",
      role: "Design & Build · Front-end",
      status: "Live · Beta · 2025",
      overview: [
        "APEX is a sim-racing platform that turns raw telemetry into a concrete plan to get faster. You upload a lap, and APEX finds exactly where you lose time, explains why, and tells you what to do about it. It works with iRacing, Assetto Corsa Competizione and rFactor 2.",
        "It's not a video course or a forum. It's a data-driven system: your own laps drive every recommendation. Delta timing shows where you gain or lose against a reference lap by distance, a track heatmap visualizes it, and an AI engineer answers questions about your specific corners.",
        "A desktop client watches your telemetry folder and uploads every new lap automatically — no clicks, right while you're driving.",
      ],
      features: [
        { title: "Delta timing", body: "See where you lose time on every meter of track — red is loss, green is gain, by distance not time." },
        { title: "Track heatmap", body: "A smooth gradient right on the track map showing exactly where the seconds go." },
        { title: "Academy", body: "11 modules, 29+ lessons. Each lesson ties an error to a visualization, drill and check — linked to your telemetry." },
        { title: "AI engineer", body: "Ask about your own lap and get answers based on real data — not generic advice, but specifics on your corners." },
        { title: "Progress system", body: "XP, levels and streaks. It spots patterns — if you always brake late in one corner, it finds it." },
        { title: "Desktop client", body: "Install once; telemetry uploads automatically after every session. iRacing, ACC, rFactor 2." },
      ],
      metrics: [
        { value: "3", label: "Sims supported" },
        { value: "11", label: "Academy modules" },
        { value: "29+", label: "Lessons" },
        { value: "30s", label: "To first analysis" },
      ],
      heroImage: "/shots/apex_telemetry.jpg",
      shots: [
        { src: "/shots/apex_hero.jpg", caption: "Landing — \"Stop guessing. Start improving.\" with a live delta trace" },
        { src: "/shots/apex_telemetry.jpg", caption: "Telemetry — Monza / Porsche 992 GT3 R, track map + speed/throttle/brake channels and technique analysis" },
        { src: "/shots/apex_dashboard.jpg", caption: "Dashboard — best lap, sessions, latest score, recurring-pattern detection and daily focus" },
        { src: "/shots/apex_cars.jpg", caption: "Car database — 4 GT3 cars with performance profiles, strengths and weaknesses" },
        { src: "/shots/apex_tracks.jpg", caption: "Track database — 7 tracks with reference laps, sector breakdown and characteristics" },
      ],
      embeds: [
        { label: "Open live site", href: "https://www.apex-racing.online/", kind: "primary" },
        { label: "Open dashboard", href: "https://www.apex-racing.online/dashboard" },
        { label: "Academy", href: "https://www.apex-racing.online/academy" },
      ],
      embedLive: "https://www.apex-racing.online/",
    },
  },
  {
    slug: "entrylens",
    title: "EntryLens",
    category: "Product / SaaS",
    description:
      "A decision-support platform that helps businesses evaluate international expansion opportunities using structured market analysis and transparent scoring models.",
    year: "2026",
    span: "md:col-span-7",
    tags: ["Market analysis", "Scoring model", "Strategy"],
    mockup: "entrylens",
    detail: {
      tagline: "Decision support for international expansion.",
      role: "Founder · Product & Research",
      status: "In development · 2026",
      overview: [
        "EntryLens helps companies decide where to expand next. Instead of gut feeling and scattered reports, it turns market entry into a structured, transparent decision.",
        "Each candidate market is scored across multiple signals — demand, competition, regulation, cost of entry and more — using a transparent model where every input is visible and adjustable. The output is a ranked shortlist a founder or strategy team can actually defend.",
        "The goal is to make expensive, high-stakes expansion calls feel less like guesswork and more like a repeatable process.",
      ],
      features: [
        { title: "Transparent scoring", body: "Every market gets a score built from visible, weighted signals — no black box." },
        { title: "Market comparison", body: "Rank and compare candidate markets side by side on the metrics that matter." },
        { title: "Structured research", body: "Turns messy market research into a consistent, repeatable framework." },
        { title: "Defensible output", body: "A ranked shortlist with the reasoning attached — ready for a strategy deck." },
      ],
      metrics: [
        { value: "6", label: "Scoring signals" },
        { value: "1", label: "Ranked shortlist" },
        { value: "0", label: "Black boxes" },
      ],
    },
  },
  {
    slug: "next",
    title: "More soon",
    category: "In progress",
    description:
      "Another project is on the way. This slot is a placeholder — swap it in src/data/content.ts when it's ready.",
    year: "—",
    span: "md:col-span-5",
    tags: ["Coming up"],
    mockup: "placeholder",
    detail: {
      tagline: "Something new is in the works.",
      role: "TBA",
      status: "In progress",
      overview: [
        "This project isn't public yet. When it's ready, its details, screenshots and links will live here.",
      ],
      features: [],
    },
  },

];

export const stats: Metric[] = [
  { value: "3", label: "Live projects" },
  { value: "3", label: "Industries explored" },
  { value: "∞", label: "Ideas to test" },
];

export const socials: LinkItem[] = [
  { label: "X", href: "https://x.com/FomkinArtemiy" },
  { label: "Instagram", href: "https://www.instagram.com/artemiy_fomkin" },
  { label: "Telegram", href: "https://t.me/zrrtemx" },
];
