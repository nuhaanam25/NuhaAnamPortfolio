"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroButtons from "./HeroButtons";
import { Sparkles } from "lucide-react";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
        );
      }

      // Staggered word reveals in headline
      tl.fromTo(
        ".word-reveal",
        { opacity: 0, y: 40, rotateX: -25 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.08,
        },
        "-=0.6"
      );

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.7"
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
      }

      if (statusRef.current) {
        tl.fromTo(
          statusRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-start z-10 max-w-2xl lg:max-w-3xl">
      {/* Small Introductory Text & Badge */}
      <div
        ref={badgeRef}
        className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#151515]/90 border border-[#303030] text-[#A5A5A5] text-xs font-mono tracking-widest uppercase mb-5 backdrop-blur-md shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FF91A9]" />
        <span>Hello, I&apos;m Nuha Anam</span>
      </div>

      {/* Main Bold Oversized Headline */}
      <h1
        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-[#F5F3F3] uppercase mb-6 sm:mb-7 select-none"
        style={{ perspective: 1000 }}
      >
        <span className="inline-block word-reveal mr-3 sm:mr-4">Designing</span>
        <span className="inline-block word-reveal mr-3 sm:mr-4">&amp;</span>
        <br className="hidden sm:inline" />
        <span className="inline-block word-reveal mr-3 sm:mr-4 text-[#FF91A9] pink-glow-text">
          Developing
        </span>
        <br className="inline" />
        <span className="inline-block word-reveal mr-3 sm:mr-4">Digital</span>
        <span className="inline-block word-reveal text-[#FF91A9] pink-glow-text">
          Experiences.
        </span>
      </h1>

      {/* Supporting Description */}
      <p
        ref={descRef}
        className="text-base sm:text-lg lg:text-xl text-[#A5A5A5] font-normal leading-relaxed max-w-xl mb-8 sm:mb-10"
      >
        I build modern, responsive and interactive websites that help businesses turn ideas into
        meaningful digital experiences.
      </p>

      {/* Primary & Secondary CTA Buttons */}
      <div ref={buttonsRef} className="mb-7">
        <HeroButtons />
      </div>

      {/* Availability Status Indicator */}
      <div
        ref={statusRef}
        className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#151515]/70 border border-[#303030]/80 text-[11px] sm:text-xs font-mono text-[#A5A5A5] tracking-wide"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF91A9] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF91A9]" />
        </span>
        <span className="text-[#A5A5A5]">AVAILABLE FOR SELECT PROJECTS</span>
      </div>
    </div>
  );
}
