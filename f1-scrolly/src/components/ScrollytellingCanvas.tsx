"use client";

import React, { useRef, useEffect, useState } from "react";
import { DrivingMode } from "./TelemetryHUD";

interface ScrollytellingCanvasProps {
  progress: number;
  mode?: DrivingMode;
  onLoaded?: () => void;
}

const ASSETS = [
  "/assets/hero.png",
  "/assets/aero.png",
  "/assets/v6.png",
  "/assets/control.png",
  "/assets/hero.png",
];

export const ScrollytellingCanvas = ({ progress, mode = "RACE", onLoaded }: ScrollytellingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    let failed = false;

    const timeout = setTimeout(() => {
      if (loadedCount < ASSETS.length && !failed) {
        setLoaded(true);
        onLoaded?.();
      }
    }, 6000);

    const loadedImages = ASSETS.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === ASSETS.length) {
          clearTimeout(timeout);
          setLoaded(true);
          onLoaded?.();
        }
      };
      img.onerror = () => {
        failed = true;
        clearTimeout(timeout);
        setLoaded(true);
        onLoaded?.();
      };
      return img;
    });
    setImages(loadedImages);

    return () => clearTimeout(timeout);
  }, [onLoaded]);

  // Draw logic with telemetry grid and mode reactivity
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Clear background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    // Mode specific grid/accent colors
    const modeColors: Record<DrivingMode, string> = {
      QUALIFYING: "rgba(239, 68, 68, ",
      RACE: "rgba(0, 214, 255, ",
      WET: "rgba(59, 130, 246, ",
      SAFETY: "rgba(245, 158, 11, ",
    };
    const accentPrefix = modeColors[mode] || modeColors.RACE;

    // Draw background futuristic grid overlay
    ctx.strokeStyle = `${accentPrefix}0.04)`;
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const totalFrames = ASSETS.length - 1;
    const frameIndex = Math.floor(progress * totalFrames);
    const nextFrameIndex = Math.min(frameIndex + 1, totalFrames);
    const frameProgress = (progress * totalFrames) % 1;

    const currentImg = images[frameIndex];
    const nextImg = images[nextFrameIndex];

    const drawImage = (img: HTMLImageElement, alpha: number) => {
      ctx.globalAlpha = alpha;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * 0.82;
      const imgW = img.naturalWidth * scale;
      const imgH = img.naturalHeight * scale;
      const x = (w - imgW) / 2;
      const y = (h - imgH) / 2;
      ctx.drawImage(img, x, y, imgW, imgH);
    };

    if (loaded && currentImg && nextImg && currentImg.naturalWidth > 0) {
      if (frameIndex === nextFrameIndex) {
        drawImage(currentImg, 1);
      } else {
        drawImage(currentImg, 1 - frameProgress);
        drawImage(nextImg, frameProgress);
      }
    } else {
      // Fallback animated aerodynamic wind tunnel vectors when images are unrendered
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = `${accentPrefix}0.25)`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 15; i++) {
        const lineY = (h / 15) * i + Math.sin(progress * 10 + i) * 30;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.bezierCurveTo(w * 0.3, lineY - 50, w * 0.7, lineY + 50, w, lineY);
        ctx.stroke();
      }
    }

    // Telemetry Scanner Laser Line
    const scanY = (progress * h * 1.5) % h;
    const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, `${accentPrefix}0.35)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 30, w, 30);

    ctx.strokeStyle = `${accentPrefix}0.6)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();

    ctx.globalAlpha = 1;
  }, [progress, loaded, images, mode]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      {/* Cinematic Vignette & Dynamic Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.5)_65%,rgba(5,5,5,0.92)_100%)]" />
    </div>
  );
};
