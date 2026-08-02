import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── living background: soft aurora blobs + drifting light motes ── */
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
      { x: 0.5, y: 0.42, r: 0.44, hue: "137,170,204", a: 0.17, sx: 0.00013, sy: 0.00009, p: 0 },
      { x: 0.5, y: 0.42, r: 0.3, hue: "78,133,191", a: 0.15, sx: 0.00017, sy: 0.00011, p: 2 },
      { x: 0.5, y: 0.5, r: 0.22, hue: "180,200,230", a: 0.07, sx: 0.00021, sy: 0.00015, p: 4 },
    ];

    const N = 46;
    const motes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.6,
      sp: 0.004 + Math.random() * 0.014,
      dx: (Math.random() - 0.5) * 0.02,
      a: 0.12 + Math.random() * 0.5,
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

    if (reduced) {
      paint(1200, 16);
    } else {
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
      style={{ filter: "blur(38px)" }}
    />
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// glyph-scramble "decode": characters lock left-to-right as progress climbs
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%*<>/=+";
function Decode({
  text,
  progress,
  reduced,
  className,
}: {
  text: string;
  progress: number;
  reduced: boolean;
  className?: string;
}) {
  if (reduced) return <span className={className}>{text}</span>;
  const reveal = Math.floor(progress * (text.length + 2));
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (i < reveal || !/[A-Za-z0-9]/.test(c)) out += c;
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return <span className={className}>{out}</span>;
}

// the name as a "detuning" chromatic signal that focuses in with progress
function SignalName({
  name,
  progress,
  reduced,
}: {
  name: string;
  progress: number;
  reduced: boolean;
}) {
  const p = progress;
  const ease = 1 - Math.pow(1 - p, 2); // settle a touch faster than linear
  const dx = reduced ? 0 : (1 - ease) * 9;
  const blur = reduced ? 0 : (1 - ease) * 9;
  // deterministic micro-jitter that decays as it locks
  const j = reduced ? 0 : Math.sin(p * 46) * 1.4 * (1 - ease);
  const jy = reduced ? 0 : Math.cos(p * 39) * 1.0 * (1 - ease);
  const cls =
    "font-display italic text-5xl md:text-7xl lg:text-8xl leading-[1.05]";
  return (
    <div className="relative" style={{ filter: `blur(${blur}px)` }}>
      {/* spacer defines the box */}
      <h1 className={`${cls} text-transparent select-none`} aria-label={name}>
        {name}
      </h1>
      {/* cyan ghost */}
      <span
        aria-hidden
        className={`${cls} absolute inset-0`}
        style={{
          color: "rgba(120,200,235,0.95)",
          mixBlendMode: "screen",
          transform: `translate3d(${-dx + j}px, ${jy}px, 0)`,
        }}
      >
        {name}
      </span>
      {/* violet ghost — the two converge to a cool near-white */}
      <span
        aria-hidden
        className={`${cls} absolute inset-0`}
        style={{
          color: "rgba(172,132,226,0.95)",
          mixBlendMode: "screen",
          transform: `translate3d(${dx - j}px, ${-jy}px, 0)`,
        }}
      >
        {name}
      </span>
    </div>
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const reduced = prefersReduced();
  const p = count / 100;
  const locked = count >= 100;

  // cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const aurX = useTransform(sx, (v) => v * 26);
  const aurY = useTransform(sy, (v) => v * 26);
  const ctX = useTransform(sx, (v) => v * -10);
  const ctY = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  useEffect(() => {
    const duration = reduced ? 900 : 2600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setCount(100);
        setTimeout(onComplete, reduced ? 250 : 560);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, reduced]);

  const year = new Date().getFullYear();
  const linesIn = 0.15;
  const nameStart = reduced ? 0.05 : 0.55;
  const cornersIn = reduced ? 0.1 : 1.35;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg overflow-hidden flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* living aurora + motes (parallax) */}
      <motion.div className="absolute inset-0" style={{ x: aurX, y: aurY }}>
        <Aurora />
      </motion.div>

      {/* film grain */}
      <motion.div
        className="pointer-events-none absolute inset-[-8%] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
        animate={reduced ? undefined : { x: [0, -10, 6, -4, 0], y: [0, 6, -8, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* CRT scanline drifting down — reinforces the "signal" idea */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24 mix-blend-screen"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(137,170,204,0.06), transparent)",
          }}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 38%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      {/* central vertical hairline */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: linesIn }}
        style={{ transformOrigin: "top" }}
      />
      {/* horizontal guides around the name */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-[3.6rem] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: nameStart - 0.15 }}
      />
      <motion.div
        className="absolute left-0 right-0 top-1/2 translate-y-[3.6rem] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: nameStart - 0.15 }}
      />

      {/* corners (decoding mono labels) */}
      <Corner className="top-6 left-6 items-start" delay={cornersIn} line="left">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full accent-gradient" />
          <Decode text="Portfolio" progress={p} reduced={reduced} />
        </span>
      </Corner>
      <Corner className="top-6 right-6 items-end text-right" delay={cornersIn + 0.08} line="right">
        <span className="font-mono">© {year}</span>
      </Corner>
      <Corner className="bottom-6 left-6 items-start" delay={cornersIn + 0.16} line="left">
        <Decode text="Founder · Strategist · Builder" progress={p} reduced={reduced} />
      </Corner>
      <Corner className="bottom-6 right-6 items-end text-right" delay={cornersIn + 0.24} line="right">
        <Decode text="Building globally" progress={p} reduced={reduced} className="font-mono" />
      </Corner>

      {/* center block — outer holds parallax, inner fades out as the curtain lifts */}
      <motion.div className="relative z-10 px-6" style={{ x: ctX, y: ctY }}>
        <motion.div
          className="flex flex-col items-center"
          exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease: "easeIn" } }}
        >
          <motion.p
            className="text-[11px] text-muted uppercase tracking-[0.4em] mb-6 font-mono"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: nameStart - 0.25 }}
          >
            <Decode text="Incoming signal" progress={p} reduced={reduced} />
          </motion.p>

          {/* name — detuned chromatic signal that focuses into place */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: nameStart - 0.1, ease: EASE }}
          >
            <SignalName name={profile.name} progress={p} reduced={reduced} />
            {/* lock flash at 100% */}
            {locked && !reduced && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.35), transparent 70%)",
                }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </motion.div>

          {/* soft glow beneath the name */}
          <motion.div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-32 accent-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 1.4, delay: nameStart + 0.3 }}
            style={{ filter: "blur(60px)", zIndex: -1 }}
          />

          {/* progress line + counter */}
          <motion.div
            className="mt-10 flex flex-col items-center w-[260px] md:w-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: nameStart + 0.35 }}
          >
            <div className="relative h-px w-full bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 accent-gradient origin-left"
                style={{
                  width: "100%",
                  transform: `scaleX(${count / 100})`,
                  boxShadow: "0 0 14px rgba(137,170,204,0.6)",
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white"
                style={{
                  left: `calc(${count}% - 3px)`,
                  boxShadow: "0 0 12px 2px rgba(137,170,204,0.95)",
                  opacity: count > 0 && count < 100 ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between w-full text-[11px] uppercase tracking-[0.3em] text-muted font-mono">
              <span
                className={locked ? "text-text-primary transition-colors" : "transition-colors"}
              >
                {locked ? "Signal locked" : "Tuning signal"}
              </span>
              <span className="tabular-nums text-text-primary">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* leading accent edge — glows at the bottom, then leads the curtain up */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(137,170,204,0.10)] to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] accent-gradient"
        style={{ boxShadow: "0 0 22px 3px rgba(137,170,204,0.55)" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.9, scaleX: 1 }}
        transition={{ duration: 1.2, delay: nameStart + 0.4, ease: EASE }}
      />
    </motion.div>
  );
}

function Corner({
  children,
  className,
  delay,
  line,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  line: "left" | "right";
}) {
  return (
    <motion.div
      className={`absolute z-10 flex flex-col gap-2 text-[10px] text-muted uppercase tracking-[0.3em] ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <motion.span
        className={`h-px w-8 ${line === "right" ? "self-end" : ""} bg-white/25`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE }}
        style={{ transformOrigin: line === "right" ? "right" : "left" }}
      />
      {children}
    </motion.div>
  );
}
