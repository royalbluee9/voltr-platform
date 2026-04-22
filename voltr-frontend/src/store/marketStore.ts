import { create } from 'zustand';
import type { Instrument, PriceTick, OrderBook, Trade, AIForecast } from '../types';

export const INITIAL_INSTRUMENTS: Instrument[] = [
  { id: '1', symbol: 'PWR_UK_JUN26', name: 'UK Power Base Jun26', type: 'FUTURES', energyType: 'ELECTRICITY', currency: 'GBP', color: '#00f5ff' },
  { id: '2', symbol: 'GAS_UK_JUN26', name: 'UK Nat. Gas Jun26', type: 'FUTURES', energyType: 'GAS', currency: 'GBP', color: '#ff6b35' },
  { id: '3', symbol: 'SOLAR_DE_Q3', name: 'DE Solar Q3 2026', type: 'SPOT', energyType: 'SOLAR', currency: 'EUR', color: '#ffd700' },
  { id: '4', symbol: 'WIND_DK_JUN', name: 'DK Wind Jun26', type: 'SPOT', energyType: 'WIND', currency: 'EUR', color: '#39ff14' },
  { id: '5', symbol: 'EUA_DEC26', name: 'Carbon EUA Dec26', type: 'CERTIFICATE', energyType: 'CARBON', currency: 'EUR', color: '#bf5fff' },
  { id: '6', symbol: 'NUC_FR_Q4', name: 'FR Nuclear Q4 2026', type: 'FUTURES', energyType: 'NUCLEAR', currency: 'EUR', color: '#00bfff' },
];

interface MarketStore {
  instruments: Record<string, Instrument>;
  prices: Record<string, PriceTick>;
  orderBooks: Record<string, OrderBook>;
  trades: Record<string, Trade[]>;
  aiForecasts: Record<string, AIForecast>;
  
  updatePrice: (tick: PriceTick) => void;
  updateOrderBook: (book: OrderBook) => void;
  addTrade: (trade: Trade) => void;
  updateAiForecast: (forecast: AIForecast) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  instruments: INITIAL_INSTRUMENTS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
  prices: {},
  orderBooks: {},
  trades: {},
  aiForecasts: {},
  
  updatePrice: (tick) => set((state) => ({
    prices: { ...state.prices, [tick.instrument_id]: tick }
  })),
  
  updateOrderBook: (book) => set((state) => ({
    orderBooks: { ...state.orderBooks, [book.instrument_id]: book }
  })),
  
  addTrade: (trade) => set((state) => {
    const existingTrades = state.trades[trade.instrument_id] || [];
    return {
      trades: { 
        ...state.trades, 
        [trade.instrument_id]: [trade, ...existingTrades].slice(0, 50) 
      }
    };
  }),

  updateAiForecast: (forecast) => set((state) => ({
    aiForecasts: { ...state.aiForecasts, [forecast.instrument_id]: forecast }
  })),
}));
