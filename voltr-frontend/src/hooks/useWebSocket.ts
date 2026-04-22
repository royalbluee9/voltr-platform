import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMarketStore } from '../store/marketStore';

const SOCKET_URL = 'http://localhost:3000';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const updatePrice = useMarketStore(state => state.updatePrice);
  const updateOrderBook = useMarketStore(state => state.updateOrderBook);

  const updateAiForecast = useMarketStore(state => state.updateAiForecast);

  useEffect(() => {
    console.log(`[WebSocket] Connecting to ${SOCKET_URL}...`);
    const newSocket = io(SOCKET_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ['websocket']
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[WebSocket] Connected');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected');
      setIsConnected(false);
    });

    newSocket.on('initial_state', (data) => {
      console.log('[WebSocket] Received initial state:', data);
    });

    newSocket.on('market_update', (data) => {
      if (data.type === 'TICK') {
        updatePrice(data);
      } else if (data.type === 'ORDER_BOOK') {
        updateOrderBook(data);
      } else if (data.type === 'AI_FORECAST') {
        updateAiForecast(data);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [updatePrice, updateOrderBook, updateAiForecast]);

  return { isConnected, socket };
};
