import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_INSTRUMENTS = [
  { id: '1', symbol: 'PWR_UK_JUN26', name: 'UK Power Base Jun26', type: 'FUTURES', energyType: 'ELECTRICITY', currency: 'GBP', color: '#00f5ff' },
  { id: '2', symbol: 'GAS_UK_JUN26', name: 'UK Nat. Gas Jun26', type: 'FUTURES', energyType: 'GAS', currency: 'GBP', color: '#ff6b35' },
  { id: '3', symbol: 'SOLAR_DE_Q3', name: 'DE Solar Q3 2026', type: 'SPOT', energyType: 'SOLAR', currency: 'EUR', color: '#ffd700' },
  { id: '4', symbol: 'WIND_DK_JUN', name: 'DK Wind Jun26', type: 'SPOT', energyType: 'WIND', currency: 'EUR', color: '#39ff14' },
  { id: '5', symbol: 'EUA_DEC26', name: 'Carbon EUA Dec26', type: 'CERTIFICATE', energyType: 'CARBON', currency: 'EUR', color: '#bf5fff' },
  { id: '6', symbol: 'NUC_FR_Q4', name: 'FR Nuclear Q4 2026', type: 'FUTURES', energyType: 'NUCLEAR', currency: 'EUR', color: '#00bfff' },
];

async function main() {
  console.log('Start seeding...');
  await prisma.instrument.deleteMany();
  
  for (const inst of INITIAL_INSTRUMENTS) {
    const instrument = await prisma.instrument.create({
      data: inst,
    });
    console.log(`Created instrument with id: ${instrument.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
