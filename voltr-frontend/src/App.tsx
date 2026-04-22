import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import TradingLayout from './layouts/TradingLayout';
import GridMapLayout from './layouts/GridMapLayout';
import PortfolioLayout from './layouts/PortfolioLayout';
import AnalyticsLayout from './layouts/AnalyticsLayout';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen w-screen bg-void text-primary font-mono overflow-hidden">
        {/* TOPBAR */}
        <div className="h-[46px] flex-shrink-0 flex items-center gap-3 bg-[rgba(13,17,23,0.93)] border-b border-plasma border-opacity-15 px-3 backdrop-blur-md mx-1 mt-1 rounded text-sm z-50">
          <div className="font-display text-[17px] font-black text-plasma tracking-[3px] drop-shadow-glow-plasma mr-1">
            VOLT<span className="text-white">R</span>
          </div>

          <div className="flex gap-[2px]">
            <NavLink
              to="/trading"
              className={({ isActive }) =>
                `font-display text-[10px] font-bold px-[9px] py-1 rounded-[3px] cursor-pointer tracking-widest border border-transparent transition-all duration-200 uppercase ${
                  isActive
                    ? 'bg-plasma/10 border-plasma/40 text-plasma drop-shadow-glow-plasma'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                }`
              }
            >
              Trading Floor
            </NavLink>
            <NavLink
              to="/grid"
              className={({ isActive }) =>
                `font-display text-[10px] font-bold px-[9px] py-1 rounded-[3px] cursor-pointer tracking-widest border border-transparent transition-all duration-200 uppercase ${
                  isActive
                    ? 'bg-plasma/10 border-plasma/40 text-plasma drop-shadow-glow-plasma'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                }`
              }
            >
              Grid Map
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `font-display text-[10px] font-bold px-[9px] py-1 rounded-[3px] cursor-pointer tracking-widest border border-transparent transition-all duration-200 uppercase ${
                  isActive
                    ? 'bg-plasma/10 border-plasma/40 text-plasma drop-shadow-glow-plasma'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                }`
              }
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `font-display text-[10px] font-bold px-[9px] py-1 rounded-[3px] cursor-pointer tracking-widest border border-transparent transition-all duration-200 uppercase ${
                  isActive
                    ? 'bg-plasma/10 border-plasma/40 text-plasma drop-shadow-glow-plasma'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                }`
              }
            >
              Analytics
            </NavLink>
          </div>

          {/* Ticker Placeholder */}
          <div className="flex-1 overflow-hidden mx-2 opacity-50 flex items-center justify-center">
             <span className="text-[10px] text-muted">MARKET TICKER STREAM...</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[8px] font-bold tracking-wider font-display bg-buy/15 text-buy border border-buy/30 uppercase">
            ⚡ AI: BULLISH
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="w-[7px] h-[7px] rounded-full bg-buy shadow-[0_0_6px_var(--trade-buy)] animate-pulse"></div>
            <div className="text-[9px] text-secondary tracking-wide">LIVE · 43ms</div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 relative overflow-hidden mt-1 mx-1 mb-1 bg-[rgba(13,17,23,0.4)] rounded border border-white/5">
           <Routes>
            <Route path="/" element={<Navigate to="/trading" replace />} />
            <Route path="/trading" element={<TradingLayout />} />
            <Route path="/grid" element={<GridMapLayout />} />
            <Route path="/portfolio" element={<PortfolioLayout />} />
            <Route path="/analytics" element={<AnalyticsLayout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
