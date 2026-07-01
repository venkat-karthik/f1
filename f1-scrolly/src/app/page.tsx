"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollytellingCanvas } from "@/components/ScrollytellingCanvas";
import { StoryBeats } from "@/components/StoryBeats";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { TelemetryHUD, DrivingMode } from "@/components/TelemetryHUD";
import { CockpitControls } from "@/components/CockpitControls";

export default function F1LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [drivingMode, setDrivingMode] = useState<DrivingMode>("RACE");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentElevation, setCurrentElevation] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setCurrentElevation(Math.round(latest * 100));
    });
  }, [smoothProgress]);

  return (
    <main 
      ref={containerRef} 
      className={`relative bg-[#050505] text-white ${!isLoaded ? "h-screen overflow-hidden" : ""}`}
    >
      <LoadingScreen isLoaded={isLoaded} />
      
      {/* Structural Elements */}
      <Navbar />

      {/* Interactive HUD Overlay */}
      <TelemetryHUD progress={currentElevation / 100} mode={drivingMode} />
      
      {/* Background Interaction Layer */}
      <ScrollytellingCanvas 
        progress={currentElevation / 100} 
        mode={drivingMode}
        onLoaded={() => setIsLoaded(true)}
      />

      {/* Narrative Scrollytelling Layer */}
      <div className="relative z-10">
        <StoryBeats progress={currentElevation / 100} />
      </div>

      {/* Editorial Specs Section */}
      <TechnicalSpecs />

      {/* Floating Interactive Cockpit Control Deck */}
      <CockpitControls
        currentMode={drivingMode}
        onSelectMode={setDrivingMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Pre-order Elevation Indicator (Sticky Top Right on Scroll) */}
      <motion.div 
        style={{ opacity: scrollYProgress }}
        className="fixed bottom-24 right-8 z-20 hidden xl:block pointer-events-none"
      >
        <div className="bg-[#050505]/90 backdrop-blur-md border border-white/15 px-5 py-4 rounded-2xl flex flex-col gap-1 shadow-2xl">
          <span className="text-[8px] uppercase tracking-[2px] text-white/50 font-mono">SECTOR PROGRESS</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-cyan">
              {currentElevation}%
            </span>
            <span className="text-[10px] font-mono text-white/40">/ LAP 1</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
