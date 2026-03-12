"use client";

export default function Marquee() {
  const text = "VISUAL & USER EXPERIENCE · UI/UX VIDEOGAMES · BRAND ART DIRECTOR · INTERACTIVE PROTOTYPE · WEB3 & VR DESIGNER · ";
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        <div className="flex gap-16 font-display text-5xl md:text-7xl font-semibold text-muted-foreground/20">
          <span>{text}</span>
        </div>
        <div className="flex gap-16 font-display text-5xl md:text-7xl font-semibold text-muted-foreground/20">
          <span>{text}</span>
        </div>
      </div>
    </section>
  );
}
