import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create a pool using your environment variable
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Initialize the adapter required for Prisma 7
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the constructor
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;