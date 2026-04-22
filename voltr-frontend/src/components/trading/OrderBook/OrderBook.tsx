import React from 'react';
import { useVirtual } from 'react-virtual';
import { useMarketStore } from '../../../store/marketStore';
import { useUIStore } from '../../../store/uiStore';
import { useTradingStore } from '../../../store/tradingStore';


export const OrderBook: React.FC = () => {
  const selectedOrb = useUIStore(state => state.selectedOrb) || '1';
  const orderBook = useMarketStore(state => state.orderBooks[selectedOrb]);
  const selectOrderPrice = useTradingStore(state => state.selectOrderPrice);

  const parentRef = React.useRef<HTMLDivElement>(null);

  if (!orderBook) {
    return <div className="flex-1 flex items-center justify-center text-xs text-secondary">Awaiting Data...</div>;
  }

  // Slice asks reversed, then spread, then bids
  const asks = [...orderBook.asks].reverse();
  const bids = orderBook.bids;
  
  const totalItems = asks.length + 1 + bids.length;

  const rowVirtualizer = useVirtual({
    size: totalItems,
    parentRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  const renderRow = (index: number) => {
    if (index < asks.length) {
      // ASK ROW
      const ask = asks[index];
      const barWidth = `${(ask.cumulative / orderBook.maxCumulative) * 100}%`;
      return (
        <div onClick={() => selectOrderPrice(ask.price)} className="grid grid-cols-3 text-[9px] py-[2px] cursor-pointer hover:bg-white/5 relative group">
          <div className="absolute top-0 bottom-0 right-0 bg-sell opacity-15 pointer-events-none transition-all duration-300" style={{ width: barWidth }}></div>
          <div className="font-bold text-sell z-10 pl-1">{ask.price.toFixed(2)}</div>
          <div className="text-secondary text-right z-10">{ask.quantity.toLocaleString()}</div>
          <div className="text-muted text-right z-10 pr-1">{ask.cumulative.toLocaleString()}</div>
        </div>
      );
    } else if (index === asks.length) {
      // SPREAD ROW
      return (
        <div className="text-center py-1 text-[8px] text-solar border-y border-solar/20 my-0.5 bg-solar/5">
          SPREAD £{orderBook.spread.toFixed(2)} ({orderBook.spreadPct.toFixed(3)}%)
        </div>
      );
    } else {
      // BID ROW
      const bid = bids[index - asks.length - 1];
      const barWidth = `${(bid.cumulative / orderBook.maxCumulative) * 100}%`;
      return (
        <div onClick={() => selectOrderPrice(bid.price)} className="grid grid-cols-3 text-[9px] py-[2px] cursor-pointer hover:bg-white/5 relative group">
          <div className="absolute top-0 bottom-0 right-0 bg-buy opacity-15 pointer-events-none transition-all duration-300" style={{ width: barWidth }}></div>
          <div className="font-bold text-buy z-10 pl-1">{bid.price.toFixed(2)}</div>
          <div className="text-secondary text-right z-10">{bid.quantity.toLocaleString()}</div>
          <div className="text-muted text-right z-10 pr-1">{bid.cumulative.toLocaleString()}</div>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full font-mono">
      <div className="grid grid-cols-3 text-[8px] text-secondary border-b border-white/5 pb-1 mb-1 px-1 tracking-wider uppercase">
        <div>Price</div>
        <div className="text-right">Size</div>
        <div className="text-right">Total</div>
      </div>
      <div ref={parentRef} className="flex-1 overflow-auto custom-scrollbar" style={{ contain: 'strict' }}>
        <div style={{ height: `${rowVirtualizer.totalSize}px`, width: '100%', position: 'relative' }}>
          {rowVirtualizer.virtualItems.map((virtualRow: any) => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {renderRow(virtualRow.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
