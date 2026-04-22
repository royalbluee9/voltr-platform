export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  type: 'SPOT' | 'FUTURES' | 'OPTIONS' | 'CERTIFICATE';
  energyType: 'ELECTRICITY' | 'GAS' | 'SOLAR' | 'WIND' | 'CARBON' | 'NUCLEAR';
  currency: string;
  color: string;
}

export interface PriceTick {
  instrument_id: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  open_interest: number;
  timestamp: string;
  change24h: number;
  change24hPct: number;
}

export interface OrderLevel {
  price: number;
  quantity: number;
  cumulative: number;
  side: 'BID' | 'ASK';
}

export interface OrderBook {
  instrument_id: string;
  bids: OrderLevel[];
  asks: OrderLevel[];
  spread: number;
  spreadPct: number;
  maxCumulative: number;
}

export interface Trade {
  id: string;
  instrument_id: string;
  price: number;
  quantity: number;
  side: 'BUY' | 'SELL';
  timestamp: string;
}

export interface Position {
  instrument_id: string;
  net_quantity: number;
  average_entry_price: number;
  unrealized_pnl: number;
  realized_pnl: number;
}

export interface Order {
  id: string;
  instrument_id: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP';
  quantity: number;
  price: number | null;
  status: 'PENDING' | 'OPEN' | 'FILLED' | 'CANCELLED';
  filled_quantity: number;
  timestamp: string;
}

export interface AIForecast {
  instrument_id: string;
  predicted_price: number;
  confidence_score: number;
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}
