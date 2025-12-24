// client/prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Using the 'env' helper is the recommended way in Prisma 7
    // This ensures the DATABASE_URL is correctly picked up by the CLI for db push/pull
    url: env("DATABASE_URL"), 
  },
});