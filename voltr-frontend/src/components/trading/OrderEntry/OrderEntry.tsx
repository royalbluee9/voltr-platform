import React, { useState, useEffect } from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { useMarketStore } from '../../../store/marketStore';
import { useUIStore } from '../../../store/uiStore';

export const OrderEntry: React.FC = () => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [qty, setQty] = useState<string>('500');
  const [price, setPrice] = useState<string>('');

  const selectedOrb = useUIStore(state => state.selectedOrb) || '1';
  const instrument = useMarketStore(state => state.instruments[selectedOrb]);
  const currentPrice = useMarketStore(state => state.prices[selectedOrb]?.last);
  
  const selectedOrderPrice = useTradingStore(state => state.selectedOrderPrice);
  const placeOrder = useTradingStore(state => state.placeOrder);

  // Sync clicked orderbook prices to the input
  useEffect(() => {
    if (selectedOrderPrice !== null) {
      setPrice(selectedOrderPrice.toFixed(2));
    } else if (currentPrice && price === '') {
      setPrice(currentPrice.toFixed(2));
    }
  }, [selectedOrderPrice, currentPrice]);

  const handleOrderSubmit = () => {
    if (!instrument || !qty || !price) return;
    placeOrder({
      instrument_id: instrument.id,
      side,
      type: 'LIMIT',
      price: parseFloat(price),
      quantity: parseFloat(qty)
    });
  };

  const totalValue = (parseFloat(qty || '0') * parseFloat(price || '0')).toLocaleString('en-GB', { maximumFractionDigits: 0 });

  if (!instrument) return <div className="text-xs text-secondary justify-center flex mt-4">Select an instrument</div>;

  return (
    <div className="flex flex-col h-full font-ui w-full text-[10px]">
      
      {/* Side Toggle */}
      <div className="flex rounded-[4px] overflow-hidden mb-3 bg-white/5 border border-white/5">
        <button 
          onClick={() => setSide('BUY')}
          className={`flex-1 py-1.5 text-center font-display font-bold tracking-[2px] transition-all duration-200 ${side === 'BUY' ? 'bg-buy/20 text-buy' : 'text-secondary hover:text-white'}`}
        >
          BUY
        </button>
        <button 
          onClick={() => setSide('SELL')}
          className={`flex-1 py-1.5 text-center font-display font-bold tracking-[2px] transition-all duration-200 ${side === 'SELL' ? 'bg-sell/20 text-sell' : 'text-secondary hover:text-white'}`}
        >
          SELL
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
         <div>
           <span className="text-[7.5px] text-secondary uppercase tracking-widest block mb-1">Type</span>
           <input className="w-full bg-white/5 border border-white/10 rounded leading-tight px-2 py-1.5 text-primary outline-none focus:border-plasma/50" readOnly value="LIMIT" />
         </div>
         <div>
           <span className="text-[7.5px] text-secondary uppercase tracking-widest block mb-1">TIF</span>
           <input className="w-full bg-white/5 border border-white/10 rounded leading-tight px-2 py-1.5 text-primary outline-none focus:border-plasma/50" readOnly value="GTC" />
         </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
         <div>
           <span className="text-[7.5px] text-secondary uppercase tracking-widest block mb-1">Qty (MWh)</span>
           <input 
             type="number"
             className="w-full bg-white/5 border border-white/10 rounded leading-tight px-2 py-1.5 text-primary font-mono outline-none focus:border-plasma/50" 
             value={qty} 
             onChange={e => setQty(e.target.value)} 
           />
         </div>
         <div>
           <span className="text-[7.5px] text-secondary uppercase tracking-widest block mb-1">Price (£)</span>
           <input 
             type="number"
             step="0.05"
             className="w-full bg-white/5 border border-white/10 rounded leading-tight px-2 py-1.5 text-primary font-mono outline-none focus:border-plasma/50" 
             value={price} 
             onChange={e => setPrice(e.target.value)} 
           />
         </div>
      </div>

      <div className="flex justify-between items-center bg-plasma/5 border border-plasma/15 rounded px-2 py-2 mb-4">
        <span className="text-[8px] text-secondary tracking-wider">ORDER VALUE</span>
        <span className="text-[12px] font-display font-bold text-plasma">£ {totalValue}</span>
      </div>

      <button 
        onClick={handleOrderSubmit}
        className={`w-full mt-auto py-[10px] rounded font-display text-[11px] font-black tracking-widest transition-all duration-200 uppercase flex justify-center items-center gap-2
          ${side === 'BUY' 
             ? 'bg-gradient-to-br from-buy/30 to-buy/15 text-buy border border-buy/50 hover:from-buy/50 hover:to-buy/30 hover:shadow-glow-buy' 
             : 'bg-gradient-to-br from-sell/30 to-sell/15 text-sell border border-sell/50 hover:from-sell/50 hover:to-sell/30 hover:shadow-glow-sell'}`}
      >
        {side} {instrument.symbol.split('_')[0]}
      </button>

    </div>
  );
};
