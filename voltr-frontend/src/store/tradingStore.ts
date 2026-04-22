import { create } from 'zustand';
import type { Order, Position } from '../types';

interface TradingStore {
  openOrders: Order[];
  filledOrders: Order[];
  positions: Record<string, Position>;
  selectedInstrumentId: string | null;
  selectedOrderPrice: number | null;
  
  selectInstrument: (id: string) => void;
  selectOrderPrice: (price: number) => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'filled_quantity' | 'timestamp'>) => void;
  updatePosition: (position: Position) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  openOrders: [],
  filledOrders: [],
  positions: {},
  selectedInstrumentId: '1', // Default to first instrument
  selectedOrderPrice: null,
  
  selectInstrument: (id) => set({ selectedInstrumentId: id, selectedOrderPrice: null }),
  selectOrderPrice: (price) => set({ selectedOrderPrice: price }),
  
  placeOrder: (orderReq) => set((state) => {
    const newOrder: Order = {
      ...orderReq,
      id: Math.random().toString(36).substring(7),
      status: 'OPEN',
      filled_quantity: 0,
      timestamp: new Date().toISOString(),
    };
    return { openOrders: [newOrder, ...state.openOrders] };
  }),
  
  updatePosition: (position) => set((state) => ({
    positions: { ...state.positions, [position.instrument_id]: position }
  })),
}));
