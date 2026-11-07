"use client";

import HeroContent from "./HeroContent";
import HeroVisuals from "./HeroVisuals";
import ParticleBackground from "./ParticleBackground";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 sm:py-0"
    >
      {/* Background Interactive Particles & Ambient Spotlights */}
      <ParticleBackground />

      {/* Main Hero Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6 min-h-[calc(100vh-6rem)] sm:min-h-screen lg:py-16">
        {/* Left Side: Typography & Messaging */}
        <div className="w-full lg:w-1/2 flex items-center pt-8 sm:pt-4 lg:pt-0">
          <HeroContent />
        </div>

        {/* Right Side: 3D Interactive Technology Composition */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <HeroVisuals />
        </div>
      </div>

      {/* Subtle Bottom Scroll Cue (Apple & Lenis style) */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 pointer-events-none z-20 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#A5A5A5]">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-[#FF91A9] animate-bounce" />
      </div>

      {/* Subtle bottom border fade line separating hero */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#303030]/60 to-transparent pointer-events-none" />
    </section>
  );
}
