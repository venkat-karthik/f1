"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wind, Zap, Shield, CheckCircle2 } from "lucide-react";

interface SpecCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  specs: {
    label: string;
    value: string;
    detail: string;
    ratio: number; // 0 to 100 for visual telemetry progress bar
  }[];
}

const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: "power",
    title: "V6 Hybrid Powertrain",
    icon: <Zap className="w-4 h-4 text-cyan" />,
    specs: [
      { label: "Combined Maximum Output", value: "1,240 BHP", detail: "Internal Combustion + Dual ERS Boost", ratio: 98 },
      { label: "Max Engine RPM", value: "15,000 RPM", detail: "Electronic Rev Limiter with Active Shift Light", ratio: 94 },
      { label: "MGU-K Energy Recovery", value: "160 kW Continuous", detail: "Regenerative Braking Harvest @ 4 MJ/Lap", ratio: 92 },
      { label: "Thermal Efficiency", value: "98.4%", detail: "Industry Leading Waste Heat Re-combustion", ratio: 100 },
    ],
  },
  {
    id: "aero",
    title: "Active Fluid Dynamics",
    icon: <Wind className="w-4 h-4 text-blue-400" />,
    specs: [
      { label: "Max Downforce Load", value: "3,500 kg", detail: "Generated at Vmax (372 km/h)", ratio: 96 },
      { label: "Wing Actuation Speed", value: "4.0 Milliseconds", detail: "Hydraulic DRS & Front Flap Pitch Control", ratio: 99 },
      { label: "Drag Coefficient (Cd)", value: "0.24 to 0.72", detail: "Dynamic Transition from Straight to Cornering", ratio: 88 },
      { label: "Cornering Lateral Load", value: "5.2 G Max", detail: "Sustained High-Speed Turn Capacity", ratio: 95 },
    ],
  },
  {
    id: "chassis",
    title: "Carbon Composite Chassis",
    icon: <Shield className="w-4 h-4 text-red-400" />,
    specs: [
      { label: "Dry Curb Weight", value: "798 kg", detail: "Including Ballast & Survival Monocoque", ratio: 85 },
      { label: "Torsional Rigidity", value: "68,000 Nm/deg", detail: "Ballistic Grade T1000 Carbon Fiber", ratio: 97 },
      { label: "Braking Deceleration", value: "5.5 G Peak", detail: "Carbon-Carbon 378mm Ventilated Discs", ratio: 96 },
      { label: "Weight Distribution", value: "46% F / 54% R", detail: "Optimized Dynamic Traction Bias", ratio: 90 },
    ],
  },
  {
    id: "telemetry",
    title: "Neural AI Telemetry",
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    specs: [
      { label: "Onboard Sensors", value: "350+ Channels", detail: "Real-time Temperature & Pressure Monitoring", ratio: 95 },
      { label: "Data Transmission Rate", value: "2.4 GB / Lap", detail: "5G Ultra-Low Latency Pitwall Uplink", ratio: 94 },
      { label: "Driver HUD Projection", value: "OLED Holographic", detail: "Curved Visor Optical Overlay", ratio: 99 },
      { label: "AI Strategy Prediction", value: "Real-Time Apex", detail: "Tire Wear & Weather Forecast Matrix", ratio: 92 },
    ],
  },
];

export const TechnicalSpecs = () => {
  const [activeTab, setActiveTab] = useState<string>("power");
  const [briefingApplied, setBriefingApplied] = useState(false);

  const currentCategory = SPEC_CATEGORIES.find((c) => c.id === activeTab) || SPEC_CATEGORIES[0];

  return (
    <section id="specs" className="relative z-10 py-32 px-6 md:px-24 bg-gradient-to-b from-transparent via-[#08080A] to-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-[6px] text-cyan">
                AEROSPACE BLUEPRINT
              </h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Engineered for absolute track dominance.
            </h3>
          </div>
          <p className="text-white/50 text-sm max-w-sm font-light leading-relaxed">
            Select a subsystem below to inspect the surgical specifications and active telemetry parameters of the F1-NX1 hypercar architecture.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3">
          {SPEC_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3.5 rounded-2xl font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.25)] scale-105"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat.icon}
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Tab Content Schematic Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentCategory.specs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-[#0A0A0E]/90 border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between gap-6 hover:border-cyan/40 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-cyan/80 transition-colors">
                      {spec.label}
                    </span>
                    <span className="text-3xl md:text-4xl font-black font-mono text-white">
                      {spec.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20">
                    {spec.ratio}% EFF
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-white/50 font-light">
                    {spec.detail}
                  </p>
                  {/* Telemetry Progress Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${spec.ratio}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan to-sony-blue rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* VIP Briefing Invitation Card */}
        <div className="mt-12 p-1 relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan/30 via-sony-blue/30 to-purple-500/30 animate-pulse" />
          <div className="relative bg-[#050505] p-10 md:p-20 rounded-[22px] flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 border border-white/10">
            <div className="max-w-2xl flex flex-col gap-3">
              <span className="text-[10px] font-mono text-cyan uppercase tracking-[3px]">
                RESTRICTED CLIENT ACCESS
              </span>
              <h4 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Experience the cockpit in person.
              </h4>
              <p className="text-white/50 text-base font-light">
                Private track simulator sessions and engineering consultations available exclusively at Silverstone and Monza circuits.
              </p>
            </div>
            
            <button
              onClick={() => setBriefingApplied(true)}
              className={`px-10 py-5 font-bold uppercase tracking-[3px] rounded-full transition-all duration-300 text-xs shrink-0 ${
                briefingApplied
                  ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  : "bg-white text-black hover:bg-cyan hover:scale-105 shadow-2xl"
              }`}
            >
              {briefingApplied ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Briefing Confirmed
                </span>
              ) : (
                "Apply For Briefing"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
