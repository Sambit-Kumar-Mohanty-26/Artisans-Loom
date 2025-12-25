import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let adapter;

// Only create adapter if DATABASE_URL is available
if (process.env.DATABASE_URL) {
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL 
  });
  adapter = new PrismaPg(pool);
}

// 3. Pass the adapter to the constructor (or no adapter if not available)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(adapter ? { adapter } : undefined);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;