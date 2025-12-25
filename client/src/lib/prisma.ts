import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaOptions: any = {};

// Add adapter only if we're in runtime and have DATABASE_URL
if (typeof window === 'undefined' && process.env.DATABASE_URL) {
  try {
    const { PrismaPg } = require('@prisma/adapter-pg');
    const { Pool } = require('pg');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    
    prismaOptions = { adapter };
  } catch (error) {
    // If adapter setup fails (e.g., during build), continue without it
    console.warn('Could not initialize Prisma adapter, continuing without it:', error);
  }
}

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;