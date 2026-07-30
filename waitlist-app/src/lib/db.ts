import "server-only";

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * DATABASE_URL is a relative `file:` URL, which would resolve against whatever
 * cwd the process happens to have. Anchor it to the project root so the dev
 * server, the build, and the Prisma CLI all open the same file.
 */
function resolveDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  if (raw === ":memory:" || raw === "file::memory:") return ":memory:";

  const filePath = raw.startsWith("file:") ? raw.slice("file:".length) : raw;
  if (path.isAbsolute(filePath)) return filePath;
  // Resolved at runtime, never bundled — the bundler cannot trace it and says so.
  return path.join(/* turbopackIgnore: true */ process.cwd(), filePath);
}

function createClient() {
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: resolveDatabaseUrl() }),
  });
}

// Next's dev server re-evaluates modules on every hot reload; without this the
// connection pool would grow one client per edit.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
