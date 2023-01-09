import { createTRPCRouter } from "./trpc";
import { exampleRouter, notesRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
