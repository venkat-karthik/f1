"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BeatProps {
  progress: number;
}

const BEATS = [
  {
    range: [0, 0.15],
    align: "center",
    title: "AERO-X F1-NX1",
    subtitle: "The Future of Racing, Reimagined.",
    description: "Engineering the impossible. A new era of aerodynamic mastery.",
  },
  {
    range: [0.15, 0.4],
    align: "left",
    title: "Fluid Dynamics",
    subtitle: "Every molecule, accounted for.",
    description: "Active aero surfaces adapt in milliseconds. 20% more downforce, zero compromise.",
  },
  {
    range: [0.4, 0.65],
    align: "right",
    title: "V6 Hybrid Evolution",
    subtitle: "Power without boundaries.",
    description: "1,200 HP system. Dual MGU-H recovery with 98% thermal efficiency.",
  },
  {
    range: [0.65, 0.85],
    align: "left",
    title: "Zero-Latency Interface",
    subtitle: "Driver-centric engineering.",
    description: "Next-gen HALO with integrated OLED HUD. Control at the speed of thought.",
  },
  {
    range: [0.85, 1.0],
    align: "center",
    title: "The Pinnacle.",
    subtitle: "Track-ready dominance.",
    description: "AERO-X F1-NX1 is not just a car. It's moving architecture.",
  },
];

export const StoryBeats = ({ progress }: BeatProps) => {
  return (
    <div className="relative w-full h-[500vh] pointer-events-none">
      {BEATS.map((beat, index) => {
        // Calculate visibility based on progress
        const isActive = progress >= beat.range[0] && progress < beat.range[1];
        
        // Use framer motion for smooth entry/exit
        return (
          <div
            key={index}
            className="sticky top-0 h-screen w-full flex items-center px-10 md:px-24"
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 20,
                scale: isActive ? 1 : 0.95
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`max-w-xl ${
                beat.align === "center" ? "mx-auto text-center" : 
                beat.align === "right" ? "ml-auto text-right" : "mr-auto"
              }`}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gradient">
                {beat.title}
              </h2>
              <h3 className="text-xl md:text-2xl font-medium text-cyan mb-6 tracking-wide">
                {beat.subtitle}
              </h3>
              <p className="text-lg text-white/60 leading-relaxed font-light">
                {beat.description}
              </p>
              
              {index === BEATS.length - 1 && (
                <motion.div className="mt-10 flex flex-col items-center gap-6">
                  <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-[3px] rounded-full hover:scale-105 transition-transform text-xs">
                    Reserve Now
                  </button>
                  <p className="text-[10px] text-white/30 uppercase tracking-[2px]">
                    Production limited to 50 units worldwide.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
