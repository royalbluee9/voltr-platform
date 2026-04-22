import { create } from 'zustand';

export const CameraMode = {
  TRADING_FLOOR: 'trading_floor',
  INSTRUMENT_FOCUS: 'instrument',
  GRID_VIEW: 'grid_view',
  PORTFOLIO_VIEW: 'portfolio',
  COCKPIT: 'cockpit',
} as const;

export type CameraMode = typeof CameraMode[keyof typeof CameraMode];

interface UIStore {
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  
  selectedOrb: string | null;
  selectOrb: (instrumentId: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cameraMode: CameraMode.TRADING_FLOOR,
  setCameraMode: (mode) => set({ cameraMode: mode }),
  
  selectedOrb: null,
  selectOrb: (id) => set({ selectedOrb: id }),
}));
