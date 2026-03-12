"use client";

import { type ReactNode } from "react";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";

export default function ViewportEffects({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CustomCursor />
      <ScrollProgress />
    </>
  );
}
