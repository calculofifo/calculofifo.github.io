"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { LocalProgressRepository } from "@/lib/progress/local-progress-repository";
import type { ProgressRepository } from "@/lib/progress/types";
import { createProgressStore, type ProgressState, type ProgressStore } from "./progress-store";

const ProgressContext = createContext<ProgressStore | null>(null);

/**
 * Owns the progress store for the app. Swap the repository here (v2: Supabase);
 * nothing else in the UI knows where progress lives.
 */
export function ProgressProvider({
  children,
  repository,
}: {
  children: ReactNode;
  repository?: ProgressRepository;
}) {
  const [store] = useState(() => createProgressStore(repository ?? new LocalProgressRepository()));
  useEffect(() => {
    void store.getState().hydrate();
  }, [store]);
  return <ProgressContext.Provider value={store}>{children}</ProgressContext.Provider>;
}

export function useProgress<T>(selector: (state: ProgressState) => T): T {
  const store = useContext(ProgressContext);
  if (!store) throw new Error("useProgress must be used inside <ProgressProvider>");
  return useStore(store, selector);
}
