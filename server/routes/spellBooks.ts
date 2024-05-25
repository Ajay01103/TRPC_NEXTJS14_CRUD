import { db } from "@/utils/db"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

export const spellBooksRouter = router({
  get: publicProcedure.query(async () => {
    const spellBooks = await db.spellbook.findMany()

    return spellBooks
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts
      await db.spellbook.create({
        data: {
          title: input.title,
          description: input.description,
        },
      })
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts
      await db.spellbook.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
