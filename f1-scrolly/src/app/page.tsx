"use client";

import React, { useRef, useState } from "react";
import { useScroll, motion, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollytellingCanvas } from "@/components/ScrollytellingCanvas";
import { StoryBeats } from "@/components/StoryBeats";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function F1LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main 
      ref={containerRef} 
      className={`relative bg-[#050505] text-white ${!isLoaded ? "h-screen overflow-hidden" : ""}`}
    >
      <LoadingScreen isLoaded={isLoaded} />
      
      {/* Structural Elements */}
      <Navbar />
      
      {/* Background Interaction Layer */}
      <ScrollytellingCanvas 
        progress={smoothProgress as any} 
        onLoaded={() => setIsLoaded(true)}
      />

      {/* Narrative Scrollytelling Layer */}
      <div className="relative z-10">
        <StoryBeats progress={smoothProgress as any} />
      </div>

      {/* Editorial Specs Section */}
      <TechnicalSpecs />

      {/* Footer Info / Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <span className="text-[10px] uppercase tracking-[4px]">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Pre-order Indicator (Sticky) */}
      <motion.div 
        style={{ opacity: scrollYProgress }}
        className="fixed bottom-10 right-10 z-20 hidden md:block"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-[2px] text-white/50">Current Elevation</span>
          <span className="text-xl font-bold font-mono">
            {Math.round(smoothProgress.get() * 100)}%
          </span>
        </div>
      </motion.div>
    </main>
  );
}
