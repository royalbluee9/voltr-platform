import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function initializeMarketStream(io: Server) {
  const basePrices: Record<string, number> = {};
  let instruments: any[] = [];
  
  // Load initial instruments from DB to seed the simulation
  prisma.instrument.findMany().then(insts => {
    instruments = insts;
    insts.forEach((inst, idx) => {
      // Give each instrument a different starting price scale
      basePrices[inst.id] = [87.45, 72.20, 44.80, 38.60, 65.40, 55.10][idx] || 100;
    });
    console.log('[MarketStream] Instruments loaded, starting data simulation.');
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);
    
    socket.emit('initial_state', { message: 'Connected to VOLTR MarketStream' });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  // Tick generator
  setInterval(() => {
    if (instruments.length === 0) return;
    
    const randomInst = instruments[Math.floor(Math.random() * instruments.length)];
    const base = basePrices[randomInst.id];
    const change = (Math.random() - 0.5) * (base * 0.005);
    basePrices[randomInst.id] = base + change;
    
    const currentPrice = basePrices[randomInst.id];
    const spread = currentPrice * 0.001;

    const tick = {
      type: 'TICK',
      instrument_id: randomInst.id,
      bid: currentPrice - spread,
      ask: currentPrice + spread,
      last: currentPrice,
      volume: Math.floor(Math.random() * 1000) + 100,
      open_interest: Math.floor(Math.random() * 50000),
      timestamp: new Date().toISOString(),
      change24h: currentPrice - base, // simulated daily change
      change24hPct: ((currentPrice - base) / base) * 100
    };

    io.emit('market_update', tick);
  }, 400);

  // OrderBook generator
  setInterval(() => {
    if (instruments.length === 0) return;
    
    const randomInst = instruments[Math.floor(Math.random() * instruments.length)];
    const midPrice = basePrices[randomInst.id] || 100;
    
    const bids = [];
    const asks = [];
    let bidCum = 0;
    let askCum = 0;

    for (let i = 1; i <= 15; i++) {
        const bidQ = Math.floor(50 + Math.random() * 500);
        bidCum += bidQ;
        bids.push({
            price: midPrice - (i * midPrice * 0.0005),
            quantity: bidQ,
            cumulative: bidCum,
            side: 'BID' // TypeScript enum matching frontend
        });

        const askQ = Math.floor(50 + Math.random() * 500);
        askCum += askQ;
        asks.push({
            price: midPrice + (i * midPrice * 0.0005),
            quantity: askQ,
            cumulative: askCum,
            side: 'ASK'
        });
    }

    const spread = asks[0].price - bids[0].price;

    const bookUpdate = {
        type: 'ORDER_BOOK',
        instrument_id: randomInst.id,
        bids,
        asks,
        spread: spread,
        spreadPct: (spread / midPrice) * 100,
        maxCumulative: Math.max(bidCum, askCum)
    };

    io.emit('market_update', bookUpdate);
  }, 700);

  // AI Pipeline Poll
  setInterval(async () => {
    if (instruments.length === 0) return;
    
    const randomInst = instruments[Math.floor(Math.random() * instruments.length)];
    const currentPrice = basePrices[randomInst.id];

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instrument_id: randomInst.id,
          current_price: currentPrice
        })
      });

      if (response.ok) {
        const data = await response.json();
        io.emit('market_update', {
          type: 'AI_FORECAST',
          ...data
        });
      }
    } catch (e) {
      // AI Service Down
    }
  }, 2500);
}
