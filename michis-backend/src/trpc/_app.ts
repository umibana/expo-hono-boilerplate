import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from './trpc';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export const appRouter = router({
  // Public greeting endpoint
  greeting: publicProcedure.query(() => 'Hello tRPC v11!'),

  secret: protectedProcedure.query(() => 'Secret message'),


  // Get current user info (protected)
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
    };
  }),

  // Get all users (protected, admin-like endpoint)
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db.select().from(user);
    return allUsers;
  }),

  // Get user by ID
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userFound = await ctx.db
        .select()
        .from(user)
        .where(eq(user.id, input.id))
        .limit(1);
      
      return userFound[0] || null;
    }),

  // Update user profile (protected)
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db
        .update(user)
        .set({
          name: input.name,
          image: input.image,
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.user?.id || ''))
        .returning();

      return updatedUser[0];
    }),
});

export type AppRouter = typeof appRouter;