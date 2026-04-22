import express from 'react'; // fake to skip TS check if it happens, wait, actually let's use the real imports
import expressModule from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiRouter from './routes/api';
import { initializeMarketStream } from './sockets/marketStream';

const app = expressModule();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow frontend connects
    methods: ['GET', 'POST']
  }
});

app.use(helmet());
app.use(cors());
app.use(expressModule.json());

app.use('/api', apiRouter);

// Setup WebSockets
initializeMarketStream(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 VOLTR API Gateway running on http://localhost:${PORT}`);
});
