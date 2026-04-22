import React from 'react';
import { TradingFloorScene } from '../3d/scenes/TradingFloorScene';
import { useWebSocket } from '../hooks/useWebSocket';

import { HoloPanel } from '../components/ui/HoloPanel';
import { Watchlist } from '../components/market/Watchlist/Watchlist';
import { OrderBook } from '../components/trading/OrderBook/OrderBook';
import { OrderEntry } from '../components/trading/OrderEntry/OrderEntry';
import { RiskMetricsBar } from '../components/risk/RiskMetrics/RiskMetricsBar';

const TradingLayout: React.FC = () => {
  // Mount the websocket generator upon loading the trading layout
  const { isConnected } = useWebSocket();

  return (
    <div className="relative w-full h-full text-primary">
      {/* 3D Background Scene */}
      <TradingFloorScene />

      {/* UI Overlay Layer (Pointer events strict management) */}
      <div className="absolute inset-0 pointer-events-none p-2 grid grid-cols-[220px_1fr_260px] grid-rows-[1fr_min-content] gap-2">
        
        {/* LEFT PANEL */}
        <div className="col-start-1 row-start-1 row-span-1 pointer-events-auto flex flex-col gap-2">
          {/* Watchlist */}
          <HoloPanel title="Markets" badge="6 LIVE" accent="plasma" className="flex-1 flex flex-col max-h-[60%]">
             <Watchlist />
          </HoloPanel>
        </div>

        {/* CENTER BOTTOM PANELS */}
        <div className="col-start-1 col-span-3 row-start-2 pointer-events-auto h-[75px]">
          <RiskMetricsBar />
        </div>

        {/* RIGHT PANEL */}
        <div className="col-start-3 row-start-1 row-span-1 pointer-events-auto flex flex-col gap-2">
           {/* Order Book */}
           <HoloPanel title="Order Book" badge="DEPTH 15" accent="neutral" className="flex-1 flex flex-col overflow-hidden">
             <OrderBook />
           </HoloPanel>

           {/* Order Entry */}
           <HoloPanel title="Order Entry" badge="INSTANT" accent="sell" className="flex-shrink-0 h-[300px]">
             <OrderEntry />
           </HoloPanel>
        </div>

      </div>

      {!isConnected && (
         <div className="absolute inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-center justify-center font-display text-plasma text-xl flex-col gap-4">
            <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-plasma animate-spin"></div>
            Connecting to VOLTR WebSockets...
         </div>
      )}
    </div>
  );
};

export default TradingLayout;
