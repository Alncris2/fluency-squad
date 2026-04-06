import { create } from "zustand";
import type { SquadInfo, SquadState } from "@/types/state";

interface SquadStore {
  // State
  squads: Map<string, SquadInfo>;
  activeStates: Map<string, SquadState>;
  selectedSquad: string | null;
  isConnected: boolean;

  // Actions
  selectSquad: (name: string | null) => void;
  setConnected: (connected: boolean) => void;
  setSnapshot: (squads: SquadInfo[], activeStates: Record<string, SquadState>) => void;
  setSquadActive: (squad: string, state: SquadState) => void;
  updateSquadState: (squad: string, state: SquadState) => void;
  setSquadInactive: (squad: string) => void;
}

export const useSquadStore = create<SquadStore>((set) => ({
  squads: new Map(),
  activeStates: new Map(),
  selectedSquad: null,
  isConnected: false,

  selectSquad: (name) => set({ selectedSquad: name }),

  setConnected: (connected) => set({ isConnected: connected }),

  setSnapshot: (squads, activeStates) =>
    set((prev) => {
      const nextSquads = new Map(squads.map((s) => [s.code, s]));
      const nextActiveStates = new Map(Object.entries(activeStates));

      const hasCurrentSelection =
        prev.selectedSquad !== null && nextSquads.has(prev.selectedSquad);

      const fallbackActive = Array.from(nextActiveStates.keys()).find((code) => nextSquads.has(code));
      const fallbackAny = squads[0]?.code ?? null;

      return {
        squads: nextSquads,
        activeStates: nextActiveStates,
        selectedSquad: hasCurrentSelection
          ? prev.selectedSquad
          : (fallbackActive ?? fallbackAny),
      };
    }),

  setSquadActive: (squad, state) =>
    set((prev) => ({
      activeStates: new Map(prev.activeStates).set(squad, state),
    })),

  updateSquadState: (squad, state) =>
    set((prev) => ({
      activeStates: new Map(prev.activeStates).set(squad, state),
    })),

  setSquadInactive: (squad) =>
    set((prev) => {
      const next = new Map(prev.activeStates);
      next.delete(squad);
      return {
        activeStates: next,
        // Reset selection if the inactive squad was selected
        selectedSquad: prev.selectedSquad === squad ? null : prev.selectedSquad,
      };
    }),
}));
