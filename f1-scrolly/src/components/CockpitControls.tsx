"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sliders, Zap, Shield, CloudRain, Flame, Volume2, VolumeX } from "lucide-react";
import { DrivingMode } from "./TelemetryHUD";

interface CockpitControlsProps {
  currentMode: DrivingMode;
  onSelectMode: (mode: DrivingMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CockpitControls: React.FC<CockpitControlsProps> = ({
  currentMode,
  onSelectMode,
  soundEnabled,
  onToggleSound,
}) => {
  const modes: { id: DrivingMode; label: string; sub: string; icon: React.ReactNode; color: string; border: string }[] = [
    {
      id: "QUALIFYING",
      label: "QUALIFYING",
      sub: "100% ERS / MAX VMAX",
      icon: <Flame className="w-4 h-4 text-red-500" />,
      color: "hover:bg-red-500/20 text-red-400",
      border: "border-red-500/50",
    },
    {
      id: "RACE",
      label: "RACE MODE",
      sub: "BALANCED AERO / MGU-H",
      icon: <Zap className="w-4 h-4 text-cyan" />,
      color: "hover:bg-cyan/20 text-cyan",
      border: "border-cyan/50",
    },
    {
      id: "WET",
      label: "WET CIRCUIT",
      sub: "HIGH DOWNFORCE + TC",
      icon: <CloudRain className="w-4 h-4 text-blue-400" />,
      color: "hover:bg-blue-500/20 text-blue-400",
      border: "border-blue-400/50",
    },
    {
      id: "SAFETY",
      label: "SAFETY CAR",
      sub: "BATTERY CHARGE PRESET",
      icon: <Shield className="w-4 h-4 text-amber-400" />,
      color: "hover:bg-amber-500/20 text-amber-400",
      border: "border-amber-400/50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#050505]/85 backdrop-blur-2xl border border-white/20 p-2.5 rounded-full flex items-center gap-2 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-2 pl-3 pr-2 border-r border-white/10 hidden sm:flex">
        <Sliders className="w-4 h-4 text-white/50" />
        <span className="text-[10px] font-mono uppercase tracking-[2px] text-white/70">
          MODE PRESET
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                isActive
                  ? `bg-white/10 border ${m.border} shadow-lg scale-105`
                  : "bg-transparent hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {m.icon}
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold font-mono tracking-wider leading-none">
                  {m.label}
                </span>
                <span className="text-[8px] font-mono text-white/40 hidden md:block">
                  {m.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Audio Engine Toggle */}
      <button
        onClick={onToggleSound}
        title={soundEnabled ? "Mute Cockpit Audio" : "Enable Cockpit Audio"}
        className={`p-3 rounded-full border transition-all ${
          soundEnabled
            ? "bg-cyan/20 border-cyan/50 text-cyan shadow-[0_0_15px_rgba(0,214,255,0.3)]"
            : "bg-white/5 border-white/10 text-white/40 hover:text-white"
        }`}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </motion.div>
  );
};
