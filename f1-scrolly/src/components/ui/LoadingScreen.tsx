"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ isLoaded }: { isLoaded: boolean }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setShow(false), 1000);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-10"
        >
          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-4xl font-bold tracking-tighter text-white">
              AERO<span className="text-cyan">X</span>
            </span>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-[10px] uppercase tracking-[8px] text-white/30 font-medium ml-2">
              The Path to Peak Velocity
            </span>
          </motion.div>

          {/* Progress Indicator */}
          <div className="absolute bottom-20 flex flex-col items-center gap-4">
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isLoaded ? "0%" : "-50%" }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-cyan shadow-[0_0_10px_#00D6FF]"
              />
            </div>
            <span className="text-[8px] uppercase tracking-[4px] text-white/40">
              {isLoaded ? "Ready for Launch" : "Synchronizing Aerodynamics"}
            </span>
          </div>

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,rgba(5,5,5,0.9)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
