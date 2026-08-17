// ─────────────────────────────────────────────────────────────
//  ВЕСЬ РЕДАКТИРУЕМЫЙ КОНТЕНТ ПОРТФОЛИО В ОДНОМ МЕСТЕ
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Artemiy Fomkin",
  initials: "AF",
  eyebrow: "PORTFOLIO — '26",
  roles: ["Founder", "Builder", "Student"],
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
    "Long-term, I want to build companies that solve real problems and can grow beyond a single market.",
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
export type Review = {
  org: string;
  meta: string; // signer / role · date
  quote: string; // translated pull-quote (originals are Russian)
  src: string; // full scan for the lightbox
  url?: string;
};
export type Certificate = { src: string; title: string; caption: string };
// A two-sided card (e.g. a scuba certification) that flips to reveal its back.
export type DivingCard = {
  title: string;
  front: string;
  back: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string; // short, for the card
  year: string;
  span: string;
  href?: string; // live site (card + detail)
  tags: string[];
  mockup: "apex" | "nfq" | "placeholder";
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
    reviews?: Review[]; // third-party reviews / endorsements
    embeds?: LinkItem[]; // live sites / materials to open
    // downloadable documents split by language so originals vs translations are clear
    documents?: { original: LinkItem[]; translated: LinkItem[] };
    embedLive?: string; // url to show inside an iframe on the detail page
  };
};

export const projects: Project[] = [
  {
    slug: "nfq",
    title: "NFQ",
    category: "Startup / Compliance",
    description:
      "A '3-in-1' compliance audit for Russia — fire safety, sanitary norms and labour safety checked in a single visit, where the market otherwise offers single-area specialists. One report: an automated NFQ Score, the fine exposure in rubles and a prioritized fix plan.",
    year: "2026",
    span: "md:col-span-7",
    tags: ["Audit methodology", "Risk scoring", "SaaS roadmap"],
    mockup: "nfq",
    cardImage: "/shots/nfq_landing_hero.jpg",
    badge: "Award-winning",
    detail: {
      tagline: "Three inspections. One visit. Full protection.",
      role: "Founder · Methodology & Product",
      status: "Award-winning concept · 2026",
      overview: [
        "In Russia a small business lives under three separate mandatory inspection regimes — fire safety (EMERCOM), sanitary norms (Rospotrebnadzor) and labour safety (Rostrud) — each with its own inspectors, its own fines and, in the worst case, a 90-day suspension of operations. NFQ (New Found of Quality) replaces all three with a single on-site audit and one clear report.",
        "In our market research we didn't find a company offering all three checks in a single service. The alternatives each cover just one piece: a private fire inspector checks fire safety alone, a lab measures sanitary compliance, an outsourced HSE service handles labour safety, and large consultancies sell broad strategy starting at ₽400,000 with turnaround in months. NFQ brings all three together — the breadth of a consultancy, the depth of a niche specialist and a price small and mid-sized businesses can actually afford (₽80,000 vs. roughly ₽90,000 for three separate specialists).",
        "The client gets one deliverable: every violation mapped to the exact article of the administrative code (КоАП), prioritized P1/P2/P3, with the maximum fine attached and a step-by-step plan — down to vetted contractors — to fix it. Under the hood is a documented methodology: three 52-point checklists (156 control points in total), an NFQ Score from 0 to 100 computed by a weighted risk formula (fire 0.40 · sanitary 0.35 · labour 0.25), and a fine-exposure estimate built on the real code. Full cycle to the report is about 7–10 days, with no shutdown of the business.",
        "NFQ is built to prevent problems before an inspection happens rather than clean up afterwards — and to stay on as a single point of responsibility until the site is fully compliant. It is designed to scale from a manual audit into a SaaS platform, with an internal operations platform (\"Expert OS\") to run the day-to-day. The project took 1st place at the \"Step into Business\" / \"Science for Life\" city conference and a prize at the All-Russian \"Creativity of the Young\" conference (MIET).",
      ],
      features: [
        { title: "Three inspections, one audit", body: "Fire safety, sanitary norms and labour safety checked together in a single visit — 156 control points (52 per direction), each tied to a specific Russian legal norm." },
        { title: "One service, not three vendors", body: "Most options cover a single area — fire, sanitary or labour — while big consultancies start at ₽400,000 and take months. In our research we found no direct 3-in-1 alternative: NFQ combines consultancy breadth, specialist depth and an SMB price." },
        { title: "NFQ Score (0–100)", body: "A single risk index computed from a weighted formula (fire 0.40 · sanitary 0.35 · labour 0.25), with a per-direction breakdown." },
        { title: "Fine exposure in rubles", body: "Every violation linked to a Code-of-Administrative-Offences (КоАП) article with its maximum fine — real numbers, not vague risk." },
        { title: "Prioritized fix plan", body: "A P1→P2→P3 remediation roadmap with owners, deadlines and vetted contractors, plus an optional re-audit — NFQ stays the single point of responsibility to the finish." },
        { title: "Expert OS platform", body: "Internal ops platform — Moscow map with optimized day routes, the checklist engine, an auto-generated 3-page compliance report and a 7-day team-load forecast — built to grow into full SaaS." },
      ],
      metrics: [
        { value: "3-in-1", label: "Inspections in one visit" },
        { value: "2", label: "Independent industry reviews" },
        { value: "156", label: "Control points · 52 per area" },
        { value: "3", label: "Awards & diplomas" },
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
          title: "Methodology · NFQ Standard v2.0 — original (RU)",
          shots: [
            { src: "/shots/nfq_std_methodology.jpg", caption: "Inspection methodology — what's checked, how, and the legal consequence" },
            { src: "/shots/nfq_std_checklist.jpg", caption: "Checklist — one of three 52-point checklists (fire safety shown)" },
            { src: "/shots/nfq_std_score.jpg", caption: "NFQ Score — scoring formula, risk scale and P1/P2/P3 classification" },
          ],
        },
        {
          title: "Methodology · NFQ Standard v2.0 — English translation",
          shots: [
            { src: "/shots/nfq_std_en_cover.jpg", caption: "Cover — NFQ Standard of the integrated audit methodology (English translation)" },
            { src: "/shots/nfq_std_en_checklist.jpg", caption: "Checklist — a 52-point checklist with method, Russian legal norm and criticality" },
            { src: "/shots/nfq_std_en_score.jpg", caption: "NFQ Score system — the scoring formula, risk-level scale and P1/P2/P3 classification" },
            { src: "/shots/nfq_std_en_casestudy.jpg", caption: "Worked example — critical (P1) violations mapped to fines, with a remediation plan" },
          ],
        },
        {
          title: "Business plan — English translation",
          shots: [
            { src: "/shots/nfq_bp_en_cover.jpg", caption: "Cover — the full NFQ business plan, translated to English. School No. 2045 · Moscow, 2026" },
            { src: "/shots/nfq_bp_en_growth.jpg", caption: "Relevance — inspections grew ~8× and violations ~15× (2021–2023). Figure 1" },
            { src: "/shots/nfq_bp_en_platform.jpg", caption: "Violations by industry (Figure 2) and the NFQ landing page" },
            { src: "/shots/nfq_bp_en_canvas.jpg", caption: "Business Model Canvas — partners, activities, value propositions, segments and channels" },
            { src: "/shots/nfq_bp_en_finance.jpg", caption: "Financial model — year-1 sales plan (131 audits) with SMART goals and payback by month 6" },
            { src: "/shots/nfq_bp_en_roadmap.jpg", caption: "Roadmap and Gantt chart — five stages across the first year, from methodology to scaling" },
          ],
        },
      ],
      reviews: [
        {
          org: "Avangard Safety Group",
          meta: "M. I. Podolkhov, Director General · 10 Apr 2026",
          url: "https://www.avangard-sp.ru",
          quote:
            "NFQ answers current market conditions and reflects the objective, growing need for systemic regulatory-risk management. Consolidating several inspection areas into one service is well-founded — a promising, scalable solution on the emerging integrated-audit market. We are considering taking part in a pilot.",
          src: "/shots/nfq_review_avangard.jpg",
        },
        {
          org: "\"Rapsodia\" Restaurant · Gorod LLC",
          meta: "L. V. Voroshnin, Director General · 7 Jun 2026",
          url: "https://rapsodia.ru",
          quote:
            "For food service — a sector under heavy regulatory load and frequent inspections — combining fire-safety, sanitary and labour audits into a single service is well-grounded and practically valuable. A promising solution for the restaurant segment that can cut fines, downtime and preparation costs.",
          src: "/shots/nfq_review_rapsodia.jpg",
        },
      ],
      embeds: [
        { label: "Open landing site", href: "/sites/nfq-landing.html", kind: "primary" },
        { label: "Open Expert OS platform", href: "/sites/nfq-expert-os.html" },
        { label: "Open compliance report", href: "/sites/nfq-report.html" },
      ],
      documents: {
        original: [
          { label: "Pitch deck", href: "/docs/nfq-pitch-deck.pdf" },
          { label: "Methodology · NFQ Standard v2.0", href: "/docs/nfq-standard-v2.pdf" },
          { label: "Business plan", href: "/docs/nfq-business-plan.pdf" },
        ],
        translated: [
          { label: "Business plan", href: "/docs/nfq-business-plan-en.pdf" },
          { label: "Methodology · NFQ Standard v2.0", href: "/docs/nfq-standard-v2-en.pdf" },
        ],
      },
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
];

export const stats: Metric[] = [
  { value: "2", label: "Projects" },
  { value: "2", label: "Industries explored" },
  { value: "∞", label: "Ideas to test" },
];

export const socials: LinkItem[] = [
  { label: "X", href: "https://x.com/FomkinArtemiy" },
  { label: "Instagram", href: "https://www.instagram.com/artemiy_fomkin" },
  { label: "Telegram", href: "https://t.me/zrrtemx" },
];

// Standalone certificates block. Original documents are Russian; captions are
// quality English translations of the key content (issuer, program, hours, date).
export const certificates: Certificate[] = [
  {
    src: "/shots/nfq_cert_diploma.jpg",
    title: "Winner's Diploma — \"Step into Business\"",
    caption:
      "Open city research-and-practice conference \"Science for Life\", track \"Step into Business\", section \"Entrepreneurship in Services\" — awarded for the NFQ project. Moscow Department of Education and Science · Moscow, 2026.",
  },
  {
    src: "/shots/nfq_cert_gramota.jpg",
    title: "Winner's Certificate — \"Step into Business\"",
    caption:
      "City research-and-practice conference \"Step into Business\" / \"Science for Life\", 1st place — awarded for the NFQ project. School No. 2045 · Moscow, 2025–2026.",
  },
  {
    src: "/shots/nfq_cert_miet.jpg",
    title: "Prize-winner's Diploma — \"Creativity of the Young\"",
    caption:
      "30th All-Russian student research-and-practice conference \"Creativity of the Young\", section \"Mathematics & Economics\" — awarded for the NFQ project. MIET National Research University · Moscow · Zelenograd, 2026.",
  },
  {
    src: "/certs/cert_college_bankagent.jpg",
    title: "Vocational Qualification — \"Bank Agent\"",
    caption:
      "State certificate of professional training in the occupation \"Bank Agent\" (code 20002). Polytechnic College No. 50 named after twice Hero of Socialist Labour N. A. Zlobin, Moscow · reg. no. 001219 · issued 17 April 2026.",
  },
  {
    src: "/certs/cert_college_bankagent_transcript.jpg",
    title: "Transcript — \"Bank Agent\" qualification",
    caption:
      "Supplement to the certificate. Modules: digital literacy & safe internet conduct; client servicing for payments and cash operations; advising individuals and businesses on banking products; and lending consultation — plus training and work placement, 48 academic hours in total, qualification exam graded \"excellent\". Qualified as Bank Agent by the certification board on 5 March 2026. Polytechnic College No. 50, Moscow.",
  },
];

// Less-important certificates & diplomas — collapsed behind a "Show more" toggle
// in the Certificates section. Add further minor items here.
export const moreCertificates: Certificate[] = [
  {
    src: "/certs/cert_efset_english.jpg",
    title: "English — C2 Proficient (EF SET)",
    caption:
      "EF SET English Certificate — overall C2 Proficient (71/100), the highest level on the CEFR scale. Reading C2, Listening C1. Awarded 13 Aug 2026 · verifiable at cert.efset.org/93Nwem.",
  },
  {
    src: "/certs/cert_miet_itschool.jpg",
    title: "Summer IT School — MIET",
    caption:
      "Course completion certificate, 94 academic hours. Computer Training Center (CCT) of the MIET National Research University · 2022 · reg. no. ЛШ-22/1-48.",
  },
  {
    src: "/certs/cert_vavt_summer.jpg",
    title: "Summer Language & Sports Program — VAVT",
    caption:
      "Supplementary program for school students, 90 academic hours. Russian Foreign Trade Academy (VAVT) under the Ministry of Economic Development of the Russian Federation · 3–14 June 2024.",
  },
  {
    src: "/certs/cert_premiere_videosmile.jpg",
    title: "Adobe Premiere Pro — VideoSmile",
    caption:
      "Completed the online course \"Super Premiere Pro\" (video editing) at the VideoSmile online school · certificate no. 009313 · 1 May 2024.",
  },
  {
    src: "/certs/cert_olympiad_literature.jpg",
    title: "Olympiad Winner — Literature",
    caption:
      "Winner of the school stage of the All-Russian School Olympiad in Literature, 2022–2023. School No. 883 · Moscow, 2023.",
  },
  {
    src: "/certs/cert_olympiad_obzh.jpg",
    title: "Olympiad Prize-winner — Life Safety",
    caption:
      "Prize-winner of the school stage of the All-Russian School Olympiad in Life Safety (OBZh), 2022–2023. School No. 883 · Moscow, 2023.",
  },
  {
    src: "/certs/cert_school_conf_winner.jpg",
    title: "Winner — school science conference",
    caption:
      "Winner of the school research-and-practice conference. School No. 2045 · Zelenograd, 2026.",
  },
  {
    src: "/certs/cert_photo_first.jpg",
    title: "1st place — photo contest",
    caption:
      "Diploma for winning the \"Through the Eyes of the First\" photo contest. \"Movement of the First\" national children's & youth movement · 2025.",
  },
  {
    src: "/certs/cert_creativity_young_school.jpg",
    title: "Award — \"Creativity of the Young\"",
    caption:
      "Awarded for research work (\"Creativity of the Young\") in the social sciences and entrepreneurship. School No. 2045 · Moscow, 2026.",
  },
  {
    src: "/certs/cert_academic.jpg",
    title: "Award — academic achievement",
    caption:
      "Awarded for strong academic results. School No. 2045 · Moscow, 2025–2026.",
  },
  {
    src: "/certs/cert_scienceforlife_participant.jpg",
    title: "Finalist — \"Science for Life\"",
    caption:
      "Certificate of participation in the final stage of the city research-and-practice conference \"Science for Life\", track \"Step into Business\", section \"Entrepreneurship in Services\". Moscow, 2026.",
  },
  {
    src: "/certs/cert_gratitude_family.jpg",
    title: "Letter of Gratitude",
    caption:
      "Issued to the student's family for his strong results at the \"Science for Life\" research-and-practice conference. School No. 2045 · Moscow, 2025–2026.",
  },
];

// Two-sided scuba certification cards — rendered as flip cards in the
// Certificates section. Click a card to flip to the reverse side.
export const divingCards: DivingCard[] = [
  {
    title: "Rescue Diver — NDL",
    front: "/certs/diving/rescue_front.jpg",
    back: "/certs/diving/rescue_back.jpg",
    caption:
      "National Dive League — Rescue Diver. Da-Diving center · certified 11 Sep 2024.",
  },
  {
    title: "Open Water Diver — SSI",
    front: "/certs/diving/ow_front.jpg",
    back: "/certs/diving/ow_back.jpg",
    caption:
      "SSI Junior Open Water Diver (Autonomous Diver · ISO 24801-2). Da-Dive center · certified 29 Jul 2021.",
  },
  {
    title: "Junior Universal Diver — NDL",
    front: "/certs/diving/jununi_front.jpg",
    back: "/certs/diving/jununi_back.jpg",
    caption:
      "National Dive League — Junior Universal Diver, max depth 21 m (dives under supervision of a certified adult). Da-Diving center · certified 7 Aug 2022.",
  },
];
