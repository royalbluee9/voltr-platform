import React from 'react';

// Common Animated Flash number component
export const TickerNumber: React.FC<{ value: number, formatter?: (v: number) => string, className?: string }> = ({ value, formatter = v => v.toFixed(2), className = '' }) => {
  const [flash, setFlash] = React.useState<'up' | 'dn' | null>(null);
  const prevValue = React.useRef(value);

  React.useEffect(() => {
    if (value > prevValue.current) {
      setFlash('up');
      const t = setTimeout(() => setFlash(null), 300);
      return () => clearTimeout(t);
    } else if (value < prevValue.current) {
      setFlash('dn');
      const t = setTimeout(() => setFlash(null), 300);
      return () => clearTimeout(t);
    }
    prevValue.current = value;
  }, [value]);

  const flashClass = flash === 'up' ? 'text-buy bg-buy/20' : flash === 'dn' ? 'text-sell bg-sell/20' : '';

  return (
    <span className={`transition-colors duration-200 rounded px-0.5 ${flashClass} ${className}`}>
      {formatter(value)}
    </span>
  );
};

// Simple Sparkline using SVG
export const Sparkline: React.FC<{ data: number[], color?: string, width?: number, height?: number }> = ({ data, color = '#00f5ff', width = 100, height = 22 }) => {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline 
        points={points} 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
