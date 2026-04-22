import React from 'react';
import { useMarketStore } from '../../../store/marketStore';
import { useUIStore } from '../../../store/uiStore';
import type { Instrument } from '../../../types';
import { TickerNumber } from '../../ui';

export const Watchlist: React.FC = () => {
  const instruments = useMarketStore(state => Object.values(state.instruments));
  const prices = useMarketStore(state => state.prices);
  
  const selectedOrb = useUIStore(state => state.selectedOrb);
  const selectOrb = useUIStore(state => state.selectOrb);

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full custom-scrollbar">
      {instruments.map((inst: Instrument) => {
        const tick = prices[inst.id];
        const isSelected = selectedOrb === inst.id;
        
        return (
          <div 
            key={inst.id}
            onClick={() => selectOrb(inst.id === selectedOrb ? null : inst.id)}
            className={`grid grid-cols-[1fr_auto] py-2 px-2 border-b border-white/5 cursor-pointer items-center group transition-colors duration-200 ${isSelected ? 'bg-plasma/10 rounded-sm' : 'hover:bg-plasma/5'}`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="text-[10px] font-bold" style={{ color: inst.color }}>{inst.symbol.replace(/_/g, ' ')}</div>
              <div className="text-[8.5px] text-secondary">{inst.name}</div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <div className="text-[12px] font-bold font-mono">
                 <TickerNumber value={tick?.last || 0} />
              </div>
              <div className={`text-[8.5px] ${tick?.change24hPct >= 0 ? 'text-buy' : 'text-sell'}`}>
                {tick?.change24hPct >= 0 ? '+' : ''}{tick?.change24hPct?.toFixed(2) || '0.00'}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
