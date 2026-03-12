"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Locale } from "@/lib/i18n";

interface AppCtx {
  locale: Locale;
}

const AppContext = createContext<AppCtx>({ locale: "en" });

export function AppProvider({ children }: { children: ReactNode }) {
  const locale: Locale = "en";

  return (
    <AppContext.Provider value={{ locale }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
