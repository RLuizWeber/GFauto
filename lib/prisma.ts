import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias do Prisma Client em desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

globalForPrisma.prisma = prisma;
