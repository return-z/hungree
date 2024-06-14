import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getItems: protectedProcedure
    .query(async ({ ctx }) => {
        const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid
        console.log(merchantUuid);
        const menuItems = await ctx.db.menu_items.findMany({
            where: {
                merchant_uuid: merchantUuid,
            },
        })
        return menuItems;
    }),
    
    addItem: protectedProcedure
        .input(z.object({
            name: z.string(),
            type: z.string(),
            price: z.number(),
            availability: z.boolean(),
        }))
        .mutation(async({ input, ctx }) => {
            const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid;
            await ctx.db.menu_items.create({
                data: {
                    item_name: input.name,
                    item_price: input.price,
                    merchant_uuid: merchantUuid,
                    is_available: input.availability,
                }
            });
        })
})