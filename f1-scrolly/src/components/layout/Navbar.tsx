"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Radio, ShieldAlert, CheckCircle } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3.5" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo & Telemetry Status */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tighter text-white">
                AERO<span className="text-cyan">X</span>
              </span>
              <span className="text-xs font-mono font-bold text-white/50 border border-white/20 px-1.5 py-0.5 rounded ml-1">
                NX1
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/10">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[2px] text-white/60">
                PITLINK: <span className="text-emerald-400 font-bold">ONLINE</span>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Overview", "Aero", "Power", "Specs"].map((item) => (
              <a
                key={item}
                href={`#${item === "Specs" ? "specs" : ""}`}
                className="text-xs font-mono font-medium text-white/70 hover:text-cyan transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-mono text-white/70 hover:text-white transition-colors hidden sm:block"
            >
              VIP Access
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSubmitted(false);
                setModalOpen(true);
              }}
              className="px-6 py-2.5 bg-white text-black text-[11px] font-black font-mono uppercase tracking-[2px] rounded-full flex items-center gap-1.5 group overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 group-hover:text-black transition-colors">Pre-order</span>
              <ChevronRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan via-white to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Pre-order VIP Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0A0A0E] border border-white/20 p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-cyan uppercase tracking-[3px]">
                    ALLOCATION INQUIRY
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    AERO-X F1-NX1 Reserve
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-white/40 hover:text-white text-xl font-mono leading-none"
                >
                  ✕
                </button>
              </div>

              {!submitted ? (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    Production is strictly limited to 50 track-only hypercars. Enter your client identifier to initiate secure biometric onboarding.
                  </p>
                  <input
                    type="email"
                    placeholder="CLIENT IDENTIFIER OR SECURE EMAIL"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-cyan"
                  />
                  <input
                    type="text"
                    placeholder="FIA OR CIRCUIT LICENSE # (OPTIONAL)"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-cyan"
                  />
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full py-4 bg-cyan text-black font-black font-mono text-xs uppercase tracking-[3px] rounded-xl hover:bg-white transition-colors mt-2"
                  >
                    Submit Encrypted Dossier
                  </button>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center text-center gap-4">
                  <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Dossier Received</h4>
                  <p className="text-xs text-white/60">
                    Your allocation priority has been logged into the AERO-X encrypted server. A paddock concierge will reach out via secure channel.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-full"
                  >
                    Return to Telemetry
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
