"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Zap, Cpu, ShieldCheck, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";

interface BeatProps {
  progress: number;
}

const BEATS = [
  {
    range: [0, 0.18],
    align: "center",
    badge: "PROJECT CODENAME: F1-NX1",
    title: "AERO-X HYBRID HYPERCAR",
    subtitle: "The Future of Formula 1 Engineering, Reimagined for the Track.",
    description: "Surgically crafted from Formula 1 championship DNA. Delivering active aerodynamic mastery and 1,200+ horsepower without compromise.",
    statLabel: "POWER TO WEIGHT",
    statValue: "1.50 HP/KG",
    icon: <Sparkles className="w-5 h-5 text-cyan" />,
  },
  {
    range: [0.18, 0.42],
    align: "left",
    badge: "ACTIVE FLUID DYNAMICS",
    title: "Adaptive Aero Surfaces",
    subtitle: "Every molecule accounted for at 370+ km/h.",
    description: "Multi-element active front and rear wings adjust pitch in 4 milliseconds. Creating up to 3.5G of downforce through high-speed apexes while flattening drag on straights.",
    statLabel: "MAX DOWNFORCE",
    statValue: "3,500 KG @ VMAX",
    icon: <Wind className="w-5 h-5 text-cyan" />,
  },
  {
    range: [0.42, 0.65],
    align: "right",
    badge: "POWERTRAIN ARCHITECTURE",
    title: "V6 Turbo Hybrid Evolution",
    subtitle: "Thermal efficiency pushed beyond 98%.",
    description: "1.6-liter turbocharged internal combustion engine mated to dual kinetic and thermal energy recovery systems (MGU-K and MGU-H). Instant electrical torque deployment.",
    statLabel: "COMBINED OUTPUT",
    statValue: "1,240 BHP @ 15K RPM",
    icon: <Zap className="w-5 h-5 text-red-500" />,
  },
  {
    range: [0.65, 0.85],
    align: "left",
    badge: "COCKPIT INTEGRATION",
    title: "Zero-Latency Neural Link",
    subtitle: "Driver-centric aerospace engineering.",
    description: "Titanium HALO structural cockpit featuring curved ballistic glass HUD. Real-time tire degradation telemetry and AI strategy assistance projected directly into driver eyeline.",
    statLabel: "HUD LATENCY",
    statValue: "0.2 MILLISECONDS",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
  },
  {
    range: [0.85, 1.0],
    align: "center",
    badge: "LIMITED ALLOCATION",
    title: "The Pinnacle of Motorsport.",
    subtitle: "Only 50 bespoke units crafted globally.",
    description: "Each AERO-X F1-NX1 is custom fitted to its driver's exact biometric measurements. Includes 5-year global circuit support team.",
    statLabel: "GLOBAL PRODUCTION",
    statValue: "50 UNITS WORLDWIDE",
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
  },
];

export const StoryBeats = ({ progress }: BeatProps) => {
  const [reserved, setReserved] = useState(false);

  return (
    <div className="relative w-full h-[500vh] pointer-events-none">
      {BEATS.map((beat, index) => {
        const isActive = progress >= beat.range[0] && progress < beat.range[1];
        
        return (
          <div
            key={index}
            className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-20"
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 35,
                scale: isActive ? 1 : 0.94
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-2xl bg-[#050505]/85 backdrop-blur-2xl border border-white/15 p-8 md:p-12 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col gap-6 relative overflow-hidden ${
                beat.align === "center" ? "mx-auto text-center items-center" : 
                beat.align === "right" ? "ml-auto text-left" : "mr-auto text-left"
              }`}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                {beat.icon}
                <span className="text-[10px] font-mono uppercase tracking-[3px] text-white/80 font-bold">
                  {beat.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                  {beat.title}
                </h2>
                <h3 className="text-lg md:text-xl font-medium text-cyan tracking-wide">
                  {beat.subtitle}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
                {beat.description}
              </p>

              {/* Telemetry Highlight Pill */}
              <div className={`mt-2 flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 w-full ${beat.align === "center" ? "justify-center" : "justify-between"}`}>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {beat.statLabel}
                </span>
                <span className="text-xl font-mono font-black text-white text-cyan-glow">
                  {beat.statValue}
                </span>
              </div>

              {/* Final CTA Button on Last Beat */}
              {index === BEATS.length - 1 && (
                <div className="mt-4 flex flex-col items-center gap-4 w-full">
                  <button
                    onClick={() => setReserved(true)}
                    className={`w-full md:w-auto px-10 py-5 font-bold uppercase tracking-[3px] rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-xs ${
                      reserved
                        ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105"
                        : "bg-white text-black hover:bg-cyan hover:text-black hover:scale-105 shadow-xl"
                    }`}
                  >
                    {reserved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Allocation Requested
                      </>
                    ) : (
                      <>
                        Request Private Allocation <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[2px]">
                    {reserved ? "Concierge team will contact your encrypted secure channel within 2 hours." : "Verified client ID required for track day experience."}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
