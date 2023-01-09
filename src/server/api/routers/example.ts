import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

export const notesRouter = createTRPCRouter({
  createNote: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.notes.create({
        data: {
          id: `${Math.random()}`,
          text: input.name,
        },
      });
    }),
  getNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notes.findMany();
  }),
});
