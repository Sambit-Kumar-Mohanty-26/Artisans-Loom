import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const getPrisma = (): PrismaClient => {
  // Always check for DATABASE_URL first
  if (!process.env.DATABASE_URL) {
    return new PrismaClient();
  }

  // Server-side initialization with Postgres Adapter
  if (typeof window === "undefined") {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }

  return new PrismaClient();
};

export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}