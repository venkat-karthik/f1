"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap, ShieldAlert, Disc, Gauge, Radio } from "lucide-react";

export type DrivingMode = "QUALIFYING" | "RACE" | "WET" | "SAFETY";

interface TelemetryHUDProps {
  progress: number;
  mode: DrivingMode;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ progress, mode }) => {
  // Calculate dynamic telemetry based on scroll progress and mode
  const baseRpm = mode === "QUALIFYING" ? 12500 : mode === "RACE" ? 10800 : mode === "WET" ? 9500 : 6000;
  const rpm = Math.min(15000, Math.round(baseRpm + Math.sin(progress * Math.PI * 4) * 2200));
  
  const maxSpeed = mode === "QUALIFYING" ? 368 : mode === "RACE" ? 342 : mode === "WET" ? 295 : 160;
  const speed = Math.round(Math.min(maxSpeed, Math.max(0, progress * maxSpeed * 1.15)));
  
  const gear = speed === 0 ? "N" : Math.min(8, Math.ceil((speed / maxSpeed) * 8));
  
  const drsActive = (mode === "QUALIFYING" || mode === "RACE") && progress > 0.25 && progress < 0.75;
  const ersDeploy = Math.round((1 - (progress % 0.8)) * 100);

  // Mode accent colors
  const modeColors: Record<DrivingMode, { border: string; text: string; bg: string; glow: string }> = {
    QUALIFYING: {
      border: "border-red-500/40",
      text: "text-red-400",
      bg: "bg-red-500/10",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.25)]",
    },
    RACE: {
      border: "border-cyan/40",
      text: "text-cyan",
      bg: "bg-cyan/10",
      glow: "shadow-[0_0_20px_rgba(0,214,255,0.25)]",
    },
    WET: {
      border: "border-blue-400/40",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    },
    SAFETY: {
      border: "border-amber-400/40",
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    },
  };

  const theme = modeColors[mode];

  return (
    <div className="fixed top-24 left-6 right-6 z-30 pointer-events-none hidden lg:flex justify-between items-start">
      {/* Left HUD Panel: Powertrain & Battery */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className={`pointer-events-auto bg-[#050505]/80 backdrop-blur-xl border ${theme.border} ${theme.glow} rounded-2xl p-4 w-64 flex flex-col gap-3 transition-all duration-500`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${theme.text} animate-pulse`} />
            <span className="text-[10px] uppercase font-mono tracking-[2px] text-white/70">
              MGU-K / ERS Status
            </span>
          </div>
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${theme.bg} ${theme.text}`}>
            {mode}
          </span>
        </div>

        {/* ERS Battery Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white/50">HYBRID BATTERY</span>
            <span className={`font-bold ${theme.text}`}>{ersDeploy}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className={`h-full rounded-full ${mode === "QUALIFYING" ? "bg-red-500" : "bg-cyan"}`}
              style={{ width: `${ersDeploy}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Tire Temps & Downforce */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-white/5">
            <span className="text-[9px] font-mono text-white/40 uppercase">Aero Load</span>
            <span className="text-xs font-mono font-bold text-white">
              {(2.1 + progress * 1.4).toFixed(2)} G
            </span>
          </div>
          <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-white/5">
            <span className="text-[9px] font-mono text-white/40 uppercase">Tire Core</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              <Disc className="w-3 h-3 animate-spin" /> 98°C OPT
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center Top Telemetry Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto bg-[#050505]/90 backdrop-blur-2xl border border-white/15 px-6 py-2.5 rounded-full flex items-center gap-6 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-r border-white/10 pr-6">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-[2px] text-white/80">
            TELEMETRY LINK: <span className="text-emerald-400 font-bold">ACTIVE</span>
          </span>
        </div>

        {/* RPM Gauge Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/50">RPM</span>
          <div className="w-28 h-2.5 bg-white/10 rounded-sm overflow-hidden flex">
            {Array.from({ length: 15 }).map((_, i) => {
              const active = i * 1000 <= rpm;
              return (
                <div
                  key={i}
                  className={`flex-1 mx-[0.5px] h-full transition-all duration-150 ${
                    active
                      ? i >= 12
                        ? "bg-red-500 shadow-[0_0_8px_red]"
                        : i >= 9
                        ? "bg-amber-400"
                        : "bg-cyan"
                      : "bg-transparent"
                  }`}
                />
              );
            })}
          </div>
          <span className="text-xs font-mono font-bold w-12 text-right text-white">
            {rpm}
          </span>
        </div>
      </motion.div>

      {/* Right HUD Panel: Speedometer & Gear */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className={`pointer-events-auto bg-[#050505]/80 backdrop-blur-xl border ${theme.border} ${theme.glow} rounded-2xl p-4 w-64 flex flex-col items-center gap-3 transition-all duration-500`}
      >
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-2">
          <span className="text-[10px] uppercase font-mono tracking-[2px] text-white/70 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan" /> Velocity HUD
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">
            DRS: {drsActive ? "OPEN [ACTIVE]" : "ARMED"}
          </span>
        </div>

        <div className="flex items-center justify-between w-full py-1">
          {/* Gear Indicator */}
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl w-14 h-14">
            <span className="text-[9px] font-mono text-white/40">GEAR</span>
            <span className={`text-2xl font-black font-mono ${theme.text}`}>
              {gear}
            </span>
          </div>

          {/* Speed Indicator */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black font-mono tracking-tighter text-white">
                {speed}
              </span>
              <span className="text-xs font-mono text-white/50 uppercase">km/h</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">
              VMAX TARGET: {maxSpeed} KM/H
            </span>
          </div>
        </div>

        {/* Quick Mode Indicator */}
        <div className="w-full bg-white/[0.03] border border-white/5 py-1.5 px-3 rounded-lg flex justify-between items-center text-[10px] font-mono">
          <span className="text-white/50">MGU-H THERMAL:</span>
          <span className="text-emerald-400 font-bold">OPTIMAL (98.4%)</span>
        </div>
      </motion.div>
    </div>
  );
};
