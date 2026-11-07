"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroButtonsProps {
  className?: string;
}

export default function HeroButtons({ className = "" }: HeroButtonsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 sm:gap-5 ${className}`}>
      {/* Primary CTA Button */}
      <Link
        href="#work"
        data-cursor="VIEW WORK →"
        className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#FF91A9] text-[#050505] overflow-hidden transition-all duration-300 hover:bg-[#FFB1C1] hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(255,145,169,0.35)] hover:shadow-[0_0_40px_rgba(255,145,169,0.55)] focus:outline-none focus:ring-2 focus:ring-[#FF91A9] focus:ring-offset-2 focus:ring-offset-[#050505]"
      >
        <span className="relative z-10 flex items-center space-x-2">
          <span>Explore My Work</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {/* Shimmer sweep animation on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform ease-out pointer-events-none" />
      </Link>

      {/* Secondary CTA Button */}
      <Link
        href="#contact"
        data-cursor="LET'S TALK →"
        className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#F5F3F3] bg-[#151515] border border-[#303030] hover:border-[#FF91A9] hover:bg-[#1a1a20] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm hover:shadow-[0_0_25px_rgba(255,145,169,0.2)] focus:outline-none focus:ring-2 focus:ring-[#FF91A9] focus:ring-offset-2 focus:ring-offset-[#050505]"
      >
        <span className="flex items-center space-x-2">
          <span>Let&apos;s Talk</span>
          <ArrowUpRight className="w-4 h-4 text-[#A5A5A5] group-hover:text-[#FF91A9] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
}
