"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScrollytellingCanvasProps {
  progress: number;
  onLoaded?: () => void;
}

const ASSETS = [
  "/assets/hero.png",
  "/assets/aero.png",
  "/assets/v6.png",
  "/assets/control.png",
  "/assets/hero.png",
];

export const ScrollytellingCanvas = ({ progress, onLoaded }: ScrollytellingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    let failed = false;

    // Fail-safe timeout (10 seconds)
    const timeout = setTimeout(() => {
      if (loadedCount < ASSETS.length && !failed) {
        console.warn("Scrollytelling preloading timed out. Launching with partial assets.");
        setLoaded(true);
        onLoaded?.();
      }
    }, 10000);

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
        console.error(`Failed to load image: ${src}`);
        clearTimeout(timeout);
        // Fallback: Proceed anyway if one fails to avoid getting stuck
        setLoaded(true);
        onLoaded?.();
      };
      return img;
    });
    setImages(loadedImages);

    return () => clearTimeout(timeout);
  }, [onLoaded]);

  // Draw logic
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    // Calculate current frame and next frame for interpolation
    const totalFrames = ASSETS.length - 1;
    const frameIndex = Math.floor(progress * totalFrames);
    const nextFrameIndex = Math.min(frameIndex + 1, totalFrames);
    const frameProgress = (progress * totalFrames) % 1;

    const currentImg = images[frameIndex];
    const nextImg = images[nextFrameIndex];

    if (!currentImg || !nextImg) return;

    // Clear background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Fade between images for "smooth" sequence effect with low frame count
    const drawImage = (img: HTMLImageElement, alpha: number) => {
      ctx.globalAlpha = alpha;
      
      const scale = Math.max(
        window.innerWidth / img.naturalWidth,
        window.innerHeight / img.naturalHeight
      ) * 0.8; // Padding for cinematic look

      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (window.innerWidth - w) / 2;
      const y = (window.innerHeight - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    };

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (frameIndex === nextFrameIndex) {
      drawImage(currentImg, 1);
    } else {
      // Cross-fade to simulate "sequence" movement
      drawImage(currentImg, 1 - frameProgress);
      drawImage(nextImg, frameProgress);
    }

  }, [progress, loaded, images]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_70%,rgba(5,5,5,0.8)_100%)]" />
    </div>
  );
};
