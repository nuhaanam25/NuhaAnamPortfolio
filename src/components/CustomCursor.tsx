"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest("a, button, [data-cursor], [data-cursor-text]");
      if (interactiveElement) {
        setIsHovered(true);
        const customText = interactiveElement.getAttribute("data-cursor") || interactiveElement.getAttribute("data-cursor-text");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      ringX = lerp(ringX, mouseX, 0.16);
      ringY = lerp(ringY, mouseY, 0.16);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Central Small Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FF91A9] pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_10px_#FF91A9] ${
          cursorText ? "opacity-0" : isHovered ? "scale-0" : "opacity-100 scale-100"
        }`}
      />

      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none rounded-full transition-all duration-200 ease-out ${
          cursorText
            ? "w-28 h-28 -ml-14 -mt-14 bg-[#050505]/90 border border-[#FF91A9] backdrop-blur-md shadow-[0_0_30px_rgba(255,145,169,0.35)] scale-100"
            : isHovered
            ? "w-12 h-12 -ml-6 -mt-6 border-2 border-[#FF91A9] bg-[#FF91A9]/10 scale-110 shadow-[0_0_20px_rgba(255,145,169,0.25)]"
            : isClicking
            ? "w-7 h-7 -ml-3.5 -mt-3.5 border border-[#FF91A9] scale-90"
            : "w-9 h-9 -ml-4.5 -mt-4.5 border border-[#FF91A9]/45 scale-100"
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] font-bold tracking-wider text-[#FF91A9] uppercase text-center select-none px-2 leading-tight"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
