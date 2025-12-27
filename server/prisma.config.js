// server/prisma.config.js
require('dotenv').config();

module.exports = {
  // Now looks for the schema in the current (server) directory
  schema: "schema.prisma", 
  datasource: {
    url: process.env.DATABASE_URL,
  },
};