import { z } from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const onboardingRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  onboardingForm: protectedProcedure
    .input(z.object({
      name: z.string(),
      contact: z.string(),
      lat: z.number(),
      long: z.number(),
      radius: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
        try {
          const merchantEntry = await ctx.db.dim_merchant.create({
            data: {
              name: input.name,
              latitude: input.lat,
              longitude: input.long,
              radius: input.radius,
              created_at: new Date(),
              clerk_uuid: ctx.auth.userId,
            }
          })
          await clerkClient.users.updateUser(ctx.auth.userId, {
            publicMetadata: {
              onboardingComplete: true,
              merchantUuid: merchantEntry.uuid,
            },
          })
          return { message: 'user onboarded' } 
        } catch(err) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR'
          })
        }
      }),
});
