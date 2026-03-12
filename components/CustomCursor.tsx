"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const onChange = () => setReducedMotion(q.matches);
    q.addEventListener("change", onChange);
    return () => q.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop || isTouch) return;

    setVisible(true);

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    let raf = 0;
    const updateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf = requestAnimationFrame(updateRing);
    };
    raf = requestAnimationFrame(updateRing);

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (!visible || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0, willChange: "left, top" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] hidden md:block opacity-50 -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0, willChange: "left, top" }}
        aria-hidden
      />
    </>
  );
}
