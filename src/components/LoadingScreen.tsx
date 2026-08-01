import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── living aurora background on canvas (very subtle, dark) ── */
function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    // render at reduced resolution; the heavy blur hides it and keeps it smooth
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // soft moving light blobs, accent-tinted
    const blobs = [
      { x: 0.5, y: 0.42, r: 0.42, hue: "137,170,204", a: 0.16, sx: 0.00013, sy: 0.00009, p: 0 },
      { x: 0.5, y: 0.42, r: 0.30, hue: "78,133,191", a: 0.14, sx: 0.00017, sy: 0.00011, p: 2 },
      { x: 0.5, y: 0.5, r: 0.22, hue: "180,200,230", a: 0.06, sx: 0.00021, sy: 0.00015, p: 4 },
    ];

    const start = performance.now();
    const paint = (t: number) => {
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
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      paint(1200);
    } else {
      const draw = (now: number) => {
        paint(now - start);
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

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 3200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setCount(100);
        setTimeout(onComplete, 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const chars = profile.name.split("");
  const year = new Date().getFullYear();

  const linesIn = 0.15;
  const nameStart = 0.9;
  const cornersIn = 1.5;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg overflow-hidden flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* living aurora */}
      <Aurora />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* scanning sheen sweeping down once */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(137,170,204,0.06), transparent)",
        }}
        initial={{ top: "-40vh", opacity: 0 }}
        animate={{ top: "140vh", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.6, delay: 0.6, ease: "easeInOut" }}
      />

      {/* central vertical hairline */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: linesIn }}
        style={{ transformOrigin: "top" }}
      />
      {/* two horizontal guides around the name */}
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

      {/* corners */}
      <Corner className="top-6 left-6 items-start" delay={cornersIn} line="left">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full accent-gradient" />
          Portfolio
        </span>
      </Corner>
      <Corner className="top-6 right-6 items-end text-right" delay={cornersIn + 0.08} line="right">
        <span className="font-mono">© {year}</span>
      </Corner>
      <Corner className="bottom-6 left-6 items-start" delay={cornersIn + 0.16} line="left">
        <span>Founder · Strategist · Builder</span>
      </Corner>
      <Corner className="bottom-6 right-6 items-end text-right" delay={cornersIn + 0.24} line="right">
        <span className="font-mono">Building globally</span>
      </Corner>

      {/* center block */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.p
          className="text-[11px] text-muted uppercase tracking-[0.4em] mb-6"
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: nameStart - 0.25 }}
        >
          Collection '26
        </motion.p>

        {/* name — letters rise from under a mask, clean blur-in (no color flash) */}
        <h1 className="flex text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary leading-[1.05] pb-1">
          {chars.map((ch, i) => (
            <span key={i} className="relative overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: "120%", filter: "blur(8px)", opacity: 0 }}
                animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                transition={{
                  duration: 1.0,
                  delay: nameStart + i * 0.055,
                  ease: EASE,
                }}
                style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* soft glow feathering beneath the name */}
        <motion.div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-32 accent-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.4, delay: nameStart + 0.3 }}
          style={{ filter: "blur(60px)", zIndex: -1 }}
        />

        {/* progress line + counter */}
        <motion.div
          className="mt-10 flex flex-col items-center w-[260px] md:w-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: nameStart + 0.5 }}
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
            <span>Loading experience</span>
            <span className="tabular-nums text-text-primary">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      </div>
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
