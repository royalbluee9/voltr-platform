import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/instruments', async (req, res) => {
  try {
    const instruments = await prisma.instrument.findMany();
    res.json(instruments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instruments' });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { instrumentId, side, type, quantity, price } = req.body;
    
    // Create pending order
    const order = await prisma.order.create({
      data: {
        instrumentId,
        side,
        type,
        quantity,
        price,
        status: 'OPEN',
      }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
