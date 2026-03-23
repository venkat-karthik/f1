"use client";

import React from "react";
import { motion } from "framer-motion";

const SPEC_GROUPS = [
  {
    title: "Power Unit",
    specs: [
      { label: "Engine Type", value: "1.6L V6 Turbo Hybrid" },
      { label: "Max RPM", value: "15,000" },
      { label: "Combined Output", value: "1,200+ HP" },
      { label: "Thermal Efficiency", value: "98% Combined" },
    ],
  },
  {
    title: "Chassis & Aero",
    specs: [
      { label: "Monocoque", value: "AERO-X Carbon Composite" },
      { label: "Weight", value: "798kg (Incl. Driver)" },
      { label: "Aero System", value: "NX-Dynamic Active Wings" },
      { label: "Force", value: "3.5G Max Downforce" },
    ],
  },
  {
    title: "Dynamics",
    specs: [
      { label: "0-100 km/h", value: "2.6 Seconds" },
      { label: "0-200 km/h", value: "4.8 Seconds" },
      { label: "Max Velocity", value: "372 km/h" },
      { label: "Stopping Dist.", value: "Vmax to 0 in 110m" },
    ],
  },
];

export const TechnicalSpecs = () => {
  return (
    <section id="specs" className="relative z-10 py-32 px-10 md:px-24 bg-gradient-to-b from-transparent to-[#0A0A0C]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm uppercase tracking-[8px] text-cyan/70 font-bold mb-6">
              Technical Blueprint
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Surgically engineered for peak performance.
            </h3>
          </div>
          <p className="text-white/40 text-sm max-w-[300px] font-light leading-relaxed">
            The F1-NX1 utilizes aerospace-grade composites and AI-driven fluid dynamics to redefine the limitations of modern circuit racing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {SPEC_GROUPS.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="flex flex-col gap-8"
            >
              <h4 className="text-[10px] uppercase tracking-[4px] text-white/40 border-b border-white/5 pb-4">
                {group.title}
              </h4>
              <div className="flex flex-col gap-6">
                {group.specs.map((spec, j) => (
                  <div key={j} className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium">
                      {spec.label}
                    </span>
                    <span className="text-lg font-bold text-white tracking-wide">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-32 p-1 relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-sony-blue/20" />
          <div className="relative bg-[#050505] p-12 md:p-24 rounded-[22px] flex flex-col items-center text-center gap-10 border border-white/5">
            <div className="max-w-2xl flex flex-col gap-4">
              <h4 className="text-3xl md:text-5xl font-bold tracking-tight">Experience the cockpit.</h4>
              <p className="text-white/40 text-lg">Private viewing and technical briefing available for AERO-X partners.</p>
            </div>
            <button className="px-12 py-5 bg-white text-black text-[12px] font-black uppercase tracking-[4px] rounded-full hover:scale-105 transition-transform">
              Apply for Briefing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
