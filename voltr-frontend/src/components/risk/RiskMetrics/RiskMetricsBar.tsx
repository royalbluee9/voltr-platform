import React, { useState, useEffect } from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { useMarketStore } from '../../../store/marketStore';
import { useUIStore } from '../../../store/uiStore';
import { Sparkline } from '../../ui';

export const RiskMetricsBar: React.FC = () => {
  const openOrders = useTradingStore(state => state.openOrders);
  
  const selectedOrb = useUIStore(state => state.selectedOrb) || '1';
  const aiForecast = useMarketStore(state => state.aiForecasts[selectedOrb]);

  const [sparkData, setSparkData] = useState<number[]>(Array.from({ length: 40 }, (_, i) => 18 + Math.sin(i * 0.3) * 7 + Math.random() * 4));

  useEffect(() => {
    const t = setInterval(() => {
      setSparkData(prev => {
         const out = [...prev];
         out.push(out[out.length - 1] + (Math.random() - 0.45) * 2);
         out.shift();
         return out;
      });
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-3 h-full">
      
      <div className="holo-panel plasma rounded opacity-90 transition-colors duration-200 hover:border-plasma/50 flex flex-col justify-center px-4 overflow-hidden relative">
        <div className="text-[7.5px] uppercase tracking-[1.5px] text-secondary mb-1">Net Exposure</div>
        <div className="font-display text-[14px] font-bold text-primary">£ 2.84M</div>
        <div className="text-[9px] mt-0.5 text-buy font-bold">↑ 12.4% today</div>
      </div>

      <div className="holo-panel buy rounded opacity-90 transition-colors duration-200 hover:border-buy/50 flex flex-col justify-center px-4 overflow-hidden relative">
        <div className="text-[7.5px] uppercase tracking-[1.5px] text-secondary mb-1">Daily P&L</div>
        <div className="font-display text-[14px] font-bold text-buy">+£ 48,220</div>
        <div className="absolute right-2 bottom-3">
          <Sparkline data={sparkData} width={80} height={20} color="#00e676" />
        </div>
      </div>

      <div className="holo-panel sell rounded opacity-90 transition-colors duration-200 hover:border-solar/50 flex flex-col justify-center px-4 overflow-hidden relative" style={{ '--tw-border-opacity': 0.1, borderColor: 'var(--energy-solar)' } as any}>
         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-solar to-transparent opacity-60"></div>
         <div className="text-[7.5px] uppercase tracking-[1.5px] text-secondary mb-1">VaR 95% 1D</div>
         <div className="flex items-center gap-3">
           <svg width="42" height="42" viewBox="0 0 42 42">
             <circle cx="21" cy="21" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
             <circle cx="21" cy="21" r="15" fill="none" stroke="#ffd700" strokeWidth="4"
               strokeDasharray="94.2" strokeDashoffset="33" strokeLinecap="round" transform="rotate(-90 21 21)"/>
             <text x="21" y="24" textAnchor="middle" fontSize="9" fill="#ffd700" fontFamily="Orbitron, monospace" fontWeight="bold">65%</text>
           </svg>
           <div className="flex flex-col">
             <div className="font-display text-[13px] font-bold text-primary">£ 186K</div>
             <div className="text-[9px] mt-0.5 text-solar">of £286K</div>
           </div>
         </div>
      </div>

      <div className="holo-panel solar rounded opacity-90 transition-colors duration-200 hover:border-plasma/50 flex flex-col justify-center px-4 overflow-hidden relative" style={{ '--tw-border-opacity': 0.1, borderColor: 'var(--text-secondary)' } as any}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60"></div>
        <div className="text-[7.5px] uppercase tracking-[1.5px] text-secondary mb-1">Open Orders</div>
        <div className="font-display text-[14px] font-bold text-primary">{openOrders.length || '0'}</div>
        <div className="text-[9px] mt-0.5 text-secondary">{openOrders.filter(o => o.side === 'BUY').length} BUY · {openOrders.filter(o => o.side === 'SELL').length} SELL</div>
        {openOrders.length > 0 && <div className="absolute top-2 right-2 w-[8px] h-[8px] rounded-full bg-plasma shadow-[0_0_8px_var(--energy-plasma)] animate-pulse"></div>}
      </div>

      <div className="holo-panel carbon rounded opacity-90 transition-colors duration-200 hover:border-carbon/50 flex flex-col justify-center px-4 overflow-hidden relative" style={{ '--tw-border-opacity': 0.1, borderColor: 'var(--energy-carbon)' } as any}>
         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-carbon to-transparent opacity-60"></div>
         <div className="text-[7.5px] uppercase tracking-[1.5px] text-secondary mb-1">AI Forecast 24h</div>
         {aiForecast ? (
           <>
            <div className={`font-display text-[14px] font-bold ${aiForecast.trend === 'BEARISH' ? 'text-sell' : 'text-buy'}`}>
              {aiForecast.trend === 'BEARISH' ? '↓' : '↑'} £ {aiForecast.predicted_price.toFixed(2)}
            </div>
            <div className={`text-[9px] mt-0.5 font-bold ${aiForecast.trend === 'BEARISH' ? 'text-sell' : 'text-buy'}`}>
              Confidence: {aiForecast.confidence_score}%
            </div>
           </>
         ) : (
           <div className="text-[10px] text-secondary flex items-center gap-2 mt-2">
             <div className="w-2 h-2 rounded-full border-t border-r border-carbon animate-spin"></div>
             Analyzing...
           </div>
         )}
      </div>

    </div>
  );
};
