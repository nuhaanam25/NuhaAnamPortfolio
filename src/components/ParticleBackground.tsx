"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count: 45 desktop, 14 mobile
    const count = prefersReducedMotion ? 0 : isMobile ? 14 : 45;
    const particles: Particle[] = [];
    const colors = ["#FF91A9", "#FFB1C1", "#ffffff"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1, // gentle upward drift
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * (Math.random() > 0.3 ? 2 : 3))],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse for glow spotlight
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouseX - 300}px, ${mouseY - 300}px, 0)`;
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Pulse opacity
          p.alpha = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.12;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = p.size * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Dynamic Mouse Following Pink Ambient Spotlight */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,145,169,0.08)_0%,transparent_65%)] pointer-events-none will-change-transform hidden md:block"
      />

      {/* Static Subtle Ambient Glows (Top Right & Bottom Left) */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,145,169,0.09)_0%,transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(255,177,193,0.06)_0%,transparent_70%)] blur-3xl" />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />
    </div>
  );
}
