import { PrismaClient } from '@prisma/client';

/**
 * Shared Prisma client instance for the Hospcare backend services.
 * Consumers should prefer injecting `PrismaService` in Nest modules
 * instead of creating ad-hoc Prisma clients, but this export is useful
 * for scripts and background workers.
 */
export const prisma = new PrismaClient();

export type PrismaClientInstance = typeof prisma;
