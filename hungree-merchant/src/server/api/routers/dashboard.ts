import { Optional } from "@tanstack/react-query";
import { off } from "process";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

interface whereClause {
    merchantUuid: string | undefined,
    searchTerm?: string | undefined,
}

export const dashboardRouter = createTRPCRouter({
    getItems: protectedProcedure
    .input(z.object({
        pageNumber: z.number(),
        searchTerm: z.string(),
    }))
    .query(async ({ ctx, input }) => {
        const offset = (input.pageNumber - 1) * 10;
        const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid
        const menuItems = await ctx.db.menu_items.findMany({
            where: {
                merchant_uuid: merchantUuid,
                item_name: {
                    search: input.searchTerm.length > 0 ? input.searchTerm : undefined
                }
            },
            take: 10,
            skip: offset,
        })
        return menuItems;
    }),
    
    countOfAllItems: protectedProcedure
    .input(z.object({
        searchTerm: z.string(),
    }))
    .query(async({ ctx, input }) => {
        const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid;
        const itemsCount = await ctx.db.menu_items.aggregate({
            _count: {
                item_uuid: true,
            },
            _avg: {
                item_price: true,
            },
            where: {
                merchant_uuid: merchantUuid,
                item_name: {
                    search: input.searchTerm.length > 0 ? input.searchTerm : undefined
                }
            },
        });
        console.log(itemsCount._count);
        return itemsCount;
    }),

    countOfActiveItems: protectedProcedure
    .input(z.object({
        searchTerm: z.string(),
    }))
    .query(async({ ctx, input }) => {
        const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid;
        const itemsCount = await ctx.db.menu_items.aggregate({
            _count: {
                item_uuid: true,
            },
            where: {
                merchant_uuid: merchantUuid,
                is_available: true,
                item_name: {
                    search: input.searchTerm.length > 0 ? input.searchTerm : undefined
                }
            },
        });
        console.log(itemsCount._count);
        return itemsCount._count.item_uuid;
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
                    item_type: input.type,
                    item_price: input.price,
                    merchant_uuid: merchantUuid,
                    is_available: input.availability,
                }
            });
        }),
    
    editItem: protectedProcedure
        .input(z.object({
            name: z.string(),
            type: z.string(),
            price: z.number(),
            availability: z.boolean(),
            itemUuid: z.string(),
        }))
        .mutation(async({ input, ctx }) => {
            const merchantUuid = ctx.auth.sessionClaims.metadata.merchantUuid;
            await ctx.db.menu_items.update({
                where: {
                    item_uuid: input.itemUuid
                },
                data: {
                    item_name: input.name,
                    item_type: input.type,
                    item_price: input.price,
                    merchant_uuid: merchantUuid,
                    is_available: input.availability,
                }
            })
        })
})