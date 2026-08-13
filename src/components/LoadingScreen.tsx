import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── living background: soft aurora blobs + drifting motes ── */
function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReduced();
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.5, y: 0.44, r: 0.44, hue: "137,170,204", a: 0.15, sx: 0.00013, sy: 0.00009, p: 0 },
      { x: 0.5, y: 0.44, r: 0.3, hue: "78,133,191", a: 0.13, sx: 0.00017, sy: 0.00011, p: 2 },
      { x: 0.5, y: 0.5, r: 0.22, hue: "180,200,230", a: 0.06, sx: 0.00021, sy: 0.00015, p: 4 },
    ];
    const N = 40;
    const motes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.5,
      sp: 0.004 + Math.random() * 0.013,
      dx: (Math.random() - 0.5) * 0.02,
      a: 0.1 + Math.random() * 0.45,
      tw: Math.random() * Math.PI * 2,
    }));

    const start = performance.now();
    let last = start;
    const paint = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sx + b.p) * 0.08) * w;
        const cy = (b.y + Math.cos(t * b.sy + b.p) * 0.06) * h;
        const rad = b.r * Math.min(w, h) * (1 + Math.sin(t * 0.0004 + b.p) * 0.08);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.hue},${b.a})`);
        g.addColorStop(1, `rgba(${b.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const m of motes) {
        if (!reduced) {
          m.y -= m.sp * (dt / 1000);
          m.x += m.dx * (dt / 1000);
          if (m.y < -0.02) {
            m.y = 1.02;
            m.x = Math.random();
          }
        }
        const tw = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(t * 0.002 + m.tw);
        const px = m.x * w;
        const py = m.y * h;
        const rr = m.r * 2.4;
        const g = ctx.createRadialGradient(px, py, 0, px, py, rr);
        g.addColorStop(0, `rgba(200,220,245,${m.a * tw})`);
        g.addColorStop(1, "rgba(200,220,245,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, rr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) paint(1200, 16);
    else {
      const draw = (now: number) => {
        const dt = now - last;
        last = now;
        paint(now - start, dt);
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ filter: "blur(40px)" }}
    />
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ── boot log ──
type Line = { m: string; mc: string; t: string; tc: string; speed: number };
const ACCENT = "text-[#89AACC]";
const LINES: Line[] = [
  { m: "$", mc: "text-muted", t: ' build --profile "Artemiy Fomkin"', tc: "text-text-primary", speed: 16 },
  { m: "✓", mc: ACCENT, t: " identity ............. compiled", tc: "text-muted", speed: 9 },
  { m: "✓", mc: ACCENT, t: " projects ............. NFQ · APEX", tc: "text-text-primary/90", speed: 9 },
  { m: "✓", mc: ACCENT, t: " recognition .......... 3 awards · 2 conferences", tc: "text-muted", speed: 9 },
  { m: "✓", mc: ACCENT, t: " assets ............... optimized", tc: "text-muted", speed: 9 },
  { m: "▸", mc: ACCENT, t: " launching experience", tc: "text-text-primary", speed: 13 },
];

function Typewriter({
  text,
  speed,
  onDone,
}: {
  text: string;
  speed: number;
  onDone: () => void;
}) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        clearInterval(id);
        doneRef.current();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <>{text.slice(0, n)}</>;
}

function Cursor() {
  return (
    <motion.span
      className="inline-block w-[0.5em] h-[1.05em] translate-y-[0.14em] bg-[#89AACC] ml-1 rounded-[1px]"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
    />
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduced = prefersReduced();
  const [current, setCurrent] = useState(0);
  const [booted, setBooted] = useState(false);

  // cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const aurX = useTransform(sx, (v) => v * 24);
  const aurY = useTransform(sy, (v) => v * 24);
  const ctX = useTransform(sx, (v) => v * -8);
  const ctY = useTransform(sy, (v) => v * -8);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  // reduced motion: skip straight to the resolved state
  useEffect(() => {
    if (reduced) setCurrent(LINES.length);
  }, [reduced]);

  // when the log finishes, resolve into the name, then hand off.
  // runs exactly once — the ref guard keeps a re-render (e.g. `booted` flipping)
  // from tearing down the onComplete timer.
  const resolvedRef = useRef(false);
  useEffect(() => {
    if (current < LINES.length || resolvedRef.current) return;
    resolvedRef.current = true;
    const idA = setTimeout(() => setBooted(true), reduced ? 0 : 240);
    const idB = setTimeout(onComplete, reduced ? 650 : 1000);
    return () => {
      clearTimeout(idA);
      clearTimeout(idB);
    };
  }, [current, onComplete, reduced]);

  const progress = Math.round((Math.min(current, LINES.length) / LINES.length) * 100);
  const year = new Date().getFullYear();

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg overflow-hidden flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="absolute inset-0" style={{ x: aurX, y: aurY }}>
        <Aurora />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-[-8%] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
        animate={reduced ? undefined : { x: [0, -10, 6, -4, 0], y: [0, 6, -8, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* corner marks */}
      <div className="absolute top-6 left-6 text-[10px] text-muted uppercase tracking-[0.3em] flex items-center gap-2">
        <span className="w-1 h-1 rounded-full accent-gradient" />
        Portfolio
      </div>
      <div className="absolute top-6 right-6 text-[10px] text-muted uppercase tracking-[0.3em] font-mono">
        © {year}
      </div>

      {/* center */}
      <motion.div
        className="relative z-10 w-[min(92vw,640px)] px-2"
        style={{ x: ctX, y: ctY }}
      >
        <motion.div
          className="flex flex-col items-center"
          exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease: "easeIn" } }}
        >
          {/* terminal window */}
          <motion.div
            className="w-full rounded-xl border border-white/10 bg-[#0c0d10]/85 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{
              opacity: booted ? 0 : 1,
              y: booted ? -10 : 0,
              scale: booted ? 0.985 : 1,
              filter: booted ? "blur(6px)" : "blur(0px)",
            }}
            transition={{ duration: booted ? 0.5 : 0.7, ease: EASE }}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
              <span className="ml-3 text-[11px] text-muted font-mono truncate">
                artemiy@portfolio — build
              </span>
            </div>
            {/* body */}
            <div className="px-5 py-4 font-mono text-[12.5px] md:text-[13.5px] leading-[1.9] min-h-[188px]">
              {LINES.map((ln, idx) => {
                if (idx > current) return null;
                const isDone = idx < current;
                return (
                  <div key={idx} className="flex whitespace-pre">
                    <span className={`${ln.mc} mr-2 shrink-0`}>{ln.m}</span>
                    <span className={ln.tc}>
                      {isDone ? (
                        ln.t
                      ) : (
                        <Typewriter
                          text={ln.t}
                          speed={ln.speed}
                          onDone={() => setCurrent((c) => c + 1)}
                        />
                      )}
                    </span>
                    {idx === current && <Cursor />}
                  </div>
                );
              })}
            </div>
            {/* footer */}
            <div className="flex items-center justify-between px-5 pb-3 pt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              <span>{progress >= 100 ? "resolved" : "booting"}</span>
              <span className="tabular-nums text-text-primary/80">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>

          {/* resolved identity — fades in as the terminal dissolves */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: booted ? 1 : 0 }}
            transition={{ duration: 0.7, delay: booted ? 0.15 : 0, ease: EASE }}
          >
            <motion.h1
              className="font-display italic text-5xl md:text-7xl text-text-primary text-center"
              initial={{ filter: "blur(10px)", y: 10 }}
              animate={{ filter: booted ? "blur(0px)" : "blur(10px)", y: booted ? 0 : 10 }}
              transition={{ duration: 0.8, delay: booted ? 0.15 : 0, ease: EASE }}
            >
              {profile.name}
            </motion.h1>
            <motion.div
              className="mt-5 h-px w-40 accent-gradient"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: booted ? 1 : 0 }}
              transition={{ duration: 0.7, delay: booted ? 0.35 : 0, ease: EASE }}
              style={{ boxShadow: "0 0 14px rgba(137,170,204,0.6)" }}
            />
            <motion.p
              className="mt-5 text-[11px] text-muted uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: booted ? 1 : 0 }}
              transition={{ duration: 0.6, delay: booted ? 0.45 : 0 }}
            >
              Founder · Builder · Student
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* leading accent edge — leads the curtain up */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(137,170,204,0.10)] to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] accent-gradient"
        style={{ boxShadow: "0 0 22px 3px rgba(137,170,204,0.55)" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: booted ? 0.9 : 0.4, scaleX: 1 }}
        transition={{ duration: 1.0, ease: EASE }}
      />
    </motion.div>
  );
}
