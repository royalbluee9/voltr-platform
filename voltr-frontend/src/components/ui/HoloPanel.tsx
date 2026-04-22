import React from 'react';

interface HoloPanelProps {
  title: string;
  badge?: string;
  accent?: 'plasma' | 'solar' | 'gas' | 'carbon' | 'nuclear' | 'buy' | 'sell' | 'neutral';
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const HoloPanel: React.FC<HoloPanelProps> = ({ 
  title, 
  badge, 
  accent = 'plasma', 
  children,
  className = '',
  contentClassName = ''
}) => {
  return (
    <div className={`holo-panel ${accent} flex flex-col ${className}`}>
      <div className="flex items-center justify-between px-3 py-[6px] border-b border-white/5 whitespace-nowrap overflow-hidden flex-shrink-0">
        <div className={`font-display text-[8px] font-bold tracking-[2px] uppercase text-${accent}`}>
          {title}
        </div>
        {badge && (
          <div className={`text-[7px] px-1.5 py-0.5 rounded-[3px] bg-${accent}/15 text-${accent}`}>
            {badge}
          </div>
        )}
      </div>
      <div className={`flex-1 relative overflow-hidden p-2 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
