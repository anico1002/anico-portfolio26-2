"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageFadeSlideshowProps {
  urls: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
}

export default function ImageFadeSlideshow({
  urls,
  alt,
  intervalMs = 4000,
  className = "",
}: ImageFadeSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (urls.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [urls.length, intervalMs]);

  const unopt = (src: string) => src.endsWith(".gif") || src.startsWith("/projects/");

  if (urls.length === 0) return null;
  if (urls.length === 1) {
    return (
      <div className={`relative w-full bg-muted overflow-hidden aspect-video ${className}`}>
        <Image
          src={urls[0]}
          alt={alt}
          fill
          className="object-contain"
          unoptimized={unopt(urls[0])}
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full bg-muted overflow-hidden aspect-video ${className}`}>
      {urls.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            className="object-contain"
            unoptimized={unopt(src)}
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
        </div>
      ))}
    </div>
  );
}
