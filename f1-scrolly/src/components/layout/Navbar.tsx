"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-white">
            AERO<span className="text-cyan">X</span>
          </span>
          <div className="h-4 w-[1px] bg-white/20 mx-2 hidden sm:block" />
          <span className="text-sm font-medium text-white/60 hidden sm:block tracking-wide">
            F1-NX1
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Overview", "Aero", "Power", "Tech", "Specs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-white/70 hover:text-white transition-colors tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-xs font-medium text-white/60 hover:text-white transition-colors">
            Support
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[2px] rounded-full flex items-center gap-1 group overflow-hidden relative"
          >
            <span className="relative z-10">Pre-order</span>
            <ChevronRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan to-sony-blue opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
