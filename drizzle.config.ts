import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { env } from "./env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
