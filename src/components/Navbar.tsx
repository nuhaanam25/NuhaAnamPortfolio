"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-[#303030]/60 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: NA. Brand Monogram */}
        <Link
          href="#home"
          className="group flex items-center space-x-2 focus:outline-none"
          aria-label="Nuha Anam Home"
        >
          <div className="relative flex items-center">
            <span className="font-heading text-2xl sm:text-3xl tracking-wider text-[#F5F3F3] transition-colors duration-200 group-hover:text-[#FFB1C1]">
              NA<span className="text-[#FF91A9] transition-transform duration-200 inline-block group-hover:scale-125">.</span>
            </span>
            <div className="absolute -inset-x-2 -inset-y-1 bg-[#FF91A9]/0 group-hover:bg-[#FF91A9]/5 rounded-lg transition-colors -z-10" />
          </div>
        </Link>

        {/* Center/Right: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#151515]/60 backdrop-blur-md px-5 py-2 rounded-full border border-[#303030]/60">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[#A5A5A5] hover:text-[#F5F3F3] transition-all duration-200 rounded-full hover:bg-white/[0.04] relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF91A9] transition-all duration-200 group-hover:w-1/2 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Right: Quick Action & Availability (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#151515]/80 border border-[#303030] text-[11px] font-mono text-[#A5A5A5]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF91A9] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF91A9]" />
            </span>
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>

          <Link
            href="#contact"
            data-cursor="LET'S TALK →"
            className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5F3F3] hover:text-[#050505] bg-[#151515] hover:bg-[#FF91A9] border border-[#303030] hover:border-[#FF91A9] px-4 py-2 rounded-full transition-all duration-200 shadow-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#151515] border border-[#303030] text-[#F5F3F3] focus:outline-none focus:ring-1 focus:ring-[#FF91A9]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF91A9]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-b border-[#303030] px-6 py-6 transition-all duration-300 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-base font-medium text-[#A5A5A5] hover:text-[#F5F3F3] hover:bg-[#151515] transition-all"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#303030] flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#A5A5A5] px-2 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF91A9] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF91A9]" />
                </span>
                <span>AVAILABLE FOR SELECT PROJECTS</span>
              </div>

              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-[#FF91A9] text-[#050505] font-semibold text-sm tracking-wide uppercase hover:bg-[#FFB1C1] transition-all"
              >
                Let&apos;s Talk ↗
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
